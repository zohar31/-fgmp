"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";

export function DeleteUserButton({
  userId,
  userLabel,
}: {
  userId: string;
  userLabel: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onDelete() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error || "שגיאה במחיקה");
        setSubmitting(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("שגיאת רשת");
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-rose-500/10 px-3 py-2 text-xs font-bold text-rose-300 ring-1 ring-rose-500/30 transition hover:bg-rose-500/20"
      >
        <Trash2 className="h-3.5 w-3.5" />
        מחיקת לקוח
      </button>
    );
  }

  return (
    <div className="card border-l-4 border-rose-500 p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-rose-400" />
        <div className="flex-1">
          <h3 className="font-display font-bold text-white">
            מחיקת לקוח: {userLabel}
          </h3>
          <p className="mt-1 text-sm text-ink-200">
            פעולה זו לא ניתנת לביטול. כל המידע הקשור ללקוח (הגדרות עסק, מנוי,
            הודעות, חשבוניות, sessions) יימחק לצמיתות.
          </p>

          <div className="mt-4">
            <label className="block">
              <span className="text-xs text-ink-400">
                הקלד <code className="rounded bg-white/5 px-1 text-rose-300">DELETE</code> כדי לאשר:
              </span>
              <input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="input mt-1"
                dir="ltr"
                placeholder="DELETE"
              />
            </label>
          </div>

          {error && (
            <div className="mt-3 text-sm text-rose-400">{error}</div>
          )}

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              onClick={() => {
                setOpen(false);
                setConfirmText("");
                setError(null);
              }}
              disabled={submitting}
              className="rounded-xl bg-white/5 px-4 py-2 text-sm font-bold text-ink-200 ring-1 ring-white/10 hover:bg-white/10"
            >
              ביטול
            </button>
            <button
              onClick={onDelete}
              disabled={submitting || confirmText !== "DELETE"}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-600 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  מוחק...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  מחיקה לצמיתות
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
