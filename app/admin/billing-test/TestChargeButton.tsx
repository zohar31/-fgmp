"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";

export function TestChargeButton({
  userId,
  email,
  contact,
  phone,
  myid,
}: {
  userId: string;
  email: string;
  contact: string;
  phone: string;
  myid: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/billing/start-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email, contact, phone, myid, amount: 1 }),
      });
      const json = (await res.json()) as { ok?: boolean; redirectUrl?: string; error?: string };
      if (!res.ok || !json.ok || !json.redirectUrl) {
        setError(json.error || "שגיאה בפתיחת דף תשלום");
        setLoading(false);
        return;
      }
      window.location.href = json.redirectUrl;
    } catch {
      setError("שגיאת רשת. נסה שוב.");
      setLoading(false);
    }
  }

  return (
    <div className="card border-l-4 border-rose-500 p-6">
      <h2 className="mb-2 font-display font-bold text-white">⚠️ בדיקת חיוב אמיתי — 1 ₪</h2>
      <p className="mb-5 text-sm leading-7 text-ink-200">
        לחיצה על הכפתור תוביל לדף Tranzila עם סכום של 1 ₪. הזן כרטיס אמיתי שלך —
        החיוב יבוצע בפועל. אחרי שתאמת שהכל עובד, תוכל להחזיר ב-Tranzila.
      </p>
      <button
        onClick={startCheckout}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-6 py-3 font-bold text-white transition hover:bg-rose-600 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            פותח...
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5" />
            חייב 1 ₪ — בדיקה אמיתית
          </>
        )}
      </button>
      {error && <div className="mt-3 text-sm text-rose-400">{error}</div>}
    </div>
  );
}
