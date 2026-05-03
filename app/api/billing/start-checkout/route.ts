import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { SITE } from "@/lib/config";
import { buildIframeRedirectUrl, TRANZILA_TERMINAL } from "@/lib/tranzila";

export const runtime = "nodejs";

const Body = z.object({
  userId: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  contact: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  myid: z.string().optional().default(""),
  amount: z.number().int().min(1).max(10000),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
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
    return NextResponse.json({ ok: false, error: "פרטים לא תקינים" }, { status: 400 });
  }

  // Security: only allow checkout for the logged-in user
  if (parsed.data.userId !== session.user.id) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  if (!TRANZILA_TERMINAL) {
    return NextResponse.json(
      { ok: false, error: "סליקה לא זמינה כרגע. נסה שוב מאוחר יותר." },
      { status: 503 }
    );
  }

  const baseUrl = SITE.url.replace(/\/$/, "");
  const redirectUrl = buildIframeRedirectUrl({
    amount: parsed.data.amount,
    contact: parsed.data.contact,
    email: parsed.data.email,
    phone: parsed.data.phone,
    myid: parsed.data.myid,
    notifyUrl: `${baseUrl}/api/billing/notify`,
    successUrl: `${baseUrl}/account/billing/success`,
    failUrl: `${baseUrl}/account/billing/fail`,
    externalRef: parsed.data.userId,
    enableTokenization: true,
    enableBit: true,
  });

  return NextResponse.json({ ok: true, redirectUrl });
}
