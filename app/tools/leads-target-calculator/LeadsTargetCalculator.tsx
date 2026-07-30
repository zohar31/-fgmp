"use client";

import { useState } from "react";

function fmt(n: number, digits = 0): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("he-IL", { maximumFractionDigits: digits });
}

export function LeadsTargetCalculator() {
  const [goal, setGoal] = useState("30000");
  const [deal, setDeal] = useState("1500");
  const [close, setClose] = useState("15");

  const g = Math.max(0, parseFloat(goal) || 0);
  const d = Math.max(0, parseFloat(deal) || 0);
  const c = Math.max(0, Math.min(100, parseFloat(close) || 0)) / 100;

  const customers = d > 0 ? g / d : NaN;
  const leads = c > 0 && isFinite(customers) ? customers / c : NaN;
  const leadsPerDay = isFinite(leads) ? leads / 30 : NaN;

  return (
    <div className="not-prose">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="יעד הכנסה חודשי (₪)" value={goal} onChange={setGoal} />
        <Field label="שווי עסקה ממוצע (₪)" value={deal} onChange={setDeal} />
        <Field label="שיעור סגירה (%)" value={close} onChange={setClose} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="לקוחות שצריך בחודש" value={fmt(customers)} />
        <Stat label="לידים שצריך בחודש" value={fmt(leads)} highlight />
        <Stat label="לידים ביום" value={fmt(leadsPerDay, 1)} />
      </div>

      <p className="mt-4 rounded-xl bg-brand-500/10 p-4 text-center text-sm text-brand-100 ring-1 ring-brand-500/20">
        כדי להגיע ל-{fmt(g)} ₪ בחודש, אתה צריך כ-<strong>{fmt(leads)} לידים</strong>. FGMP מביאה
        לידים ללא הגבלה מקבוצות פייסבוק ב-299 ₪/חודש קבוע.
      </p>
      <p className="mt-3 text-xs text-ink-400">
        החישוב עובד אחורה: לקוחות = יעד הכנסה ÷ שווי עסקה. לידים = לקוחות ÷ שיעור סגירה. שיפור שיעור
        הסגירה מקטין את כמות הלידים הדרושה.
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
        dir="ltr"
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
