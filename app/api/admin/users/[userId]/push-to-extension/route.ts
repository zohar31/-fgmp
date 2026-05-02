import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { db, schema } from "@/lib/db";
import { eq, and, gt } from "drizzle-orm";

export const runtime = "nodejs";

// POST /api/admin/users/[userId]/push-to-extension
// אדמין לוחץ "שלח לתוסף" → יוצר רשומה בטבלת extension_pushes
// התוסף ב-VPS יושך אותה ב-poll הבא ויצור קטגוריה ב-keywordCategories
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 403 });
  }

  const { userId } = await params;
  if (!userId) {
    return NextResponse.json({ ok: false, error: "Missing userId" }, { status: 400 });
  }

  // ודא שהמשתמש קיים והפעיל את ה-WhatsApp
  const sub = await db.query.subscriptions.findFirst({
    where: eq(schema.subscriptions.userId, userId),
  });
  if (!sub) {
    return NextResponse.json({ ok: false, error: "Subscription not found" }, { status: 404 });
  }
  if (!sub.activatedAt) {
    return NextResponse.json(
      { ok: false, error: "המשתמש לא הפעיל את WhatsApp עדיין — לא ניתן לשלוח לתוסף" },
      { status: 400 }
    );
  }
  if (!["trial_active", "active"].includes(sub.status)) {
    return NextResponse.json(
      { ok: false, error: `מנוי לא פעיל (status=${sub.status})` },
      { status: 400 }
    );
  }

  // למניעת ספאם: בדוק שאין push pending מהדקה האחרונה לאותו משתמש
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const existingPending = await db.query.extensionPushes.findFirst({
    where: and(
      eq(schema.extensionPushes.userId, userId),
      eq(schema.extensionPushes.status, "pending"),
      gt(schema.extensionPushes.pushedAt, fiveMinutesAgo)
    ),
  });
  if (existingPending) {
    return NextResponse.json(
      {
        ok: false,
        error: "כבר נשלח push בחמש הדקות האחרונות, ממתין לתוסף",
        pushId: existingPending.id,
      },
      { status: 409 }
    );
  }

  const adminId = session?.user?.id ?? null;
  const [inserted] = await db
    .insert(schema.extensionPushes)
    .values({
      userId,
      pushedByAdminId: adminId,
    })
    .returning();

  return NextResponse.json({
    ok: true,
    pushId: inserted.id,
    pushedAt: inserted.pushedAt.toISOString(),
    message: "נשלח לתור — התוסף יקבל בעוד עד 30 שניות",
  });
}

// GET /api/admin/users/[userId]/push-to-extension — היסטוריה
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 403 });
  }

  const { userId } = await params;
  const rows = await db
    .select()
    .from(schema.extensionPushes)
    .where(eq(schema.extensionPushes.userId, userId))
    .orderBy(schema.extensionPushes.pushedAt)
    .limit(10);

  return NextResponse.json({
    ok: true,
    pushes: rows.reverse().map((r) => ({
      id: r.id,
      status: r.status,
      pushedAt: r.pushedAt.toISOString(),
      ackAt: r.ackAt?.toISOString() ?? null,
      errorMessage: r.errorMessage,
    })),
  });
}
