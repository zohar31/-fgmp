import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calculator, TrendingUp, Target } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "כלים חינמיים לעסקים — מחשבוני לידים ו-ROI | FGMP",
  description:
    "כלים חינמיים לבעלי עסקים: מחשבון עלות לליד (CPL), מחשבון ROI לשיווק, ומחשבון כמה לידים צריך בחודש. חשב, תכנן, והחלט נכון.",
  alternates: { canonical: `${SITE.url}/tools` },
  openGraph: {
    type: "website",
    title: "כלים חינמיים לעסקים — FGMP",
    description: "מחשבוני לידים, ROI ויעדים — חינם.",
    url: `${SITE.url}/tools`,
  },
};

const TOOLS = [
  {
    href: "/tools/cpl-calculator",
    icon: Calculator,
    title: "מחשבון עלות לליד (CPL)",
    desc: "כמה אתה באמת משלם על כל ליד — והשוואה לחלופה.",
  },
  {
    href: "/tools/roi-calculator",
    icon: TrendingUp,
    title: "מחשבון ROI לשיווק",
    desc: "כמה מחזיר לך כל שקל שיווק — ROI, CPA והכנסה.",
  },
  {
    href: "/tools/leads-target-calculator",
    icon: Target,
    title: "כמה לידים אני צריך?",
    desc: "חשב אחורה מיעד ההכנסה כמה לידים צריך בחודש.",
  },
];

export default function ToolsIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "דף הבית", url: SITE.url },
          { name: "כלים", url: `${SITE.url}/tools` },
        ])}
      />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "דף הבית", href: "/" },
            { name: "כלים", href: "/tools" },
          ]}
        />

        <header className="mx-auto mt-8 max-w-3xl">
          <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            כלים חינמיים לבעלי עסקים
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-200">
            מחשבונים מהירים שיעזרו לך לתכנן ולהחליט נכון — עלות לליד, החזר על השקעה, וכמה לידים
            אתה באמת צריך.
          </p>
        </header>

        <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-3">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group card flex h-full flex-col p-6 ring-1 ring-white/10 transition hover:ring-brand-500/40 hover:-translate-y-0.5"
            >
              <t.icon className="h-7 w-7 text-brand-300" />
              <h2 className="mt-4 font-display text-lg font-bold text-white group-hover:text-brand-200">
                {t.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-ink-300">{t.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-300">
                פתח כלי
                <ArrowLeft className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <section className="mx-auto mt-16 max-w-3xl rounded-3xl bg-gradient-to-br from-brand-500/10 to-wa/10 p-8 ring-1 ring-white/10 md:p-12">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            חישבת — עכשיו תקבל את הלידים.
          </h2>
          <p className="mt-2 text-ink-200">
            {SITE.brand} סורקת קבוצות פייסבוק 24/7 ושולחת לידים לוואטסאפ. {SITE.pricing.monthlyILS}₪/חודש ·
            ערבות החזר {SITE.pricing.refundDays} ימים.
          </p>
          <div className="mt-6">
            <Link href="/login" className="btn-wa text-base">
              התחילו עכשיו
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
