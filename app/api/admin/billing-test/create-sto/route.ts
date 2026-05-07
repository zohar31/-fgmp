import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { createStandingOrderV2 } from "@/lib/tranzila";

export const runtime = "nodejs";

// Admin-only: create a 5₪ Standing Order for the admin user, using the saved
// Tranzila token. Tests the /v2/sto/create flow before we wire it into the
// real billing-success path. The 5₪ STO is for testing — disable it in the
// Tranzila panel after verifying it appears.

export async function POST() {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const userId = session!.user!.id;
  const sub = await db.query.subscriptions.findFirst({
    where: eq(schema.subscriptions.userId, userId),
  });
  if (!sub?.tranzilaToken || !sub.tranzilaTokenExpiry) {
    return NextResponse.json(
      { error: "אין טוקן/תוקף שמורים — צריך iframe קודם" },
      { status: 400 }
    );
  }

  const settings = await db.query.businessSettings.findFirst({
    where: eq(schema.businessSettings.userId, userId),
  });

  const sto = await createStandingOrderV2({
    token: sub.tranzilaToken,
    expiry: sub.tranzilaTokenExpiry,
    amount: 5,
    description: "TEST FGMP STO — 5₪",
    client: {
      name: settings?.contactName || session!.user!.name || "",
      id: settings?.vatId || "",
      email: settings?.contactEmail || session!.user!.email || "",
      phone: settings?.leadPhone || "",
    },
  });

  return NextResponse.json({
    ok: sto.ok,
    stoId: sto.stoId,
    errorCode: sto.errorCode,
    message: sto.message,
    rawLength: sto.raw.length,
    rawSnippet: sto.raw.slice(0, 800),
  });
}
