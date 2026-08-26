import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { verifyIpnSignature } from "@/lib/nowpayments";
import { isEnglishCustomer } from "@/lib/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// NOWPayments IPN callback. Fires on every status change; we act only on the
// terminal "finished" status (fully paid + settled to the merchant wallet).
export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get("x-nowpayments-sig");
  const { valid, body } = verifyIpnSignature(raw, sig);
  if (!valid || !body) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const status = String(body.payment_status || "").toLowerCase();
  const orderId = String(body.order_id || "");

  // order_id shape: crypto_<userId>_<months>_<timestamp>
  const m = /^crypto_(.+)_(\d+)_(\d+)$/.exec(orderId);
  if (!m) {
    // Not one of our orders — acknowledge so NOWPayments stops retrying.
    return NextResponse.json({ ok: true, ignored: true });
  }
  const userId = m[1];
  const months = parseInt(m[2], 10);

  if (status !== "finished") {
    // waiting / confirming / confirmed / sending — nothing to do yet.
    return NextResponse.json({ ok: true, status });
  }

  // Find the pending invoice for this order (idempotent — skip if already paid).
  const inv = await db.query.invoices.findFirst({
    where: eq(schema.invoices.providerInvoiceId, orderId),
  });
  if (inv && inv.status === "paid") {
    return NextResponse.json({ ok: true, alreadyProcessed: true });
  }

  const now = new Date();

  if (inv) {
    await db
      .update(schema.invoices)
      .set({
        status: "paid",
        paidAt: now,
        tranzilaResponseMessage: `NOWPayments crypto: ${body.pay_currency ?? ""} paid ${body.actually_paid ?? ""}`,
      })
      .where(eq(schema.invoices.id, inv.id));
  }

  const sub = await db.query.subscriptions.findFirst({
    where: eq(schema.subscriptions.userId, userId),
  });
  if (sub) {
    const currentPaidUntil = sub.paidUntil && sub.paidUntil > now ? sub.paidUntil : now;
    const paidUntil = addMonths(currentPaidUntil, months);
    await db
      .update(schema.subscriptions)
      .set({
        firstPaymentAt: sub.firstPaymentAt ?? now,
        lastPaymentAt: now,
        paidUntil,
        // Prepaid periods don't auto-renew; there's no next auto-charge.
        nextChargeAt: null,
        cancelAtPeriodEnd: false,
        updatedAt: now,
      })
      .where(eq(schema.subscriptions.userId, userId));

    const settings = await db.query.businessSettings.findFirst({
      where: eq(schema.businessSettings.userId, userId),
    });
    const en = isEnglishCustomer({ leadPhone: settings?.leadPhone, serviceAreas: settings?.serviceAreas });
    await db.insert(schema.notifications).values({
      userId,
      type: "billing",
      title: en ? "Crypto payment received ✓" : "תשלום קריפטו התקבל ✓",
      body: en
        ? `Thank you! Your ${months}-month prepaid plan is active through ${paidUntil.toLocaleDateString("en-US")}.`
        : `תודה! חבילת ה-prepaid ל-${months} חודשים פעילה עד ${paidUntil.toLocaleDateString("he-IL")}.`,
    });
  }

  return NextResponse.json({ ok: true });
}

function addMonths(d: Date, months: number): Date {
  const r = new Date(d);
  r.setMonth(r.getMonth() + months);
  return r;
}

// NOWPayments also sends GET pings to verify the endpoint is reachable.
export async function GET() {
  return NextResponse.json({ ok: true });
}
