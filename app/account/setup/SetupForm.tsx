"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2, MessageCircle, ArrowLeft, Sparkles, X, Plus } from "lucide-react";

type Defaults = {
  businessName?: string | null;
  contactName?: string | null;
  vatId?: string | null;
  contactEmail?: string | null;
  leadPhone?: string | null;
  niche?: string | null;
  serviceAreas?: string | null;
  keywords?: string | null;
  description?: string | null;
  telegramUsername?: string | null;
};

export function SetupForm({ defaults }: { defaults: Defaults }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<
    { type: "ok" | "error"; msg: string } | null
  >(null);
  const [keywords, setKeywords] = useState(defaults.keywords ?? "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggest, setLoadingSuggest] = useState(false);
  const [suggestError, setSuggestError] = useState<string | null>(null);

  const [niche, setNiche] = useState<string>(defaults.niche ?? "");
  const [serviceAreaMode, setServiceAreaMode] = useState<"national" | "local">(
    defaults.serviceAreas?.includes("ארצי") || defaults.serviceAreas === "ארצי" ? "national" : "local"
  );
  const effectiveNiche = niche.trim();

  const selectedSet = new Set(
    keywords
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );

  function setKeywordsFromList(list: string[]) {
    setKeywords([...new Set(list.filter(Boolean))].join(", "));
  }

  function toggleKeyword(kw: string) {
    const list = keywords.split(",").map((s) => s.trim()).filter(Boolean);
    if (list.includes(kw)) {
      setKeywordsFromList(list.filter((k) => k !== kw));
    } else {
      setKeywordsFromList([...list, kw]);
    }
  }

  function addAllSuggestions() {
    const list = keywords.split(",").map((s) => s.trim()).filter(Boolean);
    setKeywordsFromList([...list, ...suggestions]);
  }

  async function fetchSuggestions() {
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    if (!effectiveNiche) {
      setSuggestError("מלאו את תחום העיסוק קודם, ואז נציע מילות מפתח מתאימות.");
      return;
    }
    setLoadingSuggest(true);
    setSuggestError(null);
    try {
      const res = await fetch("/api/account/suggest-keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche: effectiveNiche,
          businessName: String(fd.get("businessName") || ""),
          serviceAreas: String(fd.get("serviceAreas") || ""),
          description: String(fd.get("description") || ""),
        }),
      });
      const json = (await res.json()) as { keywords?: string[]; error?: string };
      if (!res.ok || !json.keywords) {
        setSuggestError(json.error || "שגיאה בקבלת הצעות");
        setLoadingSuggest(false);
        return;
      }
      setSuggestions(json.keywords);
      setLoadingSuggest(false);
    } catch {
      setSuggestError("שגיאת רשת");
      setLoadingSuggest(false);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    if (!niche.trim()) {
      setStatus({ type: "error", msg: "יש למלא את תחום העיסוק" });
      setSaving(false);
      return;
    }
    const localArea = String(new FormData(e.currentTarget).get("localArea") || "").trim();
    if (serviceAreaMode === "local" && !localArea) {
      setStatus({ type: "error", msg: "יש לציין באיזה אזור/עיר אתם פועלים" });
      setSaving(false);
      return;
    }

    const fd = new FormData(e.currentTarget);
    const serviceAreasValue = serviceAreaMode === "national" ? "ארצי" : `מקומי — ${localArea}`;
    const body = {
      businessName: String(fd.get("businessName") || "").trim(),
      contactName: String(fd.get("contactName") || "").trim(),
      vatId: String(fd.get("vatId") || "").trim(),
      contactEmail: String(fd.get("contactEmail") || "").trim(),
      leadPhone: String(fd.get("leadPhone") || "").trim(),
      niche: niche.trim(),
      serviceAreas: serviceAreasValue,
      keywords: keywords.trim(),
      description: String(fd.get("description") || "").trim(),
      telegramUsername: String(fd.get("telegramUsername") || "").trim(),
    };

    try {
      const res = await fetch("/api/account/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus({ type: "error", msg: json.error || "שגיאה בשמירה" });
        setSaving(false);
        return;
      }
      // הצלחה — מעבר ישיר ל-WhatsApp ללא באנר ביניים
      router.push("/account/whatsapp");
    } catch {
      setStatus({ type: "error", msg: "שגיאה ברשת. נסו שוב." });
      setSaving(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
      <Section title="פרטי העסק">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="שם העסק" required>
            <input
              name="businessName"
              defaultValue={defaults.businessName ?? ""}
              required
              minLength={2}
              maxLength={80}
              className="input"
              placeholder="לדוגמה: עוגות חופית"
            />
          </Field>
          <Field label="שם איש קשר" required>
            <input
              name="contactName"
              defaultValue={defaults.contactName ?? ""}
              required
              minLength={2}
              maxLength={80}
              className="input"
              placeholder="לדוגמה: חופית חדד"
            />
          </Field>
          <Field
            label="ח.פ. / ע.מ. / ת.ז."
            hint="9 ספרות — חברה (ח.פ.), עוסק מורשה (ע.מ.) או יחיד (ת.ז.)"
            required
          >
            <input
              name="vatId"
              defaultValue={defaults.vatId ?? ""}
              required
              pattern="\d{9}"
              maxLength={9}
              inputMode="numeric"
              className="input"
              placeholder="9 ספרות"
              dir="ltr"
            />
          </Field>
          <Field label="אימייל ליצירת קשר" required>
            <input
              name="contactEmail"
              type="email"
              defaultValue={defaults.contactEmail ?? ""}
              required
              maxLength={120}
              className="input"
              dir="ltr"
            />
          </Field>
        </div>
      </Section>

      <Section title="ערוצי קבלת לידים">
        <Field
          label="מספר WhatsApp לקבלת לידים"
          hint="זהו המספר שאליו יישלחו הלידים. ודא/י שאת/ה מקבל/ת WhatsApp במספר זה — בשלב ההפעלה תצטרך/י לשלוח הודעה מהמספר הזה."
          required
        >
          <input
            name="leadPhone"
            type="tel"
            defaultValue={defaults.leadPhone ?? ""}
            required
            maxLength={20}
            className="input"
            placeholder="לדוגמה: 0501234567 או +972501234567"
            dir="ltr"
          />
        </Field>

        <Field
          label="שם משתמש בטלגרם (אופציונלי)"
          hint="להוספת ערוץ קבלת לידים בטלגרם. תמיכה בטלגרם תושק בקרוב — הזנת שם המשתמש כעת תאפשר לנו להפעיל אותך אוטומטית."
        >
          <input
            name="telegramUsername"
            type="text"
            defaultValue={defaults.telegramUsername ?? ""}
            maxLength={40}
            pattern="@?[a-zA-Z0-9_]{4,32}"
            className="input"
            placeholder="לדוגמה: @yourname"
            dir="ltr"
          />
        </Field>
      </Section>

      <Section title="הגדרות שירות">
        <Field
          label="תחום עיסוק"
          hint="כתבו במילים שלכם — לדוגמה: סוכן ביטוח, קונדיטוריה, שיפוצניק, מאלפת כלבים."
          required
        >
          <input
            name="niche"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            required
            minLength={2}
            maxLength={80}
            className="input"
            placeholder="לדוגמה: סוכן ביטוח, מנעולן, צלם אירועים"
          />
        </Field>

        <Field
          label="אזורי שירות"
          hint='ארצי = פעילות בכל הארץ. מקומי = פעילות באזור/עיר ספציפיים — נא לציין.'
          required
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setServiceAreaMode("national")}
                className={`rounded-xl px-4 py-3 text-sm font-bold ring-1 transition ${
                  serviceAreaMode === "national"
                    ? "bg-wa/15 text-wa ring-wa/40"
                    : "bg-white/5 text-ink-200 ring-white/10 hover:bg-white/10"
                }`}
              >
                🇮🇱 ארצי — בכל הארץ
              </button>
              <button
                type="button"
                onClick={() => setServiceAreaMode("local")}
                className={`rounded-xl px-4 py-3 text-sm font-bold ring-1 transition ${
                  serviceAreaMode === "local"
                    ? "bg-brand-500/15 text-brand-300 ring-brand-500/40"
                    : "bg-white/5 text-ink-200 ring-white/10 hover:bg-white/10"
                }`}
              >
                📍 מקומי — אזור ספציפי
              </button>
            </div>
            {serviceAreaMode === "local" && (
              <input
                name="localArea"
                defaultValue={
                  defaults.serviceAreas?.startsWith("מקומי — ")
                    ? defaults.serviceAreas.replace(/^מקומי — /, "")
                    : !defaults.serviceAreas?.includes("ארצי")
                      ? defaults.serviceAreas ?? ""
                      : ""
                }
                required
                minLength={2}
                maxLength={400}
                className="input"
                placeholder="לדוגמה: תל אביב והסביבה, חיפה, מרכז הארץ, ירושלים..."
              />
            )}
          </div>
        </Field>

        <Field
          label="מילות מפתח לסינון"
          hint="מילים שמופיעות בפוסטים שאת/ה רוצה לקבל. הפרידו בפסיקים, או השתמשו בכפתור AI להלן להצעות אוטומטיות."
          required
        >
          <div className="space-y-3">
            <textarea
              name="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              required
              minLength={2}
              maxLength={5000}
              rows={4}
              className="input"
              placeholder="לדוגמה: עוגה, ימי הולדת, אירועים, קייטרינג"
            />

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={fetchSuggestions}
                disabled={loadingSuggest}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-brand-500/20 to-wa/20 px-4 py-2 text-sm font-bold text-white ring-1 ring-brand-500/40 transition hover:from-brand-500/30 hover:to-wa/30 disabled:opacity-50"
              >
                {loadingSuggest ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    AI חושב...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-brand-300" />
                    🪄 הצע לי מילות מפתח אוטומטית (AI)
                  </>
                )}
              </button>
              {suggestError && (
                <span className="flex items-center gap-1 text-xs text-rose-400">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {suggestError}
                </span>
              )}
            </div>

            {suggestions.length > 0 && (
              <div className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs text-ink-300">
                    ✨ AI הציע <strong className="text-white">{suggestions.length}</strong>{" "}
                    מילות מפתח — לחיצה מוסיפה/מסירה
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={addAllSuggestions}
                      className="inline-flex items-center gap-1 rounded-lg bg-wa/10 px-2.5 py-1 text-xs font-bold text-wa ring-1 ring-wa/30 hover:bg-wa/20"
                    >
                      <Plus className="h-3 w-3" />
                      הוסף הכל
                    </button>
                    <button
                      type="button"
                      onClick={() => setSuggestions([])}
                      className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1 text-xs text-ink-300 ring-1 ring-white/10 hover:bg-white/10"
                    >
                      <X className="h-3 w-3" />
                      סגור
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((kw) => {
                    const sel = selectedSet.has(kw);
                    return (
                      <button
                        key={kw}
                        type="button"
                        onClick={() => toggleKeyword(kw)}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs ring-1 transition ${
                          sel
                            ? "bg-wa/20 text-wa ring-wa/40"
                            : "bg-white/5 text-ink-200 ring-white/10 hover:bg-white/10 hover:ring-white/20"
                        }`}
                      >
                        {sel && <CheckCircle2 className="h-3 w-3" />}
                        {kw}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Field>

        <Field
          label="תיאור חופשי"
          hint="הוסיפו הקשר נוסף שיעזור ל-AI לסנן: סוג לקוחות, מחירים, ייחודיות, מה לא רלוונטי."
          required
        >
          <textarea
            name="description"
            defaultValue={defaults.description ?? ""}
            required
            minLength={20}
            maxLength={500}
            rows={4}
            className="input"
            placeholder="לדוגמה: מאפיית בוטיק עם דגש על עוגות מעוצבות לאירועים. תקציב מינימום 800₪. לא רלוונטי: עוגות יום הולדת קטנות לילדים."
          />
        </Field>
      </Section>


      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-h-[24px] text-sm">
          {status?.type === "error" && (
            <span className="flex items-center gap-2 text-rose-400">
              <AlertCircle className="h-4 w-4" />
              {status.msg}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={saving}
          className="btn-wa w-full text-sm sm:w-auto sm:text-base disabled:opacity-60"
        >
          {saving ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              שומר...
            </>
          ) : (
            <>
              <MessageCircle className="h-5 w-5 shrink-0" />
              <span className="hidden sm:inline">כמעט סיימנו — שמירה והמשך להפעלת WhatsApp</span>
              <span className="sm:hidden">שמירה והמשך ל-WhatsApp</span>
              <ArrowLeft className="h-4 w-4 shrink-0" />
            </>
          )}
        </button>
      </div>

    </form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card p-6">
      <h2 className="mb-4 font-display text-lg font-bold text-white">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-sm font-medium text-ink-100">
        {label}
        {required && <span className="text-rose-400">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-400">{hint}</span>}
    </label>
  );
}
