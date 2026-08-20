"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Accessibility, X, RotateCcw, Type, Eye, Link2, Pause, Focus, Palette } from "lucide-react";
import { localeFromPathname } from "@/lib/i18n";

const STR = {
  he: {
    openMenu: "פתח תפריט נגישות",
    menu: "תפריט נגישות",
    close: "סגור תפריט",
    fontSize: "גודל גופן",
    sizes: ["רגיל", "גדול", "גדול+", "ענק"],
    contrast: "ניגודיות",
    contrastOpts: ["רגיל", "גבוה", "הפוך"],
    display: "תצוגה",
    readableFont: "גופן קריא (Arial)",
    underline: "הדגשת קישורים",
    focus: "הדגשת אלמנט בפוקוס",
    noMotion: "עצירת אנימציות",
    reset: "איפוס הגדרות נגישות",
    statement: "הצהרת נגישות מלאה →",
    contact: "נתקלת בבעיית נגישות? צור קשר: 058-5222227",
    statementHref: "/accessibility",
  },
  en: {
    openMenu: "Open accessibility menu",
    menu: "Accessibility menu",
    close: "Close menu",
    fontSize: "Font size",
    sizes: ["Default", "Large", "Larger", "Huge"],
    contrast: "Contrast",
    contrastOpts: ["Default", "High", "Inverted"],
    display: "Display",
    readableFont: "Readable font (Arial)",
    underline: "Underline links",
    focus: "Highlight focused element",
    noMotion: "Stop animations",
    reset: "Reset accessibility settings",
    statement: "Full accessibility statement →",
    contact: "Found an accessibility issue? Contact: +972585222227",
    statementHref: "/en/accessibility",
  },
} as const;

type Settings = {
  fontSize: "default" | "large" | "xlarge" | "xxlarge";
  contrast: "default" | "high" | "inverted";
  readableFont: boolean;
  underlineLinks: boolean;
  focusHighlight: boolean;
  noMotion: boolean;
};

const DEFAULT_SETTINGS: Settings = {
  fontSize: "default",
  contrast: "default",
  readableFont: false,
  underlineLinks: false,
  focusHighlight: false,
  noMotion: false,
};

const STORAGE_KEY = "fgmp-a11y";

