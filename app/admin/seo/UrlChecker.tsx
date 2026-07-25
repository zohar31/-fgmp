"use client";

import { useState } from "react";
import { Search, Loader2, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type Check = { name: string; status: "ok" | "warn" | "error"; detail?: string };

export function UrlChecker() {
  const [path, setPath] = useState("/guides/lead-price-list");
  const [loading, setLoading] = useState(false);
  const [checks, setChecks] = useState<Check[] | null>(null);
  const [checkedUrl, setCheckedUrl] = useState("");

  async function run() {
    setLoading(true);
    setChecks(null);
    try {
      const res = await fetch(`/api/admin/seo/check?path=${encodeURIComponent(path)}`);
      const data = await res.json();
      setChecks(data.checks || []);
      setCheckedUrl(data.url || "");
    } catch {
      setChecks([{ name: "שגיאת רשת", status: "error" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={path}
          onChange={(e) => setPath(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && run()}
          placeholder="/guides/... או /lidim/lidim-leshipuznik/tel-aviv"
          dir="ltr"
          className="flex-1 rounded-xl bg-white/[0.04] px-4 py-2.5 text-sm text-white ring-1 ring-white/10 outline-none placeholder:text-ink-500 focus:ring-brand-500/40"
        />
        <button
          onClick={run}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500/15 px-4 py-2.5 text-sm font-bold text-brand-200 ring-1 ring-brand-500/30 transition hover:bg-brand-500/25 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          בדוק
        </button>
      </div>

      {checkedUrl && (
        <div className="mt-3 text-xs text-ink-400" dir="ltr">
          {checkedUrl}
        </div>
      )}

      {checks && (
        <ul className="mt-3 space-y-2">
          {checks.map((c, i) => (
            <li
              key={i}
              className="flex items-start justify-between gap-3 rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/5"
            >
              <div className="flex items-start gap-3">
                {c.status === "ok" ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-wa" />
                ) : c.status === "warn" ? (
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                ) : (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                )}
                <div>
                  <div className="text-sm font-medium text-white">{c.name}</div>
                  {c.detail && <div className="text-xs text-ink-400">{c.detail}</div>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
