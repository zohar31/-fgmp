import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// The WA server's /posts returns the full feed (several MB), so give the
// upstream fetch room and cache the parsed result in-instance.
export const maxDuration = 20;

const WA_SERVER = (
  process.env.WA_SERVER_URL || "http://85.130.174.200:3030"
).replace(/\/$/, "");

const TTL_MS = 30_000;

type PublicLead = {
  group: string;
  text: string;
  keywords: string[];
  time: string;
};

// Last-good cache (per warm serverless instance). Ensures a transient upstream
// timeout never blanks the homepage demo — we keep serving the previous leads.
let CACHE: { leads: PublicLead[]; at: number } = { leads: [], at: 0 };

// Redact Israeli-phone-like digit runs so real contact numbers never surface
// on the public marketing page.
function redactPhones(s: string): string {
  return s
    .replace(/0\d[\d\-\s.]{7,}\d/g, "•••")
    .replace(/\+?972[\d\-\s.]{7,}\d/g, "•••");
}

// GET /api/recent-leads
// Server-side proxy to the WA server's /posts feed, sanitized for public
// display. Server-to-server avoids the browser's HTTP→HTTPS mixed-content block.
// Never throws and never blanks: returns the last-good leads on failure.
export async function GET() {
  const now = Date.now();
  if (CACHE.leads.length && now - CACHE.at < TTL_MS) {
    return NextResponse.json({ ok: true, leads: CACHE.leads });
  }

  try {
    const res = await fetch(`${WA_SERVER}/posts`, {
      signal: AbortSignal.timeout(12000),
      cache: "no-store",
    });
    if (res.ok) {
      const data = (await res.json()) as { posts?: unknown };
      const posts = Array.isArray(data?.posts) ? data.posts : [];
      const leads: PublicLead[] = posts
        .slice(0, 8)
        .map((p): PublicLead => {
          const post = p as Record<string, unknown>;
          const rawText = String(post.text ?? "").replace(/\s+/g, " ").trim();
          return {
            group: String(post.groupName ?? "").slice(0, 60),
            text: redactPhones(rawText).slice(0, 170),
            keywords: Array.isArray(post.matchedKeywords)
              ? (post.matchedKeywords as unknown[]).slice(0, 4).map((k) => String(k))
              : [],
            time: String(post.postTime ?? "").slice(0, 20),
          };
        })
        .filter((l) => l.text.length > 0);
      if (leads.length) CACHE = { leads, at: now };
    }
  } catch {
    /* fall through to last-good cache */
  }

  return NextResponse.json({ ok: true, leads: CACHE.leads });
}
