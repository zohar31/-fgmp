// Agent tools — definitions for OpenAI function calling + server-side
// implementations.
//
// Each tool:
// 1. Has a `definition` matching OpenAI's function tool schema.
// 2. Has an `execute` function that runs server-side, validates the
//    sessionId (for protected tools), queries DB, returns JSON-safe result.
// 3. Every call is logged to agent_actions for audit.

import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { formatServiceAreas } from "@/lib/config";
import {
  createAndSendVerificationCode,
  verifyCodeAndOpenSession,
  getValidSession,
  normalizePhone,
} from "./agent-verification";

// ──────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────

async function findUserByPhone(phone: string): Promise<{ userId: string; email: string | null } | null> {
  const normalized = normalizePhone(phone);
  // Find via leadPhone in business_settings — that's the official "what phone
  // belongs to which user" mapping.
  const settings = await db.query.businessSettings.findFirst({
    where: eq(schema.businessSettings.leadPhone, normalized),
  });
  if (settings) {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, settings.userId),
    });
    return user ? { userId: user.id, email: user.email } : null;
  }
  // Alternate format: try with leading +972 normalization
  const intl = "+972" + normalized.replace(/^0/, "");
  const settings2 = await db.query.businessSettings.findFirst({
    where: eq(schema.businessSettings.leadPhone, intl),
  });
  if (settings2) {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, settings2.userId),
    });
    return user ? { userId: user.id, email: user.email } : null;
  }
  return null;
}

async function logAction(opts: {
  sessionId?: string | null;
  userId?: string | null;
  toolName: string;
  args: unknown;
  result?: unknown;
  error?: string;
}): Promise<void> {
  try {
    await db.insert(schema.agentActions).values({
      sessionId: opts.sessionId ?? null,
      userId: opts.userId ?? null,
      toolName: opts.toolName,
      args: JSON.stringify(opts.args ?? {}).slice(0, 4000),
      result: opts.result ? JSON.stringify(opts.result).slice(0, 4000) : null,
      error: opts.error ?? null,
    });
  } catch {
    // never let logging failure break the flow
  }
}

async function requireSession(sessionId: string | null | undefined): Promise<
  | { ok: true; userId: string; phone: string }
  | { ok: false; error: string }
> {
  if (!sessionId) {
    return { ok: false, error: "צריך לאמת אותך עם קוד 5 ספרות לפני שאני יכול לעזור עם פעולות אישיות." };
  }
  const sess = await getValidSession(sessionId);
  if (!sess) {
    return { ok: false, error: "ה-session פג תוקף. בקש קוד אימות חדש." };
  }
  return { ok: true, userId: sess.userId, phone: sess.phone };
}

// ──────────────────────────────────────────────────────────
// Tool definitions (OpenAI tools format)
// ──────────────────────────────────────────────────────────

