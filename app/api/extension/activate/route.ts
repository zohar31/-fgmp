import { NextResponse } from "next/server";
import { z } from "zod";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/extension/activate
// נקרא ע"י wa-server ב-VPS אחרי שהלקוח שולח את הודעת FGMP-ACTIVATE-XXXX
// מסמן את המנוי כמופעל (status=active) עם activatedAt + activatedFromPhone.
// דורש תשלום קודם (firstPaymentAt) — אחרת מוחזר 402. אין תקופת ניסיון.
//
// Auth: Bearer EXTENSION_API_TOKEN

const Body = z.object({
  activationToken: z.string().min(1).max(100),
  phone: z.string().trim().min(6).max(20),
});

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function normalizeActivationToken(raw: string): string {
  // קבל "FGMP-ACTIVATE-AVKZTL" או "AVKZTL" — תמיד החזר את המלא
  const trimmed = raw.trim().toUpperCase();
  if (trimmed.startsWith("FGMP-ACTIVATE-")) return trimmed;
  return "FGMP-ACTIVATE-" + trimmed;
}

export async function POST(req: Request) {
  const expected = process.env.EXTENSION_API_TOKEN;
  if (!expected) {
    return NextResponse.json({ ok: false, error: "API not configured" }, { status: 503 });
  }

  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/);
  if (!m || !constantTimeEqual(m[1], expected)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid body", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { phone } = parsed.data;
  const fullToken = normalizeActivationToken(parsed.data.activationToken);

  // חפש את המנוי לפי הטוקן
  const sub = await db.query.subscriptions.findFirst({
    where: eq(schema.subscriptions.activationToken, fullToken),
  });

  if (!sub) {
    return NextResponse.json(
      { ok: false, error: "Activation token not found" },
      { status: 404 }
    );
  }

  // אם כבר מופעל — Idempotent (לא שגיאה)
  if (sub.activatedAt) {
    return NextResponse.json({
      ok: true,
      alreadyActivated: true,
      activatedAt: sub.activatedAt.toISOString(),
      userId: sub.userId,
    });
  }

  // Pay-first model (no free trial): refuse activation until the first payment
  // is recorded. Without this gate, anyone who sends the WhatsApp activation
  // message got flipped to trial_active + a 7-day trial window (in the ack
  // route) and received leads for free.
  if (!sub.firstPaymentAt) {
    return NextResponse.json(
      { ok: false, error: "Payment required before activation" },
      { status: 402 }
    );
  }

  const now = new Date();
  await db
    .update(schema.subscriptions)
    .set({
      status: "active",
      activatedAt: now,
      activatedFromPhone: phone,
      updatedAt: now,
    })
    .where(eq(schema.subscriptions.userId, sub.userId));

  // הודעה ב-Notifications
  await db.insert(schema.notifications).values({
    userId: sub.userId,
    type: "success",
    title: "המערכת הופעלה ✓",
    body: `החשבון שלך מאומת ופעיל. לידים יישלחו לוואטסאפ במספר ${phone}. בהצלחה!`,
  });

  return NextResponse.json({
    ok: true,
    activatedAt: now.toISOString(),
    userId: sub.userId,
  });
}
