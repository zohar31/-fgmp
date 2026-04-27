import { CheckCircle2 } from "lucide-react";

const benefits = [
  "אתה ישן 🌙 — המערכת עובדת",
  "אתה בפגישה 💼 — המערכת עובדת",
  "אתה בחופש ✅ — המערכת עובדת",
  "אתה אוכל 🍕 — המערכת עובדת",
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
              <div className="rounded-2xl bg-[#0b141a] p-4 ring-1 ring-white/10">
                <div className="space-y-2 text-right">
                  <NotifLine label="08:14" text='קונדיטורית באזור פתח תקווה? צריכה עוגת יום הולדת לשבוע הבא' />
                  <NotifLine label="09:32" text='מחפשת צלם לבר מצווה ב-22.7, תקציב 4-5K' highlight />
                  <NotifLine label="10:48" text='מי יכול להמליץ על שיפוצניק רציני בשרון?' />
                  <NotifLine label="11:15" text='וילה לסופ"ש עם בריכה ל-12 איש בצפון' />
                  <NotifLine label="12:47" text='מאפרת לאירוע ביום שלישי הקרוב — דחוף' highlight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NotifLine({
  label,
  text,
  highlight,
}: {
  label: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl px-3 py-2 text-sm text-white ring-1 ring-white/5 ${
        highlight ? "bg-emerald-700/60" : "bg-white/[0.04]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] text-ink-400">{label}</span>
        <span className="text-emerald-300 text-xs">🔥 ליד חדש</span>
      </div>
      <div className="mt-0.5 leading-snug">{text}</div>
    </div>
  );
}
