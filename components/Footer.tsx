"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { SITE, waLink } from "@/lib/config";
import { localeFromPathname } from "@/lib/i18n";

const FOOTER = {
  he: {
    tagline: "מערכת AI לאיתור לידים מקבוצות פייסבוק — ישירות לוואטסאפ של העסק שלך.",
    navTitle: "ניווט",
    nav: [
      { href: "/#how", label: "איך זה עובד" },
      { href: "/#who", label: "למי זה מתאים" },
      { href: "/#pricing", label: "מחיר" },
      { href: "/guides", label: "מדריכי לידים" },
      { href: "/success-stories", label: "סיפורי לקוחות" },
      { href: "/tools", label: "כלים חינמיים" },
      { href: "/about", label: "אודות" },
      { href: "/#faq", label: "שאלות נפוצות" },
      { href: "/login", label: "הרשמה" },
    ],
    legalTitle: "משפטי ופנייה",
    terms: "תקנון",
    privacy: "מדיניות פרטיות",
    accessibility: "הצהרת נגישות",
    waLabel: "וואטסאפ: 058-5222227",
    waMsg: "היי, יש לי שאלה",
    rights: (y: number) => `© ${y} כל הזכויות שמורות לצח אור.`,
  },
  en: {
    tagline: "AI that finds leads from Facebook groups — straight to your business WhatsApp.",
    navTitle: "Navigate",
    nav: [
      { href: "/en/#how", label: "How it works" },
      { href: "/en/leads", label: "Leads by trade" },
      { href: "/en/#pricing", label: "Pricing" },
      { href: "/en/guides", label: "Lead guides" },
      { href: "/en/tools", label: "Free tools" },
      { href: "/en/about", label: "About" },
      { href: "/en/#faq", label: "FAQ" },
      { href: "/login", label: "Sign up" },
    ],
    legalTitle: "Legal & contact",
    terms: "Terms",
    privacy: "Privacy Policy",
    accessibility: "Accessibility",
    waLabel: "WhatsApp: +972585222227",
    waMsg: "Hi, I have a question about FGMP",
    rights: (y: number) => `© ${y} FGMP. All rights reserved.`,
  },
} as const;

export function Footer() {
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const t = FOOTER[locale];
  // Legal pages exist per-locale: Hebrew at root, English under /en.
  const legalBase = locale === "en" ? "/en" : "";
  const year = 2026;

  return (
    <footer className="border-t border-white/5 bg-bg-soft/50">
      <div className="container-x py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs leading-7 text-ink-300">{t.tagline}</p>
          </div>

          <div>
            <h4 className="font-display font-bold text-white">{t.navTitle}</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink-300">
              {t.nav.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("/#") || l.href.startsWith("/en/#") ? (
                    <a href={l.href} className="hover:text-white">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="hover:text-white">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white">{t.legalTitle}</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink-300">
              <li>
                <Link href={`${legalBase}/terms`} className="hover:text-white">
                  {t.terms}
                </Link>
              </li>
              <li>
                <Link href={`${legalBase}/privacy`} className="hover:text-white">
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link href={`${legalBase}/accessibility`} className="hover:text-white">
                  {t.accessibility}
                </Link>
              </li>
              <li>
                <a
                  href={waLink(t.waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {t.waLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center">
          <div>{t.rights(year)}</div>
          <div>{SITE.domain}</div>
        </div>
      </div>
    </footer>
  );
}
