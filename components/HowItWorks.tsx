"use client";

import { useEffect, useState } from "react";
import { Sparkles, MessageCircle, Bell, ChevronLeft } from "lucide-react";
import { TelegramIcon } from "./TelegramIcon";

const STEP_COUNT = 4;
const STEP_DURATION = 2800;

export function HowItWorks() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setStep((s) => (s + 1) % STEP_COUNT),
      STEP_DURATION
    );
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      aria-label="הדגמת זרימת ליד"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="pill text-brand-300 ring-brand-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            הדגמה חיה
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl text-balance">
            מפוסט בקבוצה{" "}
            <span className="gradient-text">עד התראה אצלך — בפחות מדקה</span>
          </h2>
          <p className="mt-4 text-ink-300">
            הצצה לאיך נראה ליד אחד — מהרגע שהוא מתפרסם ועד שהוא מצפצף לך
          </p>
        </div>

        <div
          className="card relative mt-12 overflow-hidden p-5 sm:p-8 lg:p-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 -z-0 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-32 -z-0 h-80 w-80 rounded-full bg-wa/20 blur-3xl"
          />

          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
            <Phase active={step >= 0} hot={step === 0} num={1} title="פוסט בקבוצה">
              <FacebookCard hot={step === 0} />
            </Phase>

            <Arrow active={step >= 1} />

            <Phase active={step >= 1} hot={step === 1} num={2} title="AI מנתח">
              <AiBlock hot={step === 1} />
            </Phase>

            <Arrow active={step >= 2} />

            <Phase active={step >= 2} hot={step === 2} num={3} title="התראה יוצאת">
              <SendingBlock hot={step === 2} />
            </Phase>

            <Arrow active={step >= 3} />

            <Phase active={step >= 3} hot={step === 3} num={4} title="אתה מקבל">
              <NotificationCard hot={step === 3} />
            </Phase>
          </div>

          <div className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2">
              {Array.from({ length: STEP_COUNT }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPaused(true);
                    setStep(i);
                  }}
                  aria-label={`עבור לשלב ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    step === i
                      ? "w-10 bg-brand-400"
                      : "w-2 bg-white/15 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-ink-400">
              {paused ? "⏸ מושהה — הזז את העכבר החוצה כדי להמשיך" : "▶ מתנגן אוטומטית"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Phase({
  active,
  hot,
  num,
  title,
  children,
}: {
  active: boolean;
  hot: boolean;
  num: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative rounded-2xl p-4 transition-all duration-500 ${
        hot
          ? "bg-white/[0.06] ring-1 ring-brand-500/50 shadow-[0_0_40px_-10px_rgba(139,92,246,0.6)]"
          : active
            ? "bg-white/[0.03] ring-1 ring-white/10"
            : "bg-white/[0.02] ring-1 ring-white/5 opacity-60"
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
            hot
              ? "bg-brand-500 text-white"
              : active
                ? "bg-brand-500/30 text-brand-200"
                : "bg-white/5 text-ink-400"
          }`}
        >
          {num}
        </span>
        <span
          className={`text-sm font-bold transition-colors ${
            hot ? "text-white" : "text-ink-200"
          }`}
        >
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function Arrow({ active }: { active: boolean }) {
  return (
    <div
      className="hidden self-center md:flex"
      aria-hidden
    >
      <ChevronLeft
        className={`h-6 w-6 transition-all duration-500 ${
          active ? "text-brand-400 scale-110" : "text-white/15"
        }`}
      />
    </div>
  );
}

