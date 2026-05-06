import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { parseTranzilaNotify, tranzilaResponseMessage } from "@/lib/tranzila";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// /api/billing/return
// Browser-redirect target from Tranzila after payment. We accept GET and POST
// because Tranzila uses either depending on terminal config.
//
// This endpoint also acts as a fallback finalizer (in case notify_url didn't
// fire), then 302-redirects the browser to /billing-success or /billing-fail.

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

  // ── DEBUG: log full payload to investigate why test-mode iframe isn't
  // returning Response code. Remove after billing pipeline is verified.
  console.log("[billing/return] DEBUG payload:", {
    method: req.method,
    url: req.url,
    contentType: req.headers.get("content-type"),
    Response: payload.Response,
    index: payload.index,
    ConfirmationCode: payload.ConfirmationCode,
    pdesc: payload.pdesc,
    sum: payload.sum,
    rawKeys: Object.keys(payload.raw),
    rawSnippet: JSON.stringify(payload.raw).slice(0, 800),
  });

  const userId = payload.pdesc;
  const isSuccess = payload.Response === "000";
  const baseUrl = new URL(req.url).origin;
  const targetPath = isSuccess ? "/billing-success" : "/billing-fail";

  if (!userId) {
    return Response.redirect(`${baseUrl}/billing-fail`, 302);
  }

  const sub = await db.query.subscriptions.findFirst({
    where: eq(schema.subscriptions.userId, userId),
  });
  if (!sub) {
    return Response.redirect(`${baseUrl}/billing-fail`, 302);
  }

  // Avoid double-recording — check if this Tranzila index already exists
  if (payload.index) {
    const existing = await db.query.invoices.findFirst({
      where: eq(schema.invoices.tranzilaIndex, payload.index),
    });
    if (existing) {
      return Response.redirect(`${baseUrl}${targetPath}`, 302);
    }
  }

  const responseMsg = tranzilaResponseMessage(payload.Response);
  const amountInt = parseInt(payload.sum, 10) || 0;

  // DEBUG: when there's no Response code, capture the raw payload as the
  // message so we can see in the admin panel what Tranzila actually sent.
  const debugMessage = payload.Response
    ? responseMsg
    : `NO_RESPONSE | keys=${Object.keys(payload.raw).join(",")} | raw=${JSON.stringify(payload.raw).slice(0, 500)}`;

  await db.insert(schema.invoices).values({
    userId,
    amount: amountInt,
    currency: "ILS",
    status: isSuccess ? "paid" : "failed",
    paidAt: isSuccess ? new Date() : null,
    tranzilaIndex: payload.index || null,
    tranzilaConfirmationCode: payload.ConfirmationCode || null,
    tranzilaResponseCode: payload.Response || "no_response",
    tranzilaResponseMessage: debugMessage,
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
      body: `הסליקה לא הצליחה (${responseMsg}). ניתן לנסות שוב מהאזור האישי.`,
    });
  }

  return Response.redirect(`${baseUrl}${targetPath}`, 302);
}

function addOneMonth(d: Date): Date {
  const r = new Date(d);
  r.setMonth(r.getMonth() + 1);
  return r;
}
