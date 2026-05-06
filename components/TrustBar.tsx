import Link from "next/link";
import { Activity, Bell, Globe, Zap, Search } from "lucide-react";

const stats = [
  { icon: Globe, label: "קבוצות פייסבוק נסרקות", value: "50,000+" },
  { icon: Activity, label: "פוסטים בניתוח יומי", value: "60,000+" },
  { icon: Search, label: "מילות מפתח פעילות", value: "4,670+" },
  { icon: Bell, label: "לידים נשלחים יומית", value: "1,000+" },
  { icon: Zap, label: "זמן תגובה ממוצע", value: "<60ש׳" },
];

export function TrustBar() {
  return (
    <section className="border-y border-white/5 bg-bg-soft/50">
      <div className="container-x py-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
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

        <div className="mt-3 text-center">
          <Link
            href="/methodology"
            className="text-xs text-ink-400 underline-offset-4 hover:text-ink-200 hover:underline"
          >
            איך מודדים את המספרים האלה? — מתודולוגיה
          </Link>
        </div>
      </div>
    </section>
  );
}
