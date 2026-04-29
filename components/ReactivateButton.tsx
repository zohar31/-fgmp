"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Play, AlertCircle } from "lucide-react";

export function ReactivateButton({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function reactivate() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/account/reactivate", { method: "POST" });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error || "שגיאה בהפעלה מחדש");
        setSubmitting(false);
        return;
      }
      router.refresh();
    } catch {
      setError("שגיאת רשת");
      setSubmitting(false);
    }
  }

  const sizeCls = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  }[size];

  return (
    <div className={className}>
      <button
        onClick={reactivate}
        disabled={submitting}
        className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-wa font-bold text-white shadow-glow-wa transition hover:bg-wa-dark disabled:opacity-60 ${sizeCls}`}
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            מפעיל...
          </>
        ) : (
          <>
            <Play className="h-4 w-4" />
            הפעלת מנוי מחדש
          </>
        )}
      </button>
      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-sm text-rose-400">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
}
