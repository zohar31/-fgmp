import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq, desc } from "drizzle-orm";
import { CreditCard, CheckCircle2, Clock, AlertCircle, ChevronLeft, Shield } from "lucide-react";
import { SITE, isWithinRefundWindow, refundDaysLeft } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";
import { getServerLocale } from "@/lib/i18n-server";
import { CheckoutButton } from "./CheckoutButton";

export const metadata: Metadata = { title: "תשלום ומנוי" };

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/account/billing");
  const userId = session.user.id;
  const locale = await getServerLocale();
  const en = locale === "en";

  const [subscription, settings, recentPayments] = await Promise.all([
    db.query.subscriptions.findFirst({ where: eq(schema.subscriptions.userId, userId) }),
    db.query.businessSettings.findFirst({ where: eq(schema.businessSettings.userId, userId) }),
    db
      .select()
      .from(schema.invoices)
      .where(eq(schema.invoices.userId, userId))
      .orderBy(desc(schema.invoices.issuedAt))
      .limit(10),
  ]);

  const trialDaysLeft = subscription?.trialEndsAt
    ? Math.max(0, Math.ceil((subscription.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;
  const isPaid = subscription?.status === "active";
  const isTrialing = subscription?.status === "trial_active";
  const isCancelled = subscription?.status === "cancelled";
  const refundEligible = isWithinRefundWindow(subscription?.firstPaymentAt);
  const refundDaysRemaining = refundDaysLeft(subscription?.firstPaymentAt);
  const R = SITE.pricing.refundDays;
  const ILS = SITE.pricing.monthlyILS;
  const USD = SITE_EN.pricing.monthlyUSD;
  // Display price string. Actual Tranzila charge is always ₪299.
  const priceLabel = en ? `$${USD}/month` : `${ILS} ₪ לחודש`;
  const priceAmount = en ? `$${USD}` : `${ILS} ₪`;
  const dateLocale = en ? "en-US" : "he-IL";

  const t = en
    ? {
        pageTitle: "Billing & subscription",
        pageSub: "Manage your payment method, charges, and cancellation.",
        subStatus: "Subscription status",
        activePaid: "Active paid subscription",
        nextCharge: "Next charge",
        withinTrial: (n: number) => `Within your ${R}-day guarantee — ${n} ${n === 1 ? "day" : "days"} left`,
        refundNote: `Not happy? Cancel now = full refund of $${USD}. After ${R} days the paid month begins — no refund then.`,
        trialing: "Trial period",
        trialLeft: (n: number) => n,
        trialText: `days left. When the trial ends, your card is charged ${priceLabel} each month.`,
        trialCancel: "Cancel anytime — you won't be charged if you cancel before the trial ends.",
        cancelled: "Subscription cancelled",
        cancelledText: "You can reactivate in one click.",
        becomePaid: isTrialing ? "Upgrade to a paid subscription" : "Start subscription",
        priceLine: `${priceLabel}. Automatic monthly billing.`,
        billedNote: `(Billed securely via Tranzila as ₪${ILS}.)`,
        guarantee: `Money-back guarantee — cancel within ${R} days of your first payment for a full refund. After that, the paid month isn't refundable.`,
        secure: "Secure checkout by Tranzila (PCI-DSS Level 1)",
        cards: "Visa / Mastercard / Amex",
        noStore: "Your card details are never stored on our servers",
        refundBullet: `${R}-day full money-back guarantee — request via your account`,
        recent: "Recent charges",
        recurring: "(recurring)",
        first: "(first payment)",
        confirm: "Confirmation",
        paid: "Paid",
        failed: "Failed",
        pending: "Pending",
        back: "Back to your account",
      }
    : {
        pageTitle: "תשלום ומנוי",
        pageSub: "ניהול אמצעי תשלום, חיובים, וביטול מנוי.",
        subStatus: "סטטוס מנוי",
        activePaid: "מנוי פעיל בתשלום",
        nextCharge: "החיוב הבא",
        withinTrial: (n: number) => `בתוך ${R} ימי הניסיון — ${n} ${n === 1 ? "יום נותר" : "ימים נותרו"}`,
        refundNote: `לא מרוצה? בקשת ביטול עכשיו = החזר מלא של ${ILS} ₪. אחרי ${R} הימים יתחיל החודש המשולם — אז כבר לא יהיה החזר.`,
        trialing: "בתקופת ניסיון",
        trialLeft: (n: number) => n,
        trialText: `ימים. בתום הניסיון יחויב כרטיסך ב-${ILS} ₪ (כולל מע"מ) בכל חודש.`,
        trialCancel: "ביטול בלחיצה — לא תחויב כלל אם תבטל לפני תום הניסיון.",
        cancelled: "המנוי בוטל",
        cancelledText: "ניתן להפעיל מחדש בלחיצה.",
        becomePaid: isTrialing ? "הפוך למנוי בתשלום" : "התחל מנוי",
        priceLine: `${ILS} ₪ לחודש (כולל מע"מ). חיוב חודשי אוטומטי.`,
        billedNote: "",
        guarantee: `ערבות החזר — ביטול תוך ${R} ימים מהתשלום הראשון = החזר מלא. אחרי כן, החודש המשולם אינו ניתן להחזר.`,
        secure: 'סליקה מאובטחת ע"י Tranzila (PCI-DSS Level 1)',
        cards: "ויזה / מאסטרקארד / ישראכרט / אמריקן אקספרס",
        noStore: "פרטי הכרטיס לא נשמרים אצלנו",
        refundBullet: `${R} ימי החזר מלא — בקשה דרך האזור האישי`,
        recent: "חיובים אחרונים",
        recurring: "(חיוב חוזר)",
        first: "(תשלום ראשון)",
        confirm: "אישור",
        paid: "שולם",
        failed: "נכשל",
        pending: "ממתין",
        back: "חזרה לאזור האישי",
      };

  return (
    <div className="space-y-6" dir={en ? "ltr" : "rtl"}>
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">{t.pageTitle}</h1>
        <p className="mt-2 text-ink-300">{t.pageSub}</p>
      </header>

      <div className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display font-bold text-white">
          <CreditCard className="h-5 w-5 text-brand-300" />
          {t.subStatus}
        </h2>
        {isPaid && (
          <div className="rounded-2xl bg-wa/10 p-4 ring-1 ring-wa/30">
            <div className="flex items-center gap-2 text-wa">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-bold">{t.activePaid}</span>
            </div>
            {subscription?.tranzilaCardLast4 && (
              <p className="mt-2 text-sm text-ink-200" dir="ltr">
                {subscription.tranzilaCardBrand || "Card"} •••• {subscription.tranzilaCardLast4}
              </p>
            )}
            {subscription?.nextChargeAt && (
              <p className="mt-1 text-sm text-ink-300">
                {t.nextCharge}:{" "}
                {new Date(subscription.nextChargeAt).toLocaleDateString(dateLocale, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                — {priceAmount}
              </p>
            )}
          </div>
        )}

        {isPaid && refundEligible && (
          <div className="mt-3 rounded-2xl bg-brand-500/10 p-4 ring-1 ring-brand-500/30">
            <div className="flex items-start gap-2">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
              <div className="text-sm">
                <p className="font-bold text-white">{t.withinTrial(refundDaysRemaining)}</p>
                <p className="mt-1 text-ink-200">{t.refundNote}</p>
              </div>
            </div>
          </div>
        )}

        {isTrialing && trialDaysLeft !== null && (
          <div className="rounded-2xl bg-brand-500/10 p-4 ring-1 ring-brand-500/30">
            <div className="flex items-center gap-2 text-brand-300">
              <Clock className="h-5 w-5" />
              <span className="font-bold">{t.trialing}</span>
            </div>
            <p className="mt-2 text-sm text-ink-200">
              <strong className="text-white">{trialDaysLeft}</strong> {t.trialText}
            </p>
            <p className="mt-2 text-xs text-ink-400">{t.trialCancel}</p>
          </div>
        )}

        {isCancelled && (
          <div className="rounded-2xl bg-amber-500/10 p-4 ring-1 ring-amber-500/30">
            <div className="flex items-center gap-2 text-amber-300">
              <AlertCircle className="h-5 w-5" />
              <span className="font-bold">{t.cancelled}</span>
            </div>
            <p className="mt-2 text-sm text-ink-200">{t.cancelledText}</p>
          </div>
        )}
      </div>

      {!isPaid && (
        <div className="card p-6">
          <h2 className="mb-2 font-display text-xl font-bold text-white">{t.becomePaid}</h2>
          <p className="mb-5 text-sm text-ink-200">
            {t.priceLine}
            {t.billedNote && <span className="block text-xs text-ink-400">{t.billedNote}</span>}
            <strong className="mt-2 block text-brand-200">{t.guarantee}</strong>
          </p>
          <CheckoutButton
            userId={userId}
            email={settings?.contactEmail || session.user.email || ""}
            contact={settings?.contactName || session.user.name || ""}
            phone={settings?.leadPhone || ""}
            myid={settings?.vatId || ""}
            amount={SITE.pricing.monthlyILS}
            locale={locale}
          />
          <ul className="mt-5 space-y-1 text-xs text-ink-400">
            <li>✓ {t.secure}</li>
            <li>✓ {t.cards}</li>
            <li>✓ {t.noStore}</li>
            <li>✓ {t.refundBullet}</li>
          </ul>
        </div>
      )}

      {recentPayments.length > 0 && (
        <div className="card p-6">
          <h2 className="mb-4 font-display font-bold text-white">{t.recent}</h2>
          <ul className="space-y-2">
            {recentPayments.map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded-xl bg-white/[0.02] p-3 ring-1 ring-white/5">
                <div>
                  <div className="text-sm font-bold text-white">
                    {p.amount} ₪ {p.isRecurring ? t.recurring : t.first}
                  </div>
                  <div className="text-xs text-ink-400">
                    {new Date(p.issuedAt).toLocaleString(dateLocale)}
                    {p.tranzilaConfirmationCode && (
                      <>
                        {" · "}
                        <span dir="ltr">{t.confirm} #{p.tranzilaConfirmationCode}</span>
                      </>
                    )}
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs ring-1 ${
                    p.status === "paid"
                      ? "bg-wa/10 text-wa ring-wa/30"
                      : p.status === "failed"
                        ? "bg-rose-500/10 text-rose-300 ring-rose-500/30"
                        : "bg-amber-500/10 text-amber-300 ring-amber-500/30"
                  }`}
                >
                  {p.status === "paid" ? t.paid : p.status === "failed" ? t.failed : t.pending}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link href="/account" className="inline-flex items-center gap-1 text-sm text-brand-300 hover:text-brand-200">
        <ChevronLeft className={`h-4 w-4 ${en ? "rotate-180" : ""}`} />
        {t.back}
      </Link>
    </div>
  );
}
