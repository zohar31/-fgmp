import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { sendAdminNotification } from "@/lib/email";

export const runtime = "nodejs";

const Body = z.object({
  reason: z.string().trim().max(400).optional().default(""),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "פרטים לא תקינים" }, { status: 400 });
  }

  const userId = session.user.id;
  const reason = parsed.data.reason;

  const [user, settings] = await Promise.all([
    db.query.users.findFirst({ where: eq(schema.users.id, userId) }),
    db.query.businessSettings.findFirst({
      where: eq(schema.businessSettings.userId, userId),
    }),
  ]);

  await db
    .update(schema.subscriptions)
    .set({
      status: "cancelled",
      cancelledAt: new Date(),
      cancellationReason: reason || null,
      updatedAt: new Date(),
    })
    .where(eq(schema.subscriptions.userId, userId));

  await db.insert(schema.notifications).values({
    userId,
    type: "system",
    title: "המנוי שלך בוטל",
    body: "אם זה היה בטעות — פנה אלינו בוואטסאפ ל-058-5222227 ונחזיר אותך מיידית.",
  });

  try {
    await sendAdminNotification({
      subject: `❌ ביטול מנוי: ${settings?.businessName || user?.email}`,
      html: `<p><strong>משתמש ביטל מנוי:</strong></p>
        <ul>
          <li>שם עסק: ${escapeHtml(settings?.businessName || "—")}</li>
          <li>איש קשר: ${escapeHtml(settings?.contactName || "—")}</li>
          <li>אימייל: ${escapeHtml(user?.email || "—")}</li>
          <li>מספר WhatsApp: ${escapeHtml(settings?.leadPhone || "—")}</li>
          <li>סיבת ביטול: ${escapeHtml(reason || "לא צוין")}</li>
        </ul>`,
    });
  } catch (err) {
    console.error("[cancel] admin email failed:", err);
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );
}
