"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";

export function ActivateButton({
  userId,
  defaultPhone,
}: {
  userId: string;
  defaultPhone: string;
}) {
  const router = useRouter();
  const [phone, setPhone] = useState(defaultPhone);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-wa/10 px-3 py-1.5 text-xs font-bold text-wa ring-1 ring-wa/30 transition hover:bg-wa/20"
      >
        אישור הפעלה
      </button>
    );
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, phone: phone.trim() }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error || "שגיאה");
        setSubmitting(false);
        return;
      }
      setOpen(false);
      setSubmitting(false);
      router.refresh();
    } catch {
      setError("שגיאת רשת");
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-2">
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="מספר ששלח הפעלה"
        className="w-full rounded-lg bg-white/5 px-2 py-1 text-xs text-white ring-1 ring-white/10"
        dir="ltr"
      />
      {error && <div className="text-[10px] text-rose-400">{error}</div>}
      <div className="flex gap-1">
        <button
          onClick={submit}
          disabled={submitting || !phone.trim()}
          className="flex-1 rounded-lg bg-wa px-2 py-1 text-xs font-bold text-white disabled:opacity-50"
        >
          {submitting ? <Loader2 className="mx-auto h-3 w-3 animate-spin" /> : <CheckCircle2 className="mx-auto h-3 w-3" />}
        </button>
        <button
          onClick={() => setOpen(false)}
          disabled={submitting}
          className="rounded-lg bg-white/5 px-2 py-1 text-xs text-ink-300"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
