import { Search, Brain, MessageCircle } from "lucide-react";
import { TelegramIcon } from "./TelegramIcon";

const steps = [
  {
    n: "01",
    title: "סריקה מתמדת",
    text: "המערכת סורקת אלפי קבוצות פייסבוק 24 שעות ביממה, 7 ימים בשבוע. בלי הפסקות, בלי שינה.",
    Icon: () => <Search className="h-7 w-7 text-brand-300" />,
  },
  {
    n: "02",
    title: "סינון חכם ב-AI",
    text: "מודל בינה מלאכותית מבין הקשר וכוונה — לא רק מילות מפתח. רק לידים אמיתיים מגיעים אליך.",
    Icon: () => <Brain className="h-7 w-7 text-brand-300" />,
  },
  {
    n: "03",
    title: "התראה לוואטסאפ או טלגרם",
    text: "ברגע שזוהה לקוח שמחפש את השירות שלך — קופצת אליך הודעה לוואטסאפ או לטלגרם (לבחירתך) עם הקישור לפוסט המקורי.",
    Icon: () => (
      <div className="flex items-center gap-1.5">
        <MessageCircle className="h-7 w-7 text-wa" />
        <TelegramIcon className="h-7 w-7" />
      </div>
    ),
  },
];

export function Solution() {
  return (
    <section id="how" className="py-20 md:py-28 relative">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="pill text-wa ring-wa/30">הפתרון</div>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl text-balance">
            איך לקבל לידים מפייסבוק —{" "}
            <span className="gradient-text">3 צעדים פשוטים</span>
          </h2>
          <p className="mt-4 text-lg text-ink-300">
            בזמן שאתה ישן 🌙 · בזמן שאתה בפגישה 💼 · בזמן שאתה נהנה ✅
          </p>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-12 top-12 hidden h-px bg-gradient-to-l from-transparent via-brand-500/40 to-transparent md:block"
          />
          {steps.map((s) => (
            <div key={s.n} className="card relative p-8">
              <div className="absolute -top-4 right-6 rounded-full bg-bg px-3 py-1 font-display text-xs font-bold text-brand-300 ring-1 ring-brand-500/40">
                שלב {s.n}
              </div>
              <div className="mb-5 inline-flex h-14 min-w-14 items-center justify-center rounded-2xl bg-brand-500/10 px-3 ring-1 ring-brand-500/30">
                <s.Icon />
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                {s.title}
              </h3>
              <p className="mt-2 leading-7 text-ink-300">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
