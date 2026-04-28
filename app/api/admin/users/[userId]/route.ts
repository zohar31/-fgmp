import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId } = await params;

  if (userId === session!.user.id) {
    return NextResponse.json(
      { error: "אי אפשר למחוק את עצמך" },
      { status: 400 }
    );
  }

  const user = await db.query.users.findFirst({
    where: eq(schema.users.id, userId),
  });
  if (!user) {
    return NextResponse.json({ error: "משתמש לא נמצא" }, { status: 404 });
  }

  // Cascade deletes (configured in schema) handle:
  // accounts, sessions, subscriptions, business_settings, notifications, invoices
  await db.delete(schema.users).where(eq(schema.users.id, userId));

  return NextResponse.json({ ok: true });
}
