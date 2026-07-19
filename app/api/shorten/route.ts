import { NextResponse } from "next/server";
import { z } from "zod";
import { db, schema } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/shorten
// Creates a short link backed by Neon and returns the public fgmp.net/p/<code> URL.
// Replaces the grouppostv2 `POST /shorten` so generated links resolve on the
// public domain (see app/p/[code]/route.ts).
//
// Auth: Bearer EXTENSION_API_TOKEN (same token the extension/V2 already use).

const Body = z.object({
  url: z.string().url().max(2000),
});

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// 6-char base36 code (lowercase + digits) — same shape as the V2 generator.
function genCode(): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  let s = "";
  for (let i = 0; i < 6; i++) s += alphabet[bytes[i] % alphabet.length];
  return s;
}

export async function POST(req: Request) {
  // Accept a dedicated, low-privilege SHORTEN_API_TOKEN (preferred for the
  // extension) or the full EXTENSION_API_TOKEN. The dedicated token only grants
  // short-link creation — never customer data — so it's safe to embed in the
  // extension running on collector machines.
  const tokens = [
    process.env.SHORTEN_API_TOKEN,
    process.env.EXTENSION_API_TOKEN,
  ].filter((t): t is string => !!t);

  if (tokens.length === 0) {
    return NextResponse.json({ ok: false, error: "API not configured" }, { status: 503 });
  }

  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/);
  const provided = m?.[1] || "";
  if (!provided || !tokens.some((t) => constantTimeEqual(provided, t))) {
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

  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.fgmp.net").replace(/\/$/, "");

  // Insert with a fresh code, retrying on the (rare) primary-key collision.
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = genCode();
    try {
      await db.insert(schema.shortLinks).values({ code, targetUrl: parsed.data.url });
      return NextResponse.json({ ok: true, code, url: `${base}/p/${code}` });
    } catch (e) {
      const msg = String((e as Error)?.message || "");
      const isCollision = /duplicate key|unique/i.test(msg);
      if (!isCollision || attempt === 4) {
        return NextResponse.json({ ok: false, error: "Could not create short link" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ ok: false, error: "Could not create short link" }, { status: 500 });
}
