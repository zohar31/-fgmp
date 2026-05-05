import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { parseTranzilaNotify, tranzilaResponseMessage } from "@/lib/tranzila";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// /api/billing/notify
// Server-to-server webhook from Tranzila after a hosted-page payment.
// Authoritative source of payment status — never trust the browser-side
// success_url alone, since the customer may navigate away or block redirects.
//
// Tranzila POSTs (or GETs) a urlencoded form with: Response, index,
// ConfirmationCode, TranzilaTK, expdate, ccno (last 4), cardtype, sum, pdesc.

export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}

async function handle(req: Request) {
  let formData: FormData | URLSearchParams;
  if (req.method === "GET") {
    formData = new URL(req.url).searchParams;
  } else {
    formData = await req.formData().catch(async () => {
      const text = await req.text().catch(() => "");
      return new URLSearchParams(text) as unknown as FormData;
    });
  }

  const payload = parseTranzilaNotify(formData);
  const userId = payload.pdesc;
  if (!userId) {
    return new NextResponse("missing pdesc", { status: 400 });
  }

  const sub = await db.query.subscriptions.findFirst({
    where: eq(schema.subscriptions.userId, userId),
  });
  if (!sub) {
    return new NextResponse("subscription not found", { status: 404 });
  }

  // Avoid double-recording — same Tranzila index may arrive via both notify and return
  if (payload.index) {
    const existing = await db.query.invoices.findFirst({
      where: eq(schema.invoices.tranzilaIndex, payload.index),
    });
    if (existing) {
      return new NextResponse("OK", { status: 200 });
    }
  }

  const isSuccess = payload.Response === "000";
  const responseMsg = tranzilaResponseMessage(payload.Response);
  const amountInt = parseInt(payload.sum, 10) || 0;

  await db.insert(schema.invoices).values({
    userId,
    amount: amountInt,
    currency: "ILS",
    status: isSuccess ? "paid" : "failed",
    paidAt: isSuccess ? new Date() : null,
    tranzilaIndex: payload.index || null,
    tranzilaConfirmationCode: payload.ConfirmationCode || null,
    tranzilaResponseCode: payload.Response,
    tranzilaResponseMessage: responseMsg,
    paymentMethod: payload.paymentMethod || "credit_card",
    isRecurring: false,
  });

  if (isSuccess) {
    const now = new Date();
    const nextCharge = addOneMonth(now);
    const isFirstPayment = !sub.firstPaymentAt;

    const updates: Partial<typeof schema.subscriptions.$inferInsert> = {
      status: "active",
      lastPaymentAt: now,
      nextChargeAt: nextCharge,
      failedChargeCount: 0,
      updatedAt: now,
    };

    // Anchor the 7-day refund window on the very first paid charge
    if (isFirstPayment) updates.firstPaymentAt = now;

    if (payload.TranzilaTK) updates.tranzilaToken = payload.TranzilaTK;
    if (payload.expdate) updates.tranzilaTokenExpiry = payload.expdate;
    if (payload.ccno) updates.tranzilaCardLast4 = payload.ccno.slice(-4);
    if (payload.cardtype) updates.tranzilaCardBrand = payload.cardtype;

    await db
      .update(schema.subscriptions)
      .set(updates)
      .where(eq(schema.subscriptions.userId, userId));

    await db.insert(schema.notifications).values({
      userId,
      type: "billing",
      title: "תשלום התקבל ✓",
      body: `תודה! חויבת ב-${amountInt} ₪. החיוב הבא: ${nextCharge.toLocaleDateString("he-IL")}.`,
    });
  } else {
    await db.insert(schema.notifications).values({
      userId,
      type: "warning",
      title: "תשלום נכשל",
      body: `הסליקה לא הצליחה (${responseMsg}). ניתן לנסות שוב באזור האישי.`,
    });
  }

  return new NextResponse("OK", { status: 200 });
}

function addOneMonth(d: Date): Date {
  const r = new Date(d);
  r.setMonth(r.getMonth() + 1);
  return r;
}
