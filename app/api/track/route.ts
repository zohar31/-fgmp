import { NextResponse } from "next/server";
import { z } from "zod";
import { db, schema } from "@/lib/db";

export const runtime = "nodejs";

const Body = z.object({
  path: z.string().max(500),
  referrer: z.string().max(500).optional().or(z.literal("")),
  utm_source: z.string().max(100).optional().or(z.literal("")),
  utm_medium: z.string().max(100).optional().or(z.literal("")),
  utm_campaign: z.string().max(100).optional().or(z.literal("")),
});

const SKIP_PATHS = ["/api/", "/admin", "/account", "/login"];

function detectDevice(ua: string): string {
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "mobile";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  return "desktop";
}

function detectOS(ua: string): string {
  if (/Windows/i.test(ua)) return "Windows";
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Mac/i.test(ua)) return "macOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Other";
}

function detectBrowser(ua: string): string {
  if (/Edg\//i.test(ua)) return "Edge";
  if (/OPR\//i.test(ua)) return "Opera";
  if (/Firefox/i.test(ua)) return "Firefox";
  if (/Chrome/i.test(ua)) return "Chrome";
  if (/Safari/i.test(ua)) return "Safari";
  return "Other";
}

function extractDomain(referrer: string): string | null {
  if (!referrer) return null;
  try {
    const url = new URL(referrer);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

async function fingerprint(ip: string, ua: string): Promise<string> {
  const data = new TextEncoder().encode(`${ip}|${ua}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .slice(0, 12)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const path = parsed.data.path;
  if (SKIP_PATHS.some((p) => path.startsWith(p))) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const ua = req.headers.get("user-agent") || "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "0.0.0.0";
  const country = req.headers.get("x-vercel-ip-country") || null;

  try {
    const fp = await fingerprint(ip, ua);
    const refDomain = extractDomain(parsed.data.referrer || "");

    await db.insert(schema.pageViews).values({
      path,
      referrer: parsed.data.referrer || null,
      referrerDomain: refDomain || null,
      utmSource: parsed.data.utm_source || null,
      utmMedium: parsed.data.utm_medium || null,
      utmCampaign: parsed.data.utm_campaign || null,
      fingerprint: fp,
      country,
      device: detectDevice(ua),
      browser: detectBrowser(ua),
      os: detectOS(ua),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[track] insert failed:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
