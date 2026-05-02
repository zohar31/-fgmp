import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, and, lt, sql } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/extension/pending-pushes
// התוסף ב-VPS יושך כל 30 שנ׳ — מחזיר את כל ה-pending pushes עם נתוני הלקוח המלאים
//
// קודם: סוגרים pushes ישנים שלא עברו ack (10 דקות) → סטטוס 'failed'

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function normalizePhone(phone: string | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/[^0-9]/g, "");
  if (digits.startsWith("972")) return "0" + digits.slice(3);
  return digits;
}

export async function GET(req: Request) {
  const expected = process.env.EXTENSION_API_TOKEN;
  if (!expected) {
    return NextResponse.json({ ok: false, error: "API not configured" }, { status: 503 });
  }

  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/);
  if (!m || !constantTimeEqual(m[1], expected)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // 1. timeout cleanup — pushes ישנים מ-10 דקות שלא עברו ack → failed
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  await db
    .update(schema.extensionPushes)
    .set({ status: "failed", errorMessage: "timeout — extension did not ack" })
    .where(
      and(
        eq(schema.extensionPushes.status, "pending"),
        lt(schema.extensionPushes.pushedAt, tenMinutesAgo)
      )
    );

  // 2. שליפת כל ה-pending pushes עם נתוני הלקוח
  const rows = await db
    .select({
      pushId: schema.extensionPushes.id,
      pushedAt: schema.extensionPushes.pushedAt,
      userId: schema.users.id,
      activationToken: schema.subscriptions.activationToken,
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
      // subscriptions
      subStatus: schema.subscriptions.status,
      trialStartedAt: schema.subscriptions.trialStartedAt,
      trialEndsAt: schema.subscriptions.trialEndsAt,
      activatedAt: schema.subscriptions.activatedAt,
    })
    .from(schema.extensionPushes)
    .innerJoin(schema.users, eq(schema.extensionPushes.userId, schema.users.id))
    .innerJoin(
      schema.subscriptions,
      eq(schema.users.id, schema.subscriptions.userId)
    )
    .leftJoin(
      schema.businessSettings,
      eq(schema.users.id, schema.businessSettings.userId)
    )
    .where(eq(schema.extensionPushes.status, "pending"))
    .orderBy(schema.extensionPushes.pushedAt);

  const pushes = rows.map((r) => ({
    pushId: r.pushId,
    pushedAt: r.pushedAt.toISOString(),
    customer: {
      userId: r.userId,
      activationToken: r.activationToken,
      businessName: r.businessName ?? r.userName ?? null,
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
      subscriptionStatus: r.subStatus,
      trialStartedAt: r.trialStartedAt?.toISOString() ?? null,
      trialEndsAt: r.trialEndsAt?.toISOString() ?? null,
      activatedAt: r.activatedAt?.toISOString() ?? null,
      createdAt: r.userCreatedAt.toISOString(),
    },
  }));

  return NextResponse.json(
    {
      ok: true,
      syncedAt: new Date().toISOString(),
      count: pushes.length,
      pushes,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
