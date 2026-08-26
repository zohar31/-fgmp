import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, sql } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Only ever redirect the base64 fallback to Facebook — never an arbitrary host,
// so a crafted /p/<base64> can't turn this into an open redirect.
const ALLOWED_HOSTS = /(^|\.)(facebook\.com|fb\.com|fb\.watch|fb\.me)$/i;

// Some senders build /p/<base64-of-the-full-url> instead of calling /api/shorten
// to get a real stored code. Decode that (standard or url-safe base64) and only
// trust Facebook URLs.
function decodeEmbeddedUrl(code: string): URL | null {
  try {
    const normalized = code.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = Buffer.from(normalized, "base64").toString("utf8");
    if (!/^https?:\/\//i.test(decoded)) return null;
    const url = new URL(decoded);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (!ALLOWED_HOSTS.test(url.hostname)) return null;
    return url;
  } catch {
    return null;
  }
}

// GET /p/[code] — short-link resolver.
// 1. Looks up the code in short_links (Neon) and 302-redirects to the post.
// 2. Fallback: if the code is itself a base64-encoded Facebook URL, redirect there.
// Replaces the grouppostv2 `GET /p/:code` route so fgmp.net resolves short links
// directly, with no VPS dependency.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  if (!code) return new NextResponse("Not found", { status: 404 });

  const link = await db.query.shortLinks.findFirst({
    where: eq(schema.shortLinks.code, code),
  });

  if (link) {
    // Validate the stored target before redirecting — a malformed URL would
    // otherwise throw inside NextResponse.redirect and surface as a 500.
    let target: URL;
    try {
      target = new URL(link.targetUrl);
    } catch {
      return new NextResponse("Bad short-link target", { status: 502 });
    }

    // Fire-and-forget click tracking — never blocks or fails the redirect.
    db.update(schema.shortLinks)
      .set({
        clickCount: sql`${schema.shortLinks.clickCount} + 1`,
        lastClickAt: new Date(),
      })
      .where(eq(schema.shortLinks.code, code))
      .catch(() => {});

    return NextResponse.redirect(target, 302);
  }

  // Fallback: the "code" may itself be a base64-encoded Facebook URL.
  const embedded = decodeEmbeddedUrl(code);
  if (embedded) return NextResponse.redirect(embedded, 302);

  return new NextResponse("Not found", { status: 404 });
}
