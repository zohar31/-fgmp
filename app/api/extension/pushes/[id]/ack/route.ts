import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const TRIAL_DAYS = 7;

export const runtime = "nodejs";

const AckBody = z.object({
  status: z.enum(["delivered", "failed"]),
  error: z.string().max(500).optional(),
});

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// POST /api/extension/pushes/[id]/ack
// התוסף מאשר חזרה שקלט push (delivered) או נכשל (failed)
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const expected = process.env.EXTENSION_API_TOKEN;
  if (!expected) {
    return NextResponse.json({ ok: false, error: "API not configured" }, { status: 503 });
  }
  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/);
  if (!m || !constantTimeEqual(m[1], expected)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = AckBody.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid body", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const existing = await db.query.extensionPushes.findFirst({
    where: eq(schema.extensionPushes.id, id),
  });
  if (!existing) {
    return NextResponse.json({ ok: false, error: "Push not found" }, { status: 404 });
  }
  if (existing.status !== "pending") {
    // ack חוזר על אותו push — לא טעות, פשוט no-op
    return NextResponse.json({ ok: true, alreadyAcked: true, status: existing.status });
  }

  const now = new Date();
  await db
    .update(schema.extensionPushes)
    .set({
      status: parsed.data.status,
      ackAt: now,
      errorMessage: parsed.data.error || null,
    })
    .where(eq(schema.extensionPushes.id, id));

  // ── אם זו הדחיפה הראשונה שמועברה בהצלחה — אפס את תאריכי הניסיון ──
  // הניסיון מתחיל מרגע שהלקוח עבר לתוסף בפועל, לא מרגע ההרשמה
  let trialReset = false;
  if (parsed.data.status === "delivered") {
    const priorDelivered = await db.query.extensionPushes.findFirst({
      where: and(
        eq(schema.extensionPushes.userId, existing.userId),
        eq(schema.extensionPushes.status, "delivered")
      ),
    });
    // priorDelivered יכלול את הנוכחי כי כבר עידכנו — נבדוק אם יש מוקדם יותר
    const earlierDelivered = await db
      .select()
      .from(schema.extensionPushes)
      .where(
        and(
          eq(schema.extensionPushes.userId, existing.userId),
          eq(schema.extensionPushes.status, "delivered")
        )
      )
      .limit(2);
    if (earlierDelivered.length === 1) {
      // רק הדחיפה הנוכחית — אפס את הניסיון
      const sub = await db.query.subscriptions.findFirst({
        where: eq(schema.subscriptions.userId, existing.userId),
      });
      if (sub && sub.status === "trial_active") {
        const trialEnds = new Date(now.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000);
        await db
          .update(schema.subscriptions)
          .set({
            trialStartedAt: now,
            trialEndsAt: trialEnds,
            updatedAt: now,
          })
          .where(eq(schema.subscriptions.userId, existing.userId));
        trialReset = true;
      }
    }
  }

  return NextResponse.json({ ok: true, trialReset });
}
