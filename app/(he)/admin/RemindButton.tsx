"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Loader2, Check } from "lucide-react";

export function RemindButton({
  userId,
  size = "md",
}: {
  userId: string;
  size?: "sm" | "md";
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}/remind`, {
        method: "POST",
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error || "שליחה נכשלה");
        setSubmitting(false);
        return;
      }
      setDone(true);
      setSubmitting(false);
      router.refresh();
      setTimeout(() => setDone(false), 4000);
    } catch {
      setError("שגיאת רשת");
      setSubmitting(false);
    }
  }

  const sizeCls =
    size === "sm"
      ? "px-2.5 py-1 text-xs"
      : "px-3 py-2 text-sm";

  if (error) {
    return (
      <span className="text-xs text-rose-400" title={error}>
        ✗ {error.length > 20 ? "שליחה נכשלה" : error}
      </span>
    );
  }

  if (done) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-wa">
        <Check className="h-3.5 w-3.5" />
        נשלח
      </span>
    );
  }

  return (
    <button
      onClick={send}
      disabled={submitting}
      className={`inline-flex items-center gap-1.5 rounded-xl bg-brand-500/10 font-bold text-brand-300 ring-1 ring-brand-500/30 transition hover:bg-brand-500/20 disabled:opacity-50 ${sizeCls}`}
    >
      {submitting ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Mail className="h-3.5 w-3.5" />
      )}
      שלח תזכורת
    </button>
  );
}
