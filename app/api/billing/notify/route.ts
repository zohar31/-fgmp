import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { parseTranzilaNotify, tranzilaResponseMessage } from "@/lib/tranzila";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// /api/billing/notify
// Server-to-server webhook from Tranzila after a hosted-page payment.
// This is the AUTHORITATIVE source of payment status — never trust the
// browser-side success_url_address alone, since the customer can navigate
// away or block redirects.
//
// Tranzila POSTs a urlencoded form with: Response, index, ConfirmationCode,
// TranzilaTK (token if requested), expdate, ccno (last 4), cardtype, sum,
// pdesc (our externalRef = userId), and customer info echoed back.
//
// Some setups call this via GET with query params instead of POST — we
// accept both.

export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}

async function handle(req: Request) {
  console.log("[billing/notify] hit", {
    method: req.method,
    url: req.url,
    contentType: req.headers.get("content-type"),
    userAgent: req.headers.get("user-agent")?.slice(0, 60),
  });

  let formData: FormData | URLSearchParams;
  if (req.method === "GET") {
    const url = new URL(req.url);
    formData = url.searchParams;
  } else {
    formData = await req.formData().catch(async () => {
      const text = await req.text().catch(() => "");
      return new URLSearchParams(text) as unknown as FormData;
    });
  }

  const payload = parseTranzilaNotify(formData);
  console.log("[billing/notify] payload", {
    Response: payload.Response,
    index: payload.index,
    pdesc: payload.pdesc,
    sum: payload.sum,
    paymentMethod: payload.paymentMethod,
    rawKeys: Object.keys(payload.raw),
  });

  const userId = payload.pdesc;
  if (!userId) {
    console.error("[billing/notify] no userId in pdesc");
    return new NextResponse("missing pdesc", { status: 400 });
  }

  const sub = await db.query.subscriptions.findFirst({
    where: eq(schema.subscriptions.userId, userId),
  });
  if (!sub) {
    console.error("[billing/notify] subscription not found for", userId);
    return new NextResponse("subscription not found", { status: 404 });
  }

  // Always record the payment attempt
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
    isRecurring: false, // first payment is not recurring
  });

  if (isSuccess) {
    const now = new Date();
    const nextCharge = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const updates: Partial<typeof schema.subscriptions.$inferInsert> = {
      status: "active",
      lastPaymentAt: now,
      nextChargeAt: nextCharge,
      failedChargeCount: 0,
      updatedAt: now,
    };

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

    console.log("[billing/notify] payment confirmed for user", userId);
  } else {
    // Don't change subscription status on first-payment failure (user just tried)
    await db.insert(schema.notifications).values({
      userId,
      type: "warning",
      title: "תשלום נכשל",
      body: `הסליקה לא הצליחה (${responseMsg}). ניתן לנסות שוב באזור האישי.`,
    });
    console.warn("[billing/notify] payment failed:", payload.Response, responseMsg);
  }

  // Tranzila expects 200 OK
  return new NextResponse("OK", { status: 200 });
}
