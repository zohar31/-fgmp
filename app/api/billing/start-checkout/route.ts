import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
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

  // Custom amount (e.g., 1 ILS test) is allowed only for admins.
  // Regular subscribers always get the standard monthly price.
  let amount = parsed.data.amount;
  if (amount !== SITE.pricing.monthlyILS && !isAdmin(session)) {
    amount = SITE.pricing.monthlyILS;
  }

  if (!TRANZILA_TERMINAL) {
    return NextResponse.json(
      { ok: false, error: "סליקה לא זמינה כרגע. נסה שוב מאוחר יותר." },
      { status: 503 }
    );
  }

  const baseUrl = SITE.url.replace(/\/$/, "");
  const redirectUrl = buildIframeRedirectUrl({
    amount,
    contact: parsed.data.contact,
    email: parsed.data.email,
    phone: parsed.data.phone,
    myid: parsed.data.myid,
    // The /api/billing/return endpoint accepts both GET and POST and
    // handles success+fail by reading Response code, then 302-redirects
    // the browser to /billing-success or /billing-fail (regular GET pages).
    // notify_url_address (server-to-server) goes to a separate endpoint.
    notifyUrl: `${baseUrl}/api/billing/notify`,
    successUrl: `${baseUrl}/api/billing/return`,
    failUrl: `${baseUrl}/api/billing/return`,
    externalRef: parsed.data.userId,
    enableTokenization: true,
    enableBit: true,
  });

  return NextResponse.json({ ok: true, redirectUrl });
}
