import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { sendAdminNotification } from "@/lib/email";
import { isWithinRefundWindow, refundDaysLeft } from "@/lib/config";

export const runtime = "nodejs";

// /api/account/cancel
// Customer-initiated CANCELLATION REQUEST. We do NOT cancel the subscription
// here — only an admin can do that. We record a pending request, notify the
// admin, and let them either cancel-only or cancel+refund (if within the
// 7-day money-back window) from the admin dashboard.

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

  const [user, settings, sub] = await Promise.all([
    db.query.users.findFirst({ where: eq(schema.users.id, userId) }),
    db.query.businessSettings.findFirst({
      where: eq(schema.businessSettings.userId, userId),
    }),
    db.query.subscriptions.findFirst({
      where: eq(schema.subscriptions.userId, userId),
    }),
  ]);

  if (!sub) {
    return NextResponse.json({ error: "מנוי לא נמצא" }, { status: 404 });
  }

  // Block duplicates — if there's already a pending request, return that
  const existing = await db.query.cancellationRequests.findFirst({
    where: and(
      eq(schema.cancellationRequests.userId, userId),
      eq(schema.cancellationRequests.status, "pending")
    ),
  });
  if (existing) {
    return NextResponse.json({
      ok: true,
      already: true,
      requestedAt: existing.requestedAt.toISOString(),
      message: "הבקשה הועברה למחלקת זיכויים FGMP — היא בטיפול. נחזור אליך בהקדם.",
    });
  }

  const refundEligible = isWithinRefundWindow(sub.firstPaymentAt);
  const daysLeft = refundDaysLeft(sub.firstPaymentAt);

  await db.insert(schema.cancellationRequests).values({
    userId,
    reason: reason || null,
    wasRefundEligible: refundEligible,
  });

  await db.insert(schema.notifications).values({
    userId,
    type: "system",
    title: "הבקשה הועברה למחלקת זיכויים FGMP",
    body: refundEligible
      ? `הבקשה הועברה למחלקת זיכויים FGMP. אתה בתוך חלון ההחזר המלא (${daysLeft} ימים נותרו) — אם הביטול יאושר, יתבצע גם החזר כספי מלא על החיוב הראשון.`
      : "הבקשה הועברה למחלקת זיכויים FGMP. נחזור אליך בהקדם דרך וואטסאפ או באזור האישי.",
  });

  try {
    await sendAdminNotification({
      subject: `📋 בקשת ביטול חדשה: ${settings?.businessName || user?.email}`,
      html: `<p><strong>לקוח ביקש לבטל מנוי:</strong></p>
        <ul>
          <li>שם עסק: ${escapeHtml(settings?.businessName || "—")}</li>
          <li>איש קשר: ${escapeHtml(settings?.contactName || "—")}</li>
          <li>אימייל: ${escapeHtml(user?.email || "—")}</li>
          <li>וואטסאפ: ${escapeHtml(settings?.leadPhone || "—")}</li>
          <li>סיבת ביטול: ${escapeHtml(reason || "לא צוין")}</li>
          <li><strong>זכאי להחזר מלא:</strong> ${refundEligible ? `כן (${daysLeft} ימים נותרו בחלון)` : "לא — מחוץ לחלון 7 הימים"}</li>
        </ul>
        <p>טפל ב-/admin/cancellations</p>`,
    });
  } catch (err) {
    console.error("[cancel-request] admin email failed:", err);
  }

  return NextResponse.json({
    ok: true,
    refundEligible,
    refundDaysLeft: daysLeft,
    message: "הבקשה הועברה למחלקת זיכויים FGMP. נחזור אליך בהקדם.",
  });
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );
}
