import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calculator } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/config";
import { LeadsTargetCalculator } from "./LeadsTargetCalculator";

export const metadata: Metadata = {
  title: "מחשבון: כמה לידים אני צריך בחודש? | FGMP",
  description:
    "מחשבון לידים חינמי: הזן יעד הכנסה, שווי עסקה ושיעור סגירה — וגלה כמה לידים אתה צריך בחודש וביום כדי להגיע ליעד. כלי תכנון לבעלי עסקים בישראל.",
  keywords: ["כמה לידים צריך", "מחשבון לידים", "יעד לידים", "כמות לידים בחודש", "חישוב לידים להכנסה"],
  alternates: { canonical: `${SITE.url}/tools/leads-target-calculator` },
  openGraph: {
    type: "website",
    title: "מחשבון: כמה לידים אני צריך? — FGMP",
    description: "חשב אחורה מיעד ההכנסה כמה לידים צריך בחודש.",
    url: `${SITE.url}/tools/leads-target-calculator`,
  },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "מחשבון כמה לידים צריך",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "he-IL",
  url: `${SITE.url}/tools/leads-target-calculator`,
  offers: { "@type": "Offer", price: 0, priceCurrency: "ILS" },
  provider: { "@type": "Organization", name: SITE.brand, url: SITE.url },
};

export default function LeadsTargetCalculatorPage() {
  return (
    <>
      <JsonLd data={appSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "דף הבית", url: SITE.url },
          { name: "כלים", url: `${SITE.url}/tools` },
          { name: "מחשבון כמה לידים צריך", url: `${SITE.url}/tools/leads-target-calculator` },
        ])}
      />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "דף הבית", href: "/" },
            { name: "כלים", href: "/tools" },
            { name: "כמה לידים צריך", href: "/tools/leads-target-calculator" },
          ]}
        />

        <article className="mx-auto mt-8 max-w-3xl">
          <header>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-200 ring-1 ring-white/10">
              <Calculator className="h-3.5 w-3.5 text-brand-400" />
              כלי חינמי
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              כמה לידים אני צריך בחודש?
            </h1>
            <p className="mt-4 text-lg leading-8 text-ink-200">
              במקום לנחש — חשב אחורה מיעד ההכנסה. הזן יעד, שווי עסקה ושיעור סגירה, וגלה בדיוק לכמה
              לידים לכוון בחודש וביום.
            </p>
          </header>

          <div className="mt-10 rounded-3xl bg-white/[0.02] p-6 ring-1 ring-white/10 md:p-8">
            <LeadsTargetCalculator />
          </div>

          <div className="prose prose-invert prose-lg mt-12 max-w-none">
            <h2>הנוסחה מאחורי המחשבון</h2>
            <p>
              לקוחות שצריך = יעד הכנסה ÷ שווי עסקה ממוצע. לידים שצריך = לקוחות ÷ שיעור סגירה. שים לב:
              שיפור שיעור הסגירה מקטין דרמטית את כמות הלידים הדרושה — ולכן{" "}
              <Link href="/guides/speed-to-lead">מהירות תגובה</Link> ו
              <Link href="/guides/sales-call-script">שיחת מכירה טובה</Link> שוות זהב.
            </p>
            <p>
              הרחבה: <Link href="/guides/how-many-leads-per-month">כמה לידים צריך עסק קטן בחודש</Link>. וכדי
              לחשב עלות — <Link href="/tools/cpl-calculator">מחשבון עלות לליד</Link> ו-
              <Link href="/tools/roi-calculator">מחשבון ROI</Link>.
            </p>
          </div>

          <div className="mt-12 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">צריך יותר לידים כדי להגיע ליעד?</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} מביאה לידים ללא הגבלה מקבוצות פייסבוק ב-{SITE.pricing.monthlyILS}₪/חודש ·
              ערבות החזר {SITE.pricing.refundDays} ימים.
            </p>
            <div className="mt-6">
              <Link href="/login" className="btn-wa text-base">התחילו עכשיו</Link>
            </div>
          </div>

          <div className="mt-12 border-t border-white/5 pt-8">
            <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              לכל הכלים
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
