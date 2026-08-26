"use client";

import { useState } from "react";
import { Loader2, Bitcoin, AlertCircle } from "lucide-react";

type Plan = { id: string; months: number; priceUsd: number; label: string | null; badge: string | null };

const STR = {
  he: {
    title: "תשלום מראש בקריפטו (USDT)",
    sub: "חלופה למנוי החודשי — שלם תקופה מראש ב-USDT/USDC וקבל הנחה. אין התחייבות מתחדשת.",
    perMonth: "לחודש",
    pay: "שלם ב-קריפטו",
    err: "שגיאה ביצירת התשלום",
    net: "שגיאת רשת. נסה שוב.",
    months: (n: number) => `${n} חודשים`,
  },
  en: {
    title: "Prepay with crypto (USDT)",
    sub: "An alternative to the monthly plan — prepay a period in USDT/USDC and save. No recurring commitment.",
    perMonth: "/mo",
    pay: "Pay with crypto",
    err: "Error creating the payment",
    net: "Network error. Please try again.",
    months: (n: number) => `${n} months`,
  },
} as const;

export function CryptoCheckout({ plans, locale = "en" }: { plans: Plan[]; locale?: "he" | "en" }) {
  const t = STR[locale];
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!plans.length) return null;

  async function pay(planId: string) {
    setLoading(planId);
    setError(null);
    try {
      const res = await fetch("/api/billing/crypto/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const json = (await res.json()) as { ok?: boolean; invoiceUrl?: string; error?: string };
      if (!res.ok || !json.ok || !json.invoiceUrl) {
        setError(json.error || t.err);
        setLoading(null);
        return;
      }
      window.location.href = json.invoiceUrl;
    } catch {
      setError(t.net);
      setLoading(null);
    }
  }

  return (
    <div className="card p-6" dir={locale === "en" ? "ltr" : "rtl"}>
      <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
        <Bitcoin className="h-5 w-5 text-amber-300" />
        {t.title}
      </h2>
      <p className="mt-1 text-sm text-ink-300">{t.sub}</p>

      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-rose-500/10 p-3 text-sm text-rose-200 ring-1 ring-rose-500/30">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {plans.map((p) => {
          const pm = (p.priceUsd / p.months).toFixed(0);
          return (
            <div key={p.id} className="relative flex flex-col rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/10">
              {p.badge && (
                <span className="absolute -top-2 right-4 rounded-full bg-wa px-2 py-0.5 text-[11px] font-bold text-white">
                  {p.badge}
                </span>
              )}
              <div className="font-display text-lg font-bold text-white">{p.label || t.months(p.months)}</div>
              <div className="mt-2 font-display text-3xl font-extrabold text-white">${p.priceUsd}</div>
              <div className="text-xs text-ink-400">${pm}{t.perMonth}</div>
              <button
                onClick={() => pay(p.id)}
                disabled={loading !== null}
                className="btn-wa mt-4 w-full text-sm disabled:opacity-60"
              >
                {loading === p.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bitcoin className="h-4 w-4" />}
                {t.pay}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
