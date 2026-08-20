"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { localeFromPathname, switchLocalePath } from "@/lib/i18n";

// Language toggle shown in the nav. Links to the equivalent path in the other
// locale (he ↔ en). Label shows the language you'll switch TO.
export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const current = localeFromPathname(pathname);
  const target = current === "he" ? "en" : "he";
  const href = switchLocalePath(pathname, target);
  const label = target === "en" ? "EN" : "עב";
  const aria = target === "en" ? "Switch to English" : "עבור לעברית";

  return (
    <Link
      href={href}
      hrefLang={target}
      aria-label={aria}
      className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-bold text-ink-200 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white"
    >
      <Globe className="h-4 w-4" />
      {label}
    </Link>
  );
}
