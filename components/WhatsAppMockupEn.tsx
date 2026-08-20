import { Check, CheckCheck } from "lucide-react";

// English WhatsApp-style lead-alert mockup. A product illustration of what an
// FGMP lead looks like in WhatsApp — NOT a photo of a real customer chat.
// Mirrors the Hebrew screenshots' design using pure HTML/CSS (LTR).

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
    reply:
      "Hi! I'm a licensed plumber here in Houston and can come out today for the water heater. Want me to send a quick quote?",
    time: "9:41 AM",
  },
  {
    trade: "Electrician",
    city: "Austin, TX",
    post: "Looking for a licensed electrician for a panel upgrade in the Round Rock area. Recommendations?",
    reply:
      "Hey! Licensed electrician serving Round Rock & Austin — panel upgrades are my specialty. Happy to give you a free estimate 🙂",
    time: "2:18 PM",
  },
  {
    trade: "House Cleaner",
    city: "Phoenix, AZ",
    post: "Need a reliable house cleaner for a 3-bed home, ideally biweekly. Who do you use?",
    reply:
      "Hi! I run a cleaning service in the Phoenix area and have biweekly slots open. I'd love to set up a first visit — want the details?",
    time: "11:03 AM",
  },
];

function Bubble({ demo }: { demo: Demo }) {
  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] bg-[#0b141a] ring-1 ring-white/10 shadow-2xl">
      {/* header */}
      <div className="flex items-center gap-3 bg-[#1f2c34] px-4 py-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-wa/20 text-sm font-bold text-wa">
          FG
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-white">FGMP · Lead alert</div>
          <div className="text-[11px] text-ink-400">online</div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-wa/15 px-2 py-0.5 text-[10px] font-bold text-wa ring-1 ring-wa/40">
          NEW LEAD
        </span>
      </div>

      {/* chat body */}
      <div
        className="space-y-3 px-3 py-4"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        {/* system: the found post */}
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#1f2c34] px-3 py-2 text-left">
          <div className="text-[11px] font-bold text-brand-300">
            🔔 {demo.trade} lead — {demo.city}
          </div>
          <div className="mt-1 text-[13px] leading-5 text-ink-100">“{demo.post}”</div>
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-ink-500">
            <span>Facebook group · just now</span>
            <span className="text-brand-300">Open post ↗</span>
          </div>
        </div>

        {/* system: suggested AI reply */}
        <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-[#1f2c34] px-3 py-2 text-left">
          <div className="text-[11px] font-bold text-wa">✍️ Suggested reply (AI-written)</div>
          <div className="mt-1 text-[13px] leading-5 text-ink-100">{demo.reply}</div>
          <div className="mt-1 text-right text-[10px] text-ink-500">tap to copy</div>
        </div>

        {/* the business owner sends it */}
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-[#005c4b] px-3 py-2 text-left">
          <div className="text-[13px] leading-5 text-white">{demo.reply}</div>
          <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-white/70">
            {demo.time}
            <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />
          </div>
        </div>

        {/* delivered indicator */}
        <div className="flex items-center justify-center gap-1 pt-1 text-[10px] text-ink-500">
          <Check className="h-3 w-3" />
          Sent in under a minute — before the competition
        </div>
      </div>
    </div>
  );
}

export function WhatsAppMockupEn() {
  return (
    <section id="demo" className="container-x py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
          Here&apos;s what a lead looks like
        </h2>
        <p className="mt-3 text-lg text-ink-300">
          A real request from a Facebook group, an AI-written reply, and you — first to respond.
          This is a product illustration of a live FGMP alert.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {DEMOS.map((d) => (
          <Bubble key={d.trade} demo={d} />
        ))}
      </div>
    </section>
  );
}
