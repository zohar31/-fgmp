import { EyeOff, Users, TrendingDown } from "lucide-react";

const points = [
  {
    icon: EyeOff,
    title: "אתה מפספס לידים כל יום",
    text: "אלפי פוסטים נכתבים בקבוצות פייסבוק של אנשים שמחפשים בדיוק את מה שאתה מציע. אין סיכוי שתראה אותם בזמן.",
  },
  {
    icon: Users,
    title: "המתחרים שלך כן רואים",
    text: "מי שמגיב ראשון מקבל את הלקוח. בזמן שאתה גולל בפייסבוק, הם כבר סגרו את העסקה.",
  },
  {
    icon: TrendingDown,
    title: "להיות פעיל ידנית = שורף זמן",
    text: "לשבת מול קבוצות 12 שעות ביום זה לא עסק. אתה צריך מערכת שעובדת בשבילך — לא להפך.",
  },
];

export function Problem() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="pill text-brand-300 ring-brand-500/30">הבעיה</div>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl text-balance">
            הכסף הגדול ביותר שאתה מפסיד —{" "}
            <span className="gradient-text">הוא הכסף שאתה לא יודע עליו</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {points.map((p) => (
            <div key={p.title} className="card p-6">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-rose-500/10 ring-1 ring-rose-500/20">
                <p.icon className="h-6 w-6 text-rose-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                {p.title}
              </h3>
              <p className="mt-2 leading-7 text-ink-300">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
