import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "התשלום בוצע" };

export default function BillingSuccessPage() {
  return (
    <div className="space-y-6">
      <div className="card border-l-4 border-wa p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle2 className="h-16 w-16 text-wa" />
          <h1 className="font-display text-3xl font-extrabold text-white">
            התשלום בוצע בהצלחה ✓
          </h1>
          <p className="max-w-md leading-7 text-ink-200">
            תודה! המנוי שלך פעיל. החיוב הבא יתבצע אוטומטית בעוד חודש.
            תקבל הודעה לפני כל חיוב.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link href="/account/billing" className="btn-wa">
              לפרטי המנוי
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link href="/account" className="btn-ghost">
              לאזור האישי
            </Link>
          </div>
        </div>
      </div>

      <div className="card p-5">
        <h2 className="font-display font-bold text-white">מה הלאה?</h2>
        <p className="mt-2 text-sm text-ink-300">
          המערכת ממשיכה לסרוק קבוצות פייסבוק עבורך. לידים חדשים ימשיכו להגיע
          לוואטסאפ של העסק. אם יש שאלה — דבר איתנו דרך הצ'אט.
        </p>
      </div>
    </div>
  );
}
