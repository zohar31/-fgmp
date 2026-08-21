import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { CheckCircle2, Clock } from "lucide-react";
import { CancelForm } from "./CancelForm";
import { ReactivateButton } from "@/components/ReactivateButton";
import { isWithinRefundWindow, refundDaysLeft, SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";
import { getServerLocale } from "@/lib/i18n-server";

export const metadata: Metadata = { title: "ביטול מנוי" };

export default async function CancelPage() {
  const session = await auth();
  const userId = session!.user.id;
  const en = (await getServerLocale()) === "en";
  const dateLocale = en ? "en-US" : "he-IL";
  const priceLabel = en ? `$${SITE_EN.pricing.monthlyUSD}` : `299₪`;
  const R = SITE.pricing.refundDays;

  const [subscription, pendingRequest] = await Promise.all([
    db.query.subscriptions.findFirst({
      where: eq(schema.subscriptions.userId, userId),
    }),
    db.query.cancellationRequests.findFirst({
      where: and(
        eq(schema.cancellationRequests.userId, userId),
        eq(schema.cancellationRequests.status, "pending")
      ),
    }),
  ]);

  const refundEligible = isWithinRefundWindow(subscription?.firstPaymentAt);
  const daysLeft = refundDaysLeft(subscription?.firstPaymentAt);

  if (subscription?.status === "cancelled") {
    return (
      <div className="space-y-6" dir={en ? "ltr" : "rtl"}>
        <header>
          <h1 className="font-display text-3xl font-extrabold text-white">{en ? "Cancel subscription" : "ביטול מנוי"}</h1>
        </header>
        <div className="card border-l-4 border-ink-500 p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-ink-300" />
            <div>
              <h3 className="font-display font-bold text-white">{en ? "Subscription cancelled" : "המנוי בוטל"}</h3>
              <p className="mt-1 text-sm text-ink-300">
                {en ? "Your subscription was cancelled on " : "המנוי שלך בוטל בתאריך "}
                {subscription.cancelledAt &&
                  new Date(subscription.cancelledAt).toLocaleDateString(dateLocale)}
                {en ? ". No further charges will be made." : ". לא יבוצעו חיובים נוספים."}
              </p>
              {subscription.cancellationReason && (
                <p className="mt-2 text-xs text-ink-400">
                  {en ? "Cancellation reason: " : "סיבת ביטול: "}{subscription.cancellationReason}
                </p>
              )}
              <p className="mt-3 text-sm text-ink-300">
                {en ? "Want to come back? One tap and you're active again:" : "רוצה לחזור? לחיצה אחת ואת/ה שוב פעיל/ה במערכת:"}
              </p>
              <div className="mt-4">
                <ReactivateButton size="md" en={en} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (pendingRequest) {
    return (
      <div className="space-y-6" dir={en ? "ltr" : "rtl"}>
        <header>
          <h1 className="font-display text-3xl font-extrabold text-white">{en ? "Cancel subscription" : "ביטול מנוי"}</h1>
        </header>
        <div className="card border-l-4 border-amber-500 p-6">
          <div className="flex items-start gap-3">
            <Clock className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
            <div>
              <h3 className="font-display font-bold text-white">
                {en ? "Your request was sent to the FGMP refunds team" : "הבקשה הועברה למחלקת זיכויים FGMP"}
              </h3>
              <p className="mt-1 text-sm text-ink-300">
                {en ? "Request submitted on " : "בקשה הוגשה ב-"}
                {new Date(pendingRequest.requestedAt).toLocaleString(dateLocale, {
                  timeZone: "Asia/Jerusalem",
                })}
                .{" "}
                {pendingRequest.wasRefundEligible
                  ? (en ? "The request is pending — once approved, a full refund will also be issued to your card." : "הבקשה במצב המתנה — אם תאושר יתבצע גם החזר מלא לכרטיסך.")
                  : (en ? "The request is pending. We'll get back to you shortly via WhatsApp or in your account." : "הבקשה במצב המתנה. נחזור אליך בקרוב דרך וואטסאפ או באזור האישי.")}
              </p>
              <p className="mt-3 text-xs text-ink-400">
                {en ? "Until approval — your subscription stays active and can keep receiving leads." : "עד אישור — המנוי עדיין פעיל ויכול להמשיך לקבל לידים."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir={en ? "ltr" : "rtl"}>
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">{en ? "Cancel subscription" : "ביטול מנוי"}</h1>
        <p className="mt-2 text-ink-300">
          {en
            ? (refundEligible
                ? `You're within the ${R}-day money-back window — ${daysLeft} day(s) left. Cancel now = a full ${priceLabel} refund.`
                : `The ${R}-day money-back window has ended and your month has started. Cancelling now stops future charges, but there's no refund for the current month — you keep access until the end of the paid month, then it expires.`)
            : (refundEligible
                ? `אתה בתוך חלון ההחזר של ${R} ימים — נותרו ${daysLeft} ימים. ביטול עכשיו = החזר מלא של ${priceLabel}.`
                : `חלון ההחזר של ${R} ימים הסתיים והחודש שלך התחיל. ביטול עכשיו עוצר את החיובים העתידיים, אבל לא יבוצע החזר על החודש הנוכחי — תקבל גישה עד סוף החודש המשולם, אחר כך פג תוקף.`)}
        </p>
      </header>

      <div className="card p-6">
        <h2 className="font-display text-lg font-bold text-white">{en ? "How it works" : "איך זה עובד"}</h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-200">
          <li className="flex gap-2">
            <span className="text-wa">✓</span>
            <span>
              {en ? (
                <><strong>Within the first {R} days of payment:</strong> cancel = a full {priceLabel} refund. Cancellation is immediate and access closes.</>
              ) : (
                <><strong>תוך {R} הימים הראשונים מהתשלום:</strong> ביטול = החזר מלא של {priceLabel}. הביטול מיידי והגישה נסגרת.</>
              )}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-wa">✓</span>
            <span>
              {en ? (
                <><strong>After {R} days:</strong> cancelling stops the next charge. You keep receiving leads until the end of the paid month, then it expires. No refund for the current month.</>
              ) : (
                <><strong>אחרי {R} ימים:</strong> ביטול עוצר את החיוב הבא. תמשיך לקבל לידים עד סוף החודש המשולם, אחר כך פג תוקף. בלי החזר על החודש הנוכחי.</>
              )}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-wa">✓</span>
            <span>
              {en
                ? 'The request goes to the "FGMP refunds team" — an admin reviews and approves it manually, usually within 24 hours.'
                : 'הבקשה עוברת ל"מחלקת זיכויים FGMP" — אדמין בודק ומאשר ידנית, בדרך כלל תוך 24 שעות.'}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-wa">✓</span>
            <span>{en ? "Your data is kept — you can reactivate any time with one tap." : "הנתונים שלך נשמרים — תמיד אפשר להפעיל מחדש בלחיצה."}</span>
          </li>
        </ul>
      </div>

      <CancelForm refundEligible={refundEligible} daysLeft={daysLeft} en={en} />
    </div>
  );
}
