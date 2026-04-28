import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

const Body = z.object({
  userId: z.string().min(1),
  phone: z.string().trim().min(6).max(20),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "פרטים לא תקינים" }, { status: 400 });
  }

  const { userId, phone } = parsed.data;
  const now = new Date();

  await db
    .update(schema.subscriptions)
    .set({
      status: "trial_active",
      activatedAt: now,
      activatedFromPhone: phone,
      updatedAt: now,
    })
    .where(eq(schema.subscriptions.userId, userId));

  await db.insert(schema.notifications).values({
    userId,
    type: "success",
    title: "המערכת הופעלה ✓",
    body: `החשבון שלך מאומת ופעיל. לידים יישלחו לוואטסאפ במספר ${phone}. בהצלחה!`,
  });

  return NextResponse.json({ ok: true });
}
