import { NextResponse, type NextRequest } from "next/server";

// Geo-aware default locale. Runs ONLY on the homepage "/". Visitors outside
// Israel are redirected to the English site (/en); Israeli visitors stay on
// Hebrew. An explicit language choice (the `locale` cookie, set by the language
// switcher) always wins over geo. Known crawlers are never redirected, so both
// language versions stay independently indexable (hreflang handles the rest).
const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|vkshare|whatsapp|telegram|googlebot|bingbot|duckduckbot|baiduspider|yandex|applebot|petalbot|gptbot|ccbot|claudebot|perplexity/i;

// Read the visitor's ISO country code from whatever edge/CDN header is present.
// Vercel sets x-vercel-ip-country; Cloudflare sets cf-ipcountry; some proxies
// use x-country-code / x-geo-country. Normalized to uppercase (e.g. "IL").
function detectCountry(req: NextRequest): string {
  return (
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    req.headers.get("x-country-code") ||
    req.headers.get("x-geo-country") ||
    ""
  ).toUpperCase();
}

const YEAR = 31536000;
const cookieOpts = { path: "/", maxAge: YEAR, sameSite: "lax" as const };

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  if (BOT_RE.test(ua)) return NextResponse.next();

  // Only the two homepages are geo-managed. `matcher` already limits this, but
  // normalize the trailing slash so "/en/" is treated as the English homepage.
  const path = req.nextUrl.pathname.replace(/\/$/, "") || "/";
  const onEnglishHome = path === "/en";
  const onHebrewHome = path === "/";

  // Explicit choice always wins (language switcher / a prior geo redirect).
  const choice = req.cookies.get("locale")?.value;
  if (choice === "he") {
    return onEnglishHome ? NextResponse.redirect(new URL("/", req.url)) : NextResponse.next();
  }
  if (choice === "en") {
    return onHebrewHome ? NextResponse.redirect(new URL("/en", req.url)) : NextResponse.next();
  }

  // No explicit choice → default by geo:
  //   Israel (IL)        → Hebrew  (root)
  //   any other country  → English (/en)
  //   unknown/undetected → Hebrew  (the canonical default)
  const country = detectCountry(req);
  const wantsEnglish = !!country && country !== "IL";

  if (wantsEnglish && onHebrewHome) {
    // Redirect to English AND remember it, so downstream pages (e.g. /login)
    // render in English without re-checking geo on every request.
    const res = NextResponse.redirect(new URL("/en", req.url));
    res.cookies.set("locale", "en", cookieOpts);
    return res;
  }
  if (!wantsEnglish && onEnglishHome) {
    // Israeli (or undetected) visitor who landed on the English homepage → Hebrew.
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  // Only the Hebrew and English homepages — never touch internal pages,
  // assets, or API. Deep links (shared /en/... or /guides/... URLs) are preserved.
  matcher: ["/", "/en"],
};
