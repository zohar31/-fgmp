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
//   - cancel_only           → mark sub cancelled at period end, no refund
//   - cancel_and_refund     → reverse last paid invoice via Tranzila + cancel sub
//                             (only allowed within firstPaymentAt + 7 days,
//                             and requires Vercel IP to be on Tranzila whitelist)
//   - cancel_refund_manual  → admin will refund manually in Tranzila panel.
//                             Marks invoice as refunded, sub as cancelled,
//                             no Tranzila API call. Used while IP whitelist
//                             is being sorted out, or for after-hours refunds.
//   - reject                → mark request rejected, sub stays active

const Body = z.object({
  action: z.enum([
    "cancel_only",
    "cancel_and_refund",
    "cancel_refund_manual",
    "reject",
  ]),
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

  // Both auto-refund and manual-refund need to find the invoice and (in manual
  // mode) just mark it. Auto also calls Tranzila. Validate refund window for
  // both.
  const isRefundAction =
    parsed.data.action === "cancel_and_refund" ||
    parsed.data.action === "cancel_refund_manual";

  if (isRefundAction) {
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

    if (
      !paidInvoice.length ||
      !paidInvoice[0].tranzilaIndex ||
      !paidInvoice[0].tranzilaConfirmationCode
    ) {
      return NextResponse.json(
        { error: "לא נמצאה חשבונית עם index ו-ConfirmationCode להחזר." },
        { status: 400 }
      );
    }

    const inv = paidInvoice[0];

    if (parsed.data.action === "cancel_and_refund") {
      // Auto-refund via Tranzila API. Requires Vercel IP on Tranzila whitelist.
      const refund = await refundOrVoidTranzila({
        originalIndex: inv.tranzilaIndex!,
        authNr: inv.tranzilaConfirmationCode!,
        amount: inv.amount,
      });

      if (!refund.ok) {
        return NextResponse.json(
          {
            error: `Tranzila דחתה את ההחזר: ${refund.responseMessage || refund.responseCode}. ניתן לנסות "ביטול + סימון החזר ידני" ולבצע את הזיכוי בפאנל Tranzila.`,
            tranzilaCode: refund.responseCode,
          },
          { status: 502 }
        );
      }

      refundResultText = `auto: ${refund.mode} ✓ (Tranzila ${refund.responseCode})`;

      await db
        .update(schema.invoices)
        .set({
          status: "refunded",
          tranzilaResponseMessage: `Reversed by admin via API: ${refund.mode}`,
        })
        .where(eq(schema.invoices.id, inv.id));
    } else {
      // Manual refund — admin will void/refund in Tranzila panel themselves.
      // We just record the intent in DB.
      refundResultText = `manual: admin will refund in Tranzila panel (idx=${inv.tranzilaIndex}, conf=${inv.tranzilaConfirmationCode})`;

      await db
        .update(schema.invoices)
        .set({
          status: "refunded",
          tranzilaResponseMessage: `Manual refund: admin marks as refunded; actual reversal done in Tranzila panel`,
        })
        .where(eq(schema.invoices.id, inv.id));
    }

    refundedInvoiceId = inv.id;
  }

  // Two flavors of "cancel":
  //   - cancel_and_refund / cancel_refund_manual (within 7-day window):
  //     immediate cancel + refund (auto via API or manual in Tranzila panel).
  //   - cancel_only (outside window): cancel-at-period-end. Service stays
  //     active until nextChargeAt (the end of the month they paid for),
  //     and the recurring cron will not renew them — it'll expire instead.
  const cancelImmediate = isRefundAction;
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

  // For immediate cancellation (cancel_and_refund), suspend in the extension
  // right away so leads stop. For cancel_only (period-end), the cron will
  // create the suspend push when the period ends — no push needed yet.
  if (cancelImmediate) {
    await db.insert(schema.extensionPushes).values({
      userId: request.userId,
      pushedByAdminId: adminId,
      actionType: "suspend",
    });
  }

  await db
    .update(schema.cancellationRequests)
    .set({
      status: isRefundAction ? "cancelled_and_refunded" : "cancelled_only",
      processedAt: now,
      processedByAdminId: adminId,
      adminNotes: parsed.data.notes || refundResultText || null,
      refundedInvoiceId,
    })
    .where(eq(schema.cancellationRequests.id, id));

  await db.insert(schema.notifications).values({
    userId: request.userId,
    type: "system",
    title: isRefundAction ? "המנוי בוטל והוחזר הכסף ✓" : "המנוי בוטל",
    body: isRefundAction
      ? "המנוי בוטל לבקשתך וההחזר המלא נשלח לכרטיס. החיוב יבוטל תוך מספר ימי עסקים."
      : "המנוי בוטל לבקשתך. הנתונים שלך נשמרו — אפשר להפעיל מחדש בכל עת.",
  });

  return NextResponse.json({
    ok: true,
    action: parsed.data.action,
    refundedInvoiceId,
  });
}