export const AGENT_TOOLS = [
  {
    type: "function" as const,
    function: {
      name: "send_verification_code",
      description:
        "שליחת קוד אימות בן 5 ספרות לוואטסאפ של המשתמש. השתמש בזה כשהמשתמש מספק טלפון ורוצה להתחבר.",
      parameters: {
        type: "object",
        properties: {
          phone: { type: "string", description: "מספר טלפון של המשתמש (פורמט ישראלי, למשל 0501234567)" },
        },
        required: ["phone"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "verify_code",
      description:
        "אימות הקוד שהמשתמש הקליד. אם תקף, פותח session של 30 דקות ומחזיר sessionId. אחרי אימות תוכל להשתמש בכלים האישיים.",
      parameters: {
        type: "object",
        properties: {
          phone: { type: "string", description: "אותו מספר טלפון שאליו נשלח הקוד" },
          code: { type: "string", description: "5 ספרות שהמשתמש הקליד" },
        },
        required: ["phone", "code"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_my_status",
      description:
        "מחזיר את סטטוס המנוי של המשתמש המאומת — מצב מנוי, ימי ניסיון נותרים, האם הופעל. דורש sessionId תקף.",
      parameters: {
        type: "object",
        properties: {
          sessionId: { type: "string", description: "ה-sessionId שהוחזר מ-verify_code" },
        },
        required: ["sessionId"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_my_settings",
      description:
        "מחזיר את הגדרות העסק של המשתמש — שם עסק, תחום, אזורי שירות, תיאור.",
      parameters: {
        type: "object",
        properties: {
          sessionId: { type: "string" },
        },
        required: ["sessionId"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "get_my_keywords",
      description: "מחזיר את רשימת מילות המפתח של המשתמש.",
      parameters: {
        type: "object",
        properties: {
          sessionId: { type: "string" },
        },
        required: ["sessionId"],
      },
    },
  },
];

// ──────────────────────────────────────────────────────────
// Tool implementations
// ──────────────────────────────────────────────────────────

export async function executeTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const sessionId = (args.sessionId as string | undefined) ?? null;

  switch (toolName) {
    case "send_verification_code": {
      const phone = String(args.phone ?? "");
      const user = await findUserByPhone(phone);
      if (!user) {
        const result = {
          ok: false,
          error:
            "המספר לא רשום אצלנו. ייתכן שהוא שמור אצלנו בפורמט אחר — נסה לכתוב במלא (למשל 0501234567 או +972501234567).",
        };
        await logAction({ toolName, args, result });
        return result;
      }
      const send = await createAndSendVerificationCode(phone);
      if (!send.ok) {
        await logAction({ userId: user.userId, toolName, args, error: send.error });
        return { ok: false, error: send.error };
      }
      const result = {
        ok: true,
        message: "שלחתי קוד 5 ספרות לוואטסאפ שלך. תקף ל-10 דקות.",
        userIdHint: user.userId, // not exposed to user; agent stores for verify step
      };
      await logAction({ userId: user.userId, toolName, args, result });
      return result;
    }

    case "verify_code": {
      const phone = String(args.phone ?? "");
      const code = String(args.code ?? "");
      const user = await findUserByPhone(phone);
      if (!user) {
        const result = { ok: false, error: "מספר לא נמצא במערכת." };
        await logAction({ toolName, args: { phone, code: "***" }, result });
        return result;
      }
      const verify = await verifyCodeAndOpenSession(phone, code, user.userId);
      if (!verify.ok) {
        await logAction({
          userId: user.userId,
          toolName,
          args: { phone, code: "***" },
          error: verify.error,
        });
        return { ok: false, error: verify.error };
      }
      const result = {
        ok: true,
        sessionId: verify.sessionId,
        expiresAt: verify.expiresAt.toISOString(),
        message: "אומתת! אני יכול לעזור עכשיו עם פעולות אישיות.",
      };
      await logAction({
        sessionId: verify.sessionId,
        userId: user.userId,
        toolName,
        args: { phone, code: "***" },
        result: { ok: true },
      });
      return result;
    }

    case "get_my_status": {
      const auth = await requireSession(sessionId);
      if (!auth.ok) return { ok: false, error: auth.error };
      const sub = await db.query.subscriptions.findFirst({
        where: eq(schema.subscriptions.userId, auth.userId),
      });
      if (!sub) return { ok: false, error: "לא נמצאו פרטי מנוי." };

      const trialDaysLeft = sub.trialEndsAt
        ? Math.max(0, Math.ceil((sub.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
        : null;

      const result = {
        ok: true,
        status: sub.status,
        activated: !!sub.activatedAt,
        activatedAt: sub.activatedAt?.toISOString() ?? null,
        trialEndsAt: sub.trialEndsAt?.toISOString() ?? null,
        trialDaysLeft,
        suspended: !!sub.suspendedAt,
        cancelled: !!sub.cancelledAt,
      };
      await logAction({ sessionId, userId: auth.userId, toolName, args, result });
      return result;
    }

    case "get_my_settings": {
      const auth = await requireSession(sessionId);
      if (!auth.ok) return { ok: false, error: auth.error };
      const settings = await db.query.businessSettings.findFirst({
        where: eq(schema.businessSettings.userId, auth.userId),
      });
      if (!settings) return { ok: false, error: "לא נמצאו הגדרות עסק." };
      const result = {
        ok: true,
        businessName: settings.businessName,
        contactName: settings.contactName,
        niche: settings.niche,
        serviceAreas: formatServiceAreas(settings.serviceAreas),
        leadPhone: settings.leadPhone,
        contactEmail: settings.contactEmail,
        telegramUsername: settings.telegramUsername,
        description: settings.description,
      };
      await logAction({ sessionId, userId: auth.userId, toolName, args, result });
      return result;
    }

    case "get_my_keywords": {
      const auth = await requireSession(sessionId);
      if (!auth.ok) return { ok: false, error: auth.error };
      const settings = await db.query.businessSettings.findFirst({
        where: eq(schema.businessSettings.userId, auth.userId),
      });
      const keywords = (settings?.keywords ?? "")
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
      const result = { ok: true, count: keywords.length, keywords };
      await logAction({ sessionId, userId: auth.userId, toolName, args, result });
      return result;
    }

    default:
      return { ok: false, error: `Unknown tool: ${toolName}` };
  }
}
