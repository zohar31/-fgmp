import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

// /api/admin/invoices/[id]/delete
// Hard-delete an invoice row from the admin payments table.
// Used to clean up failed/test attempts. Refunds happen elsewhere
// (cancellation flow) and are NOT triggered by this endpoint.

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const inv = await db.query.invoices.findFirst({
    where: eq(schema.invoices.id, id),
  });
  if (!inv) {
    return NextResponse.json({ error: "חשבונית לא נמצאה" }, { status: 404 });
  }

  await db.delete(schema.invoices).where(eq(schema.invoices.id, id));

  return NextResponse.json({ ok: true });
}
