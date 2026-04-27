import { NextResponse } from "next/server";
import { z } from "zod";
import { sendAdminNotification, newSignupEmailHtml } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const SignupSchema = z.object({
  business: z.string().trim().min(2, "שם עסק קצר מדי").max(80),
  service: z.string().trim().min(5, "תיאור קצר מדי").max(400),
  whatsapp: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .regex(/^(\+?\d[\d\s-]{6,18}\d)$/, "מספר טלפון לא תקין"),
  email: z.string().trim().email("כתובת אימייל לא תקינה").max(120),
});

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const ua = req.headers.get("user-agent") || "";

  const limit = await rateLimit(`signup:${ip}`, 5, 60 * 60 * 1000); // 5/hour/IP
  if (!limit.ok) {
    return NextResponse.json(
      { error: "יותר מדי ניסיונות. נסו שוב מאוחר יותר." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = SignupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "פרטים חסרים" },
      { status: 400 }
    );
  }

  const data = parsed.data;

  await sendAdminNotification({
    subject: `🎉 מנוי חדש: ${data.business}`,
    html: newSignupEmailHtml({ ...data, ip, userAgent: ua }),
    replyTo: data.email,
  });

  return NextResponse.json({ ok: true });
}
