"use client";

import { useState } from "react";
import { SITE_EN } from "@/lib/config-en";

function fmt(n: number, digits = 1): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export function CplCalculatorEn() {
  const [spend, setSpend] = useState("1500");
  const [leads, setLeads] = useState("40");

  const s = Math.max(0, parseFloat(spend) || 0);
  const l = Math.max(0, parseFloat(leads) || 0);
  const cpl = l > 0 ? s / l : NaN;
  const price = SITE_EN.pricing.monthlyUSD;
  const fgmpCpl = l > 0 ? price / l : NaN;
  const saving = isFinite(cpl) && isFinite(fgmpCpl) ? cpl - fgmpCpl : NaN;

  return (
    <div className="not-prose">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Monthly spend on this channel ($)" value={spend} onChange={setSpend} />
        <Field label="Leads per month" value={leads} onChange={setLeads} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/[0.03] p-6 text-center ring-1 ring-white/10">
          <div className="text-sm text-ink-400">Your cost per lead</div>
          <div className="mt-1 font-display text-4xl font-extrabold text-white">${fmt(cpl)}</div>
        </div>
        <div className="rounded-2xl bg-wa/10 p-6 text-center ring-1 ring-wa/30">
          <div className="text-sm text-wa/80">Same leads with FGMP (${price}/mo)</div>
          <div className="mt-1 font-display text-4xl font-extrabold text-wa">${fmt(fgmpCpl)}</div>
        </div>
      </div>

      {isFinite(saving) && saving > 0 && (
        <p className="mt-4 rounded-xl bg-brand-500/10 p-4 text-center text-sm text-brand-100 ring-1 ring-brand-500/20">
          You&apos;d save <strong>${fmt(saving)} per lead</strong> — about{" "}
          <strong>${fmt(saving * l, 0)}/month</strong> for the same number of leads.
        </p>
      )}
      <p className="mt-3 text-xs text-ink-400">
        Cost per lead (CPL) = total channel spend ÷ leads received. FGMP&apos;s cost is a flat $
        {price}/month with unlimited leads.
      </p>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink-200">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl bg-white/[0.04] px-4 py-3 text-lg text-white ring-1 ring-white/10 outline-none focus:ring-brand-500/40"
      />
    </label>
  );
}
