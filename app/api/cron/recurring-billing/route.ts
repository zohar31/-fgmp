import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { and, eq, isNotNull, isNull } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// /api/cron/recurring-billing
// Runs daily (Vercel cron) — DOES NOT CHARGE. Tranzila's My-Billing module
// charges customers monthly on its own from the Standing Orders we create
// after each first payment (see /api/billing/return).
//
// This endpoint is now a verifier: it lists active subscriptions that don't
// have an STO id (potential drift — Tranzila isn't billing them) for admin
// review. No API charges from Vercel — Tranzila is the source of truth.
//
// Auth: Vercel cron sends `Authorization: Bearer ${CRON_SECRET}`. Same header
// works for manual triggering during testing.

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function authorize(req: Request): Promise<boolean> {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/);
  return !!m && constantTimeEqual(m[1], expected);
}

export async function GET(req: Request) {
  if (!(await authorize(req))) return unauthorized();
  return run();
}

export async function POST(req: Request) {
  if (!(await authorize(req))) return unauthorized();
  return run();
}

async function run() {
  const now = new Date();

  // Verifier: active subs that paid first payment but have no STO id —
  // Tranzila isn't billing them automatically. Admin should investigate.
  const orphans = await db
    .select({
      userId: schema.subscriptions.userId,
      firstPaymentAt: schema.subscriptions.firstPaymentAt,
      tranzilaCardLast4: schema.subscriptions.tranzilaCardLast4,
    })
    .from(schema.subscriptions)
    .where(
      and(
        eq(schema.subscriptions.status, "active"),
        isNotNull(schema.subscriptions.tranzilaToken),
        isNotNull(schema.subscriptions.firstPaymentAt),
        isNull(schema.subscriptions.tranzilaStoId)
      )
    );

  return NextResponse.json({
    ok: true,
    runAt: now.toISOString(),
    mode: "verifier",
    note: "Tranzila My-Billing handles all monthly charges. This cron is a no-op verifier.",
    orphanSubs: orphans.length,
    orphans,
  });
}
