import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { createInvoice, isNowPaymentsConfigured } from "@/lib/nowpayments";
import { SITE } from "@/lib/config";

export const runtime = "nodejs";

const Body = z.object({ planId: z.string().uuid() });

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isNowPaymentsConfigured()) {
    return NextResponse.json({ error: "Crypto payments are not configured yet." }, { status: 503 });
  }

  const parsed = Body.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const userId = session.user.id;
  const plan = await db.query.cryptoPlans.findFirst({
    where: and(
      eq(schema.cryptoPlans.id, parsed.data.planId),
      eq(schema.cryptoPlans.active, true)
    ),
  });
  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  // Encode user + months in the order id so the IPN webhook can act without
  // depending on the plan row still existing/unchanged.
  const orderId = `crypto_${userId}_${plan.months}_${Date.now()}`;

  // Pending invoice row (marked paid by the webhook).
  await db.insert(schema.invoices).values({
    userId,
    amount: plan.priceUsd,
    currency: "USD",
    status: "pending",
    paymentMethod: "crypto_usdt",
    providerInvoiceId: orderId,
    isRecurring: false,
  });

  const base = SITE.url;
  const result = await createInvoice({
    priceUsd: plan.priceUsd,
    orderId,
    orderDescription: `FGMP — ${plan.months}-month prepaid`,
    ipnCallbackUrl: `${base}/api/billing/crypto/webhook`,
    successUrl: `${base}/en/billing-success`,
    cancelUrl: `${base}/en/account/billing`,
    // Settle in USDT on TRON (TRC-20) to match the payout wallet — avoids
    // conversion fees. Override via env if you enable other coins/networks.
    payCurrency: process.env.NOWPAYMENTS_PAY_CURRENCY || "usdttrc20",
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }
  return NextResponse.json({ ok: true, invoiceUrl: result.invoiceUrl });
}
