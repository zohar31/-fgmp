"use client";

import { useState } from "react";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export function CancelForm({ refundEligible, daysLeft, en = false }: {
  refundEligible: boolean;
  daysLeft: number;
  en?: boolean;
}) {
  const [confirming, setConfirming] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

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
        setError(json.error || (en ? "Error sending the request" : "שגיאה בשליחת הבקשה"));
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
      setSubmitting(false);
    } catch {
      setError(en ? "Network error. Please try again." : "שגיאה ברשת. נסו שוב.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="card border-l-4 border-wa p-6" dir={en ? "ltr" : "rtl"}>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-wa" />
          <div>
            <h3 className="font-display font-bold text-white">
              {en ? "Your request was sent to the FGMP refunds team" : "הבקשה הועברה למחלקת זיכויים FGMP"}
            </h3>
            <p className="mt-2 text-sm text-ink-200">
              {refundEligible
                ? (en
                    ? `You're within the full money-back window (${daysLeft} day(s) left). If the request is approved, a full refund of the first charge will be issued to your card within a few business days.`
                    : `אתה בתוך חלון ההחזר המלא (${daysLeft} ימים נותרו). אם הבקשה תאושר, יבוצע גם החזר מלא של החיוב הראשון לכרטיסך תוך מספר ימי עסקים.`)
                : (en ? "We'll get back to you shortly via WhatsApp or in your account." : "נחזור אליך בהקדם דרך וואטסאפ או באזור האישי.")}
            </p>
            <p className="mt-3 text-xs text-ink-400">
              {en
                ? "Until the request is approved — your subscription is still active. If something changed, you can keep using the service."
                : "עד לאישור הבקשה — המנוי שלך עדיין פעיל. אם משהו השתנה, אפשר להמשיך להשתמש בשירות."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!confirming) {
    return (
      <div className="card p-6" dir={en ? "ltr" : "rtl"}>
        <button
          onClick={() => setConfirming(true)}
          className="text-rose-400 hover:text-rose-300"
        >
          {en ? "I want to cancel my subscription" : "אני רוצה לבטל את המנוי"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card border-l-4 border-rose-500 p-6" dir={en ? "ltr" : "rtl"}>
      <h3 className="font-display text-lg font-bold text-white">{en ? "Cancellation request" : "בקשת ביטול מנוי"}</h3>
      <p className="mt-1 text-sm text-ink-300">
        {en
          ? "Cancellation is handled by our refunds team (admin) — not automatic. We'd love to know the reason."
          : "הביטול יבוצע ע\"י מחלקת הזיכויים שלנו (אדמין) — לא ביטול אוטומטי. נשמח לדעת מה הסיבה."}
      </p>

      {refundEligible && (
        <div className="mt-4 rounded-xl bg-wa/10 p-3 text-sm text-wa ring-1 ring-wa/30">
          {en
            ? `✓ You're within the full money-back window (${daysLeft} day(s) left). If the request is approved, we'll refund the amount charged.`
            : `✓ אתה בתוך חלון ההחזר המלא (${daysLeft} ימים נותרו). אם הבקשה תאושר, נחזיר את הכסף שחויב.`}
        </div>
      )}

      <div className="mt-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-100">
            {en ? "Cancellation reason (optional)" : "סיבת ביטול (לא חובה)"}
          </span>
          <textarea
            name="reason"
            rows={3}
            maxLength={400}
            className="input"
            placeholder={en ? "e.g. not enough leads, too expensive, found another solution..." : "לדוגמה: לא היו מספיק לידים, מחיר גבוה מדי, מצאתי פתרון אחר..."}
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
          {en ? "Back" : "חזרה"}
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-500 px-6 py-3 font-bold text-white transition hover:bg-rose-600 disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {en ? "Sending..." : "שולח..."}
            </>
          ) : (
            en ? "Send cancellation request" : "שלח בקשת ביטול"
          )}
        </button>
      </div>
    </form>
  );
}
