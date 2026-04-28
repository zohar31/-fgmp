"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pause, Play, Loader2, AlertCircle } from "lucide-react";

export function SuspendButton({
  userId,
  isSuspended,
}: {
  userId: string;
  isSuspended: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(action: "suspend" | "resume") {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}/suspend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, reason: reason.trim() }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error || "שגיאה");
        setSubmitting(false);
        return;
      }
      setOpen(false);
      setReason("");
      setSubmitting(false);
      router.refresh();
    } catch {
      setError("שגיאת רשת");
      setSubmitting(false);
    }
  }

  if (isSuspended) {
    return (
      <button
        onClick={() => submit("resume")}
        disabled={submitting}
        className="inline-flex items-center gap-2 rounded-xl bg-wa/10 px-3 py-2 text-xs font-bold text-wa ring-1 ring-wa/30 transition hover:bg-wa/20 disabled:opacity-50"
      >
        {submitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
        חידוש מנוי
      </button>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-300 ring-1 ring-amber-500/30 transition hover:bg-amber-500/20"
      >
        <Pause className="h-3.5 w-3.5" />
        השהיית מנוי
      </button>
    );
  }

  return (
    <div className="card border-l-4 border-amber-500 p-5">
      <div className="flex items-start gap-3">
        <Pause className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
        <div className="flex-1">
          <h3 className="font-display font-bold text-white">השהיית מנוי</h3>
          <p className="mt-1 text-sm text-ink-200">
            הלקוח יראה הודעה באזור האישי שהמנוי הושעה. ניתן להחזיר בכל עת.
          </p>

          <div className="mt-4">
            <label className="block">
              <span className="text-xs text-ink-400">סיבה (תוצג ללקוח, לא חובה)</span>
              <input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                maxLength={400}
                className="input mt-1"
                placeholder="לדוגמה: אי תשלום, חשד לשימוש לרעה, בקשת לקוח"
              />
            </label>
          </div>

          {error && (
            <div className="mt-3 flex items-center gap-2 text-sm text-rose-400">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              onClick={() => {
                setOpen(false);
                setReason("");
                setError(null);
              }}
              disabled={submitting}
              className="rounded-xl bg-white/5 px-4 py-2 text-sm font-bold text-ink-200 ring-1 ring-white/10 hover:bg-white/10"
            >
              ביטול
            </button>
            <button
              onClick={() => submit("suspend")}
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-amber-600 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  משהה...
                </>
              ) : (
                <>
                  <Pause className="h-4 w-4" />
                  אישור השהייה
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
