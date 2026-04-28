import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

const Body = z.object({
  action: z.enum(["suspend", "resume"]),
  reason: z.string().trim().max(400).optional().default(""),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId } = await params;
  const body = await req.json().catch(() => ({}));
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "פרטים לא תקינים" }, { status: 400 });
  }

  const sub = await db.query.subscriptions.findFirst({
    where: eq(schema.subscriptions.userId, userId),
  });
  if (!sub) {
    return NextResponse.json({ error: "מנוי לא נמצא" }, { status: 404 });
  }

  const now = new Date();
  if (parsed.data.action === "suspend") {
    await db
      .update(schema.subscriptions)
      .set({
        suspendedAt: now,
        suspendedReason: parsed.data.reason || null,
        updatedAt: now,
      })
      .where(eq(schema.subscriptions.userId, userId));

    await db.insert(schema.notifications).values({
      userId,
      type: "warning",
      title: "המנוי שלך הושעה",
      body: parsed.data.reason
        ? `סיבה: ${parsed.data.reason}. ליצירת קשר — וואטסאפ 058-5222227.`
        : "ליצירת קשר ולפרטים — וואטסאפ 058-5222227.",
    });
  } else {
    await db
      .update(schema.subscriptions)
      .set({
        suspendedAt: null,
        suspendedReason: null,
        updatedAt: now,
      })
      .where(eq(schema.subscriptions.userId, userId));

    await db.insert(schema.notifications).values({
      userId,
      type: "success",
      title: "המנוי שלך חודש ✓",
      body: "השהיית המנוי הוסרה. השירות פעיל שוב.",
    });
  }

  return NextResponse.json({ ok: true });
}
