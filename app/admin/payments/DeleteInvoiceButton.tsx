"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

export function DeleteInvoiceButton({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onClick() {
    if (!confirm("למחוק את החשבונית הזו? זה לא יבצע החזר ב-Tranzila — רק ינקה את השורה מהטבלה.")) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/invoices/${invoiceId}/delete`, {
        method: "POST",
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        alert(json.error || "שגיאה במחיקה");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      alert("שגיאת רשת");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={loading}
      title="מחק שורה"
      className="rounded-lg p-1.5 text-ink-500 transition hover:bg-rose-500/10 hover:text-rose-300 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </button>
  );
}
