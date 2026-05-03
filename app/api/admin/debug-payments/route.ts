import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { desc } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ⚠️ TEMPORARY DEBUG ENDPOINT — view recent payment attempts. Delete after debugging.

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function GET(req: Request) {
  const expected = process.env.EXTENSION_API_TOKEN;
  if (!expected) {
    return NextResponse.json({ ok: false, error: "Token not configured" }, { status: 503 });
  }
  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/);
  if (!m || !constantTimeEqual(m[1], expected)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const recentInvoices = await db
    .select()
    .from(schema.invoices)
    .orderBy(desc(schema.invoices.issuedAt))
    .limit(20);

  const recentSubs = await db
    .select({
      userId: schema.subscriptions.userId,
      status: schema.subscriptions.status,
      tranzilaToken: schema.subscriptions.tranzilaToken,
      tranzilaCardLast4: schema.subscriptions.tranzilaCardLast4,
      lastPaymentAt: schema.subscriptions.lastPaymentAt,
      nextChargeAt: schema.subscriptions.nextChargeAt,
      failedChargeCount: schema.subscriptions.failedChargeCount,
    })
    .from(schema.subscriptions)
    .orderBy(desc(schema.subscriptions.updatedAt))
    .limit(10);

  return NextResponse.json({
    ok: true,
    invoiceCount: recentInvoices.length,
    invoices: recentInvoices.map((i) => ({
      id: i.id,
      userId: i.userId,
      amount: i.amount,
      status: i.status,
      paidAt: i.paidAt?.toISOString() ?? null,
      tranzilaIndex: i.tranzilaIndex,
      tranzilaConfirmationCode: i.tranzilaConfirmationCode,
      tranzilaResponseCode: i.tranzilaResponseCode,
      tranzilaResponseMessage: i.tranzilaResponseMessage,
      paymentMethod: i.paymentMethod,
      isRecurring: i.isRecurring,
      issuedAt: i.issuedAt.toISOString(),
    })),
    subs: recentSubs.map((s) => ({
      ...s,
      lastPaymentAt: s.lastPaymentAt?.toISOString() ?? null,
      nextChargeAt: s.nextChargeAt?.toISOString() ?? null,
      tranzilaToken: s.tranzilaToken ? "***" + s.tranzilaToken.slice(-4) : null,
    })),
  });
}
