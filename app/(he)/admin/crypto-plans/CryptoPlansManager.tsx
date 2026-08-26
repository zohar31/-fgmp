"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2, Save, AlertCircle } from "lucide-react";

type Plan = {
  id: string;
  months: number;
  priceUsd: number;
  label: string | null;
  badge: string | null;
  active: boolean;
  sortOrder: number;
};

type Draft = {
  months: string;
  priceUsd: string;
  label: string;
  badge: string;
  active: boolean;
  sortOrder: string;
};

function toDraft(p: Plan): Draft {
  return {
    months: String(p.months),
    priceUsd: String(p.priceUsd),
    label: p.label ?? "",
    badge: p.badge ?? "",
    active: p.active,
    sortOrder: String(p.sortOrder),
  };
}

const EMPTY: Draft = { months: "", priceUsd: "", label: "", badge: "", active: true, sortOrder: "0" };

export function CryptoPlansManager({ plans, monthlyUsd }: { plans: Plan[]; monthlyUsd: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Draft>>(
    Object.fromEntries(plans.map((p) => [p.id, toDraft(p)]))
  );
  const [newDraft, setNewDraft] = useState<Draft>(EMPTY);

  function perMonth(d: Draft) {
    const m = Number(d.months), p = Number(d.priceUsd);
    if (!m || !p) return null;
    return { pm: p / m, disc: Math.round((1 - p / m / monthlyUsd) * 100) };
  }

  async function call(body: unknown, key: string) {
    setBusy(key);
    setError(null);
    try {
      const res = await fetch("/api/admin/crypto-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error || "שגיאה בשמירה");
        setBusy(null);
        return;
      }
      if (key === "new") setNewDraft(EMPTY);
      router.refresh();
    } catch {
      setError("שגיאת רשת. נסה שוב.");
    }
    setBusy(null);
  }

  const draftToPlan = (d: Draft) => ({
    months: Number(d.months),
    priceUsd: Number(d.priceUsd),
    label: d.label,
    badge: d.badge,
    active: d.active,
    sortOrder: Number(d.sortOrder || "0"),
  });

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 p-3 text-sm text-rose-200 ring-1 ring-rose-500/30">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-right text-sm">
          <thead className="text-xs text-ink-400">
            <tr>
              <th className="pb-2 font-medium">חודשים</th>
              <th className="pb-2 font-medium">מחיר ($)</th>
              <th className="pb-2 font-medium">לחודש / הנחה</th>
              <th className="pb-2 font-medium">תווית</th>
              <th className="pb-2 font-medium">Badge</th>
              <th className="pb-2 font-medium">סדר</th>
              <th className="pb-2 font-medium">פעיל</th>
              <th className="pb-2 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {plans.map((p) => {
              const d = drafts[p.id] ?? toDraft(p);
              const set = (patch: Partial<Draft>) =>
                setDrafts((s) => ({ ...s, [p.id]: { ...d, ...patch } }));
              const calc = perMonth(d);
              return (
                <tr key={p.id}>
                  <td className="py-2 pl-2"><input value={d.months} onChange={(e) => set({ months: e.target.value })} className="w-16 rounded-lg bg-white/5 px-2 py-1 text-white ring-1 ring-white/10" /></td>
                  <td className="py-2 pl-2"><input value={d.priceUsd} onChange={(e) => set({ priceUsd: e.target.value })} className="w-20 rounded-lg bg-white/5 px-2 py-1 text-white ring-1 ring-white/10" /></td>
                  <td className="py-2 pl-2 text-ink-300">{calc ? `$${calc.pm.toFixed(0)}/חו׳ · ${calc.disc}%-` : "—"}</td>
                  <td className="py-2 pl-2"><input value={d.label} onChange={(e) => set({ label: e.target.value })} className="w-28 rounded-lg bg-white/5 px-2 py-1 text-white ring-1 ring-white/10" /></td>
                  <td className="py-2 pl-2"><input value={d.badge} onChange={(e) => set({ badge: e.target.value })} className="w-24 rounded-lg bg-white/5 px-2 py-1 text-white ring-1 ring-white/10" /></td>
                  <td className="py-2 pl-2"><input value={d.sortOrder} onChange={(e) => set({ sortOrder: e.target.value })} className="w-12 rounded-lg bg-white/5 px-2 py-1 text-white ring-1 ring-white/10" /></td>
                  <td className="py-2 pl-2"><input type="checkbox" checked={d.active} onChange={(e) => set({ active: e.target.checked })} className="h-4 w-4" /></td>
                  <td className="py-2">
                    <div className="flex gap-1">
                      <button onClick={() => call({ action: "update", id: p.id, plan: draftToPlan(d) }, p.id)} disabled={busy !== null} className="inline-flex items-center gap-1 rounded-lg bg-wa px-2.5 py-1.5 text-xs font-bold text-white hover:bg-wa/80 disabled:opacity-50">
                        {busy === p.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                        שמור
                      </button>
                      <button onClick={() => { if (confirm("למחוק את החבילה?")) call({ action: "delete", id: p.id }, p.id); }} disabled={busy !== null} className="inline-flex items-center rounded-lg bg-white/5 px-2 py-1.5 text-xs text-rose-300 ring-1 ring-white/10 hover:bg-rose-500/10 disabled:opacity-50">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add new */}
      <div className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/5">
        <div className="mb-2 text-xs font-bold text-ink-300">➕ חבילה חדשה</div>
        <div className="flex flex-wrap items-center gap-2">
          <input placeholder="חודשים" value={newDraft.months} onChange={(e) => setNewDraft({ ...newDraft, months: e.target.value })} className="w-20 rounded-lg bg-white/5 px-2 py-1.5 text-sm text-white ring-1 ring-white/10" />
          <input placeholder="מחיר $" value={newDraft.priceUsd} onChange={(e) => setNewDraft({ ...newDraft, priceUsd: e.target.value })} className="w-24 rounded-lg bg-white/5 px-2 py-1.5 text-sm text-white ring-1 ring-white/10" />
          <input placeholder="תווית" value={newDraft.label} onChange={(e) => setNewDraft({ ...newDraft, label: e.target.value })} className="w-32 rounded-lg bg-white/5 px-2 py-1.5 text-sm text-white ring-1 ring-white/10" />
          <input placeholder="Badge (Save 20%)" value={newDraft.badge} onChange={(e) => setNewDraft({ ...newDraft, badge: e.target.value })} className="w-32 rounded-lg bg-white/5 px-2 py-1.5 text-sm text-white ring-1 ring-white/10" />
          <input placeholder="סדר" value={newDraft.sortOrder} onChange={(e) => setNewDraft({ ...newDraft, sortOrder: e.target.value })} className="w-16 rounded-lg bg-white/5 px-2 py-1.5 text-sm text-white ring-1 ring-white/10" />
          <label className="flex items-center gap-1 text-xs text-ink-300"><input type="checkbox" checked={newDraft.active} onChange={(e) => setNewDraft({ ...newDraft, active: e.target.checked })} className="h-4 w-4" /> פעיל</label>
          <button onClick={() => call({ action: "create", plan: draftToPlan(newDraft) }, "new")} disabled={busy !== null || !newDraft.months || !newDraft.priceUsd} className="inline-flex items-center gap-1 rounded-lg bg-brand-500 px-3 py-1.5 text-sm font-bold text-white hover:bg-brand-600 disabled:opacity-50">
            {busy === "new" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            הוסף
          </button>
        </div>
      </div>
    </div>
  );
}
