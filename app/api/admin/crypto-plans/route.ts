import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

// Admin CRUD for crypto prepaid plans (managed entirely from the admin UI).
const PlanFields = z.object({
  months: z.coerce.number().int().min(1).max(60),
  priceUsd: z.coerce.number().int().min(1).max(100000),
  label: z.string().trim().max(60).optional().or(z.literal("")),
  badge: z.string().trim().max(40).optional().or(z.literal("")),
  active: z.boolean().optional().default(true),
  sortOrder: z.coerce.number().int().min(0).max(999).optional().default(0),
});

const Body = z.discriminatedUnion("action", [
  z.object({ action: z.literal("create"), plan: PlanFields }),
  z.object({ action: z.literal("update"), id: z.string().uuid(), plan: PlanFields }),
  z.object({ action: z.literal("delete"), id: z.string().uuid() }),
]);

export async function POST(req: Request) {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = Body.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "פרטים לא תקינים" }, { status: 400 });
  }
  const data = parsed.data;

  if (data.action === "delete") {
    await db.delete(schema.cryptoPlans).where(eq(schema.cryptoPlans.id, data.id));
    return NextResponse.json({ ok: true });
  }

  const values = {
    months: data.plan.months,
    priceUsd: data.plan.priceUsd,
    label: data.plan.label || null,
    badge: data.plan.badge || null,
    active: data.plan.active ?? true,
    sortOrder: data.plan.sortOrder ?? 0,
    updatedAt: new Date(),
  };

  if (data.action === "create") {
    await db.insert(schema.cryptoPlans).values(values);
  } else {
    await db
      .update(schema.cryptoPlans)
      .set(values)
      .where(eq(schema.cryptoPlans.id, data.id));
  }

  return NextResponse.json({ ok: true });
}
