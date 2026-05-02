"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2, Check, AlertCircle, Clock } from "lucide-react";

type PushStatus = "pending" | "delivered" | "failed";

type PushHistoryItem = {
  id: string;
  status: PushStatus;
  pushedAt: string;
  ackAt: string | null;
  errorMessage: string | null;
};

export function PushToExtensionButton({
  userId,
  disabled,
  disabledReason,
}: {
  userId: string;
  disabled: boolean;
  disabledReason?: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [history, setHistory] = useState<PushHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [flash, setFlash] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  async function loadHistory() {
    try {
      const res = await fetch(`/api/admin/users/${userId}/push-to-extension`);
      const json = (await res.json()) as { ok?: boolean; pushes?: PushHistoryItem[] };
      if (json.ok && json.pushes) setHistory(json.pushes);
    } catch {}
  }

  useEffect(() => {
    loadHistory();
    // רענון הסטטוס כל 10 שנ׳ אם יש pending
    const id = setInterval(() => {
      if (history.some((p) => p.status === "pending")) loadHistory();
    }, 10_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function send() {
    setSubmitting(true);
    setFlash(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}/push-to-extension`, {
        method: "POST",
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; pushId?: string };
      if (!res.ok || !json.ok) {
        setFlash({ type: "err", msg: json.error || "שליחה נכשלה" });
      } else {
        setFlash({ type: "ok", msg: "נשלח לתור — התוסף יקבל בעוד עד 30 שניות" });
        await loadHistory();
        router.refresh();
      }
    } catch {
      setFlash({ type: "err", msg: "שגיאת רשת" });
    } finally {
      setSubmitting(false);
      setTimeout(() => setFlash(null), 6000);
    }
  }

  const lastPush = history[0];
  const hasPendingPush = history.some((p) => p.status === "pending");

  if (disabled) {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-2 text-xs text-ink-500 ring-1 ring-white/10"
        title={disabledReason}
      >
        <Send className="h-3.5 w-3.5" />
        שלח לתוסף (לא זמין)
      </span>
    );
  }

  return (
    <div className="flex flex-col items-stretch gap-1.5 sm:items-end">
      <button
        onClick={send}
        disabled={submitting || hasPendingPush}
        className="inline-flex items-center gap-1.5 rounded-xl bg-wa/10 px-3 py-2 text-sm font-bold text-wa ring-1 ring-wa/30 transition hover:bg-wa/20 disabled:opacity-50"
      >
        {submitting ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : hasPendingPush ? (
          <Clock className="h-3.5 w-3.5" />
        ) : (
          <Send className="h-3.5 w-3.5" />
        )}
        {hasPendingPush ? "ממתין לתוסף..." : "📤 שלח לתוסף"}
      </button>

      {flash && (
        <span
          className={`text-xs ${flash.type === "ok" ? "text-wa" : "text-rose-400"}`}
        >
          {flash.type === "ok" ? "✓ " : "✗ "}
          {flash.msg}
        </span>
      )}

      {lastPush && !flash && (
        <button
          type="button"
          onClick={() => setShowHistory((v) => !v)}
          className="text-xs text-ink-400 underline-offset-2 hover:underline"
        >
          {statusLabel(lastPush)} · {showHistory ? "סגור היסטוריה" : `${history.length} pushes`}
        </button>
      )}

      {showHistory && history.length > 0 && (
        <div className="mt-1 w-full max-w-xs rounded-lg bg-white/[0.03] p-2 text-[11px] ring-1 ring-white/5">
          <ul className="space-y-1">
            {history.slice(0, 5).map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1">
                  {iconFor(p.status)}
                  <span className={colorFor(p.status)}>{labelFor(p.status)}</span>
                </span>
                <time className="text-ink-500" dir="ltr">
                  {new Date(p.pushedAt).toLocaleString("he-IL", {
                    timeZone: "Asia/Jerusalem",
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function iconFor(s: PushStatus) {
  if (s === "delivered") return <Check className="h-3 w-3 text-wa" />;
  if (s === "failed") return <AlertCircle className="h-3 w-3 text-rose-400" />;
  return <Clock className="h-3 w-3 text-amber-400" />;
}

function colorFor(s: PushStatus) {
  if (s === "delivered") return "text-wa";
  if (s === "failed") return "text-rose-400";
  return "text-amber-400";
}

function labelFor(s: PushStatus) {
  if (s === "delivered") return "נשלח בהצלחה";
  if (s === "failed") return "נכשל";
  return "ממתין";
}

function statusLabel(p: PushHistoryItem) {
  if (p.status === "delivered") return "✓ נשלח לתוסף";
  if (p.status === "failed") return "✗ נכשל בשליחה אחרונה";
  return "🟡 ממתין לתוסף";
}
