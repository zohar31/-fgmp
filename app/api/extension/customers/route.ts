import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, and, gte, inArray } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// תאריך גזירה: לקוחות שנרשמו לפני זה לא מסונכרנים לתוסף
// (אופציה C — רק לקוחות חדשים מהיום והלאה)
const CUTOFF_DATE = new Date("2026-05-02T00:00:00Z");

// Bearer token auth — שמור על קבועות זמן (timing-safe compare)
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function normalizePhone(phone: string | null): string | null {
  if (!phone) return null;
  // הסר תווים שאינם ספרות
  const digits = phone.replace(/[^0-9]/g, "");
  // אם מתחיל ב-972 — הפוך ל-0...
  if (digits.startsWith("972")) return "0" + digits.slice(3);
  return digits;
}

export async function GET(req: Request) {
  const expected = process.env.EXTENSION_API_TOKEN;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "API not configured" },
      { status: 503 }
    );
  }

  const authHeader = req.headers.get("authorization") || "";
  const match = authHeader.match(/^Bearer\s+(.+)$/);
  if (!match || !constantTimeEqual(match[1], expected)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  // משוך את כל הלקוחות עם מנוי פעיל ושנרשמו אחרי תאריך הגזירה
  const rows = await db
    .select({
      userId: schema.users.id,
      userName: schema.users.name,
      userEmail: schema.users.email,
      userCreatedAt: schema.users.createdAt,
      // business_settings
      businessName: schema.businessSettings.businessName,
      contactName: schema.businessSettings.contactName,
      contactEmail: schema.businessSettings.contactEmail,
      leadPhone: schema.businessSettings.leadPhone,
      niche: schema.businessSettings.niche,
      serviceAreas: schema.businessSettings.serviceAreas,
      keywords: schema.businessSettings.keywords,
      description: schema.businessSettings.description,
      telegramUsername: schema.businessSettings.telegramUsername,
      aiFilterEnabled: schema.businessSettings.aiFilterEnabled,
      aiPositiveExamples: schema.businessSettings.aiPositiveExamples,
      aiNegativeExamples: schema.businessSettings.aiNegativeExamples,
      hoursStart: schema.businessSettings.hoursStart,
      hoursEnd: schema.businessSettings.hoursEnd,
      bsUpdatedAt: schema.businessSettings.updatedAt,
      // subscriptions
      status: schema.subscriptions.status,
      trialStartedAt: schema.subscriptions.trialStartedAt,
      trialEndsAt: schema.subscriptions.trialEndsAt,
      activatedAt: schema.subscriptions.activatedAt,
    })
    .from(schema.users)
    .innerJoin(
      schema.subscriptions,
      eq(schema.users.id, schema.subscriptions.userId)
    )
    .innerJoin(
      schema.businessSettings,
      eq(schema.users.id, schema.businessSettings.userId)
    )
    .where(
      and(
        gte(schema.users.createdAt, CUTOFF_DATE),
        inArray(schema.subscriptions.status, ["trial_active", "active"])
      )
    );

  const customers = rows.map((r) => ({
    userId: r.userId,
    businessName: r.businessName ?? null,
    contactName: r.contactName ?? r.userName ?? null,
    phone: normalizePhone(r.leadPhone),
    email: r.contactEmail ?? r.userEmail,
    niche: r.niche ?? null,
    serviceAreas: r.serviceAreas ?? null,
    keywords: r.keywords ?? "",
    description: r.description ?? null,
    telegramUsername: r.telegramUsername ?? null,
    aiFilterEnabled: r.aiFilterEnabled ?? true,
    aiPositiveExamples: r.aiPositiveExamples ?? null,
    aiNegativeExamples: r.aiNegativeExamples ?? null,
    hoursStart: r.hoursStart ?? null,
    hoursEnd: r.hoursEnd ?? null,
    status: r.status,
    trialStartedAt: r.trialStartedAt?.toISOString() ?? null,
    trialEndsAt: r.trialEndsAt?.toISOString() ?? null,
    activatedAt: r.activatedAt?.toISOString() ?? null,
    createdAt: r.userCreatedAt.toISOString(),
    updatedAt: r.bsUpdatedAt.toISOString(),
  }));

  return NextResponse.json(
    {
      ok: true,
      syncedAt: new Date().toISOString(),
      cutoffDate: CUTOFF_DATE.toISOString(),
      count: customers.length,
      customers,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
