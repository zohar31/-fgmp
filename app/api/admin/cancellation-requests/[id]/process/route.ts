import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { db, schema } from "@/lib/db";
import { and, desc, eq } from "drizzle-orm";
import { refundOrVoidTranzila } from "@/lib/tranzila";
import { isWithinRefundWindow } from "@/lib/config";

export const runtime = "nodejs";

// /api/admin/cancellation-requests/[id]/process
// Admin processes a customer's cancellation request:
//   - cancel_only          → mark sub cancelled, no refund
//   - cancel_and_refund    → reverse last paid invoice via Tranzila + cancel sub
//                            (only allowed within firstPaymentAt + 7 days)
//   - reject               → mark request rejected, sub stays active

const Body = z.object({
  action: z.enum(["cancel_only", "cancel_and_refund", "reject"]),
  notes: z.string().trim().max(1000).optional().default(""),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "פרטים לא תקינים" }, { status: 400 });
  }

  const request = await db.query.cancellationRequests.findFirst({
    where: eq(schema.cancellationRequests.id, id),
  });
  if (!request) {
    return NextResponse.json({ error: "בקשה לא נמצאה" }, { status: 404 });
  }
  if (request.status !== "pending") {
    return NextResponse.json(
      { error: "הבקשה כבר טופלה" },
      { status: 400 }
    );
  }

  const sub = await db.query.subscriptions.findFirst({
    where: eq(schema.subscriptions.userId, request.userId),
  });
  if (!sub) {
    return NextResponse.json({ error: "מנוי לא נמצא" }, { status: 404 });
  }

  const adminId = session!.user!.id;
  const now = new Date();

  if (parsed.data.action === "reject") {
    await db
      .update(schema.cancellationRequests)
      .set({
        status: "rejected",
        processedAt: now,
        processedByAdminId: adminId,
        adminNotes: parsed.data.notes || null,
      })
      .where(eq(schema.cancellationRequests.id, id));

    await db.insert(schema.notifications).values({
      userId: request.userId,
      type: "info",
      title: "בקשת הביטול שלך לא אושרה",
      body: parsed.data.notes
        ? `הבקשה לא אושרה. הערה: ${parsed.data.notes}. ניתן לפנות בוואטסאפ ל-058-5222227.`
        : "הבקשה לא אושרה. ניתן לפנות בוואטסאפ ל-058-5222227 לשיחה.",
    });

    return NextResponse.json({ ok: true, action: "rejected" });
  }

  let refundedInvoiceId: string | null = null;
  let refundResultText: string | null = null;

  if (parsed.data.action === "cancel_and_refund") {
    // Validate refund eligibility (admin override is technically possible,
    // but we hard-enforce the 7-day window — admin must use cancel_only after).
    if (!isWithinRefundWindow(sub.firstPaymentAt)) {
      return NextResponse.json(
        {
          error:
            "מחוץ לחלון 7 הימים. ניתן לבצע cancel_only ולבצע החזר ידני בפאנל Tranzila.",
        },
        { status: 400 }
      );
    }

    // Find the most recent paid first-payment invoice (the one to refund)
    const paidInvoice = await db
      .select()
      .from(schema.invoices)
      .where(
        and(
          eq(schema.invoices.userId, request.userId),
          eq(schema.invoices.status, "paid"),
          eq(schema.invoices.isRecurring, false)
        )
      )
      .orderBy(desc(schema.invoices.paidAt))
      .limit(1);

    if (!paidInvoice.length || !paidInvoice[0].tranzilaIndex) {
      return NextResponse.json(
        { error: "לא נמצאה חשבונית עם index של Tranzila להחזר." },
        { status: 400 }
      );
    }

    const inv = paidInvoice[0];
    const refund = await refundOrVoidTranzila({
      originalIndex: inv.tranzilaIndex!,
      amount: inv.amount,
    });

    if (!refund.ok) {
      return NextResponse.json(
        {
          error: `Tranzila דחתה את ההחזר: ${refund.responseMessage || refund.responseCode}`,
          tranzilaCode: refund.responseCode,
        },
        { status: 502 }
      );
    }

    refundResultText = `${refund.mode} ✓ (Tranzila ${refund.responseCode})`;

    // Mark the original invoice as refunded
    await db
      .update(schema.invoices)
      .set({
        status: "refunded",
        tranzilaResponseMessage: `Reversed by admin: ${refund.mode}`,
      })
      .where(eq(schema.invoices.id, inv.id));

    refundedInvoiceId = inv.id;
  }

  // Two flavors of "cancel":
  //   - cancel_and_refund (within 7-day window): immediate cancel + refund.
  //   - cancel_only (outside window): cancel-at-period-end. Service stays
  //     active until nextChargeAt (the end of the month they paid for),
  //     and the recurring cron will not renew them — it'll expire instead.
  const cancelImmediate = parsed.data.action === "cancel_and_refund";
  await db
    .update(schema.subscriptions)
    .set({
      status: cancelImmediate ? "cancelled" : "active",
      cancelledAt: now,
      cancellationReason: request.reason || null,
      cancelAtPeriodEnd: !cancelImmediate,
      nextChargeAt: cancelImmediate ? null : sub.nextChargeAt,
      updatedAt: now,
    })
    .where(eq(schema.subscriptions.userId, request.userId));

  await db
    .update(schema.cancellationRequests)
    .set({
      status:
        parsed.data.action === "cancel_and_refund"
          ? "cancelled_and_refunded"
          : "cancelled_only",
      processedAt: now,
      processedByAdminId: adminId,
      adminNotes: parsed.data.notes || refundResultText || null,
      refundedInvoiceId,
    })
    .where(eq(schema.cancellationRequests.id, id));

  await db.insert(schema.notifications).values({
    userId: request.userId,
    type: "system",
    title:
      parsed.data.action === "cancel_and_refund"
        ? "המנוי בוטל והוחזר הכסף ✓"
        : "המנוי בוטל",
    body:
      parsed.data.action === "cancel_and_refund"
        ? "המנוי בוטל לבקשתך וההחזר המלא נשלח לכרטיס. החיוב יבוטל תוך מספר ימי עסקים."
        : "המנוי בוטל לבקשתך. הנתונים שלך נשמרו — אפשר להפעיל מחדש בכל עת.",
  });

  return NextResponse.json({
    ok: true,
    action: parsed.data.action,
    refundedInvoiceId,
  });
}