function FacebookCard({ hot }: { hot: boolean }) {
  return (
    <div
      className={`rounded-xl bg-[#1c1e21] p-3 text-right ring-1 ring-white/10 transition-all duration-500 ${
        hot ? "scale-[1.02]" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white">
          מ
        </div>
        <div className="min-w-0 flex-1 text-xs">
          <div className="truncate font-semibold text-white">מיכל לוי</div>
          <div className="text-[10px] text-ink-400">
            קבוצה: כלות 2026 ❤️ · לפני {hot ? "כעת" : "2 דקות"}
          </div>
        </div>
        <span className="text-blue-400">f</span>
      </div>
      <p className="mt-2 text-[13px] leading-5 text-ink-100">
        מחפשת קונדיטוריה לחתונה ב-15.6 באזור המרכז. תקציב 4-5K. ממליצות? 🎂
      </p>
      <div className="mt-2 flex items-center gap-3 border-t border-white/5 pt-2 text-[10px] text-ink-400">
        <span>👍 12</span>
        <span>💬 8</span>
        <span>↪ 2</span>
      </div>
    </div>
  );
}

function AiBlock({ hot }: { hot: boolean }) {
  return (
    <div className="space-y-3">
      <div className="relative grid h-28 place-items-center">
        <span
          className={`absolute h-14 w-14 rounded-full bg-brand-500/20 ${
            hot ? "animate-ping" : ""
          }`}
        />
        <span
          className={`absolute h-20 w-20 rounded-full bg-brand-500/10 ${
            hot ? "animate-ping" : ""
          }`}
          style={{ animationDelay: "0.4s" }}
        />
        <div
          className={`relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-wa text-white shadow-lg transition-transform duration-500 ${
            hot ? "scale-110" : "scale-100"
          }`}
        >
          <Sparkles className="h-5 w-5" />
        </div>
      </div>
      <div
        className={`rounded-lg bg-brand-500/10 px-2 py-1.5 text-center text-[11px] text-brand-200 ring-1 ring-brand-500/30 transition-opacity ${
          hot ? "opacity-100" : "opacity-50"
        }`}
      >
        ✓ ליד רלוונטי — קונדיטוריה
      </div>
    </div>
  );
}

function SendingBlock({ hot }: { hot: boolean }) {
  return (
    <div className="flex h-28 items-center justify-center gap-3">
      <div
        className={`flex flex-col items-center gap-1 rounded-xl bg-wa/10 p-3 ring-1 ring-wa/30 transition-all duration-500 ${
          hot ? "scale-110" : "scale-100"
        }`}
      >
        <MessageCircle className="h-6 w-6 text-wa" />
        <span className="text-[10px] font-medium text-wa">WhatsApp</span>
      </div>
      <span className="text-2xl text-ink-500">·</span>
      <div
        className={`flex flex-col items-center gap-1 rounded-xl bg-[#229ED9]/10 p-3 ring-1 ring-[#229ED9]/30 transition-all duration-500 ${
          hot ? "scale-110" : "scale-100"
        }`}
      >
        <TelegramIcon className="h-6 w-6" />
        <span className="text-[10px] font-medium text-[#5BBDE7]">Telegram</span>
      </div>
    </div>
  );
}

function NotificationCard({ hot }: { hot: boolean }) {
  return (
    <div className="relative">
      {hot && (
        <span className="absolute -right-2 -top-2 grid h-6 w-6 animate-bounce place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-lg ring-2 ring-bg">
          1
        </span>
      )}
      <div
        className={`rounded-xl bg-[#0b141a] p-3 text-right ring-1 ring-white/10 transition-all duration-500 ${
          hot ? "scale-[1.02]" : ""
        }`}
      >
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-wa text-[10px] font-bold text-white">
            F
          </div>
          <div className="text-xs">
            <div className="font-semibold text-white">FGMP</div>
            <div className="text-[10px] text-emerald-300">פעיל עכשיו</div>
          </div>
          <Bell className="ms-auto h-3.5 w-3.5 text-wa" />
        </div>
        <div className="mt-2 rounded-lg bg-emerald-700 p-2 text-[11px] text-white">
          <div className="text-[10px] font-bold text-emerald-200">🔥 ליד חדש מקבוצה</div>
          <div className="mt-0.5 leading-4">
            "מחפשת קונדיטוריה לחתונה ב-15.6, מרכז, ₪4-5K"
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[9px] text-emerald-300">
            <span>קבוצה: כלות 2026 ❤️</span>
            <span>{hot ? "12:47 ✓✓" : "12:47"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
