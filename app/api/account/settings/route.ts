import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { getServerLocale } from "@/lib/i18n-server";

export const runtime = "nodejs";

const SettingsSchema = z.object({
  businessName: z.string().trim().min(2).max(80),
  contactName: z.string().trim().min(2).max(80),
  // Optional — Israeli customers may enter a 9-digit ID (ח.פ./ע.מ./ת.ז.);
  // US customers can leave it blank (they don't have an Israeli tax ID).
  vatId: z
    .string()
    .trim()
    .regex(/^\d{9}$/, "ח.פ. / ע.מ. / ת.ז. חייב להיות 9 ספרות")
    .optional()
    .or(z.literal("")),
  contactEmail: z.string().trim().email().max(120),
  leadPhone: z
    .string()
    .trim()
    .regex(/^(\+?\d[\d\s-]{6,18}\d)$/, "מספר טלפון לא תקין"),
  niche: z.string().trim().min(2).max(80),
  serviceAreas: z.string().trim().min(2).max(800),
  keywords: z.string().trim().min(2).max(5000),
  description: z.string().trim().min(20).max(500),
  telegramUsername: z
    .string()
    .trim()
    .max(40)
    .regex(/^@?[a-zA-Z0-9_]{4,32}$/, "שם משתמש בטלגרם לא תקין (אותיות לטיניות, מספרים, underscore)")
    .optional()
    .or(z.literal("")),
  aiFilterEnabled: z.boolean().optional(),
  aiPositiveExamples: z.string().trim().max(2000).optional().or(z.literal("")),
  aiNegativeExamples: z.string().trim().max(2000).optional().or(z.literal("")),
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
    const en = (await getServerLocale()) === "en";
    const issue = parsed.error.issues[0];
    const fieldLabels: Record<string, string> = en
      ? {
          businessName: "Business name",
          contactName: "Contact name",
          vatId: "Tax ID",
          contactEmail: "Email",
          leadPhone: "Lead phone",
          niche: "Trade",
          serviceAreas: "Service areas",
          keywords: "Keywords",
          description: "Description",
          telegramUsername: "Telegram",
        }
      : {
          businessName: "שם העסק",
          contactName: "שם איש קשר",
          vatId: "ח.פ. / עוסק מורשה",
          contactEmail: "אימייל",
          leadPhone: "טלפון לקבלת לידים",
          niche: "תחום עיסוק",
          serviceAreas: "אזורי שירות",
          keywords: "מילות מפתח",
          description: "תיאור",
          telegramUsername: "טלגרם",
        };
    const fieldKey = issue?.path[0] as string | undefined;
    const fieldName = fieldKey ? fieldLabels[fieldKey] || fieldKey : "";
    // For English users, prefer a generic per-field message (Zod's built-in
    // messages are English; the custom .regex() messages are Hebrew).
    const fallback = en ? "is invalid or missing" : "לא תקין";
    const rawMsg = issue?.message || "";
    const msgText = en && /[֐-׿]/.test(rawMsg) ? fallback : rawMsg;
    const msg = issue
      ? fieldName
        ? `${fieldName}: ${msgText}`
        : msgText || (en ? "Invalid details" : "פרטים לא תקינים")
      : en ? "Invalid details" : "פרטים לא תקינים";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const data = parsed.data;
  const userId = session.user.id;

  const existing = await db.query.businessSettings.findFirst({
    where: eq(schema.businessSettings.userId, userId),
  });

  const telegramNormalized = data.telegramUsername
    ? data.telegramUsername.replace(/^@/, "")
    : "";

  const values = {
    businessName: data.businessName,
    contactName: data.contactName,
    vatId: data.vatId || null,
    contactEmail: data.contactEmail,
    leadPhone: data.leadPhone,
    niche: data.niche,
    serviceAreas: data.serviceAreas,
    keywords: data.keywords,
    hoursStart: null,
    hoursEnd: null,
    description: data.description,
    telegramUsername: telegramNormalized || null,
    aiFilterEnabled: data.aiFilterEnabled ?? true,
    aiPositiveExamples: data.aiPositiveExamples || null,
    aiNegativeExamples: data.aiNegativeExamples || null,
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

  // ── התראה לאדמין: מנוי פעיל עדכן נתונים → דחיפה לתוסף נדרשת ──
  // לא חוסם את התגובה (fire-and-forget)
  if (sub?.activatedAt && existing) {
    const changedFields: string[] = [];
    if (existing.keywords !== data.keywords) changedFields.push("מילות מפתח");
    if (existing.serviceAreas !== data.serviceAreas) changedFields.push("אזורי שירות");
    if (existing.niche !== data.niche) changedFields.push("תחום עיסוק");
    if (existing.description !== data.description) changedFields.push("תיאור");
    if (existing.businessName !== data.businessName) changedFields.push("שם עסק");
    if (existing.leadPhone !== data.leadPhone) changedFields.push("טלפון לידים");

    if (changedFields.length > 0) {
      const waServer = process.env.WA_SERVER_URL || "http://85.130.174.200:3030";
      const token = process.env.EXTENSION_API_TOKEN;
      if (token) {
        const text =
          `🔔 *מנוי עדכן נתונים*\n\n` +
          `🏢 ${data.businessName}\n` +
          `👤 ${data.contactName}\n` +
          `📱 ${data.leadPhone}\n` +
          `\n📝 שינה: ${changedFields.join(", ")}\n` +
          `\n👉 דחוף לתוסף שוב מהאדמין.`;
        fetch(`${waServer.replace(/\/$/, "")}/admin-notify`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }).catch((e) => console.warn("[settings] admin-notify failed:", e?.message));
      }
    }
  }

  return NextResponse.json({ ok: true });
}
