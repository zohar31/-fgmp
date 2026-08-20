"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { SITE } from "@/lib/config";
import { localeFromPathname } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV = {
  he: {
    links: [
      { href: "/#how", label: "איך זה עובד" },
      { href: "/#who", label: "למי זה מתאים" },
      { href: "/#pricing", label: "מחיר" },
      { href: "/#stories", label: "לקוחות" },
      { href: "/guides", label: "מדריכים" },
      { href: "/#faq", label: "שאלות" },
    ],
    signin: "התחברות",
    ctaFull: "התחילו עכשיו",
    ctaShort: "התחילו",
    home: "/",
    login: "/login",
  },
  en: {
    links: [
      { href: "/en/#how", label: "How it works" },
      { href: "/en/#who", label: "Who it's for" },
      { href: "/en/#pricing", label: "Pricing" },
      { href: "/en/#stories", label: "Customers" },
      { href: "/en/guides", label: "Guides" },
      { href: "/en/#faq", label: "FAQ" },
    ],
    signin: "Sign in",
    ctaFull: "Get started",
    ctaShort: "Start",
    home: "/en",
    login: "/login",
  },
} as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const t = NAV[locale];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "bg-bg/80 backdrop-blur-lg ring-1 ring-white/5" : "bg-transparent"
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link
          href={t.home}
          aria-label={SITE.brand}
          className="shrink-0"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {t.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-2 text-sm font-medium text-ink-200 hover:bg-white/5 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href={t.login}
            className="hidden rounded-xl px-3 py-2 text-sm font-medium text-ink-200 hover:bg-white/5 hover:text-white transition-colors sm:inline-block"
          >
            {t.signin}
          </Link>
          <Link href={t.login} className="btn-wa text-sm py-2 px-4">
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">{t.ctaFull}</span>
            <span className="sm:hidden">{t.ctaShort}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
