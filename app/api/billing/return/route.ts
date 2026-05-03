import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { parseTranzilaNotify, tranzilaResponseMessage } from "@/lib/tranzila";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// /api/billing/return
// Browser-redirect target from Tranzila after payment. Tranzila uses
// either GET (with query params) or POST (with form body) depending on
// the terminal config — we accept both.
//
// This is also our payment finalization endpoint (the formal notify_url
// is unreliable across Tranzila configurations). On any successful
// response we update DB; on failure we just record the attempt.
//
// After processing → 302 redirect to /billing-success or /billing-fail.

export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}

async function handle(req: Request) {
  console.log("[billing/return] hit", {
    method: req.method,
    url: req.url,
    contentType: req.headers.get("content-type"),
  });

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
  console.log("[billing/return] payload", {
    Response: payload.Response,
    index: payload.index,
    pdesc: payload.pdesc,
    sum: payload.sum,
    rawKeys: Object.keys(payload.raw),
  });

  const userId = payload.pdesc;
  const isSuccess = payload.Response === "000";
  const baseUrl = `${new URL(req.url).origin}`;
  const targetPath = isSuccess ? "/billing-success" : "/billing-fail";

  if (!userId) {
    console.error("[billing/return] no userId in pdesc — redirecting to fail");
    return Response.redirect(`${baseUrl}/billing-fail`, 302);
  }

  const sub = await db.query.subscriptions.findFirst({
    where: eq(schema.subscriptions.userId, userId),
  });
  if (!sub) {
    console.error("[billing/return] subscription not found for", userId);
    return Response.redirect(`${baseUrl}/billing-fail`, 302);
  }

  // Avoid double-recording — check if this Tranzila index already exists
  if (payload.index) {
    const existing = await db.query.invoices.findFirst({
      where: eq(schema.invoices.tranzilaIndex, payload.index),
    });
    if (existing) {
      console.log("[billing/return] duplicate notify, skipping insert");
      return Response.redirect(`${baseUrl}${targetPath}`, 302);
    }
  }

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
