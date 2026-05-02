import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId } = await params;

  if (userId === session!.user.id) {
    return NextResponse.json(
      { error: "אי אפשר למחוק את עצמך" },
      { status: 400 }
    );
  }

  const user = await db.query.users.findFirst({
    where: eq(schema.users.id, userId),
  });
  if (!user) {
    return NextResponse.json({ error: "משתמש לא נמצא" }, { status: 404 });
  }

  try {
    // מחיקה מפורשת של רשומות תלויות, ליתר ביטחון (גם אם cascade לא הוגדר נכון)
    // כל אחד עם try/catch כדי שטבלאות חסרות לא יחסמו
    await safeDelete(() =>
      db.delete(schema.extensionPushes).where(eq(schema.extensionPushes.userId, userId))
    );
    await safeDelete(() =>
      db.delete(schema.notifications).where(eq(schema.notifications.userId, userId))
    );
    await safeDelete(() =>
      db.delete(schema.invoices).where(eq(schema.invoices.userId, userId))
    );
    await safeDelete(() =>
      db.delete(schema.businessSettings).where(eq(schema.businessSettings.userId, userId))
    );
    await safeDelete(() =>
      db.delete(schema.subscriptions).where(eq(schema.subscriptions.userId, userId))
    );
    await safeDelete(() =>
      db.delete(schema.sessions).where(eq(schema.sessions.userId, userId))
    );
    await safeDelete(() =>
      db.delete(schema.accounts).where(eq(schema.accounts.userId, userId))
    );

    // לבסוף — המשתמש עצמו
    await db.delete(schema.users).where(eq(schema.users.id, userId));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin delete user] error:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: `מחיקה נכשלה ב-DB: ${msg}` },
      { status: 500 }
    );
  }
}

async function safeDelete(fn: () => Promise<unknown>): Promise<void> {
  try {
    await fn();
  } catch (e) {
    console.warn("[admin delete user] dependency delete failed (continuing):", e);
  }
}
