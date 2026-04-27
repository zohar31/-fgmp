import { NextResponse } from "next/server";
import { z } from "zod";
import OpenAI from "openai";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { SYSTEM_PROMPT } from "@/lib/agent-prompt";

export const runtime = "nodejs";

const Message = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const Body = z.object({
  messages: z.array(Message).min(1).max(20),
});

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const MAX_TOKENS = 400;
const HISTORY_LIMIT = 8; // last N messages sent to the model

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "סוכן ה-AI לא מוגדר עדיין. דברו איתנו בוואטסאפ." },
      { status: 503 }
    );
  }

  const ip = getClientIp(req);
  const limit = await rateLimit(`chat:${ip}`, 20, 60 * 60 * 1000); // 20/hour/IP
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

  try {
    const stream = await openai.chat.completions.create({
      model: MODEL,
      stream: true,
      max_tokens: MAX_TOKENS,
      temperature: 0.7,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...truncated.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const token = chunk.choices?.[0]?.delta?.content || "";
            if (token) controller.enqueue(encoder.encode(token));
          }
          controller.close();
        } catch (err) {
          console.error("[chat] stream error:", err);
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("[chat] openai error:", err);
    return NextResponse.json(
      { error: "אירעה שגיאה. נסו שוב או דברו איתנו בוואטסאפ." },
      { status: 500 }
    );
  }
}
