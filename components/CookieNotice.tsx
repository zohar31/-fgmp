"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname } from "@/lib/i18n";

// Lightweight, dismissible cookie/privacy notice (bilingual). Transparency
// notice for analytics + Meta/GTM tags; CCPA is an opt-out regime, so this is a
// notice (not a blocking opt-in gate). Dismissal is stored for a year.
const STR = {
  he: {
    text: "האתר משתמש בעוגיות לתפקוד בסיסי, שמירת העדפת שפה ואנליטיקה.",
    more: "מדיניות פרטיות",
    ok: "הבנתי",
    privacy: "/privacy",
  },
  en: {
    text: "This site uses cookies for basic functionality, remembering your language, and analytics.",
    more: "Privacy Policy",
    ok: "Got it",
    privacy: "/en/privacy",
  },
} as const;

const COOKIE = "cookie_notice_ack";

export function CookieNotice() {
  const pathname = usePathname() || "/";
  const [locale, setLocale] = useState<"he" | "en">(() =>
    localeFromPathname(pathname) === "en" ? "en" : "he"
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Reconcile locale with the cookie on non-/en paths (e.g. /account, /login).
    if (localeFromPathname(pathname) === "en") setLocale("en");
    else {
      const m = document.cookie.match(/(?:^|;\s*)locale=(en|he)/);
      setLocale(m ? (m[1] as "he" | "en") : "he");
    }
    // Show only if not already acknowledged.
    const ack = document.cookie.includes(`${COOKIE}=1`);
    if (!ack) setVisible(true);
  }, [pathname]);

  if (!visible) return null;
  const t = STR[locale];

  function dismiss() {
    document.cookie = `${COOKIE}=1;path=/;max-age=31536000;samesite=lax`;
    setVisible(false);
  }

  return (
    <div
      dir={locale === "en" ? "ltr" : "rtl"}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl bg-bg-card/95 p-4 shadow-lg ring-1 ring-white/10 backdrop-blur-lg sm:inset-x-auto sm:left-1/2 sm:right-auto sm:w-[42rem] sm:-translate-x-1/2"
      role="dialog"
      aria-live="polite"
    >
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-ink-200">
          {t.text}{" "}
          <Link href={t.privacy} className="text-brand-300 underline underline-offset-2 hover:text-brand-200">
            {t.more}
          </Link>
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 rounded-xl bg-wa px-5 py-2 text-sm font-bold text-white transition hover:bg-wa-dark"
        >
          {t.ok}
        </button>
      </div>
    </div>
  );
}
