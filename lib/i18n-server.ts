import { cookies, headers } from "next/headers";
import type { Locale } from "./i18n";

// Server-side locale for shared (non-/en) pages like /account and /login,
// where there's no /en path prefix. Uses the `locale` cookie (set by the
// language switcher / geo-redirect), falling back to the referer being /en.
export async function getServerLocale(): Promise<Locale> {
  const c = (await cookies()).get("locale")?.value;
  if (c === "en") return "en";
  if (c === "he") return "he";
  const ref = (await headers()).get("referer") || "";
  if (/^https?:\/\/[^/]+\/en(\/|$|\?|#)/.test(ref)) return "en";
  return "he";
}
