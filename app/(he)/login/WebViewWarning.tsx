"use client";

import { useState } from "react";
import { Copy, ExternalLink, Check, Smartphone } from "lucide-react";
import { Logo } from "@/components/Logo";

export function WebViewWarning({
  url,
  platform,
}: {
  url: string;
  platform: "android" | "ios" | "other";
}) {
  const [copied, setCopied] = useState(false);

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  // Android: chrome intent URL — sometimes opens Chrome directly
  const androidIntent = `intent://${url.replace(/^https?:\/\//, "")}#Intent;scheme=https;package=com.android.chrome;end`;

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="card p-8">
          <div className="mb-4 flex justify-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-amber-500/10 ring-1 ring-amber-500/30">
              <Smartphone className="h-7 w-7 text-amber-300" />
            </div>
          </div>

          <h1 className="text-center font-display text-xl font-extrabold text-white">
            יש לפתוח בדפדפן רגיל
          </h1>
          <p className="mt-3 text-center text-sm leading-6 text-ink-300">
            כדי להתחבר בבטחה עם Google, צריך לפתוח את הקישור בדפדפן רגיל
            (Chrome / Safari / Edge) ולא בדפדפן הפנימי של WhatsApp / Facebook /
            Instagram.
            <br />
            <span className="text-xs text-ink-400">
              (זו מדיניות אבטחה של Google, לא של האתר שלנו.)
            </span>
          </p>

          <div className="mt-6 space-y-4">
            {platform === "android" && (
              <Step
                num={1}
                title="פתיחה אוטומטית ב-Chrome"
                desc="לחיצה על הכפתור הבא תפתח את הקישור ב-Chrome (אם מותקן):"
              >
                <a
                  href={androidIntent}
                  className="mt-2 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600"
                >
                  <ExternalLink className="h-4 w-4" />
                  פתח ב-Chrome
                </a>
              </Step>
            )}

            <Step
              num={platform === "android" ? 2 : 1}
              title="או — פתיחה ידנית"
              desc={
                platform === "ios"
                  ? "לחץ/י על שלוש הנקודות (•••) למעלה → 'Open in Safari' / 'פתח ב-Safari'"
                  : platform === "android"
                    ? "לחץ/י על שלוש הנקודות (⋮) למעלה → 'Open in browser' / 'פתח בדפדפן'"
                    : "פתח/י את התפריט של הדפדפן הפנימי ובחר/י 'פתח בדפדפן חיצוני'"
              }
            />

            <Step
              num={platform === "android" ? 3 : 2}
              title="העתקה והדבקה ידנית"
              desc="או שאפשר להעתיק את הקישור ולהדביק בדפדפן רגיל:"
            >
              <div className="mt-2 flex items-stretch gap-2">
                <code
                  dir="ltr"
                  className="flex-1 truncate rounded-xl bg-white/5 px-3 py-2 text-xs text-ink-200 ring-1 ring-white/10"
                >
                  {url}
                </code>
                <button
                  onClick={copyUrl}
                  className="rounded-xl bg-white/10 px-3 py-2 text-xs font-medium text-white ring-1 ring-white/10 hover:bg-white/15"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-wa" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </Step>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ink-400">
          אם נתקלת בבעיה, פנה אלינו בוואטסאפ ל-058-5222227.
        </p>
      </div>
    </main>
  );
}

function Step({
  num,
  title,
  desc,
  children,
}: {
  num: number;
  title: string;
  desc: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/5">
      <div className="flex items-start gap-3">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/20 text-xs font-bold text-brand-300 ring-1 ring-brand-500/30">
          {num}
        </span>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-xs leading-6 text-ink-300">{desc}</div>
          {children}
        </div>
      </div>
    </div>
  );
}
