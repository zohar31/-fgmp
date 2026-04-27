import { Activity, Clock, Globe, Zap } from "lucide-react";

const stats = [
  { icon: Globe, label: "קבוצות פייסבוק נסרקות", value: "אלפי" },
  { icon: Activity, label: "פוסטים בניתוח יומי", value: "100K+" },
  { icon: Clock, label: "פעילות", value: "24/7" },
  { icon: Zap, label: "זמן תגובה ממוצע", value: "<60ש׳" },
];

export function TrustBar() {
  return (
    <section className="border-y border-white/5 bg-bg-soft/50">
      <div className="container-x grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 ring-1 ring-brand-500/20">
              <s.icon className="h-5 w-5 text-brand-400" />
            </div>
            <div className="font-display text-2xl font-extrabold text-white">
              {s.value}
            </div>
            <div className="text-xs text-ink-300">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
