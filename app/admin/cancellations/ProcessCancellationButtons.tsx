"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, RotateCcw, XCircle, Hand } from "lucide-react";

type Action =
  | "cancel_only"
  | "cancel_and_refund"
  | "cancel_refund_manual"
  | "reject";

export function ProcessCancellationButtons({
  requestId,
  refundEligible,
}: {
  requestId: string;
  refundEligible: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<null | Action>(null);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  async function process(action: Action) {
    if (!confirm(actionConfirmText(action))) return;
    setLoading(action);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/cancellation-requests/${requestId}/process`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, notes }),
        }
      );
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error || "שגיאה בעיבוד הבקשה");
        setLoading(null);
        return;
      }
      router.refresh();
    } catch {
      setError("שגיאת רשת. נסה שוב.");
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col gap-2 lg:w-72">
      <textarea
        placeholder="הערות (אופציונלי)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
        className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white placeholder:text-ink-500 ring-1 ring-white/10 focus:outline-none focus:ring-brand-500"
      />

      {refundEligible && (
        <>
          <button
            onClick={() => process("cancel_and_refund")}
            disabled={loading !== null}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-wa px-4 py-2 text-sm font-bold text-white transition hover:bg-wa/80 disabled:opacity-50"
            title="קורא ל-Tranzila API להחזיר אוטומטית. דורש שה-IP של Vercel ב-whitelist של Tranzila."
          >
            {loading === "cancel_and_refund" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RotateCcw className="h-4 w-4" />
            )}
            בטל + החזר אוטומטי (Tranzila API)
          </button>

          <button
            onClick={() => process("cancel_refund_manual")}
            disabled={loading !== null}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-600 disabled:opacity-50"
            title="מסמן את החשבונית כ-refunded ואת המנוי כ-cancelled — ביצוע ההחזר עצמו ידני בפאנל Tranzila."
          >
            {loading === "cancel_refund_manual" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Hand className="h-4 w-4" />
            )}
            בטל + סימון החזר ידני
          </button>
        </>
      )}

      <button
        onClick={() => process("cancel_only")}
        disabled={loading !== null}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-amber-600 disabled:opacity-50"
      >
        {loading === "cancel_only" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <CheckCircle2 className="h-4 w-4" />
        )}
        בטל בלבד (בלי החזר)
      </button>

      <button
        onClick={() => process("reject")}
        disabled={loading !== null}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-bold text-ink-200 ring-1 ring-white/10 transition hover:bg-white/10 disabled:opacity-50"
      >
        {loading === "reject" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <XCircle className="h-4 w-4" />
        )}
        דחה בקשה
      </button>

      {error && <div className="text-xs text-rose-300">{error}</div>}
    </div>
  );
}

function actionConfirmText(action: Action): string {
  switch (action) {
    case "cancel_and_refund":
      return "לבטל את המנוי ולבצע החזר אוטומטי דרך Tranzila API? הפעולה לא ניתנת לביטול.";
    case "cancel_refund_manual":
      return "לסמן את המנוי והחשבונית כמבוטלים? ביצוע ההחזר בפועל יהיה צריך להיעשות ידנית בפאנל Tranzila.";
    case "cancel_only":
      return "לבטל את המנוי בלי החזר? אם הלקוח דורש החזר, חזור והשתמש בכפתור 'בטל + החזר'.";
    case "reject":
      return "לדחות את הבקשה? המנוי יישאר פעיל.";
  }
}
