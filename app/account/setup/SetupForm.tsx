"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { NICHES, type Niche } from "@/lib/niches";
import { Select } from "@/components/Select";

type Defaults = {
  businessName?: string | null;
  contactName?: string | null;
  vatId?: string | null;
  contactEmail?: string | null;
  leadPhone?: string | null;
  niche?: string | null;
  serviceAreas?: string | null;
  keywords?: string | null;
  hoursStart?: string | null;
  hoursEnd?: string | null;
  description?: string | null;
};

export function SetupForm({ defaults }: { defaults: Defaults }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<
    { type: "ok" | "error"; msg: string } | null
  >(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    const fd = new FormData(e.currentTarget);
    const body = {
      businessName: String(fd.get("businessName") || "").trim(),
      contactName: String(fd.get("contactName") || "").trim(),
      vatId: String(fd.get("vatId") || "").trim(),
      contactEmail: String(fd.get("contactEmail") || "").trim(),
      leadPhone: String(fd.get("leadPhone") || "").trim(),
      niche: String(fd.get("niche") || "") as Niche,
      serviceAreas: String(fd.get("serviceAreas") || "").trim(),
      keywords: String(fd.get("keywords") || "").trim(),
      hoursStart: String(fd.get("hoursStart") || ""),
      hoursEnd: String(fd.get("hoursEnd") || ""),
      description: String(fd.get("description") || "").trim(),
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
      setStatus({ type: "ok", msg: "ההגדרות נשמרו בהצלחה" });
      setSaving(false);
      router.refresh();
    } catch {
      setStatus({ type: "error", msg: "שגיאה ברשת. נסו שוב." });
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
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
          <Field label="ח.פ. / עוסק מורשה" required>
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

      <Section title="WhatsApp לקבלת לידים">
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
      </Section>

      <Section title="הגדרות שירות">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="תחום עיסוק" required>
            <Select
              name="niche"
              options={NICHES}
              defaultValue={defaults.niche ?? ""}
              placeholder="בחרו תחום"
              required
            />
          </Field>
          <Field
            label="איזורי שירות"
            hint="ערים, אזורים, או רדיוס. הפרידו בפסיקים."
            required
          >
            <input
              name="serviceAreas"
              defaultValue={defaults.serviceAreas ?? ""}
              required
              minLength={2}
              maxLength={200}
              className="input"
              placeholder="לדוגמה: רמת גן, גבעתיים, פתח תקווה"
            />
          </Field>
        </div>

        <Field
          label="מילות מפתח לסינון"
          hint="מילים שמופיעות בפוסטים שאת/ה רוצה לקבל. הפרידו בפסיקים."
          required
        >
          <input
            name="keywords"
            defaultValue={defaults.keywords ?? ""}
            required
            minLength={2}
            maxLength={400}
            className="input"
            placeholder="לדוגמה: עוגה, ימי הולדת, אירועים, קייטרינג"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="שעת התחלה (לידים)" hint="ברירת מחדל: 24/7">
            <input
              name="hoursStart"
              type="time"
              defaultValue={defaults.hoursStart ?? ""}
              className="input"
              dir="ltr"
            />
          </Field>
          <Field label="שעת סיום (לידים)">
            <input
              name="hoursEnd"
              type="time"
              defaultValue={defaults.hoursEnd ?? ""}
              className="input"
              dir="ltr"
            />
          </Field>
        </div>

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
          {status?.type === "ok" && (
            <span className="flex items-center gap-2 text-wa">
              <CheckCircle2 className="h-4 w-4" />
              {status.msg}
            </span>
          )}
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
          className="btn-wa text-base disabled:opacity-60"
        >
          {saving ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              שומר...
            </>
          ) : (
            "שמירת הגדרות"
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
