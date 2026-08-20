import { CheckCheck, CheckCircle2 } from "lucide-react";

// English "What you get" demo — mirrors the Hebrew Demo.tsx two-column design.
// The chat cards are HTML/CSS product illustrations of a live FGMP lead alert,
// NOT photos of real customer chats.

type Demo = {
  trade: string;
  city: string;
  post: string;
  reply: string;
  time: string;
};

const DEMOS: Demo[] = [
  {
    trade: "Plumber",
    city: "Houston, TX",
    post: "Can anyone recommend a good plumber? Water heater just died and I need someone today 😩",
    reply: "Hi! Licensed plumber here in Houston — I can come out today. Want a quick quote?",
    time: "9:41 AM",
  },
  {
    trade: "Electrician",
    city: "Austin, TX",
    post: "Looking for a licensed electrician for a panel upgrade in Round Rock. Recommendations?",
    reply: "Hey! Licensed electrician serving Round Rock — panel upgrades are my specialty. Free estimate?",
    time: "2:18 PM",
  },
];

const BENEFITS = [
  "You sleep 🌙 — the system works",
  "You're in a meeting 💼 — the system works",
  "You're on vacation ✅ — the system works",
  "You're having dinner 🍕 — the system works",
];

function Bubble({ demo }: { demo: Demo }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#0b141a] ring-1 ring-white/10 shadow-lg">
      <div className="flex items-center gap-2 bg-[#1f2c34] px-3 py-2">
        <div className="grid h-7 w-7 place-items-center rounded-full bg-wa/20 text-[11px] font-bold text-wa">FG</div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12px] font-semibold text-white">FGMP · Lead alert</div>
          <div className="text-[9px] text-ink-400">online</div>
        </div>
        <span className="rounded-full bg-wa/15 px-1.5 py-0.5 text-[8px] font-bold text-wa ring-1 ring-wa/40">NEW</span>
      </div>
      <div
        className="space-y-2 px-2.5 py-3 text-left"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "14px 14px" }}
      >
        <div className="max-w-[90%] rounded-xl rounded-tl-sm bg-[#1f2c34] px-2.5 py-1.5">
          <div className="text-[10px] font-bold text-brand-300">🔔 {demo.trade} — {demo.city}</div>
          <div className="mt-0.5 text-[11px] leading-4 text-ink-100">“{demo.post}”</div>
          <div className="mt-1 flex items-center justify-between text-[9px] text-ink-500">
            <span>Facebook group · now</span>
            <span className="text-brand-300">Open ↗</span>
          </div>
        </div>
        <div className="max-w-[92%] rounded-xl rounded-tl-sm bg-[#1f2c34] px-2.5 py-1.5">
          <div className="text-[10px] font-bold text-wa">✍️ AI-written reply</div>
          <div className="mt-0.5 text-[11px] leading-4 text-ink-100">{demo.reply}</div>
        </div>
        <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-[#005c4b] px-2.5 py-1.5">
          <div className="text-[11px] leading-4 text-white">{demo.reply}</div>
          <div className="mt-0.5 flex items-center justify-end gap-1 text-[9px] text-white/70">
            {demo.time}
            <CheckCheck className="h-3 w-3 text-[#53bdeb]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhatsAppMockupEn() {
  return (
    <section id="demo" className="py-20 md:py-28">
      <div className="container-x">
        <div className="card overflow-hidden p-8 md:p-12 lg:p-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="pill text-wa ring-wa/30">What you get</div>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl text-balance">
                The system works — <span className="gradient-text">while your life goes on</span>
              </h2>
              <p className="mt-4 leading-8 text-ink-200">
                No app to open, no login, no remembering to check. Just wait for your WhatsApp to
                buzz — with a new customer who&apos;s looking for you right now.
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {BENEFITS.map((b) => (
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
                {DEMOS.map((d) => (
                  <Bubble key={d.trade} demo={d} />
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-ink-400">
                A live FGMP alert — product illustration
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
