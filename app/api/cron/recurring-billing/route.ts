import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { and, eq, isNotNull, lte } from "drizzle-orm";
import { chargeWithToken } from "@/lib/tranzila";
import { SITE } from "@/lib/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// /api/cron/recurring-billing
// Runs daily (Vercel cron). For each active subscription whose nextChargeAt
// has passed, charge 299 ₪ via the saved Tranzila token. After 3 consecutive
// failures the subscription is moved to 'expired' and the customer is notified.
//
// Auth: Vercel cron sends `Authorization: Bearer ${CRON_SECRET}`. The same
// header can be used for manual triggering during testing.

const MAX_FAILED_CHARGES = 3;

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function addOneMonth(d: Date): Date {
  const r = new Date(d);
  r.setMonth(r.getMonth() + 1);
  return r;
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

  // Find subscriptions due for recurring charge
  const due = await db
    .select()
    .from(schema.subscriptions)
    .where(
      and(
        eq(schema.subscriptions.status, "active"),
        isNotNull(schema.subscriptions.tranzilaToken),
        isNotNull(schema.subscriptions.tranzilaTokenExpiry),
        isNotNull(schema.subscriptions.nextChargeAt),
        lte(schema.subscriptions.nextChargeAt, now)
      )
    );

  const results: Array<{
    userId: string;
    ok: boolean;
    code: string;
    message?: string;
  }> = [];

  for (const sub of due) {
    if (!sub.tranzilaToken || !sub.tranzilaTokenExpiry) continue;

    const settings = await db.query.businessSettings.findFirst({
      where: eq(schema.businessSettings.userId, sub.userId),
    });

    const result = await chargeWithToken({
      token: sub.tranzilaToken,
      expiry: sub.tranzilaTokenExpiry,
      amount: SITE.pricing.monthlyILS,
      myid: settings?.vatId || undefined,
    });

    // Record invoice (success or failure)
    await db.insert(schema.invoices).values({
      userId: sub.userId,
      amount: SITE.pricing.monthlyILS,
      currency: "ILS",
      status: result.ok ? "paid" : "failed",
      paidAt: result.ok ? new Date() : null,
      tranzilaIndex: result.index ?? null,
      tranzilaConfirmationCode: result.confirmationCode ?? null,
      tranzilaResponseCode: result.responseCode,
      tranzilaResponseMessage: result.responseMessage ?? null,
      paymentMethod: "credit_card",
      isRecurring: true,
    });

    if (result.ok) {
      const next = addOneMonth(now);
      await db
        .update(schema.subscriptions)
        .set({
          lastPaymentAt: now,
          nextChargeAt: next,
          failedChargeCount: 0,
          updatedAt: now,
        })
        .where(eq(schema.subscriptions.userId, sub.userId));

      await db.insert(schema.notifications).values({
        userId: sub.userId,
        type: "billing",
        title: "חיוב חודשי בוצע ✓",
        body: `חויבת ב-${SITE.pricing.monthlyILS} ₪. החיוב הבא: ${next.toLocaleDateString("he-IL")}.`,
      });
    } else {
      const newCount = sub.failedChargeCount + 1;
      const exhausted = newCount >= MAX_FAILED_CHARGES;

      // Retry next day if not exhausted, else suspend
      const nextRetry = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      await db
        .update(schema.subscriptions)
        .set({
          failedChargeCount: newCount,
          nextChargeAt: exhausted ? null : nextRetry,
          status: exhausted ? "expired" : "active",
          suspendedAt: exhausted ? now : sub.suspendedAt,
          suspendedReason: exhausted
            ? `Recurring charge failed ${MAX_FAILED_CHARGES}× — last code: ${result.responseCode}`
            : sub.suspendedReason,
          updatedAt: now,
        })
        .where(eq(schema.subscriptions.userId, sub.userId));

      await db.insert(schema.notifications).values({
        userId: sub.userId,
        type: "warning",
        title: exhausted ? "המנוי הושעה — חיוב נכשל" : "חיוב חוזר נכשל",
        body: exhausted
          ? `חויבנו ${MAX_FAILED_CHARGES} פעמים והעסקה לא עברה (${result.responseMessage || result.responseCode}). המנוי הושעה. עדכן אמצעי תשלום באזור האישי.`
          : `הסליקה החוזרת לא עברה (${result.responseMessage || result.responseCode}). ננסה שוב מחר. אפשר לעדכן אמצעי תשלום באזור האישי.`,
      });
    }

    results.push({
      userId: sub.userId,
      ok: result.ok,
      code: result.responseCode,
      message: result.responseMessage,
    });
  }

  return NextResponse.json({
    ok: true,
    runAt: now.toISOString(),
    processed: results.length,
    succeeded: results.filter((r) => r.ok).length,
    failed: results.filter((r) => !r.ok).length,
    results,
  });
}
