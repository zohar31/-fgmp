import { MessageCircle, Sparkles, Bell, ShieldCheck } from "lucide-react";
import { SITE, waLink } from "@/lib/config";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-x relative pt-12 pb-20 md:pt-20 md:pb-28 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-right">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-200 ring-1 ring-white/10">
              <Sparkles className="h-3.5 w-3.5 text-brand-400" />
              מערכת AI שעובדת בשבילך 24/7
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
              הלקוחות שלך מחפשים אותך{" "}
              <span className="gradient-text">עכשיו</span>.
              <br />
              אתה רק לא רואה את זה.
            </h1>
            <p className="mt-6 text-lg leading-8 text-ink-200 sm:text-xl text-balance">
              אלפי פוסטים ביום בקבוצות פייסבוק של אנשים שמחפשים בדיוק את השירות שלך.{" "}
              <span className="font-bold text-white">FGMP סורקת בזמן אמת</span> ושולחת לך כל ליד רלוונטי
              ישירות לוואטסאפ — בזמן שאתה ישן, בפגישה, או נהנה.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-end lg:justify-end">
              <a
                href="#signup"
                className="btn-wa w-full sm:w-auto text-base"
              >
                <MessageCircle className="h-5 w-5" />
                התחילו {SITE.pricing.trialDays} ימי ניסיון חינם
              </a>
              <a
                href={waLink("היי, אני רוצה לשמוע פרטים על FGMP")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full sm:w-auto text-base"
              >
                שיחה מהירה בוואטסאפ
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-300 lg:justify-end">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-wa" />
                ללא כרטיס אשראי
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-wa" />
                ללא חוזה
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-wa" />
                ביטול בלחיצה
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative animate-float">
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-500/30 via-transparent to-wa/20 blur-3xl" />
      <div className="mx-auto aspect-[9/19] max-w-xs rounded-[2.5rem] bg-gradient-to-br from-bg-card to-bg-soft p-3 shadow-2xl ring-1 ring-white/10">
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-[#0b141a]">
          <div className="flex items-center justify-between bg-[#1f2c33] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-wa grid place-items-center text-white font-bold text-sm">F</div>
              <div>
                <div className="text-sm font-semibold text-white">FGMP</div>
                <div className="text-[10px] text-emerald-300">פעיל עכשיו</div>
              </div>
            </div>
            <div className="text-[10px] text-ink-400">12:47</div>
          </div>

          <div className="space-y-3 p-3">
            <Bubble
              time="12:31"
              title="🔥 ליד חדש מקבוצה"
              text='"מחפשת מאפרת לחתונה ב-15.6 באזור המרכז, מקסימום 1,500₪"'
              meta="קבוצה: כלות 2026 ❤️"
            />
            <Bubble
              time="12:42"
              title="🔥 ליד חדש מקבוצה"
              text='"דרוש דחוף שיפוצניק לתיקון אינסטלציה בנתניה, מוכן לשלם טוב"'
              meta="קבוצה: שכנים נתניה"
            />
            <Bubble
              time="12:47"
              title="🔥 ליד חדש מקבוצה"
              text='"ממליצים על צלם לאירוע 50 איש בסוף החודש?"'
              meta="קבוצה: עצמאיים שוהם"
              highlight
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-4 top-12 hidden rotate-3 rounded-2xl bg-wa px-4 py-2 text-sm font-bold text-white shadow-glow-wa md:block">
        <Bell className="inline h-4 w-4 ms-1" />
        ליד חדש!
      </div>
    </div>
  );
}

function Bubble({
  time,
  title,
  text,
  meta,
  highlight,
}: {
  time: string;
  title: string;
  text: string;
  meta: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`max-w-[85%] rounded-2xl rounded-tr-sm px-3 py-2 text-right text-white shadow-md ${
        highlight ? "bg-emerald-700 animate-pulse-slow" : "bg-emerald-800"
      }`}
    >
      <div className="text-xs font-bold text-emerald-200">{title}</div>
      <div className="mt-1 text-sm leading-snug">{text}</div>
      <div className="mt-1 flex items-center justify-between gap-2 text-[10px] text-emerald-300">
        <span>{meta}</span>
        <span>{time} ✓✓</span>
      </div>
    </div>
  );
}
