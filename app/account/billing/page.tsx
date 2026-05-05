import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq, desc } from "drizzle-orm";
import { CreditCard, CheckCircle2, Clock, AlertCircle, ChevronLeft, Shield } from "lucide-react";
import { SITE, isWithinRefundWindow, refundDaysLeft } from "@/lib/config";
import { CheckoutButton } from "./CheckoutButton";

export const metadata: Metadata = { title: "תשלום ומנוי" };

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/account/billing");
  const userId = session.user.id;

  const [subscription, settings, recentPayments] = await Promise.all([
    db.query.subscriptions.findFirst({
      where: eq(schema.subscriptions.userId, userId),
    }),
    db.query.businessSettings.findFirst({
      where: eq(schema.businessSettings.userId, userId),
    }),
    db.select()
      .from(schema.invoices)
      .where(eq(schema.invoices.userId, userId))
      .orderBy(desc(schema.invoices.issuedAt))
      .limit(10),
  ]);

  const trialDaysLeft = subscription?.trialEndsAt
    ? Math.max(
        0,
        Math.ceil(
          (subscription.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )
      )
    : null;
  const isPaid = subscription?.status === "active";
  const isTrialing = subscription?.status === "trial_active";
  const isCancelled = subscription?.status === "cancelled";
  const refundEligible = isWithinRefundWindow(subscription?.firstPaymentAt);
  const refundDaysRemaining = refundDaysLeft(subscription?.firstPaymentAt);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">תשלום ומנוי</h1>
        <p className="mt-2 text-ink-300">ניהול אמצעי תשלום, חיובים, וביטול מנוי.</p>
      </header>

      {/* סטטוס נוכחי */}
      <div className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display font-bold text-white">
          <CreditCard className="h-5 w-5 text-brand-300" />
          סטטוס מנוי
        </h2>
        {isPaid && (
          <div className="rounded-2xl bg-wa/10 p-4 ring-1 ring-wa/30">
            <div className="flex items-center gap-2 text-wa">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-bold">מנוי פעיל בתשלום</span>
            </div>
            {subscription?.tranzilaCardLast4 && (
              <p className="mt-2 text-sm text-ink-200" dir="ltr">
                {subscription.tranzilaCardBrand || "Card"} •••• {subscription.tranzilaCardLast4}
              </p>
            )}
            {subscription?.nextChargeAt && (
              <p className="mt-1 text-sm text-ink-300">
                החיוב הבא:{" "}
                {new Date(subscription.nextChargeAt).toLocaleDateString("he-IL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                — {SITE.pricing.monthlyILS} ₪
              </p>
            )}
          </div>
        )}

        {isPaid && refundEligible && (
          <div className="mt-3 rounded-2xl bg-brand-500/10 p-4 ring-1 ring-brand-500/30">
            <div className="flex items-start gap-2">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
              <div className="text-sm">
                <p className="font-bold text-white">
                  בתוך 7 ימי הניסיון — {refundDaysRemaining}{" "}
                  {refundDaysRemaining === 1 ? "יום נותר" : "ימים נותרו"}
                </p>
                <p className="mt-1 text-ink-200">
                  לא מרוצה? בקשת ביטול עכשיו = החזר מלא של {SITE.pricing.monthlyILS} ₪. אחרי שבעת
                  הימים יתחיל החודש המשולם — אז כבר לא יהיה החזר.
                </p>
              </div>
            </div>
          </div>
        )}

        {isTrialing && trialDaysLeft !== null && (
          <div className="rounded-2xl bg-brand-500/10 p-4 ring-1 ring-brand-500/30">
            <div className="flex items-center gap-2 text-brand-300">
              <Clock className="h-5 w-5" />
              <span className="font-bold">בתקופת ניסיון</span>
            </div>
            <p className="mt-2 text-sm text-ink-200">
              נותרו <strong className="text-white">{trialDaysLeft} ימים</strong>. בתום הניסיון
              יחויב כרטיסך ב-{SITE.pricing.monthlyILS} ₪ (כולל מע"מ) בכל חודש.
            </p>
            <p className="mt-2 text-xs text-ink-400">
              ביטול בלחיצה — לא תחויב כלל אם תבטל לפני תום הניסיון.
            </p>
          </div>
        )}

        {isCancelled && (
          <div className="rounded-2xl bg-amber-500/10 p-4 ring-1 ring-amber-500/30">
            <div className="flex items-center gap-2 text-amber-300">
              <AlertCircle className="h-5 w-5" />
              <span className="font-bold">המנוי בוטל</span>
            </div>
            <p className="mt-2 text-sm text-ink-200">
              ניתן להפעיל מחדש בלחיצה.
            </p>
          </div>
        )}
      </div>

      {/* כפתור תשלום */}
      {!isPaid && (
        <div className="card p-6">
          <h2 className="mb-2 font-display text-xl font-bold text-white">
            {isTrialing ? "הפוך למנוי בתשלום" : "התחל מנוי"}
          </h2>
          <p className="mb-5 text-sm text-ink-200">
            {SITE.pricing.monthlyILS} ₪ לחודש (כולל מע"מ). חיוב חודשי אוטומטי.
            <strong className="block mt-2 text-brand-200">
              ערבות החזר מלא תוך {SITE.pricing.refundDays} ימים — לא מרוצה? תקבל את הכסף בחזרה.
            </strong>
          </p>
          <CheckoutButton
            userId={userId}
            email={settings?.contactEmail || session.user.email || ""}
            contact={settings?.contactName || session.user.name || ""}
            phone={settings?.leadPhone || ""}
            myid={settings?.vatId || ""}
            amount={SITE.pricing.monthlyILS}
          />
          <ul className="mt-5 space-y-1 text-xs text-ink-400">
            <li>✓ סליקה מאובטחת ע"י Tranzila (PCI-DSS Level 1)</li>
            <li>✓ ויזה / מאסטרקארד / ישראכרט / אמריקן אקספרס</li>
            <li>✓ פרטי הכרטיס לא נשמרים אצלנו</li>
            <li>✓ {SITE.pricing.refundDays} ימי החזר מלא — בקשה דרך האזור האישי</li>
          </ul>
        </div>
      )}

      {/* היסטוריית חיובים */}
      {recentPayments.length > 0 && (
        <div className="card p-6">
          <h2 className="mb-4 font-display font-bold text-white">חיובים אחרונים</h2>
          <ul className="space-y-2">
            {recentPayments.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between rounded-xl bg-white/[0.02] p-3 ring-1 ring-white/5"
              >
                <div>
                  <div className="text-sm font-bold text-white">
                    {p.amount} ₪ {p.isRecurring ? "(חיוב חוזר)" : "(תשלום ראשון)"}
                  </div>
                  <div className="text-xs text-ink-400">
                    {new Date(p.issuedAt).toLocaleString("he-IL")}
                    {p.tranzilaConfirmationCode && (
                      <>
                        {" · "}
                        <span dir="ltr">אישור #{p.tranzilaConfirmationCode}</span>
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
                  {p.status === "paid" ? "שולם" : p.status === "failed" ? "נכשל" : "ממתין"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href="/account"
        className="inline-flex items-center gap-1 text-sm text-brand-300 hover:text-brand-200"
      >
        <ChevronLeft className="h-4 w-4" />
        חזרה לאזור האישי
      </Link>
    </div>
  );
}
