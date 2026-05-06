import { ArrowLeft, MessageCircle } from "lucide-react";
import { SITE, waLink } from "@/lib/config";

export function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-x">
        <div className="card relative overflow-hidden p-10 text-center md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grad-hero opacity-80"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl text-balance">
              בזמן שאתה קורא את זה —{" "}
              <span className="gradient-text">המתחרים שלך כבר עונים ללקוח</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ink-200">
              {SITE.pricing.monthlyILS}₪ לחודש · ערבות החזר מלא {SITE.pricing.refundDays} ימים · ביטול מהאזור האישי.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="/login" className="btn-wa text-base">
                התחילו עכשיו
                <ArrowLeft className="h-5 w-5" />
              </a>
              <a
                href={waLink("היי, יש לי שאלות על FGMP")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base"
              >
                <MessageCircle className="h-5 w-5" />
                שיחה מהירה בוואטסאפ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
