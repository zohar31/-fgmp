import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { CheckCircle2, Clock } from "lucide-react";
import { CancelForm } from "./CancelForm";
import { ReactivateButton } from "@/components/ReactivateButton";
import { isWithinRefundWindow, refundDaysLeft, SITE } from "@/lib/config";

export const metadata: Metadata = { title: "ביטול מנוי" };

export default async function CancelPage() {
  const session = await auth();
  const userId = session!.user.id;

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
      <div className="space-y-6">
        <header>
          <h1 className="font-display text-3xl font-extrabold text-white">ביטול מנוי</h1>
        </header>
        <div className="card border-l-4 border-ink-500 p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-ink-300" />
            <div>
              <h3 className="font-display font-bold text-white">המנוי בוטל</h3>
              <p className="mt-1 text-sm text-ink-300">
                המנוי שלך בוטל בתאריך{" "}
                {subscription.cancelledAt &&
                  new Date(subscription.cancelledAt).toLocaleDateString("he-IL")}
                . לא יבוצעו חיובים נוספים.
              </p>
              {subscription.cancellationReason && (
                <p className="mt-2 text-xs text-ink-400">
                  סיבת ביטול: {subscription.cancellationReason}
                </p>
              )}
              <p className="mt-3 text-sm text-ink-300">
                רוצה לחזור? לחיצה אחת ואת/ה שוב פעיל/ה במערכת:
              </p>
              <div className="mt-4">
                <ReactivateButton size="md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (pendingRequest) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="font-display text-3xl font-extrabold text-white">ביטול מנוי</h1>
        </header>
        <div className="card border-l-4 border-amber-500 p-6">
          <div className="flex items-start gap-3">
            <Clock className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
            <div>
              <h3 className="font-display font-bold text-white">
                הבקשה הועברה למחלקת זיכויים FGMP
              </h3>
              <p className="mt-1 text-sm text-ink-300">
                בקשה הוגשה ב-
                {new Date(pendingRequest.requestedAt).toLocaleString("he-IL", {
                  timeZone: "Asia/Jerusalem",
                })}
                .{" "}
                {pendingRequest.wasRefundEligible
                  ? "הבקשה במצב המתנה — אם תאושר יתבצע גם החזר מלא לכרטיסך."
                  : "הבקשה במצב המתנה. נחזור אליך בקרוב דרך וואטסאפ או באזור האישי."}
              </p>
              <p className="mt-3 text-xs text-ink-400">
                עד אישור — המנוי עדיין פעיל ויכול להמשיך לקבל לידים.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">ביטול מנוי</h1>
        <p className="mt-2 text-ink-300">
          {refundEligible
            ? `אתה בתוך 7 ימי הניסיון — נותרו ${daysLeft} ימים. ביטול עכשיו = החזר מלא של 299₪.`
            : `7 ימי הניסיון הסתיימו והחודש שלך התחיל. ביטול עכשיו עוצר את החיובים העתידיים, אבל לא יבוצע החזר על החודש הנוכחי — תקבל גישה עד סוף החודש המשולם, אחר כך פג תוקף.`}
        </p>
      </header>

      <div className="card p-6">
        <h2 className="font-display text-lg font-bold text-white">איך זה עובד</h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-200">
          <li className="flex gap-2">
            <span className="text-wa">✓</span>
            <span>
              <strong>תוך 7 הימים הראשונים מהתשלום:</strong> ביטול = החזר מלא של 299₪. הביטול
              מיידי והגישה נסגרת.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-wa">✓</span>
            <span>
              <strong>אחרי 7 ימים:</strong> ביטול עוצר את החיוב הבא. תמשיך לקבל לידים עד סוף
              החודש המשולם, אחר כך פג תוקף. בלי החזר על החודש הנוכחי.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-wa">✓</span>
            <span>
              הבקשה עוברת ל"מחלקת זיכויים FGMP" — אדמין בודק ומאשר ידנית, בדרך כלל תוך 24 שעות.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-wa">✓</span>
            <span>הנתונים שלך נשמרים — תמיד אפשר להפעיל מחדש בלחיצה.</span>
          </li>
        </ul>
      </div>

      <CancelForm refundEligible={refundEligible} daysLeft={daysLeft} />
    </div>
  );
}
