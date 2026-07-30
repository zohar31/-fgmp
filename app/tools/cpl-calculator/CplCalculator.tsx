"use client";

import { useState } from "react";

function fmt(n: number): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("he-IL", { maximumFractionDigits: 1 });
}

export function CplCalculator() {
  const [spend, setSpend] = useState("3000");
  const [leads, setLeads] = useState("40");

  const s = Math.max(0, parseFloat(spend) || 0);
  const l = Math.max(0, parseFloat(leads) || 0);
  const cpl = l > 0 ? s / l : NaN;
  const fgmpCpl = l > 0 ? 299 / l : NaN;
  const saving = isFinite(cpl) && isFinite(fgmpCpl) ? cpl - fgmpCpl : NaN;

  return (
    <div className="not-prose">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="הוצאה חודשית על הערוץ (₪)" value={spend} onChange={setSpend} placeholder="3000" />
        <Field label="כמות לידים בחודש" value={leads} onChange={setLeads} placeholder="40" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/[0.03] p-6 text-center ring-1 ring-white/10">
          <div className="text-sm text-ink-400">העלות שלך לליד</div>
          <div className="mt-1 font-display text-4xl font-extrabold text-white">
            {fmt(cpl)} <span className="text-xl">₪</span>
          </div>
        </div>
        <div className="rounded-2xl bg-wa/10 p-6 text-center ring-1 ring-wa/30">
          <div className="text-sm text-wa/80">אותם לידים ב-FGMP (299₪/חודש)</div>
          <div className="mt-1 font-display text-4xl font-extrabold text-wa">
            {fmt(fgmpCpl)} <span className="text-xl">₪</span>
          </div>
        </div>
      </div>

      {isFinite(saving) && saving > 0 && (
        <p className="mt-4 rounded-xl bg-brand-500/10 p-4 text-center text-sm text-brand-100 ring-1 ring-brand-500/20">
          חיסכון של <strong>{fmt(saving)} ₪ לליד</strong> — כלומר <strong>{fmt(saving * l)} ₪ בחודש</strong> על אותה כמות לידים.
        </p>
      )}
      <p className="mt-3 text-xs text-ink-400">
        עלות לליד (CPL) = סך ההוצאה על הערוץ חלקי מספר הלידים שהתקבלו ממנו. עלות FGMP מחושבת לפי מנוי
        קבוע של 299 ₪ ללא הגבלת לידים.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink-200">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir="ltr"
        className="mt-2 w-full rounded-xl bg-white/[0.04] px-4 py-3 text-lg text-white ring-1 ring-white/10 outline-none focus:ring-brand-500/40"
      />
    </label>
  );
}
