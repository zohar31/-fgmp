"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MessageCircle, Sparkles } from "lucide-react";
import { SITE, waLink } from "@/lib/config";

type Status = "idle" | "submitting" | "error";

export function SignupForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    business: "",
    service: "",
    whatsapp: "",
    email: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "אירעה שגיאה. נסו שוב.");
      }
      router.push("/thank-you");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "אירעה שגיאה. נסו שוב.";
      setError(msg);
      setStatus("error");
    }
  }

  return (
    <section id="signup" className="relative py-20 md:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <div className="pill text-wa ring-wa/30">
              <Sparkles className="h-3.5 w-3.5" />
              {SITE.pricing.trialDays} ימים חינם · ללא כרטיס אשראי
            </div>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl text-balance">
              בוא נתחיל —{" "}
              <span className="gradient-text">3 שדות וזהו</span>
            </h2>
            <p className="mt-4 text-ink-300">
              מלא את הפרטים, ותוך זמן קצר תקבל הודעה לוואטסאפ עם הסבר על השלבים הבאים.
            </p>
          </div>

          <form onSubmit={onSubmit} className="card p-6 md:p-8 space-y-5">
            <Field label="שם העסק" hint="איך הלקוחות מכירים אותך?">
              <input
                type="text"
                required
                minLength={2}
                maxLength={80}
                value={form.business}
                onChange={update("business")}
                placeholder="לדוגמה: צילומי אירועים מאת דניאל"
                className="input"
              />
            </Field>

            <Field label="תיאור קצר של השירות" hint="כמה מילים על מה שאתה מציע">
              <textarea
                required
                minLength={5}
                maxLength={400}
                rows={3}
                value={form.service}
                onChange={update("service")}
                placeholder="לדוגמה: צילום חתונות ובר/בת מצוות באזור המרכז"
                className="input resize-y min-h-[88px]"
              />
            </Field>

            <Field label="מספר וואטסאפ לקבלת לידים" hint="המערכת תשלח לכאן את כל ההתראות">
              <input
                type="tel"
                required
                pattern="^0\\d{1,2}[- ]?\\d{7}$|^\\+972\\d{8,9}$"
                value={form.whatsapp}
                onChange={update("whatsapp")}
                placeholder="050-0000000"
                className="input"
                inputMode="tel"
                dir="ltr"
              />
            </Field>

            <Field label="אימייל ליצירת קשר" hint="לאישור הרשמה ופרטים נוספים">
              <input
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                placeholder="name@example.com"
                className="input"
                dir="ltr"
              />
            </Field>

            {error && (
              <div className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300 ring-1 ring-rose-500/30">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-wa w-full text-base disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  שולחים...
                </>
              ) : (
                <>
                  <MessageCircle className="h-5 w-5" />
                  התחילו {SITE.pricing.trialDays} ימי ניסיון חינם
                </>
              )}
            </button>

            <p className="text-center text-xs text-ink-400">
              בלחיצה על הכפתור אתם מאשרים את{" "}
              <a href="/terms" className="underline hover:text-ink-200">
                התקנון
              </a>{" "}
              ואת{" "}
              <a href="/privacy" className="underline hover:text-ink-200">
                מדיניות הפרטיות
              </a>
              .
            </p>

            <div className="border-t border-white/5 pt-5 text-center">
              <span className="text-sm text-ink-400">מעדיפים וואטסאפ ישיר?</span>{" "}
              <a
                href={waLink(
                  "היי, אני רוצה להתחיל ניסיון חינם ב-FGMP. שם העסק: , תיאור השירות: , וואטסאפ: "
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-wa hover:underline"
              >
                שלחו הודעה לוואטסאפ
              </a>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 0.75rem 1rem;
          color: white;
          transition: all 0.15s ease;
        }
        :global(.input::placeholder) {
          color: rgba(148, 163, 184, 0.6);
        }
        :global(.input:focus) {
          outline: none;
          border-color: rgba(139, 92, 246, 0.6);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="font-medium text-white">{label}</span>
        {hint && <span className="text-xs text-ink-400">{hint}</span>}
      </div>
      {children}
    </label>
  );
}
