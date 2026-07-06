import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { inArray } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 20;

const WA_SERVER = (
  process.env.WA_SERVER_URL || "http://85.130.174.200:3030"
).replace(/\/$/, "");
const BASE = (process.env.NEXT_PUBLIC_SITE_URL || "https://fgmp.net").replace(/\/$/, "");
const TTL_MS = 30_000;

type PublicLead = {
  subscriber: string; // the business (category) the lead was actually sent to
  group: string;
  text: string;
  keywords: string[];
  time: string;
  link: string | null; // the exact fgmp.net/p short link that was sent
};

// Last-good cache (per warm serverless instance) so a transient upstream
// timeout never blanks the homepage demo.
let CACHE: { leads: PublicLead[]; at: number } = { leads: [], at: 0 };

function redactPhones(s: string): string {
  return s
    .replace(/0\d[\d\-\s.]{7,}\d/g, "•••")
    .replace(/\+?972[\d\-\s.]{7,}\d/g, "•••");
}

// GET /api/recent-leads
// Real leads exactly as delivered to subscribers: only posts that were actually
// sent (waNotifications), enriched with the subscriber/business name and the
// exact short link that was sent (looked up from short_links by post URL).
// Server-to-server (avoids HTTP→HTTPS mixed content). Never throws / never blanks.
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

      // Only leads that were actually delivered to a subscriber.
      const sent = posts
        .filter(
          (p) =>
            p &&
            typeof p === "object" &&
            Array.isArray((p as Record<string, unknown>).waNotifications) &&
            ((p as Record<string, unknown>).waNotifications as unknown[]).length > 0
        )
        .slice(0, 8) as Record<string, unknown>[];

      const urls = sent
        .map((p) => String(p.postUrl ?? ""))
        .filter((u) => u.length > 0);

      // Resolve the fgmp.net short link for each post: reuse the exact one that
      // was sent (from short_links), and mint one for any older lead that was
      // sent before the fgmp.net shortener (so every displayed lead has a link).
      const codeByUrl = new Map<string, string>();
      if (urls.length) {
        const rows = await db
          .select({
            code: schema.shortLinks.code,
            targetUrl: schema.shortLinks.targetUrl,
          })
          .from(schema.shortLinks)
          .where(inArray(schema.shortLinks.targetUrl, urls));
        for (const r of rows) codeByUrl.set(r.targetUrl, r.code);

        const missing = [...new Set(urls)].filter((u) => !codeByUrl.has(u));
        if (missing.length) {
          const gen = () => {
            const a = "abcdefghijklmnopqrstuvwxyz0123456789";
            const b = crypto.getRandomValues(new Uint8Array(6));
            let s = "";
            for (let i = 0; i < 6; i++) s += a[b[i] % a.length];
            return s;
          };
          const toInsert = missing.map((u) => ({ code: gen(), targetUrl: u }));
          try {
            await db.insert(schema.shortLinks).values(toInsert).onConflictDoNothing();
            for (const row of toInsert) codeByUrl.set(row.targetUrl, row.code);
          } catch {
            /* if minting fails, those leads just show without a link */
          }
        }
      }

      const leads: PublicLead[] = sent
        .map((p): PublicLead => {
          const notif =
            ((p.waNotifications as Record<string, unknown>[])[0] ?? {}) as Record<
              string,
              unknown
            >;
          const url = String(p.postUrl ?? "");
          const code = codeByUrl.get(url);
          const rawText = String(p.text ?? "").replace(/\s+/g, " ").trim();
          return {
            subscriber: String(notif.catName ?? "").slice(0, 50),
            group: String(p.groupName ?? "").slice(0, 60),
            text: redactPhones(rawText).slice(0, 170),
            keywords: Array.isArray(p.matchedKeywords)
              ? (p.matchedKeywords as unknown[]).slice(0, 4).map((k) => String(k))
              : [],
            time: String(p.postTime ?? "").slice(0, 20),
            link: code ? `${BASE}/p/${code}` : null,
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
