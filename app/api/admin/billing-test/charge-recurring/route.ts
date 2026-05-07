import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { chargeWithToken } from "@/lib/tranzila";

export const runtime = "nodejs";

// Admin-only: trigger a single 5₪ charge via the saved Tranzila token.
// Used to verify the recurring-billing API path works from Vercel BEFORE the
// real monthly cron tries to charge 299₪. If this returns ok:true the
// monthly recurring charge will succeed.

export async function POST() {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const userId = session!.user!.id;

  const sub = await db.query.subscriptions.findFirst({
    where: eq(schema.subscriptions.userId, userId),
  });
  if (!sub) {
    return NextResponse.json({ error: "אין מנוי למשתמש הזה" }, { status: 404 });
  }
  if (!sub.tranzilaToken || !sub.tranzilaTokenExpiry) {
    return NextResponse.json(
      { error: "אין טוקן או תוקף שמורים — צריך לעבור קודם דרך iframe" },
      { status: 400 }
    );
  }

  const settings = await db.query.businessSettings.findFirst({
    where: eq(schema.businessSettings.userId, userId),
  });

  const result = await chargeWithToken({
    token: sub.tranzilaToken,
    expiry: sub.tranzilaTokenExpiry,
    amount: 5,
    myid: settings?.vatId || undefined,
  });

  // Record the test charge in invoices so we can refund it later
  if (result.ok) {
    await db.insert(schema.invoices).values({
      userId,
      amount: 5,
      currency: "ILS",
      status: "paid",
      paidAt: new Date(),
      tranzilaIndex: result.index ?? null,
      tranzilaConfirmationCode: result.confirmationCode ?? null,
      tranzilaResponseCode: result.responseCode,
      tranzilaResponseMessage: `TEST recurring charge — ${result.responseMessage ?? ""}`,
      paymentMethod: "credit_card",
      isRecurring: true,
    });
  }

  return NextResponse.json({
    ok: result.ok,
    code: result.responseCode,
    message: result.responseMessage,
    index: result.index,
    confirmationCode: result.confirmationCode,
    rawSnippet: result.raw.slice(0, 400),
  });
}
