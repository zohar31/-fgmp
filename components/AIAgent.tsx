"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, X, Loader2, Sparkles } from "lucide-react";
import clsx from "clsx";
import { SITE, waLink } from "@/lib/config";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "איך זה עובד?",
  "כמה זה עולה?",
  "מתי אתחיל לקבל לידים?",
  "איך מבטלים?",
];

const GREETING: Msg = {
  role: "assistant",
  content: `היי! אני הסוכן החכם של ${SITE.brand} 👋\nאיך אני יכול לעזור?`,
};

export function AIAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const t = setTimeout(() => setHint(true), 5000);
    return () => clearTimeout(t);
  }, []);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setError(null);
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m !== GREETING),
        }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "אירעה שגיאה");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "אירעה שגיאה";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <>
      <div
        className={clsx(
          "fixed bottom-5 left-5 z-50 sm:bottom-6 sm:left-6",
          "transition-all duration-300",
          open ? "pointer-events-none translate-y-3 opacity-0" : "opacity-100"
        )}
      >
        {hint && !open && (
          <div className="absolute bottom-full mb-2 left-0 whitespace-nowrap rounded-2xl bg-bg-card px-4 py-2 text-sm text-white shadow-glow ring-1 ring-brand-500/40 animate-fade-up">
            יש לך שאלה? אני כאן 👋
          </div>
        )}
        <button
          onClick={() => setOpen(true)}
          aria-label="פתח צ׳אט"
          className="group relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow transition-all hover:scale-110"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-wa ring-2 ring-bg animate-pulse" />
        </button>
      </div>

      <div
        className={clsx(
          "fixed bottom-0 left-0 right-0 z-50 sm:bottom-6 sm:left-6 sm:right-auto",
          "transition-all duration-300",
          open
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-6 opacity-0 pointer-events-none"
        )}
      >
        <div className="mx-auto flex h-[80vh] max-h-[640px] w-full flex-col overflow-hidden bg-bg-card shadow-2xl ring-1 ring-white/10 sm:h-[560px] sm:w-[380px] sm:rounded-3xl">
          <div className="flex items-center justify-between gap-3 bg-gradient-to-l from-brand-700 to-brand-500 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-white/20 ring-1 ring-white/30">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="font-display font-bold leading-tight">סוכן {SITE.brand}</div>
                <div className="text-[11px] opacity-90">בדרך כלל עונה תוך כמה שניות</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="סגור צ׳אט"
              className="rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollerRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} content={m.content} />
            ))}
            {loading && messages[messages.length - 1]?.role !== "assistant" && (
              <Bubble role="assistant" content="..." typing />
            )}
            {error && (
              <div className="rounded-2xl bg-rose-500/10 px-3 py-2 text-sm text-rose-300 ring-1 ring-rose-500/30">
                {error}{" "}
                <a
                  href={waLink("היי, היה לי שאלה והצ׳אט באתר לא הצליח לענות")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline"
                >
                  פנה בוואטסאפ
                </a>
              </div>
            )}
          </div>

          {messages.length <= 1 && !loading && (
            <div className="flex flex-wrap gap-2 border-t border-white/5 px-4 py-3">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-ink-100 ring-1 ring-white/10 hover:bg-white/10 hover:ring-brand-500/40"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-end gap-2 border-t border-white/5 bg-bg p-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="הקלד הודעה..."
              rows={1}
              maxLength={1000}
              className="min-h-[44px] flex-1 resize-none rounded-2xl bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-ink-400 ring-1 ring-white/10 focus:bg-white/10 focus:outline-none focus:ring-brand-500/50"
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              aria-label="שלח"
              className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500 text-white shadow-glow transition-all hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Bubble({
  role,
  content,
  typing,
}: {
  role: "user" | "assistant";
  content: string;
  typing?: boolean;
}) {
  const isUser = role === "user";
  return (
    <div className={clsx("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={clsx(
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-brand-500 text-white rounded-tr-sm"
            : "bg-white/5 text-ink-100 ring-1 ring-white/10 rounded-tl-sm"
        )}
      >
        {typing ? (
          <span className="inline-flex gap-1">
            <Dot delay={0} />
            <Dot delay={150} />
            <Dot delay={300} />
          </span>
        ) : (
          content
        )}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ink-300"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}
