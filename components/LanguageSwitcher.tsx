"use client";

import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { localeFromPathname, switchLocalePath } from "@/lib/i18n";

// Language toggle shown in the nav. Switches to the equivalent path in the
// other locale (he ↔ en). Uses a FULL page load (plain <a>) so the root
// <html lang/dir> is re-rendered correctly for the target locale — a
// client-side navigation would leave the previous locale's dir/lang in place.
export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const current = localeFromPathname(pathname);
  const target = current === "he" ? "en" : "he";
  const href = switchLocalePath(pathname, target);
  const label = target === "en" ? "EN" : "עב";
  const aria = target === "en" ? "Switch to English" : "עבור לעברית";

  // Persist the manual choice so it overrides geo-based auto-redirect.
  const remember = () => {
    document.cookie = `locale=${target};path=/;max-age=31536000;samesite=lax`;
  };

  return (
    <a
      href={href}
      hrefLang={target}
      aria-label={aria}
      onClick={remember}
      className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-bold text-ink-200 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white"
    >
      <Globe className="h-4 w-4" />
      {label}
    </a>
  );
}
