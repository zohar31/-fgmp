"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2, MessageCircle, ArrowLeft, Sparkles, X, Plus } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
  "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri",
  "Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
  "Washington, D.C.",
];

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

const STR = {
  he: {
    secBusiness: "פרטי העסק",
    bizName: "שם העסק", bizNamePh: "לדוגמה: עוגות חופית",
    contactName: "שם איש קשר", contactNamePh: "לדוגמה: חופית חדד",
    vatId: "ח.פ. / ע.מ. / ת.ז.", vatHint: "9 ספרות — חברה (ח.פ.), עוסק מורשה (ע.מ.) או יחיד (ת.ז.)", vatPh: "9 ספרות", vatRequired: true,
    email: "אימייל ליצירת קשר",
    secChannels: "ערוצי קבלת לידים",
    leadPhone: "מספר WhatsApp לקבלת לידים", leadPhoneHint: "זהו המספר שאליו יישלחו הלידים. ודא/י שאת/ה מקבל/ת WhatsApp במספר זה — בשלב ההפעלה תצטרך/י לשלוח הודעה מהמספר הזה.", leadPhonePh: "לדוגמה: 0501234567 או +972501234567",
    telegram: "שם משתמש בטלגרם (אופציונלי)", telegramHint: "להוספת ערוץ קבלת לידים בטלגרם. תמיכה בטלגרם תושק בקרוב.", telegramPh: "לדוגמה: @yourname",
    secService: "הגדרות שירות",
    niche: "תחום עיסוק", nicheHint: "כתבו במילים שלכם — לדוגמה: סוכן ביטוח, קונדיטוריה, שיפוצניק, מאלפת כלבים.", nichePh: "לדוגמה: סוכן ביטוח, מנעולן, צלם אירועים",
    areas: "אזורי שירות", areasHint: "ארצי = פעילות בכל הארץ. מקומי = פעילות באזור/עיר ספציפיים — נא לציין.",
    national: "🇮🇱 ארצי — בכל הארץ", local: "📍 מקומי — אזור ספציפי", localPh: "לדוגמה: תל אביב והסביבה, חיפה, מרכז הארץ, ירושלים...",
    keywords: "מילות מפתח לסינון", keywordsHint: "מילים שמופיעות בפוסטים שאת/ה רוצה לקבל. הפרידו בפסיקים, או השתמשו בכפתור AI להלן להצעות אוטומטיות.", keywordsPh: "לדוגמה: עוגה, ימי הולדת, אירועים, קייטרינג",
    aiThinking: "AI חושב...", aiSuggest: "🪄 הצע לי מילות מפתח אוטומטית (AI)",
    aiSuggested: (n: number) => `✨ AI הציע ${n} מילות מפתח — לחיצה מוסיפה/מסירה`, addAll: "הוסף הכל", closeBtn: "סגור",
    desc: "תיאור חופשי", descHint: "הוסיפו הקשר נוסף שיעזור ל-AI לסנן: סוג לקוחות, מחירים, ייחודיות, מה לא רלוונטי.", descPh: "לדוגמה: מאפיית בוטיק עם דגש על עוגות מעוצבות לאירועים. תקציב מינימום 800₪. לא רלוונטי: עוגות יום הולדת קטנות לילדים.",
    saving: "שומר...", submitLong: "כמעט סיימנו — שמירה והמשך להפעלת WhatsApp", submitShort: "שמירה והמשך ל-WhatsApp",
    errNiche: "יש למלא את תחום העיסוק", errLocal: "יש לציין באיזה אזור/עיר אתם פועלים", errSave: "שגיאה בשמירה", errNet: "שגיאה ברשת. נסו שוב.", errNiche2: "מלאו את תחום העיסוק קודם, ואז נציע מילות מפתח מתאימות.", errSuggest: "שגיאה בקבלת הצעות", errSuggestNet: "שגיאת רשת",
  },
  en: {
    secBusiness: "Business details",
    bizName: "Business name", bizNamePh: "e.g. Austin Pro Plumbing",
    contactName: "Contact name", contactNamePh: "e.g. John Smith",
    vatId: "Tax ID / EIN (optional)", vatHint: "Optional — leave blank if you don't have one.", vatPh: "Optional", vatRequired: false,
    email: "Contact email",
    secChannels: "Where to receive leads",
    leadPhone: "WhatsApp number for leads", leadPhoneHint: "This is the number leads are sent to. Make sure you have WhatsApp on it — during activation you'll send a message from this number.", leadPhonePh: "512 555 0123", phonePrefix: "+1",
    telegram: "Telegram username (optional)", telegramHint: "To add Telegram as a lead channel. Telegram support is coming soon.", telegramPh: "e.g. @yourname",
    secService: "Service settings",
    niche: "Your trade", nicheHint: "In your own words — e.g. plumber, electrician, wedding photographer, house cleaner.", nichePh: "e.g. plumber, electrician, roofer",
    areas: "Service areas", areasHint: "Nationwide = all of the US. Local = a specific city/area — please specify.",
    national: "🇺🇸 Nationwide — all of the US", local: "📍 Local — specific area", localPh: "e.g. Houston and surrounding area, Austin metro, Dallas...",
    stateLabel: "State", statePh: "Select a state…", cityLabel: "City / area", cityPh: "e.g. Houston, Austin metro, North Dallas",
    keywords: "Filter keywords", keywordsHint: "Words that appear in the posts you want to receive. Separate with commas, or use the AI button below for automatic suggestions.", keywordsPh: "e.g. plumber, water heater, leak, repair",
    aiThinking: "AI thinking...", aiSuggest: "🪄 Suggest keywords automatically (AI)",
    aiSuggested: (n: number) => `✨ AI suggested ${n} keywords — tap to add/remove`, addAll: "Add all", closeBtn: "Close",
    desc: "Free description", descHint: "Add context to help the AI filter: type of customers, pricing, what makes you unique, what's NOT relevant.", descPh: "e.g. Licensed plumber serving Houston. Focus on repairs and installs. Not relevant: commercial jobs or new construction.",
    saving: "Saving...", submitLong: "Almost done — save & continue to WhatsApp activation", submitShort: "Save & continue to WhatsApp",
    errNiche: "Please enter your trade", errLocal: "Please specify which area/city you serve", errState: "Please select a state and enter a city", errSave: "Error saving", errNet: "Network error. Please try again.", errNiche2: "Fill in your trade first, then we'll suggest matching keywords.", errSuggest: "Error getting suggestions", errSuggestNet: "Network error",
  },
} as const;

