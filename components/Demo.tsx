import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "אתה ישן 🌙 — המערכת עובדת",
  "אתה בפגישה 💼 — המערכת עובדת",
  "אתה בחופש ✅ — המערכת עובדת",
  "אתה אוכל 🍕 — המערכת עובדת",
];

const screenshots = [
  { src: "/screenshots/lead-cosmetics.jpg", alt: "ליד מקבוצת פייסבוק לשירותי איפור" },
  { src: "/screenshots/lead-bakery.jpg", alt: "ליד מקבוצת פייסבוק לעוגות אירועים" },
  { src: "/screenshots/lead-photographer.jpg", alt: "ליד מקבוצת פייסבוק לצלם חתונות" },
  { src: "/screenshots/lead-insurance.jpg", alt: "ליד מקבוצת פייסבוק לסוכן ביטוח" },
];

export function Demo() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="card overflow-hidden p-8 md:p-12 lg:p-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="pill text-wa ring-wa/30">מה תקבל</div>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl text-balance">
                המערכת עובדת —{" "}
                <span className="gradient-text">בזמן שהחיים שלך ממשיכים</span>
              </h2>
              <p className="mt-4 leading-8 text-ink-200">
                לא צריך לפתוח אפליקציה, לא צריך להתחבר, לא צריך לזכור לבדוק.
                כל מה שצריך זה לחכות שהוואטסאפ יצפצף — עם לקוח חדש שמחפש אותך.
              </p>

              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-ink-100">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-wa" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-brand-500/20 to-wa/20 blur-2xl" />
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {screenshots.map((s) => (
                  <div
                    key={s.src}
                    className="relative aspect-[9/14] overflow-hidden rounded-2xl bg-[#0b141a] ring-1 ring-white/10 shadow-lg"
                  >
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 220px"
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-ink-400">
                צילומי מסך אמיתיים — לידים שהתקבלו דרך FGMP
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
