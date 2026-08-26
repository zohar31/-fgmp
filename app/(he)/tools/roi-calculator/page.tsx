import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calculator } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/config";
import { RoiCalculator } from "./RoiCalculator";

export const metadata: Metadata = {
  title: "מחשבון ROI לשיווק לידים — כמה מחזיר לך כל שקל | FGMP",
  description:
    "מחשבון ROI חינמי לשיווק: הזן הוצאה, לידים, שיעור סגירה ורווח לעסקה — וגלה את ההחזר על ההשקעה, עלות ללקוח (CPA) והרווח החודשי. כלי לבעלי עסקים.",
  keywords: ["מחשבון ROI", "החזר השקעה שיווק", "ROI לידים", "עלות ללקוח", "CPA מחשבון"],
  alternates: { canonical: `${SITE.url}/tools/roi-calculator` },
  openGraph: {
    type: "website",
    title: "מחשבון ROI לשיווק לידים — FGMP",
    description: "כמה מחזיר לך כל שקל שיווק? חשב עכשיו.",
    url: `${SITE.url}/tools/roi-calculator`,
  },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "מחשבון ROI לשיווק לידים",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "he-IL",
  url: `${SITE.url}/tools/roi-calculator`,
  offers: { "@type": "Offer", price: 0, priceCurrency: "ILS" },
  provider: { "@type": "Organization", name: SITE.brand, url: SITE.url },
};

export default function RoiCalculatorPage() {
  return (
    <>
      <JsonLd data={appSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "דף הבית", url: SITE.url },
          { name: "כלים", url: `${SITE.url}/tools` },
          { name: "מחשבון ROI", url: `${SITE.url}/tools/roi-calculator` },
        ])}
      />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "דף הבית", href: "/" },
            { name: "כלים", href: "/tools" },
            { name: "מחשבון ROI", href: "/tools/roi-calculator" },
          ]}
        />

        <article className="mx-auto mt-8 max-w-3xl">
          <header>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-200 ring-1 ring-white/10">
              <Calculator className="h-3.5 w-3.5 text-brand-400" />
              כלי חינמי
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              מחשבון ROI לשיווק לידים
            </h1>
            <p className="mt-4 text-lg leading-8 text-ink-200">
              כמה מחזיר לך כל שקל שיווק? הזן את הנתונים וגלה את ה-ROI, העלות ללקוח (CPA) וההכנסה
              מהערוץ — ואיפה אתה עומד.
            </p>
          </header>

          <div className="mt-10 rounded-3xl bg-white/[0.02] p-6 ring-1 ring-white/10 md:p-8">
            <RoiCalculator />
          </div>

          <div className="prose prose-invert prose-lg mt-12 max-w-none">
            <h2>למה ROI חשוב יותר מעלות לליד</h2>
            <p>
              ליד זול עם סגירה אפסית יקר מליד יקר שנסגר. לכן המדד האמיתי הוא ההחזר על ההשקעה (ROI)
              והעלות ללקוח (CPA), לא מחיר הליד הבודד. הרחבה:{" "}
              <Link href="/guides/calculate-cost-per-lead">איך מחשבים עלות לליד ולעסקה</Link> ו-
              <Link href="/guides/lead-kpis">7 מדדי הלידים החשובים</Link>.
            </p>
            <p>
              רוצים לדעת כמה לידים צריך כדי להגיע ליעד?{" "}
              <Link href="/tools/leads-target-calculator">מחשבון כמה לידים צריך</Link>.
            </p>
          </div>

          <div className="mt-12 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">רוצה ROI גבוה יותר?</h3>
            <p className="mt-2 text-ink-200">
              עלות קבועה נמוכה = ROI גבוה. {SITE.brand} — לידים ללא הגבלה ב-{SITE.pricing.monthlyILS}₪/חודש ·
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
