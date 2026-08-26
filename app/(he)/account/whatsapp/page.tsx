import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { CheckCircle2, AlertCircle, MessageCircle, Settings, CreditCard } from "lucide-react";
import { SITE, formatServiceAreas } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";
import { getServerLocale } from "@/lib/i18n-server";
import { LocalDateTime } from "@/components/LocalDateTime";

export const metadata: Metadata = { title: "Activate WhatsApp" };

export default async function WhatsAppActivationPage() {
  const session = await auth();
  const userId = session!.user.id;
  const locale = await getServerLocale();
  const en = locale === "en";
  const dateLocale = en ? "en-US" : "he-IL";
  const R = SITE.pricing.refundDays;
  const priceLabel = en ? `$${SITE_EN.pricing.monthlyUSD}/month` : `${SITE.pricing.monthlyILS}₪/חודש`;

  const [subscription, settings] = await Promise.all([
    db.query.subscriptions.findFirst({ where: eq(schema.subscriptions.userId, userId) }),
    db.query.businessSettings.findFirst({ where: eq(schema.businessSettings.userId, userId) }),
  ]);

  const setupComplete = !!(
    settings?.businessName && settings?.contactName && settings?.niche && settings?.leadPhone && settings?.keywords
  );
  const hasPaid = !!subscription?.firstPaymentAt;
  const title = en ? "Activate WhatsApp" : "הפעלת WhatsApp";

  if (!setupComplete) {
    return (
      <div className="space-y-6" dir={en ? "ltr" : "rtl"}>
        <header><h1 className="font-display text-3xl font-extrabold text-white">{title}</h1></header>
        <div className="card border-l-4 border-amber-500 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
            <div className="flex-1">
              <h3 className="font-display font-bold text-white">
                {en ? "Step 1 — Complete your business settings first" : "שלב 1 — השלם קודם את הגדרות העסק"}
              </h3>
              <p className="mt-1 text-sm text-ink-300">
                {en
                  ? "The flow: business details → payment → WhatsApp activation. Your business details are missing."
                  : "התהליך: פרטי עסק → תשלום → הפעלת WhatsApp. כרגע חסרים פרטי העסק."}
              </p>
              <Link href="/account/setup" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-600">
                <Settings className="h-4 w-4" />
                {en ? "Continue to settings" : "המשך להגדרות"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hasPaid) {
    return (
      <div className="space-y-6" dir={en ? "ltr" : "rtl"}>
        <header><h1 className="font-display text-3xl font-extrabold text-white">{title}</h1></header>
        <div className="card border-l-4 border-amber-500 p-6">
          <div className="flex items-start gap-3">
            <CreditCard className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
            <div className="flex-1">
              <h3 className="font-display font-bold text-white">
                {en ? "Step 2 — Payment required before WhatsApp activation" : "שלב 2 — נדרש תשלום לפני הפעלת WhatsApp"}
              </h3>
              <p className="mt-1 text-sm text-ink-300">
                {en
                  ? `The flow: business details ✓ → payment → WhatsApp activation. To start scanning groups for you, complete the ${priceLabel} payment. Full ${R}-day money-back guarantee — zero risk.`
                  : `התהליך: פרטי עסק ✓ → תשלום → הפעלת WhatsApp. כדי שהמערכת תתחיל לסרוק קבוצות עבורך, יש להשלים את התשלום של ${SITE.pricing.monthlyILS}₪/חודש. ערבות החזר מלא תוך ${R} ימים — אפס סיכון.`}
              </p>
              <Link href="/account/billing" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-600">
                <CreditCard className="h-4 w-4" />
                {en ? "Continue to payment" : "המשך לתשלום"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (subscription?.activatedAt) {
    return (
      <div className="space-y-6" dir={en ? "ltr" : "rtl"}>
        <header><h1 className="font-display text-3xl font-extrabold text-white">{title}</h1></header>
        <div className="card border-l-4 border-wa p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-wa" />
            <div className="flex-1">
              <h3 className="font-display font-bold text-white">{en ? "System is active ✓" : "המערכת פעילה ✓"}</h3>
              <p className="mt-1 text-sm text-ink-300">
                {en ? "Your WhatsApp was activated on " : "ה-WhatsApp שלך הופעל בתאריך "}
                {en ? (
                  <LocalDateTime iso={new Date(subscription.activatedAt).toISOString()} locale="en-US" />
                ) : (
                  new Date(subscription.activatedAt).toLocaleString(dateLocale, { timeZone: "Asia/Jerusalem" })
                )}
                {en ? ". Leads should arrive at " : ". לידים אמורים להגיע למספר "}
                <span dir="ltr">{subscription.activatedFromPhone || settings.leadPhone}</span>.
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
    serviceAreas: formatServiceAreas(settings.serviceAreas),
    keywords: settings.keywords ?? "",
    leadPhone: settings.leadPhone ?? "",
    description: settings.description ?? "",
    paid: hasPaid,
    paidAt: subscription!.firstPaymentAt,
    paidAmount: SITE.pricing.monthlyILS,
    en,
    dateLocale,
  });

  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div className="space-y-6" dir={en ? "ltr" : "rtl"}>
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">{title}</h1>
        <p className="mt-2 text-ink-300">{en ? "The last step — one tap to finish setup." : "הצעד האחרון — לחיצה אחת ותסיים את ההקמה."}</p>
      </header>

      <div className="card p-6">
        <h2 className="font-display text-lg font-bold text-white">{en ? "How it works" : "איך זה עובד"}</h2>
        <ol className="mt-4 space-y-3 text-sm text-ink-200">
          <Step n={1}>
            {en
              ? "Tapping the button below opens WhatsApp on your device — with a pre-filled message containing all your business settings and your unique token."
              : "לחיצה על הכפתור למטה תפתח את WhatsApp במכשיר שלך — עם הודעה מוכנה הכוללת את כל הגדרות העסק והטוקן הייחודי שלך."}
          </Step>
          <Step n={2}>
            <strong className="text-white">{en ? "Important:" : "חשוב:"}</strong>{" "}
            {en ? (
              <>
                send the message <strong className="text-white">from the device and number where you want to receive leads</strong>. The number the message is sent from is the number that will receive leads from now on.
              </>
            ) : (
              <>
                שלח/י את ההודעה <strong className="text-white">מהמכשיר ומהמספר שאת/ה רוצה לקבל בו את הלידים</strong>. המספר שממנו ההודעה נשלחת — הוא המספר שיקבל לידים מעכשיו.
              </>
            )}
          </Step>
          <Step n={3}>
            {en
              ? "After you send it — we receive it in the central system, approve it manually, and activation completes shortly."
              : "אחרי השליחה — נקבל את ההודעה במערכת המרכזית, נאשר ידנית, וההפעלה תושלם תוך זמן קצר."}
          </Step>
        </ol>
      </div>

      <div className="card p-6">
        <h2 className="font-display text-lg font-bold text-white">{en ? "Message preview" : "תצוגה מקדימה של ההודעה"}</h2>
        <pre
          className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-[#0b141a] p-4 text-xs leading-6 text-emerald-100 ring-1 ring-white/10"
          style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
          dir={en ? "ltr" : "rtl"}
        >
          {message}
        </pre>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-400">
          {en ? "Token: " : "טוקן: "}
          <code dir="ltr" className="rounded bg-white/5 px-2 py-1 text-xs text-brand-300">{subscription!.activationToken}</code>
        </p>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-wa text-base">
          <MessageCircle className="h-5 w-5" />
          {en ? "Open WhatsApp & send activation" : "פתח WhatsApp ושלח הפעלה"}
        </a>
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-xs text-ink-400">
        <strong className="text-ink-200">{en ? "Note:" : "הערה:"}</strong>{" "}
        {en
          ? "if you changed settings after tapping the button — go back to settings, save, and return here so the message includes the latest details."
          : "אם שינית פרטים בהגדרות אחרי שלחיצת על הכפתור — חזור/י לדף ההגדרות, שמור/י, וחזור/י לכאן כדי שההודעה תכלול את הפרטים העדכניים."}
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
  paid: boolean;
  paidAt: Date | null;
  paidAmount: number;
  en: boolean;
  dateLocale: string;
}): string {
  // The token is always first so the wa-server can key on it regardless of labels.
  if (p.en) {
    const paidLine = p.paid
      ? `Status: PAID ✓ (${p.paidAmount} ILS${p.paidAt ? ` on ${p.paidAt.toLocaleDateString(p.dateLocale, { timeZone: "Asia/Jerusalem" })}` : ""})`
      : "Status: NOT PAID";
    return [
      p.token, "", paidLine, "",
      `Business: ${p.businessName}`,
      `Contact: ${p.contactName}`,
      `Trade: ${p.niche}`,
      `Service areas: ${p.serviceAreas}`,
      `Keywords: ${p.keywords}`,
      `Lead phone: ${p.leadPhone}`,
      "", "Description:", p.description,
    ].join("\n");
  }
  const paidLine = p.paid
    ? `סטטוס: שולם ✓ (${p.paidAmount} ₪${p.paidAt ? ` ב-${p.paidAt.toLocaleDateString("he-IL", { timeZone: "Asia/Jerusalem" })}` : ""})`
    : `סטטוס: לא שולם`;
  return [
    p.token, "", paidLine, "",
    `שם: ${p.businessName}`,
    `איש קשר: ${p.contactName}`,
    `תחום: ${p.niche}`,
    `איזורי שירות: ${p.serviceAreas}`,
    `מילות מפתח: ${p.keywords}`,
    `טלפון לידים: ${p.leadPhone}`,
    "", "תיאור:", p.description,
  ].join("\n");
}