function applySettings(s: Settings) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;

  html.classList.remove(
    "a11y-font-large",
    "a11y-font-xlarge",
    "a11y-font-xxlarge",
    "a11y-contrast-high",
    "a11y-contrast-inverted",
    "a11y-readable-font",
    "a11y-underline-links",
    "a11y-focus-highlight",
    "a11y-no-motion"
  );

  if (s.fontSize === "large") html.classList.add("a11y-font-large");
  if (s.fontSize === "xlarge") html.classList.add("a11y-font-xlarge");
  if (s.fontSize === "xxlarge") html.classList.add("a11y-font-xxlarge");

  if (s.contrast === "high") html.classList.add("a11y-contrast-high");
  if (s.contrast === "inverted") html.classList.add("a11y-contrast-inverted");

  if (s.readableFont) html.classList.add("a11y-readable-font");
  if (s.underlineLinks) html.classList.add("a11y-underline-links");
  if (s.focusHighlight) html.classList.add("a11y-focus-highlight");
  if (s.noMotion) html.classList.add("a11y-no-motion");
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const t = STR[locale];

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } as Settings;
        setSettings(parsed);
        applySettings(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", onClickOutside);
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function update(patch: Partial<Settings>) {
    const next = { ...settings, ...patch };
    setSettings(next);
    applySettings(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }

  function reset() {
    setSettings(DEFAULT_SETTINGS);
    applySettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t.openMenu}
        aria-expanded={open}
        accessKey="a"
        data-fgmp-a11y-fab
        className="fgmp-a11y-fab fixed bottom-4 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-blue-600 text-white shadow-lg ring-4 ring-white/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-yellow-400"
      >
        <Accessibility className="h-7 w-7" aria-hidden />
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={t.menu}
          className="fixed bottom-20 right-4 z-50 w-[min(360px,calc(100vw-2rem))] rounded-2xl bg-bg-soft text-white shadow-2xl ring-1 ring-white/20"
          dir={locale === "en" ? "ltr" : "rtl"}
        >
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <div className="flex items-center gap-2">
              <Accessibility className="h-5 w-5 text-blue-400" />
              <h2 className="font-display text-lg font-bold">{t.menu}</h2>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="rounded-lg p-1 text-ink-300 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto p-4 space-y-5">
            <Group icon={Type} title={t.fontSize}>
              <div className="grid grid-cols-4 gap-1.5">
                {(["default", "large", "xlarge", "xxlarge"] as const).map((s, i) => (
                  <button
                    key={s}
                    onClick={() => update({ fontSize: s })}
                    aria-pressed={settings.fontSize === s}
                    className={`rounded-lg px-2 py-2 text-sm font-bold ring-1 transition ${
                      settings.fontSize === s
                        ? "bg-blue-600 text-white ring-blue-400"
                        : "bg-white/5 text-ink-200 ring-white/10 hover:bg-white/10"
                    }`}
                  >
                    {t.sizes[i]}
                  </button>
                ))}
              </div>
            </Group>

            <Group icon={Palette} title={t.contrast}>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { v: "default", label: t.contrastOpts[0] },
                  { v: "high", label: t.contrastOpts[1] },
                  { v: "inverted", label: t.contrastOpts[2] },
                ].map((opt) => (
                  <button
                    key={opt.v}
                    onClick={() => update({ contrast: opt.v as Settings["contrast"] })}
                    aria-pressed={settings.contrast === opt.v}
                    className={`rounded-lg px-2 py-2 text-sm font-bold ring-1 transition ${
                      settings.contrast === opt.v
                        ? "bg-blue-600 text-white ring-blue-400"
                        : "bg-white/5 text-ink-200 ring-white/10 hover:bg-white/10"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </Group>

            <Group icon={Eye} title={t.display}>
              <div className="space-y-2">
                <Toggle
                  label={t.readableFont}
                  active={settings.readableFont}
                  onChange={(v) => update({ readableFont: v })}
                />
                <Toggle
                  label={t.underline}
                  active={settings.underlineLinks}
                  onChange={(v) => update({ underlineLinks: v })}
                  icon={Link2}
                />
                <Toggle
                  label={t.focus}
                  active={settings.focusHighlight}
                  onChange={(v) => update({ focusHighlight: v })}
                  icon={Focus}
                />
                <Toggle
                  label={t.noMotion}
                  active={settings.noMotion}
                  onChange={(v) => update({ noMotion: v })}
                  icon={Pause}
                />
              </div>
            </Group>

            <button
              onClick={reset}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-ink-200 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
            >
              <RotateCcw className="h-4 w-4" />
              {t.reset}
            </button>

            <div className="border-t border-white/5 pt-3 text-xs text-ink-400">
              <a href={t.statementHref} className="text-blue-400 hover:underline">
                {t.statement}
              </a>
              <p className="mt-1">{t.contact}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Group({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-xs font-bold text-ink-300">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </div>
      {children}
    </div>
  );
}

function Toggle({
  label,
  active,
  onChange,
  icon: Icon,
}: {
  label: string;
  active: boolean;
  onChange: (v: boolean) => void;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <button
      onClick={() => onChange(!active)}
      role="switch"
      aria-checked={active}
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ring-1 ${
        active
          ? "bg-blue-600/20 text-white ring-blue-400/50"
          : "bg-white/5 text-ink-200 ring-white/10 hover:bg-white/10"
      }`}
    >
      <span className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4" />}
        {label}
      </span>
      <span
        className={`grid h-5 w-9 place-items-center rounded-full transition ${
          active ? "bg-blue-500" : "bg-white/10"
        }`}
      >
        <span
          className={`h-3.5 w-3.5 rounded-full bg-white transition-transform ${
            active ? "translate-x-2" : "-translate-x-2"
          }`}
        />
      </span>
    </button>
  );
}