export function SetupForm({ defaults, locale = "he" }: { defaults: Defaults; locale?: Locale }) {
  const router = useRouter();
  const en = locale === "en";
  const t = STR[locale];
  const formRef = useRef<HTMLFormElement>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "error"; msg: string } | null>(null);
  const [keywords, setKeywords] = useState(defaults.keywords ?? "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggest, setLoadingSuggest] = useState(false);
  const [suggestError, setSuggestError] = useState<string | null>(null);

  const [niche, setNiche] = useState<string>(defaults.niche ?? "");
  const isNational =
    defaults.serviceAreas?.includes("ארצי") ||
    defaults.serviceAreas === "ארצי" ||
    /nationwide/i.test(defaults.serviceAreas || "");
  const [serviceAreaMode, setServiceAreaMode] = useState<"national" | "local">(isNational ? "national" : "local");
  const effectiveNiche = niche.trim();

  const selectedSet = new Set(keywords.split(",").map((s) => s.trim()).filter(Boolean));
  function setKeywordsFromList(list: string[]) {
    setKeywords([...new Set(list.filter(Boolean))].join(", "));
  }
  function toggleKeyword(kw: string) {
    const list = keywords.split(",").map((s) => s.trim()).filter(Boolean);
    if (list.includes(kw)) setKeywordsFromList(list.filter((k) => k !== kw));
    else setKeywordsFromList([...list, kw]);
  }
  function addAllSuggestions() {
    const list = keywords.split(",").map((s) => s.trim()).filter(Boolean);
    setKeywordsFromList([...list, ...suggestions]);
  }

  async function fetchSuggestions() {
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    if (!effectiveNiche) {
      setSuggestError(t.errNiche2);
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
          locale,
        }),
      });
      const json = (await res.json()) as { keywords?: string[]; error?: string };
      if (!res.ok || !json.keywords) {
        setSuggestError(json.error || t.errSuggest);
        setLoadingSuggest(false);
        return;
      }
      setSuggestions(json.keywords);
      setLoadingSuggest(false);
    } catch {
      setSuggestError(t.errSuggestNet);
      setLoadingSuggest(false);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    if (!niche.trim()) {
      setStatus({ type: "error", msg: t.errNiche });
      setSaving(false);
      return;
    }
    const fd = new FormData(e.currentTarget);

    // ── Service areas ──
    let serviceAreasValue: string;
    if (serviceAreaMode === "national") {
      serviceAreasValue = en ? "Nationwide" : "ארצי";
    } else if (en) {
      const city = String(fd.get("localCity") || "").trim();
      const state = String(fd.get("localState") || "").trim();
      if (!city || !state) {
        setStatus({ type: "error", msg: STR.en.errState });
        setSaving(false);
        return;
      }
      serviceAreasValue = `Local — ${city}, ${state}`;
    } else {
      const localArea = String(fd.get("localArea") || "").trim();
      if (!localArea) {
        setStatus({ type: "error", msg: t.errLocal });
        setSaving(false);
        return;
      }
      serviceAreasValue = `מקומי — ${localArea}`;
    }

    // ── Lead phone — US gets a fixed +1 country code ──
    let leadPhone = String(fd.get("leadPhone") || "").trim();
    if (en && leadPhone) {
      const local = leadPhone.replace(/^\+?1[\s-]?/, "").trim();
      leadPhone = `+1 ${local}`;
    }

    const body = {
      businessName: String(fd.get("businessName") || "").trim(),
      contactName: String(fd.get("contactName") || "").trim(),
      vatId: String(fd.get("vatId") || "").trim(),
      contactEmail: String(fd.get("contactEmail") || "").trim(),
      leadPhone,
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
        setStatus({ type: "error", msg: json.error || t.errSave });
        setSaving(false);
        return;
      }
      router.push("/account");
    } catch {
      setStatus({ type: "error", msg: t.errNet });
      setSaving(false);
    }
  }

  const localDefault =
    defaults.serviceAreas?.startsWith("מקומי — ")
      ? defaults.serviceAreas.replace(/^מקומי — /, "")
      : defaults.serviceAreas?.startsWith("Local — ")
        ? defaults.serviceAreas.replace(/^Local — /, "")
        : !isNational
          ? defaults.serviceAreas ?? ""
          : "";

  // English "City, State" split (state = the part matching a known US state)
  const localParts = localDefault.split(",").map((s) => s.trim()).filter(Boolean);
  const localStateDefault = localParts.find((p) => US_STATES.includes(p)) ?? "";
  const localCityDefault = localParts.filter((p) => p !== localStateDefault).join(", ");

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-6" dir={en ? "ltr" : "rtl"}>
      <Section title={t.secBusiness}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t.bizName} required>
            <input name="businessName" defaultValue={defaults.businessName ?? ""} required minLength={2} maxLength={80} className="input" placeholder={t.bizNamePh} />
          </Field>
          <Field label={t.contactName} required>
            <input name="contactName" defaultValue={defaults.contactName ?? ""} required minLength={2} maxLength={80} className="input" placeholder={t.contactNamePh} />
          </Field>
          <Field label={t.vatId} hint={t.vatHint} required={t.vatRequired}>
            <input
              name="vatId"
              defaultValue={defaults.vatId ?? ""}
              required={t.vatRequired}
              pattern={en ? undefined : "\\d{9}"}
              maxLength={en ? 40 : 9}
              inputMode={en ? undefined : "numeric"}
              className="input"
              placeholder={t.vatPh}
              dir="ltr"
            />
          </Field>
          <Field label={t.email} required>
            <input name="contactEmail" type="email" defaultValue={defaults.contactEmail ?? ""} required maxLength={120} className="input" dir="ltr" />
          </Field>
        </div>
      </Section>

      <Section title={t.secChannels}>
        <Field label={t.leadPhone} hint={t.leadPhoneHint} required>
          {en ? (
            <div className="flex items-stretch gap-2" dir="ltr">
              <span className="grid shrink-0 place-items-center rounded-xl bg-white/5 px-3 text-sm font-bold text-ink-200 ring-1 ring-white/10">
                🇺🇸 {STR.en.phonePrefix}
              </span>
              <input
                name="leadPhone"
                type="tel"
                defaultValue={(defaults.leadPhone ?? "").replace(/^\+?1[\s-]?/, "")}
                required
                maxLength={20}
                className="input flex-1"
                placeholder={t.leadPhonePh}
                dir="ltr"
              />
            </div>
          ) : (
            <input name="leadPhone" type="tel" defaultValue={defaults.leadPhone ?? ""} required maxLength={20} className="input" placeholder={t.leadPhonePh} dir="ltr" />
          )}
        </Field>
        <Field label={t.telegram} hint={t.telegramHint}>
          <input name="telegramUsername" type="text" defaultValue={defaults.telegramUsername ?? ""} maxLength={40} pattern="@?[a-zA-Z0-9_]{4,32}" className="input" placeholder={t.telegramPh} dir="ltr" />
        </Field>
      </Section>

      <Section title={t.secService}>
        <Field label={t.niche} hint={t.nicheHint} required>
          <input name="niche" value={niche} onChange={(e) => setNiche(e.target.value)} required minLength={2} maxLength={80} className="input" placeholder={t.nichePh} />
        </Field>

        <Field label={t.areas} hint={t.areasHint} required>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setServiceAreaMode("national")}
                className={`rounded-xl px-4 py-3 text-sm font-bold ring-1 transition ${serviceAreaMode === "national" ? "bg-wa/15 text-wa ring-wa/40" : "bg-white/5 text-ink-200 ring-white/10 hover:bg-white/10"}`}>
                {t.national}
              </button>
              <button type="button" onClick={() => setServiceAreaMode("local")}
                className={`rounded-xl px-4 py-3 text-sm font-bold ring-1 transition ${serviceAreaMode === "local" ? "bg-brand-500/15 text-brand-300 ring-brand-500/40" : "bg-white/5 text-ink-200 ring-white/10 hover:bg-white/10"}`}>
                {t.local}
              </button>
            </div>
            {serviceAreaMode === "local" && (en ? (
              <div className="grid gap-2 sm:grid-cols-2">
                <select name="localState" defaultValue={localStateDefault} className="input" dir="ltr">
                  <option value="">{STR.en.statePh}</option>
                  {US_STATES.map((st) => (<option key={st} value={st}>{st}</option>))}
                </select>
                <input name="localCity" defaultValue={localCityDefault} maxLength={200} className="input" placeholder={STR.en.cityPh} dir="ltr" />
              </div>
            ) : (
              <input name="localArea" defaultValue={localDefault} required minLength={2} maxLength={400} className="input" placeholder={t.localPh} />
            ))}
          </div>
        </Field>

        <Field label={t.keywords} hint={t.keywordsHint} required>
          <div className="space-y-3">
            <textarea name="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} required minLength={2} maxLength={5000} rows={4} className="input" placeholder={t.keywordsPh} />
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={fetchSuggestions} disabled={loadingSuggest}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-brand-500/20 to-wa/20 px-4 py-2 text-sm font-bold text-white ring-1 ring-brand-500/40 transition hover:from-brand-500/30 hover:to-wa/30 disabled:opacity-50">
                {loadingSuggest ? (<><Loader2 className="h-4 w-4 animate-spin" />{t.aiThinking}</>) : (<><Sparkles className="h-4 w-4 text-brand-300" />{t.aiSuggest}</>)}
              </button>
              {suggestError && (<span className="flex items-center gap-1 text-xs text-rose-400"><AlertCircle className="h-3.5 w-3.5" />{suggestError}</span>)}
            </div>

            {suggestions.length > 0 && (
              <div className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs text-ink-300">{t.aiSuggested(suggestions.length)}</div>
                  <div className="flex gap-2">
                    <button type="button" onClick={addAllSuggestions} className="inline-flex items-center gap-1 rounded-lg bg-wa/10 px-2.5 py-1 text-xs font-bold text-wa ring-1 ring-wa/30 hover:bg-wa/20"><Plus className="h-3 w-3" />{t.addAll}</button>
                    <button type="button" onClick={() => setSuggestions([])} className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1 text-xs text-ink-300 ring-1 ring-white/10 hover:bg-white/10"><X className="h-3 w-3" />{t.closeBtn}</button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((kw) => {
                    const sel = selectedSet.has(kw);
                    return (
                      <button key={kw} type="button" onClick={() => toggleKeyword(kw)}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs ring-1 transition ${sel ? "bg-wa/20 text-wa ring-wa/40" : "bg-white/5 text-ink-200 ring-white/10 hover:bg-white/10 hover:ring-white/20"}`}>
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

        <Field label={t.desc} hint={t.descHint} required>
          <textarea name="description" defaultValue={defaults.description ?? ""} required minLength={20} maxLength={500} rows={4} className="input" placeholder={t.descPh} />
        </Field>
      </Section>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-h-[24px] text-sm">
          {status?.type === "error" && (<span className="flex items-center gap-2 text-rose-400"><AlertCircle className="h-4 w-4" />{status.msg}</span>)}
        </div>
        <button type="submit" disabled={saving} className="btn-wa w-full text-sm sm:w-auto sm:text-base disabled:opacity-60">
          {saving ? (<><Loader2 className="h-5 w-5 animate-spin" />{t.saving}</>) : (
            <>
              <MessageCircle className="h-5 w-5 shrink-0" />
              <span className="hidden sm:inline">{t.submitLong}</span>
              <span className="sm:hidden">{t.submitShort}</span>
              <ArrowLeft className={`h-4 w-4 shrink-0 ${en ? "rotate-180" : ""}`} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-6">
      <h2 className="mb-4 font-display text-lg font-bold text-white">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
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
