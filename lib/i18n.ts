// ─────────────────────────────────────────────────────────────────────────
// i18n foundation. Hebrew (he) is the default and lives at the site root.
// English (en) is a parallel tree under /en/* targeting the US market.
//
// Architecture: we do NOT move the 1,286 existing Hebrew pages under a
// [locale] segment. Instead, middleware exposes the pathname, the root layout
// sets <html lang/dir> from it, and English pages live under app/en/*.
// ─────────────────────────────────────────────────────────────────────────

export type Locale = "he" | "en";

export const LOCALES: Locale[] = ["he", "en"];
export const DEFAULT_LOCALE: Locale = "he";

export function localeFromPathname(pathname: string | null | undefined): Locale {
  if (pathname && (pathname === "/en" || pathname.startsWith("/en/"))) return "en";
  return "he";
}

export function dirForLocale(locale: Locale): "rtl" | "ltr" {
  return locale === "he" ? "rtl" : "ltr";
}

export function htmlLangForLocale(locale: Locale): string {
  return locale === "he" ? "he" : "en";
}

// Given a path in one locale, return the equivalent path in the other locale.
// Used for the language switcher and hreflang alternates.
export function switchLocalePath(pathname: string, to: Locale): string {
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  if (to === "en") {
    if (isEn) return pathname;
    return pathname === "/" ? "/en" : `/en${pathname}`;
  }
  // to === "he"
  if (!isEn) return pathname;
  const stripped = pathname.replace(/^\/en/, "");
  return stripped === "" ? "/" : stripped;
}
