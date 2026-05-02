import { NextResponse } from "next/server";
import { z } from "zod";
import OpenAI from "openai";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { SYSTEM_PROMPT } from "@/lib/agent-prompt";
import { AGENT_TOOLS, executeTool } from "@/lib/agent-tools";
import { getValidSession } from "@/lib/agent-verification";

export const runtime = "nodejs";

const SESSION_COOKIE = "fgmp_agent_session";
const SESSION_COOKIE_MAX_AGE = 30 * 60; // 30 minutes (matches agent_sessions TTL)

const Message = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const Body = z.object({
  messages: z.array(Message).min(1).max(20),
});

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const MAX_TOKENS = 600;
const HISTORY_LIMIT = 12;
const MAX_TOOL_ITERATIONS = 5;

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "סוכן ה-AI לא מוגדר עדיין. דברו איתנו בוואטסאפ." },
      { status: 503 }
    );
  }

  const ip = getClientIp(req);
  const limit = await rateLimit(`chat:${ip}`, 30, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "יותר מדי הודעות. נסו שוב מאוחר יותר." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "פרטים לא תקינים" }, { status: 400 });
  }

  const truncated = parsed.data.messages.slice(-HISTORY_LIMIT);
  const openai = new OpenAI({ apiKey });

  // ── שלוף sessionId מ-cookie אם קיים ועדיין תקף ──
  // זה מאפשר לסוכן לזכור את האימות בין תורים בלי לבקש קוד שוב
  const existingSessionId = req.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${SESSION_COOKIE}=`))
    ?.split("=")[1];
  let activeSession = null as Awaited<ReturnType<typeof getValidSession>> | null;
  if (existingSessionId) {
    activeSession = await getValidSession(existingSessionId);
  }

  // Build the multi-turn conversation that may include tool calls
  // Messages array we hand to OpenAI grows during the loop as we add tool results
  type ChatMessage =
    | { role: "system"; content: string }
    | { role: "user"; content: string }
    | { role: "assistant"; content: string | null; tool_calls?: Array<{ id: string; type: "function"; function: { name: string; arguments: string } }> }
    | { role: "tool"; content: string; tool_call_id: string };

  const systemMessages: ChatMessage[] = [{ role: "system", content: SYSTEM_PROMPT }];
  if (activeSession) {
    systemMessages.push({
      role: "system",
      content:
        `המשתמש כבר אומת בהצלחה. ה-sessionId שלו: ${existingSessionId}\n` +
        `השתמש ב-sessionId הזה בכל קריאה לכלים שדורשים sessionId (get_my_status, get_my_settings, get_my_keywords).\n` +
        `אל תבקש מהמשתמש לאמת שוב — הוא כבר מאומת. תוקף הסשן: ${activeSession.expiresAt.toISOString()}.`,
    });
  }

  const messages: ChatMessage[] = [
    ...systemMessages,
    ...truncated.map((m) => ({ role: m.role, content: m.content })),
  ];

  try {
    let finalText = "";
    let newlyVerifiedSessionId: string | null = null;
    for (let iter = 0; iter < MAX_TOOL_ITERATIONS; iter++) {
      const response = await openai.chat.completions.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        temperature: 0.7,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        messages: messages as any,
        tools: AGENT_TOOLS,
        tool_choice: "auto",
      });

      const choice = response.choices[0];
      if (!choice) {
        finalText = "אירעה שגיאה. נסו שוב.";
        break;
      }

      const msg = choice.message;
      const toolCalls = msg.tool_calls;

      if (!toolCalls || toolCalls.length === 0) {
        // No tool call — final answer
        finalText = msg.content || "";
        break;
      }

      // Append the assistant's tool-call message to history
      messages.push({
        role: "assistant",
        content: msg.content ?? null,
        tool_calls: toolCalls.map((tc) => ({
          id: tc.id,
          type: "function" as const,
          function: { name: tc.function.name, arguments: tc.function.arguments },
        })),
      });

      // Execute each tool and append the result
      for (const tc of toolCalls) {
        let argsObj: Record<string, unknown> = {};
        try {
          argsObj = JSON.parse(tc.function.arguments || "{}");
        } catch {
          argsObj = {};
        }
        // אם הסוכן ניסה לקרוא לכלי שדורש sessionId בלי sessionId — ננסה לחזור על
        // ה-active session מה-cookie (אם קיים).
        if (
          activeSession &&
          existingSessionId &&
          [
            "get_my_status",
            "get_my_settings",
            "get_my_keywords",
            "add_keywords",
            "remove_keywords",
          ].includes(tc.function.name) &&
          !argsObj.sessionId
        ) {
          argsObj.sessionId = existingSessionId;
        }
        // הרצה בטוחה — שגיאה בכלי לא תקריס את הסוכן
        let result: Record<string, unknown>;
        try {
          result = await executeTool(tc.function.name, argsObj);
        } catch (toolErr) {
          console.error(`[chat] tool ${tc.function.name} threw:`, toolErr);
          result = {
            ok: false,
            error: "כלי הסוכן נכשל — אעביר את הבקשה למחלקה הטכנית.",
          };
        }
        // Detect a successful verification → store sessionId for cookie response
        if (
          tc.function.name === "verify_code" &&
          (result as { ok?: boolean; sessionId?: string }).ok &&
          (result as { sessionId?: string }).sessionId
        ) {
          newlyVerifiedSessionId = (result as { sessionId: string }).sessionId;
        }
        messages.push({
          role: "tool",
          tool_call_id: tc.id,
          content: JSON.stringify(result),
        });
      }
      // Loop will run another iteration to let GPT respond with the tool results
    }

    if (!finalText.trim()) {
      finalText = "לא הצלחתי לעבד את הבקשה. נסו לנסח אחרת או דברו איתנו בוואטסאפ ב-058-5222227.";
    }

    // Stream as plain text (compatible with existing AIAgent.tsx client)
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(finalText));
        controller.close();
      },
    });

    const responseHeaders: Record<string, string> = {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    };
    if (newlyVerifiedSessionId) {
      // הגדרת cookie של אימות — תוקף 30 דק׳
      responseHeaders["Set-Cookie"] =
        `${SESSION_COOKIE}=${newlyVerifiedSessionId}; Path=/api/chat; Max-Age=${SESSION_COOKIE_MAX_AGE}; HttpOnly; SameSite=Strict; Secure`;
    }

    return new Response(readable, { headers: responseHeaders });
  } catch (err) {
    console.error("[chat] openai error:", err);
    return NextResponse.json(
      { error: "אירעה שגיאה. נסו שוב או דברו איתנו בוואטסאפ." },
      { status: 500 }
    );
  }
}
