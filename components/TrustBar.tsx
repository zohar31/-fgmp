import { Activity, Clock, Globe, Zap, MessageCircle } from "lucide-react";
import { TelegramIcon } from "./TelegramIcon";

const stats = [
  { icon: Globe, label: "קבוצות פייסבוק נסרקות", value: "אלפי" },
  { icon: Activity, label: "פוסטים בניתוח יומי", value: "100K+" },
  { icon: Clock, label: "פעילות", value: "24/7" },
  { icon: Zap, label: "זמן תגובה ממוצע", value: "<60ש׳" },
];

export function TrustBar() {
  return (
    <section className="border-y border-white/5 bg-bg-soft/50">
      <div className="container-x py-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
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

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-white/5 pt-6">
          <span className="text-sm text-ink-300">לידים מגיעים אליך אל:</span>
          <span className="inline-flex items-center gap-2 rounded-full bg-wa/10 px-4 py-2 font-semibold text-wa ring-1 ring-wa/30">
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#229ED9]/10 px-4 py-2 font-semibold text-[#5BBDE7] ring-1 ring-[#229ED9]/30">
            <TelegramIcon className="h-5 w-5" />
            Telegram
          </span>
        </div>
      </div>
    </section>
  );
}
