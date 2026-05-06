import Image from "next/image";
import { ArrowLeft, MessageCircle, Sparkles, Bell, ShieldCheck } from "lucide-react";
import { SITE, waLink } from "@/lib/config";
import { TelegramIcon } from "./TelegramIcon";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-x relative pt-12 pb-20 md:pt-20 md:pb-28 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-right">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-200 ring-1 ring-white/10">
              <Sparkles className="h-3.5 w-3.5 text-brand-400" />
              לידים מקבוצות פייסבוק · 24/7 אוטומטית
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
              מערכת לידים אוטומטית מקבוצות פייסבוק{" "}
              <span className="gradient-text">לוואטסאפ</span>.
            </h1>
            <p className="mt-4 text-base font-semibold text-ink-100 sm:text-lg">
              הלקוחות שלך מחפשים אותך עכשיו — אתה רק לא רואה את זה.
            </p>
            <p className="mt-4 text-lg leading-8 text-ink-200 sm:text-xl text-balance">
              אלפי פוסטים ביום בקבוצות פייסבוק של אנשים שמחפשים בדיוק את השירות שלך.{" "}
              <span className="font-bold text-white">FGMP סורקת בזמן אמת</span> ושולחת לך כל ליד רלוונטי
              ישירות לוואטסאפ או טלגרם — בזמן שאתה ישן, בפגישה, או נהנה.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-end">
              <span className="text-sm text-ink-300">לידים מגיעים אל:</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-wa/10 px-3 py-1 text-sm font-medium text-wa ring-1 ring-wa/30">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#229ED9]/10 px-3 py-1 text-sm font-medium text-[#5BBDE7] ring-1 ring-[#229ED9]/30">
                <TelegramIcon className="h-4 w-4" />
                Telegram
              </span>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-end lg:justify-end">
              <a
                href="/login"
                className="btn-wa w-full sm:w-auto text-base"
              >
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
                <ArrowLeft className="h-5 w-5" />
              </a>
              <a
                href={waLink("היי, אני רוצה לשמוע פרטים על FGMP")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full sm:w-auto text-base"
              >
                <MessageCircle className="h-5 w-5" />
                שיחה מהירה בוואטסאפ
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-300 lg:justify-end">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-wa" />
                ערבות החזר מלא {SITE.pricing.refundDays} ימים
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-wa" />
                ללא חוזה
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-wa" />
                ביטול דרך האזור האישי
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
          <Image
            src="/screenshots/lead-bakery.jpg"
            alt="צילום מסך של ליד אמיתי שהתקבל בוואטסאפ דרך FGMP"
            fill
            sizes="(max-width:1024px) 320px, 360px"
            priority
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute -right-4 top-12 hidden rotate-3 rounded-2xl bg-wa px-4 py-2 text-sm font-bold text-white shadow-glow-wa md:block">
        <Bell className="inline h-4 w-4 ms-1" />
        ליד חדש!
      </div>
    </div>
  );
}
