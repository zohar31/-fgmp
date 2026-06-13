import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, sql } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /p/[code] — short-link resolver.
// Looks up the code in short_links and 302-redirects to the original
// (Facebook post) URL. Replaces the grouppostv2 `GET /p/:code` route so the
// public fgmp.net domain resolves short links directly, with no VPS dependency.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  if (!code) return new NextResponse("Not found", { status: 404 });

  const link = await db.query.shortLinks.findFirst({
    where: eq(schema.shortLinks.code, code),
  });
  if (!link) return new NextResponse("Not found", { status: 404 });

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
