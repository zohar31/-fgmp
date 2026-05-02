import { NextResponse } from "next/server";
import { z } from "zod";
import OpenAI from "openai";
import { auth } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const Body = z.object({
  niche: z.string().trim().min(2).max(80),
  serviceAreas: z.string().trim().max(1000).optional().default(""),
  description: z.string().trim().max(800).optional().default(""),
  businessName: z.string().trim().max(120).optional().default(""),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip = getClientIp(req);
  const limit = await rateLimit(`suggest:${session.user.id}:${ip}`, 10, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "יותר מדי בקשות. נסו שוב בעוד שעה." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const msg = issue
      ? `פרטים לא תקינים — ${issue.path.join(".")}: ${issue.message}`
      : "פרטים לא תקינים";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "כלי ה-AI לא זמין כרגע. נסה שוב מאוחר יותר." },
      { status: 503 }
    );
  }

  const { niche, serviceAreas, description, businessName } = parsed.data;
  const openai = new OpenAI({ apiKey });

  const prompt = `אתה מומחה לשיווק דיגיטלי וקבוצות פייסבוק בישראל.

מטרתך: לייצר עד 30 מילות מפתח וצירופים קצרים בעברית שאנשים מקלידים בקבוצות פייסבוק כשהם מחפשים שירות מהתחום הבא:

תחום: ${niche}${businessName ? `\nשם העסק: ${businessName}` : ""}${serviceAreas ? `\nאיזורי שירות: ${serviceAreas}` : ""}${description ? `\nתיאור: ${description}` : ""}

הנחיות:
- כל מילת מפתח חייבת להיות קצרה: 1-4 מילים
- כלול וריאציות: כתיב מלא וכתיב חסר, סלנג, צירופים נפוצים
- כלול סוגי אירועים/שירותים נפוצים בתחום
- כלול שאלות נפוצות שלקוחות שואלים ("מי יכול להמליץ", "מחפש/ת")
- אל תכלול מילים גנריות מדי כמו "מחיר" או "המלצה" לבדן
- העדף צירופים ספציפיים על פני מילים בודדות
- החזר אך ורק רשימה מופרדת בפסיקים, ללא מספור, ללא הסברים, ללא קווי-תחתוני, ללא תגיות

דוגמה לפלט תקין: "מחפשת קונדיטוריה, עוגת חתונה, עוגת בר מצווה, עוגות מעוצבות, ..."`;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      max_tokens: 600,
      temperature: 0.7,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0]?.message?.content || "";
    const keywords = text
      .split(/[,،\n]/)
      .map((s) =>
        s
          .trim()
          .replace(/^\d+[\.\)]\s*/, "")
          .replace(/^[-••]\s*/, "")
          .replace(/^"(.+)"$/, "$1")
          .replace(/^'(.+)'$/, "$1")
          .trim()
      )
      .filter((s) => s.length >= 2 && s.length < 50)
      .slice(0, 30);

    if (keywords.length === 0) {
      return NextResponse.json(
        { error: "לא הצלחנו לייצר הצעות. נסה שוב בעוד רגע." },
        { status: 502 }
      );
    }

    return NextResponse.json({ keywords });
  } catch (err) {
    console.error("[suggest-keywords] OpenAI error:", err);
    return NextResponse.json(
      { error: "שגיאה בכלי ה-AI. נסה שוב." },
      { status: 502 }
    );
  }
}
