import { NextResponse, type NextRequest } from "next/server";

// Geo-aware default locale. Runs ONLY on the homepage "/". Visitors outside
// Israel are redirected to the English site (/en); Israeli visitors stay on
// Hebrew. An explicit language choice (the `locale` cookie, set by the language
// switcher) always wins over geo. Known crawlers are never redirected, so both
// language versions stay independently indexable (hreflang handles the rest).
const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|vkshare|whatsapp|telegram|googlebot|bingbot|duckduckbot|baiduspider|yandex|applebot|petalbot|gptbot|ccbot|claudebot|perplexity/i;

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  if (BOT_RE.test(ua)) return NextResponse.next();

  // Explicit choice wins.
  const choice = req.cookies.get("locale")?.value;
  if (choice === "he") return NextResponse.next();
  if (choice === "en") {
    return NextResponse.redirect(new URL("/en", req.url));
  }

  // No explicit choice → default by geo. Default English outside Israel.
  const country =
    req.headers.get("x-vercel-ip-country") ||
    // @ts-expect-error geo is provided by the Vercel edge runtime
    req.geo?.country ||
    "";
  if (country && country !== "IL") {
    return NextResponse.redirect(new URL("/en", req.url));
  }
  return NextResponse.next();
}

export const config = {
  // Homepage only — never touch internal pages, assets, or API.
  matcher: ["/"],
};
