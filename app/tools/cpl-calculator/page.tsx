import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calculator } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/config";
import { CplCalculator } from "./CplCalculator";

export const metadata: Metadata = {
  title: "מחשבון עלות לליד (CPL) — כמה אתה באמת משלם על ליד | FGMP",
  description:
    "מחשבון עלות לליד חינמי: הזן הוצאה חודשית וכמות לידים וגלה את ה-CPL האמיתי שלך — והשווה לעלות של FGMP. כלי מהיר לבעלי עסקים בישראל.",
  keywords: ["מחשבון עלות לליד", "CPL", "חישוב עלות לליד", "כמה עולה ליד", "מחשבון לידים"],
  alternates: { canonical: `${SITE.url}/tools/cpl-calculator` },
  openGraph: {
    type: "website",
    title: "מחשבון עלות לליד (CPL) — FGMP",
    description: "גלה את העלות האמיתית שלך לליד, והשווה לחלופה.",
    url: `${SITE.url}/tools/cpl-calculator`,
  },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "מחשבון עלות לליד (CPL)",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "he-IL",
  url: `${SITE.url}/tools/cpl-calculator`,
  offers: { "@type": "Offer", price: 0, priceCurrency: "ILS" },
  provider: { "@type": "Organization", name: SITE.brand, url: SITE.url },
};

export default function CplCalculatorPage() {
  return (
    <>
      <JsonLd data={appSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "דף הבית", url: SITE.url },
          { name: "כלים", url: `${SITE.url}/tools` },
          { name: "מחשבון עלות לליד", url: `${SITE.url}/tools/cpl-calculator` },
        ])}
      />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "דף הבית", href: "/" },
            { name: "כלים", href: "/tools" },
            { name: "מחשבון עלות לליד", href: "/tools/cpl-calculator" },
          ]}
        />

        <article className="mx-auto mt-8 max-w-3xl">
          <header>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-200 ring-1 ring-white/10">
              <Calculator className="h-3.5 w-3.5 text-brand-400" />
              כלי חינמי
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              מחשבון עלות לליד (CPL)
            </h1>
            <p className="mt-4 text-lg leading-8 text-ink-200">
              כמה אתה באמת משלם על כל ליד? הזן את ההוצאה החודשית ואת כמות הלידים — ותקבל את העלות
              האמיתית, בהשוואה לעלות של FGMP.
            </p>
          </header>

          <div className="mt-10 rounded-3xl bg-white/[0.02] p-6 ring-1 ring-white/10 md:p-8">
            <CplCalculator />
          </div>

          <div className="prose prose-invert prose-lg mt-12 max-w-none">
            <h2>איך מחשבים עלות לליד נכון</h2>
            <p>
              עלות לליד (CPL) היא סך ההוצאה על ערוץ שיווקי חלקי מספר הלידים ממנו — כולל תקציב מדיה,
              דמי ניהול וכלים, לא רק עלות המודעה. אבל CPL הוא רק חצי מהתמונה: המדד שקובע רווחיות הוא{" "}
              <Link href="/guides/calculate-cost-per-lead">עלות לעסקה סגורה (CPA)</Link>.
            </p>
            <p>
              רוצה להעמיק? קרא את <Link href="/guides/lead-price-list">מחירון הלידים המלא</Link> ואת{" "}
              <Link href="/guides/lead-cost-facebook-2026">מדריך עלויות הלידים מפייסבוק</Link>. ולחישוב
              היעד — <Link href="/tools/leads-target-calculator">מחשבון כמה לידים צריך</Link>.
            </p>
          </div>

          <div className="mt-12 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">רוצה להוריד את העלות לליד ל-3-10 ₪?</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} מביאה לידים ללא הגבלה מקבוצות פייסבוק ב-{SITE.pricing.monthlyILS}₪/חודש קבוע ·
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
