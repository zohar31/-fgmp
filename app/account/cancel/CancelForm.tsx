"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";

export function CancelForm() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const reason = String(fd.get("reason") || "").trim();

    try {
      const res = await fetch("/api/account/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error || "שגיאה בביטול");
        setSubmitting(false);
        return;
      }
      router.refresh();
    } catch {
      setError("שגיאה ברשת. נסו שוב.");
      setSubmitting(false);
    }
  }

  if (!confirming) {
    return (
      <div className="card p-6">
        <button
          onClick={() => setConfirming(true)}
          className="text-rose-400 hover:text-rose-300"
        >
          אני רוצה לבטל את המנוי
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card border-l-4 border-rose-500 p-6">
      <h3 className="font-display text-lg font-bold text-white">אישור ביטול</h3>
      <p className="mt-1 text-sm text-ink-300">
        נשמח לדעת מה הסיבה — זה יעזור לנו להשתפר.
      </p>

      <div className="mt-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-100">
            סיבת ביטול (לא חובה)
          </span>
          <textarea
            name="reason"
            rows={3}
            maxLength={400}
            className="input"
            placeholder="לדוגמה: לא היו מספיק לידים, מחיר גבוה מדי, מצאתי פתרון אחר..."
          />
        </label>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-rose-400">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={submitting}
          className="rounded-2xl bg-white/5 px-6 py-3 font-bold text-ink-200 ring-1 ring-white/10 hover:bg-white/10"
        >
          חזרה
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-500 px-6 py-3 font-bold text-white transition hover:bg-rose-600 disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              מבטל...
            </>
          ) : (
            "אישור ביטול סופי"
          )}
        </button>
      </div>
    </form>
  );
}
