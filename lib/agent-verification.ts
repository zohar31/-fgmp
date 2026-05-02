// Agent phone verification — 5-digit code sent via wa-server
//
// Flow:
// 1. Agent calls send_verification_code(phone)
//    → generate 5-digit code → hash with HMAC → save to phone_verifications
//    → POST to wa-server /send with the message
// 2. User receives code on WhatsApp, types it back to agent
// 3. Agent calls verify_code(phone, code)
//    → look up most recent unexpired row → constant-time compare
//    → if valid: create agent_session (30 min), return sessionId+userId
//    → if invalid: increment attempts; after 3 failures → block 30 min
//
// Security notes:
// - Code hash uses HMAC-SHA256 with a server-side secret so a leaked DB
//   row alone isn't enough to recover the code.
// - 3 attempts per row, then a 30-minute block (per phone).
// - Code TTL: 10 minutes.

import { createHmac, randomInt, timingSafeEqual } from "crypto";
import { db, schema } from "@/lib/db";
import { eq, and, desc, gt } from "drizzle-orm";

const CODE_LENGTH = 5;
const CODE_TTL_MS = 10 * 60 * 1000; // 10 min
const MAX_ATTEMPTS = 3;
const BLOCK_MS = 30 * 60 * 1000; // 30 min after lockout
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 min

const HMAC_SECRET =
  process.env.AGENT_VERIFICATION_SECRET ||
  process.env.AUTH_SECRET ||
  "fgmp-agent-fallback-secret-change-in-prod";

function hashCode(code: string): string {
  return createHmac("sha256", HMAC_SECRET).update(code).digest("hex");
}

function constantTimeStringEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export function generateCode(): string {
  // 5 digits, leading zeros possible
  const n = randomInt(0, 100000);
  return n.toString().padStart(CODE_LENGTH, "0");
}

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  if (digits.startsWith("972")) return "0" + digits.slice(3);
  return digits;
}

export async function isPhoneBlocked(phone: string): Promise<{ blocked: boolean; until?: Date }> {
  const normalized = normalizePhone(phone);
  const recent = await db.query.phoneVerifications.findFirst({
    where: and(
      eq(schema.phoneVerifications.phone, normalized),
      gt(schema.phoneVerifications.blockedUntil, new Date())
    ),
    orderBy: [desc(schema.phoneVerifications.createdAt)],
  });
  if (recent?.blockedUntil) return { blocked: true, until: recent.blockedUntil };
  return { blocked: false };
}

export async function createAndSendVerificationCode(
  phone: string
): Promise<{ ok: true; expiresAt: Date } | { ok: false; error: string }> {
  const normalized = normalizePhone(phone);

  // Block check
  const block = await isPhoneBlocked(normalized);
  if (block.blocked) {
    return {
      ok: false,
      error: `המספר חסום עד ${block.until?.toLocaleTimeString("he-IL")}. ניתן לפנות לתמיכה ב-058-5222227.`,
    };
  }

  // Generate + persist
  const code = generateCode();
  const codeHash = hashCode(code);
  const expiresAt = new Date(Date.now() + CODE_TTL_MS);

  await db.insert(schema.phoneVerifications).values({
    phone: normalized,
    codeHash,
    expiresAt,
  });

  // Send via wa-server
  const waUrl = process.env.WA_SERVER_URL || "http://85.130.174.200:3030";
  const intl = "972" + normalized.replace(/^0/, "");
  const text =
    `🔐 *FGMP — קוד אימות*\n\n` +
    `הקוד שלך: *${code}*\n` +
    `תקף ל-10 דקות.\n\n` +
    `אם לא ביקשת — התעלם מההודעה.`;

  try {
    const res = await fetch(`${waUrl.replace(/\/$/, "")}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: intl, text }),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; queued?: boolean };
    if (!res.ok || (data.ok === false && !data.queued)) {
      return {
        ok: false,
        error: "לא הצלחנו לשלוח את הקוד כרגע. נסה שוב או פנה ל-058-5222227.",
      };
    }
    return { ok: true, expiresAt };
  } catch {
    return {
      ok: false,
      error: "שגיאת רשת בשליחת הקוד. נסה שוב או פנה ל-058-5222227.",
    };
  }
}

export async function verifyCodeAndOpenSession(
  phone: string,
  code: string,
  userId: string
): Promise<
  | { ok: true; sessionId: string; expiresAt: Date }
  | { ok: false; error: string; remainingAttempts?: number }
> {
  const normalized = normalizePhone(phone);

  // Check block
  const block = await isPhoneBlocked(normalized);
  if (block.blocked) {
    return {
      ok: false,
      error: `המספר חסום עד ${block.until?.toLocaleTimeString("he-IL")}.`,
    };
  }

  // Find latest unverified, unexpired record
  const row = await db.query.phoneVerifications.findFirst({
    where: and(
      eq(schema.phoneVerifications.phone, normalized),
      gt(schema.phoneVerifications.expiresAt, new Date())
    ),
    orderBy: [desc(schema.phoneVerifications.createdAt)],
  });

  if (!row) {
    return { ok: false, error: "לא נמצא קוד פעיל. בקש קוד חדש." };
  }
  if (row.verifiedAt) {
    return { ok: false, error: "הקוד הזה כבר נוצל. בקש קוד חדש." };
  }

  // Constant-time compare
  const inputHash = hashCode(code.trim());
  const valid = constantTimeStringEqual(inputHash, row.codeHash);

  if (!valid) {
    const newAttempts = row.attempts + 1;
    const update: Partial<typeof schema.phoneVerifications.$inferInsert> = {
      attempts: newAttempts,
    };
    if (newAttempts >= MAX_ATTEMPTS) {
      update.blockedUntil = new Date(Date.now() + BLOCK_MS);
    }
    await db
      .update(schema.phoneVerifications)
      .set(update)
      .where(eq(schema.phoneVerifications.id, row.id));

    if (newAttempts >= MAX_ATTEMPTS) {
      return {
        ok: false,
        error: "חרגת ממספר הניסיונות. המספר חסום ל-30 דקות. ניתן לפנות ל-058-5222227.",
      };
    }
    return {
      ok: false,
      error: `קוד שגוי. נותרו ${MAX_ATTEMPTS - newAttempts} ניסיונות.`,
      remainingAttempts: MAX_ATTEMPTS - newAttempts,
    };
  }

  // Success — mark verified + create session
  await db
    .update(schema.phoneVerifications)
    .set({ verifiedAt: new Date() })
    .where(eq(schema.phoneVerifications.id, row.id));

  const sessionExpiresAt = new Date(Date.now() + SESSION_TTL_MS);
  const [session] = await db
    .insert(schema.agentSessions)
    .values({
      userId,
      phone: normalized,
      expiresAt: sessionExpiresAt,
    })
    .returning();

  return { ok: true, sessionId: session.id, expiresAt: sessionExpiresAt };
}

export async function getValidSession(sessionId: string): Promise<
  | { userId: string; phone: string; expiresAt: Date }
  | null
> {
  if (!sessionId) return null;
  const sess = await db.query.agentSessions.findFirst({
    where: eq(schema.agentSessions.id, sessionId),
  });
  if (!sess) return null;
  if (sess.expiresAt.getTime() < Date.now()) return null;

  // Refresh lastUsedAt (sliding lock isn't enabled — fixed TTL from creation)
  await db
    .update(schema.agentSessions)
    .set({ lastUsedAt: new Date() })
    .where(eq(schema.agentSessions.id, sessionId));

  return {
    userId: sess.userId,
    phone: sess.phone,
    expiresAt: sess.expiresAt,
  };
}
