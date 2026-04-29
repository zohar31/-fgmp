import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { sendAdminNotification } from "@/lib/email";

export const runtime = "nodejs";

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const [sub, settings, user] = await Promise.all([
    db.query.subscriptions.findFirst({
      where: eq(schema.subscriptions.userId, userId),
    }),
    db.query.businessSettings.findFirst({
      where: eq(schema.businessSettings.userId, userId),
    }),
    db.query.users.findFirst({ where: eq(schema.users.id, userId) }),
  ]);

  if (!sub) {
    return NextResponse.json({ error: "מנוי לא נמצא" }, { status: 404 });
  }
  if (sub.status !== "cancelled") {
    return NextResponse.json(
      { error: "המנוי אינו במצב מבוטל" },
      { status: 400 }
    );
  }

  const now = new Date();
  let nextStatus: typeof schema.subscriptionStatus.enumValues[number];

  const setupComplete = !!(
    settings?.businessName &&
    settings?.contactName &&
    settings?.niche &&
    settings?.leadPhone &&
    settings?.keywords
  );

  if (sub.activatedAt) {
    nextStatus =
      sub.trialEndsAt && sub.trialEndsAt > now ? "trial_active" : "active";
  } else if (setupComplete) {
    nextStatus = "pending_activation";
  } else {
    nextStatus = "pending_setup";
  }

  await db
    .update(schema.subscriptions)
    .set({
      status: nextStatus,
      cancelledAt: null,
      cancellationReason: null,
      updatedAt: now,
    })
    .where(eq(schema.subscriptions.userId, userId));

  await db.insert(schema.notifications).values({
    userId,
    type: "success",
    title: "המנוי שלך הופעל מחדש ✓",
    body: "ברוכים השבים! המערכת חוזרת לפעילות. אם נדרשת פעולה נוספת — הבאנר באזור האישי ינחה אותך.",
  });

  try {
    await sendAdminNotification({
      subject: `🔄 הפעלה מחדש: ${settings?.businessName || user?.email}`,
      html: `<p><strong>לקוח שביטל הפעיל מחדש:</strong></p>
        <ul>
          <li>שם עסק: ${escapeHtml(settings?.businessName || "—")}</li>
          <li>איש קשר: ${escapeHtml(settings?.contactName || "—")}</li>
          <li>אימייל: ${escapeHtml(user?.email || "—")}</li>
          <li>סטטוס חדש: ${nextStatus}</li>
        </ul>`,
    });
  } catch (err) {
    console.error("[reactivate] admin email failed:", err);
  }

  return NextResponse.json({ ok: true, status: nextStatus });
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );
}
