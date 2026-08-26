"use client";

import { useState } from "react";
import { SITE_EN } from "@/lib/config-en";

function fmt(n: number, digits = 0): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export function LeadsTargetCalculatorEn() {
  const [goal, setGoal] = useState("10000");
  const [deal, setDeal] = useState("500");
  const [close, setClose] = useState("15");

  const g = Math.max(0, parseFloat(goal) || 0);
  const d = Math.max(0, parseFloat(deal) || 0);
  const c = Math.max(0, Math.min(100, parseFloat(close) || 0)) / 100;

  const customers = d > 0 ? g / d : NaN;
  const leads = c > 0 && isFinite(customers) ? customers / c : NaN;
  const leadsPerDay = isFinite(leads) ? leads / 30 : NaN;
  const price = SITE_EN.pricing.monthlyUSD;

  return (
    <div className="not-prose">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Monthly revenue goal ($)" value={goal} onChange={setGoal} />
        <Field label="Avg. deal size ($)" value={deal} onChange={setDeal} />
        <Field label="Close rate (%)" value={close} onChange={setClose} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Customers needed/mo" value={fmt(customers)} />
        <Stat label="Leads needed/mo" value={fmt(leads)} highlight />
        <Stat label="Leads per day" value={fmt(leadsPerDay, 1)} />
      </div>

      <p className="mt-4 rounded-xl bg-brand-500/10 p-4 text-center text-sm text-brand-100 ring-1 ring-brand-500/20">
        To hit ${fmt(g)}/month you need about <strong>{fmt(leads)} leads</strong>. FGMP delivers
        unlimited Facebook-group leads for a flat ${price}/month.
      </p>
      <p className="mt-3 text-xs text-ink-400">
        Working backwards: customers = revenue goal ÷ deal size. Leads = customers ÷ close rate.
        Improving your close rate lowers the number of leads you need.
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

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-2xl bg-white/[0.03] p-5 text-center ring-1 ring-white/10">
      <div className={`font-display text-3xl font-extrabold ${highlight ? "text-brand-300" : "text-white"}`}>
        {value}
      </div>
      <div className="mt-1 text-xs text-ink-400">{label}</div>
    </div>
  );
}
