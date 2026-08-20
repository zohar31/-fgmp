"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { SITE_EN } from "@/lib/config-en";
import type { Locale } from "@/lib/i18n";

export function CheckoutButton({
  userId,
  email,
  contact,
  phone,
  myid,
  amount,
  locale = "he",
}: {
  userId: string;
  email: string;
  contact: string;
  phone: string;
  myid: string;
  amount: number;
  locale?: Locale;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const en = locale === "en";

  const t = en
    ? {
        opening: "Opening payment page...",
        // Display USD; the actual Tranzila charge is the ILS `amount`.
        cta: `Continue to payment — $${SITE_EN.pricing.monthlyUSD}/month`,
        errOpen: "Couldn't open the payment page",
        errNet: "Network error. Please try again.",
      }
    : {
        opening: "פותח דף תשלום...",
        cta: `המשך לתשלום — ${amount} ₪/חודש`,
        errOpen: "שגיאה בפתיחת דף תשלום",
        errNet: "שגיאת רשת. נסה שוב.",
      };

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
        setError(json.error || t.errOpen);
        setLoading(false);
        return;
      }
      window.location.href = json.redirectUrl;
    } catch {
      setError(t.errNet);
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
            {t.opening}
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5" />
            {t.cta}
          </>
        )}
      </button>
      {error && <div className="text-sm text-rose-400">{error}</div>}
    </div>
  );
}
