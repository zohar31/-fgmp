"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";

export function CheckoutButton({
  userId,
  email,
  contact,
  phone,
  myid,
  amount,
}: {
  userId: string;
  email: string;
  contact: string;
  phone: string;
  myid: string;
  amount: number;
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
        body: JSON.stringify({ userId, email, contact, phone, myid, amount }),
      });
      const json = (await res.json()) as { ok?: boolean; redirectUrl?: string; error?: string };
      if (!res.ok || !json.ok || !json.redirectUrl) {
        setError(json.error || "שגיאה בפתיחת דף תשלום");
        setLoading(false);
        return;
      }
      // Redirect to Tranzila hosted page
      window.location.href = json.redirectUrl;
    } catch {
      setError("שגיאת רשת. נסה שוב.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={startCheckout}
        disabled={loading}
        className="btn-wa w-full text-base disabled:opacity-50 sm:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            פותח דף תשלום...
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5" />
            המשך לתשלום — {amount} ₪/חודש
          </>
        )}
      </button>
      {error && (
        <div className="text-sm text-rose-400">{error}</div>
      )}
    </div>
  );
}
