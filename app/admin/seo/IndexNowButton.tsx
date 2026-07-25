"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, XCircle } from "lucide-react";

type Result = { ok: boolean; status?: number; submitted?: number; body?: string; error?: string };

export function IndexNowButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function submit() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/seo/indexnow", { method: "POST" });
      setResult(await res.json());
    } catch {
      setResult({ ok: false, error: "שגיאת רשת" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={submit}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-500/15 px-4 py-2.5 text-sm font-bold text-brand-200 ring-1 ring-brand-500/30 transition hover:bg-brand-500/25 disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {loading ? "מגיש..." : "הגש את כל הדפים ל-IndexNow"}
      </button>

      {result && (
        <div
          className={`mt-3 flex items-start gap-2 rounded-xl p-3 text-sm ring-1 ${
            result.ok
              ? "bg-wa/5 text-wa ring-wa/20"
              : "bg-rose-500/5 text-rose-300 ring-rose-500/20"
          }`}
        >
          {result.ok ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          <div>
            {result.ok
              ? `הוגשו ${result.submitted} כתובות (סטטוס ${result.status}). Bing/Yandex יסרקו בקרוב.`
              : `נכשל: ${result.error || `סטטוס ${result.status}`}. ${result.body || ""}`}
          </div>
        </div>
      )}
    </div>
  );
}
