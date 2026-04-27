const niches = [
  { icon: "🏡", label: "וילות להשכרה" },
  { icon: "🛏️", label: "צימרים" },
  { icon: "🏙️", label: "לופטים לאירועים" },
  { icon: "💇‍♀️", label: "קוסמטיקאיות" },
  { icon: "💄", label: "מאפרות" },
  { icon: "🔧", label: "שיפוצניקים" },
  { icon: "🛠️", label: "הנדימנים" },
  { icon: "📸", label: "צלמים" },
  { icon: "🎂", label: "קונדיטוריות" },
  { icon: "🚗", label: "מוסכים" },
  { icon: "🐕", label: "מאלפי כלבים" },
  { icon: "🧹", label: "ניקיון" },
  { icon: "👨‍🏫", label: "מורים פרטיים" },
  { icon: "💼", label: "יועצים" },
  { icon: "🌿", label: "גננים" },
  { icon: "📦", label: "הובלות" },
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
            לא משנה איזה ענף — אם אנשים מחפשים אותך בקבוצות פייסבוק, אנחנו נביא לך אותם.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {niches.map((n) => (
            <div
              key={n.label}
              className="card flex items-center gap-3 px-4 py-3 transition-all hover:bg-white/[0.06] hover:ring-brand-500/30"
            >
              <span className="text-2xl">{n.icon}</span>
              <span className="font-medium text-ink-100">{n.label}</span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-ink-400">
          ועוד עשרות ענפים. לא רואה את העסק שלך? פנה אלינו ונבדוק.
        </p>
      </div>
    </section>
  );
}
