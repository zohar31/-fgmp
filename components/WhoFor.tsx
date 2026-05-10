import Link from "next/link";

// כל nich מקושר לדף נחיתה ייעודי שלו ב-/lidim/. אם אין דף ייעודי
// (לדוגמה הובלות, מוסכים, לופטים) — קישור לאינדקס /lidim שם הגולש
// ימצא את כל המקצועות הזמינים.
const niches: { icon: string; label: string; slug: string }[] = [
  { icon: "🏡", label: "וילות להשכרה",      slug: "lidim-letzimer" },
  { icon: "🛏️", label: "צימרים",            slug: "lidim-letzimer" },
  { icon: "🏙️", label: "לופטים לאירועים",   slug: "" }, // אין דף ייעודי → /lidim
  { icon: "💇‍♀️", label: "קוסמטיקאיות",      slug: "lidim-lakosmetikait" },
  { icon: "💄", label: "מאפרות",             slug: "lidim-lemaeperet" },
  { icon: "🔧", label: "שיפוצניקים",         slug: "lidim-leshipuznik" },
  { icon: "🛠️", label: "הנדימנים",           slug: "lidim-lehandimen" },
  { icon: "📸", label: "צלמים",              slug: "lidim-letzalam" },
  { icon: "🎂", label: "קונדיטוריות",        slug: "lidim-lekonditor" },
  { icon: "🚗", label: "מוסכים",             slug: "" }, // אין דף ייעודי → /lidim
  { icon: "🐕", label: "מאלפי כלבים",        slug: "lidim-lemaalef-klavim" },
  { icon: "🧹", label: "ניקיון",             slug: "lidim-leozeret-bayit" },
  { icon: "👨‍🏫", label: "מורים פרטיים",     slug: "lidim-lemore-prati" },
  { icon: "💼", label: "יועצים",             slug: "lidim-leyoetz-isky" },
  { icon: "🌿", label: "גננים",              slug: "lidim-leganan" },
  { icon: "📦", label: "הובלות",             slug: "" }, // אין דף ייעודי → /lidim
];

export function WhoFor() {
  return (
    <section id="who" className="py-20 md:py-28 bg-bg-soft/40 border-y border-white/5">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="pill">למי זה מתאים</div>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl text-balance">
            כל עסק שמחפש לקוחות —{" "}
            <span className="gradient-text">FGMP מוצאת אותם בשבילו</span>
          </h2>
          <p className="mt-4 text-ink-300">
            לא משנה איזה ענף — אם אנשים מחפשים אותך בקבוצות פייסבוק, אנחנו ממירים את הפוסטים האלה ללידים אצלך.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {niches.map((n) => {
            const href = n.slug ? `/lidim/${n.slug}` : "/lidim";
            return (
              <Link
                key={n.label}
                href={href}
                className="card flex items-center gap-3 px-4 py-3 transition-all hover:bg-white/[0.06] hover:ring-brand-500/30 hover:-translate-y-0.5"
                aria-label={`לידים ל${n.label} — דף מידע ייעודי`}
              >
                <span className="text-2xl" aria-hidden>{n.icon}</span>
                <span className="font-medium text-ink-100">{n.label}</span>
              </Link>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-ink-400">
          ועוד עשרות ענפים.{" "}
          <Link href="/lidim" className="font-medium text-brand-300 hover:text-brand-200 underline-offset-2 hover:underline">
            צפה בכל המקצועות
          </Link>
          . לא רואה את העסק שלך? פנה אלינו ונבדוק.
        </p>
      </div>
    </section>
  );
}
