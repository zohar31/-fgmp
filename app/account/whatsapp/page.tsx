import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { CheckCircle2, AlertCircle, MessageCircle, Settings } from "lucide-react";
import { SITE } from "@/lib/config";

export const metadata: Metadata = { title: "הפעלת WhatsApp" };

export default async function WhatsAppActivationPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [subscription, settings] = await Promise.all([
    db.query.subscriptions.findFirst({
      where: eq(schema.subscriptions.userId, userId),
    }),
    db.query.businessSettings.findFirst({
      where: eq(schema.businessSettings.userId, userId),
    }),
  ]);

  const setupComplete = !!(
    settings?.businessName &&
    settings?.contactName &&
    settings?.niche &&
    settings?.leadPhone &&
    settings?.keywords
  );

  if (!setupComplete) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="font-display text-3xl font-extrabold text-white">
            הפעלת WhatsApp
          </h1>
        </header>
        <div className="card border-l-4 border-amber-500 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
            <div className="flex-1">
              <h3 className="font-display font-bold text-white">
                יש להשלים קודם את הגדרות העסק
              </h3>
              <p className="mt-1 text-sm text-ink-300">
                הפעלת ה-WhatsApp שולחת את הגדרות העסק שמילאת — לכן צריך לסיים אותן קודם.
              </p>
              <Link
                href="/account/setup"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <Settings className="h-4 w-4" />
                המשך להגדרות
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (subscription?.activatedAt) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="font-display text-3xl font-extrabold text-white">
            הפעלת WhatsApp
          </h1>
        </header>
        <div className="card border-l-4 border-wa p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-wa" />
            <div className="flex-1">
              <h3 className="font-display font-bold text-white">המערכת פעילה ✓</h3>
              <p className="mt-1 text-sm text-ink-300">
                ה-WhatsApp שלך הופעל בתאריך{" "}
                {new Date(subscription.activatedAt).toLocaleString("he-IL", {
                  timeZone: "Asia/Jerusalem",
                })}
                . לידים אמורים להגיע למספר{" "}
                <span dir="ltr">{subscription.activatedFromPhone || settings.leadPhone}</span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const message = buildActivationMessage({
    token: subscription!.activationToken,
    businessName: settings.businessName ?? "",
    contactName: settings.contactName ?? "",
    niche: settings.niche ?? "",
    serviceAreas: settings.serviceAreas ?? "",
    keywords: settings.keywords ?? "",
    leadPhone: settings.leadPhone ?? "",
    description: settings.description ?? "",
  });

  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">
          הפעלת WhatsApp
        </h1>
        <p className="mt-2 text-ink-300">
          הצעד האחרון — לחיצה אחת ותסיים את ההקמה.
        </p>
      </header>

      <div className="card p-6">
        <h2 className="font-display text-lg font-bold text-white">איך זה עובד</h2>
        <ol className="mt-4 space-y-3 text-sm text-ink-200">
          <Step n={1}>
            לחיצה על הכפתור למטה תפתח את WhatsApp במכשיר שלך — עם הודעה מוכנה הכוללת את
            כל הגדרות העסק והטוקן הייחודי שלך.
          </Step>
          <Step n={2}>
            <strong className="text-white">חשוב:</strong> שלח/י את ההודעה{" "}
            <strong className="text-white">מהמכשיר ומהמספר שאת/ה רוצה לקבל בו את הלידים</strong>.
            המספר שממנו ההודעה נשלחת — הוא המספר שיקבל לידים מעכשיו.
          </Step>
          <Step n={3}>
            אחרי השליחה — נקבל את ההודעה במערכת המרכזית, נאשר ידנית, וההפעלה תושלם תוך זמן קצר.
          </Step>
        </ol>
      </div>

      <div className="card p-6">
        <h2 className="font-display text-lg font-bold text-white">תצוגה מקדימה של ההודעה</h2>
        <pre
          className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-[#0b141a] p-4 text-xs leading-6 text-emerald-100 ring-1 ring-white/10"
          style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
          dir="rtl"
        >
          {message}
        </pre>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-400">
          טוקן: <code dir="ltr" className="rounded bg-white/5 px-2 py-1 text-xs text-brand-300">
            {subscription!.activationToken}
          </code>
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa text-base"
        >
          <MessageCircle className="h-5 w-5" />
          פתח WhatsApp ושלח הפעלה
        </a>
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-xs text-ink-400">
        <strong className="text-ink-200">הערה:</strong> אם שינית פרטים בהגדרות אחרי שלחיצת על הכפתור —
        חזור/י לדף ההגדרות, שמור/י, וחזור/י לכאן כדי שההודעה תכלול את הפרטים העדכניים.
      </div>
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/20 text-xs font-bold text-brand-300 ring-1 ring-brand-500/30">
        {n}
      </span>
      <span className="leading-7">{children}</span>
    </li>
  );
}

function buildActivationMessage(p: {
  token: string;
  businessName: string;
  contactName: string;
  niche: string;
  serviceAreas: string;
  keywords: string;
  leadPhone: string;
  description: string;
}): string {
  return [
    p.token,
    "",
    `שם: ${p.businessName}`,
    `איש קשר: ${p.contactName}`,
    `תחום: ${p.niche}`,
    `איזורי שירות: ${p.serviceAreas}`,
    `מילות מפתח: ${p.keywords}`,
    `טלפון לידים: ${p.leadPhone}`,
    "",
    "תיאור:",
    p.description,
  ].join("\n");
}
