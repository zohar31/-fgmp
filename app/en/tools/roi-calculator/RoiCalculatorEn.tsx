"use client";

import { useState } from "react";
import { SITE_EN } from "@/lib/config-en";

function fmt(n: number, digits = 0): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export function RoiCalculatorEn() {
  const [spend, setSpend] = useState("1500");
  const [leads, setLeads] = useState("40");
  const [close, setClose] = useState("15");
  const [profit, setProfit] = useState("300");

  const s = Math.max(0, parseFloat(spend) || 0);
  const l = Math.max(0, parseFloat(leads) || 0);
  const c = Math.max(0, Math.min(100, parseFloat(close) || 0)) / 100;
  const p = Math.max(0, parseFloat(profit) || 0);

  const customers = l * c;
  const revenue = customers * p;
  const roi = s > 0 ? ((revenue - s) / s) * 100 : NaN;
  const cpa = customers > 0 ? s / customers : NaN;
  const price = SITE_EN.pricing.monthlyUSD;

  return (
    <div className="not-prose">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Monthly marketing spend ($)" value={spend} onChange={setSpend} />
        <Field label="Leads per month" value={leads} onChange={setLeads} />
        <Field label="Close rate (%)" value={close} onChange={setClose} />
        <Field label="Avg. profit per deal ($)" value={profit} onChange={setProfit} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Customers/mo" value={fmt(customers, 1)} />
        <Stat label="Revenue" value={`$${fmt(revenue)}`} />
        <Stat label="Cost per customer" value={`$${fmt(cpa)}`} />
        <Stat
          label="ROI"
          value={isFinite(roi) ? `${fmt(roi)}%` : "—"}
          tone={isFinite(roi) ? (roi >= 0 ? "good" : "bad") : "neutral"}
        />
      </div>

      <p className="mt-4 rounded-xl bg-brand-500/10 p-4 text-center text-sm text-brand-100 ring-1 ring-brand-500/20">
        The same {fmt(l)} leads through FGMP ($${price}/mo) would return an ROI of{" "}
        <strong>{s > 0 ? fmt(((revenue - price) / price) * 100) : "—"}%</strong> — because the cost is
        flat and low.
      </p>
      <p className="mt-3 text-xs text-ink-400">
        ROI = (revenue − cost) ÷ cost × 100. CPA = cost per paying customer — the metric that decides
        channel profitability, not cost per lead.
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

function Stat({ label, value, tone }: { label: string; value: string; tone?: "good" | "bad" | "neutral" }) {
  const color = tone === "good" ? "text-wa" : tone === "bad" ? "text-rose-400" : "text-white";
  return (
    <div className="rounded-2xl bg-white/[0.03] p-5 text-center ring-1 ring-white/10">
      <div className={`font-display text-2xl font-extrabold ${color}`}>{value}</div>
      <div className="mt-1 text-xs text-ink-400">{label}</div>
    </div>
  );
}
