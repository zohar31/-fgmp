import { NextResponse } from "next/server";

export const runtime = "nodejs";
// Cache the upstream pull briefly so the public homepage demo stays fresh
// without hammering the WA server on every visitor.
export const revalidate = 30;

const WA_SERVER = (
  process.env.WA_SERVER_URL || "http://85.130.174.200:3030"
).replace(/\/$/, "");

// Redact Israeli-phone-like digit runs so real contact numbers never surface
// on the public marketing page.
function redactPhones(s: string): string {
  return s.replace(/0\d[\d\-\s.]{7,}\d/g, "•••").replace(/\+?972[\d\-\s.]{7,}\d/g, "•••");
}

type PublicLead = {
  group: string;
  text: string;
  keywords: string[];
  time: string;
};

// GET /api/recent-leads
// Server-side proxy to the WA server's /posts feed, sanitized for public
// display. Server-to-server avoids the browser's HTTP→HTTPS mixed-content block
// that froze any client-side attempt. Never throws — returns an empty list so
// the homepage demo degrades gracefully.
export async function GET() {
  try {
    const res = await fetch(`${WA_SERVER}/posts`, {
      signal: AbortSignal.timeout(6000),
      next: { revalidate: 30 },
    });
    if (!res.ok) return NextResponse.json({ ok: true, leads: [] as PublicLead[] });

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

    return NextResponse.json({ ok: true, leads });
  } catch {
    return NextResponse.json({ ok: true, leads: [] as PublicLead[] });
  }
}
