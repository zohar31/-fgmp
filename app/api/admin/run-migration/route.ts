import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ⚠️ TEMPORARY ENDPOINT — apply the tranzila_billing migration once.
// Delete after running successfully.

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function POST(req: Request) {
  const expected = process.env.EXTENSION_API_TOKEN;
  if (!expected) {
    return NextResponse.json({ ok: false, error: "Token not configured" }, { status: 503 });
  }
  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/);
  if (!m || !constantTimeEqual(m[1], expected)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const statements = [
    `ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "tranzilaToken" text`,
    `ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "tranzilaTokenExpiry" text`,
    `ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "tranzilaCardLast4" text`,
    `ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "tranzilaCardBrand" text`,
    `ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "lastPaymentAt" timestamp`,
    `ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "nextChargeAt" timestamp`,
    `ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "failedChargeCount" integer NOT NULL DEFAULT 0`,
    `ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "tranzilaIndex" text`,
    `ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "tranzilaConfirmationCode" text`,
    `ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "tranzilaResponseCode" text`,
    `ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "tranzilaResponseMessage" text`,
    `ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "paymentMethod" text`,
    `ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "isRecurring" boolean NOT NULL DEFAULT false`,
  ];

  const results: Array<{ statement: string; ok: boolean; error?: string }> = [];
  for (const stmt of statements) {
    try {
      await db.execute(sql.raw(stmt));
      results.push({ statement: stmt.slice(0, 90), ok: true });
    } catch (err) {
      results.push({
        statement: stmt.slice(0, 90),
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return NextResponse.json({ ok: results.every((r) => r.ok), results });
}
