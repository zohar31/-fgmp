import { Check, Sparkles } from "lucide-react";
import { SITE } from "@/lib/config";

const features = [
  "סריקה רציפה 24/7 של 50,000+ קבוצות פייסבוק בישראל",
  "סינון לידים חכם בעזרת AI",
  "תגובה מוצעת ייחודית לכל פוסט — ערוכה ע״י AI (לא תבנית קבועה)",
  "התראות מיידיות לוואטסאפ או לטלגרם — לבחירתך",
  "לידים בלתי מוגבלים — בלי מכסות",
  "התאמה אישית לתחום העיסוק שלך",
  "תמיכה אישית בוואטסאפ",
];

export function Offer() {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <div className="pill text-brand-300 ring-brand-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            הצעה לזמן מוגבל
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl text-balance">
            רק{" "}
            <span className="gradient-text">{SITE.pricing.monthlyILS}₪ לחודש</span>
            {" — "}
            <span className="gradient-text">ערבות החזר מלא {SITE.pricing.refundDays} ימים</span>
          </h2>
          <p className="mt-4 text-lg text-ink-200">
            לא מרוצה? תקבל את הכסף בחזרה. בלי שאלות, בלי טפסים, בלחיצה אחת מהאזור האישי.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <div className="card relative overflow-hidden p-8 md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-br from-brand-500/30 to-transparent blur-3xl"
            />

            <div className="relative">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <div className="font-display text-lg font-bold text-white">
                    מסלול {SITE.brand}
                  </div>
                  <div className="text-sm text-ink-300">
                    כל מה שצריך כדי לקבל לידים בוואטסאפ
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-5xl font-extrabold text-white">
                    {SITE.pricing.monthlyILS}
                    <span className="text-2xl text-ink-300"> {SITE.pricing.currency}</span>
                  </div>
                  <div className="text-xs text-ink-400">לחודש · כולל מע״מ</div>
                </div>
              </div>

              <div className="my-8 h-px bg-white/10" />

              <ul className="grid gap-3 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-ink-100">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-wa" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/login"
                className="btn-wa mt-8 w-full text-base"
              >
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </a>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-ink-300">
                <div className="rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
                  החזר מלא {SITE.pricing.refundDays} ימים
                </div>
                <div className="rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
                  ללא חוזה
                </div>
                <div className="rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
                  ביטול מהאזור האישי
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
