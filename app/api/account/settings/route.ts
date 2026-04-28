import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NICHES } from "@/lib/niches";

export const runtime = "nodejs";

const SettingsSchema = z.object({
  businessName: z.string().trim().min(2).max(80),
  contactName: z.string().trim().min(2).max(80),
  vatId: z
    .string()
    .trim()
    .regex(/^\d{9}$/, "ח.פ. / עוסק מורשה חייב להיות 9 ספרות"),
  contactEmail: z.string().trim().email().max(120),
  leadPhone: z
    .string()
    .trim()
    .regex(/^(\+?\d[\d\s-]{6,18}\d)$/, "מספר טלפון לא תקין"),
  niche: z.enum(NICHES),
  serviceAreas: z.string().trim().min(2).max(200),
  keywords: z.string().trim().min(2).max(400),
  hoursStart: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional()
    .or(z.literal("")),
  hoursEnd: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional()
    .or(z.literal("")),
  description: z.string().trim().min(20).max(500),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = SettingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "פרטים לא תקינים" },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const userId = session.user.id;

  const existing = await db.query.businessSettings.findFirst({
    where: eq(schema.businessSettings.userId, userId),
  });

  const values = {
    businessName: data.businessName,
    contactName: data.contactName,
    vatId: data.vatId,
    contactEmail: data.contactEmail,
    leadPhone: data.leadPhone,
    niche: data.niche,
    serviceAreas: data.serviceAreas,
    keywords: data.keywords,
    hoursStart: data.hoursStart || null,
    hoursEnd: data.hoursEnd || null,
    description: data.description,
    updatedAt: new Date(),
  };

  if (existing) {
    await db
      .update(schema.businessSettings)
      .set(values)
      .where(eq(schema.businessSettings.userId, userId));
  } else {
    await db.insert(schema.businessSettings).values({ userId, ...values });
  }

  const sub = await db.query.subscriptions.findFirst({
    where: eq(schema.subscriptions.userId, userId),
  });
  if (sub?.status === "pending_setup") {
    await db
      .update(schema.subscriptions)
      .set({ status: "pending_activation", updatedAt: new Date() })
      .where(eq(schema.subscriptions.userId, userId));
  }

  return NextResponse.json({ ok: true });
}
