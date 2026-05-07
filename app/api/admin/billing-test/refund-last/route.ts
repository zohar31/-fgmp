import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { db, schema } from "@/lib/db";
import { and, desc, eq } from "drizzle-orm";
import { refundV2, voidV2 } from "@/lib/tranzila";

export const runtime = "nodejs";

// Admin-only: refund the admin's own most-recent paid 5₪ test invoice via
// Tranzila API v2 (api.tranzila.com). Tries void first (same-day, no fee),
// then refund if void is rejected. Verifies the refund path works from
// Vercel.

export async function POST() {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const userId = session!.user!.id;

  // Get the most recent paid invoice for this admin, where amount==5 (test)
  const candidates = await db
    .select()
    .from(schema.invoices)
    .where(
      and(
        eq(schema.invoices.userId, userId),
        eq(schema.invoices.status, "paid")
      )
    )
    .orderBy(desc(schema.invoices.paidAt))
    .limit(5);

  const inv = candidates.find(
    (c) => c.amount === 5 && c.tranzilaIndex && c.tranzilaConfirmationCode
  );
  if (!inv) {
    return NextResponse.json(
      { error: "לא נמצאה חשבונית בדיקה (5₪) פתוחה להחזר עם index+ConfirmationCode" },
      { status: 404 }
    );
  }

  const txnId = parseInt(inv.tranzilaIndex!, 10);
  if (isNaN(txnId)) {
    return NextResponse.json(
      { error: `transaction id לא מספרי: ${inv.tranzilaIndex}` },
      { status: 400 }
    );
  }

  // Try void first (same-day, no fee). If void is rejected, fall back to refund.
  let result = await voidV2({
    referenceTxnId: txnId,
    authorizationNumber: inv.tranzilaConfirmationCode!,
  });
  let mode: "void" | "refund" = "void";
  if (!result.ok) {
    result = await refundV2({
      referenceTxnId: txnId,
      authorizationNumber: inv.tranzilaConfirmationCode!,
      amount: inv.amount,
    });
    mode = "refund";
  }

  if (result.ok) {
    await db
      .update(schema.invoices)
      .set({
        status: "refunded",
        tranzilaResponseMessage: `TEST v2 ${mode}: ✓ (${result.responseCode})`,
      })
      .where(eq(schema.invoices.id, inv.id));
  }

  return NextResponse.json({
    ok: result.ok,
    mode,
    code: result.responseCode,
    message: result.responseMessage,
    invoiceId: inv.id,
    invoiceIndex: inv.tranzilaIndex,
    invoiceConf: inv.tranzilaConfirmationCode,
    rawLength: result.raw.length,
    rawSnippet: result.raw.slice(0, 800),
  });
}
