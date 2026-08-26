import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";
import { LeadsTargetCalculatorEn } from "./LeadsTargetCalculatorEn";

const URL = `${SITE.url}/en/tools/leads-target-calculator`;

export const metadata: Metadata = {
  title: "How Many Leads Do I Need? — Free Calculator | FGMP",
  description:
    "Free calculator: enter your revenue goal, average deal size, and close rate to see exactly how many leads you need per month and per day to hit your target.",
  keywords: ["how many leads do i need", "leads calculator", "lead goal calculator"],
  alternates: { canonical: URL, languages: { "en-US": URL } },
  openGraph: { type: "website", locale: "en_US", title: "How Many Leads Do I Need? — FGMP", url: URL },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Leads-Needed Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "en-US",
  url: URL,
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  provider: { "@type": "Organization", name: SITE.brand, url: SITE.url },
};

export default function Page() {
  return (
    <>
      <JsonLd data={appSchema} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: `${SITE.url}/en` }, { name: "Tools", url: `${SITE.url}/en/tools` }, { name: "Leads needed", url: URL }])} />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16">
        <Breadcrumbs items={[{ name: "Home", href: "/en" }, { name: "Tools", href: "/en/tools" }, { name: "Leads needed", href: "/en/tools/leads-target-calculator" }]} />
        <article className="mx-auto mt-8 max-w-3xl">
          <header>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-200 ring-1 ring-white/10">
              <Calculator className="h-3.5 w-3.5 text-brand-400" />
              Free tool
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              How many leads do I need?
            </h1>
            <p className="mt-4 text-lg leading-8 text-ink-200">
              Stop guessing. Work backwards from your revenue goal to see exactly how many leads you
              need per month and per day.
            </p>
          </header>
          <div className="mt-10 rounded-3xl bg-white/[0.02] p-6 ring-1 ring-white/10 md:p-8">
            <LeadsTargetCalculatorEn />
          </div>
          <div className="prose prose-invert prose-lg mt-12 max-w-none">
            <h2>The formula behind it</h2>
            <p>
              Customers needed = revenue goal ÷ deal size. Leads needed = customers ÷ close rate.
              Improving your close rate — for example by{" "}
              <Link href="/en/guides/speed-to-lead">responding faster</Link> — cuts the number of leads
              you need. Then check your cost with the{" "}
              <Link href="/en/tools/cpl-calculator">cost-per-lead calculator</Link>.
            </p>
          </div>
          <div className="mt-12 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">Need more leads to hit your goal?</h3>
            <p className="mt-2 text-ink-200">
              FGMP — unlimited Facebook-group leads for ${SITE_EN.pricing.monthlyUSD}/month · {SITE_EN.pricing.refundDays}-day money-back guarantee.
            </p>
            <div className="mt-6"><Link href="/login" className="btn-wa text-base">Get started</Link></div>
          </div>
          <div className="mt-12 border-t border-white/5 pt-8">
            <Link href="/en/tools" className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white">
              <ArrowRight className="h-4 w-4 rotate-180" />
              All tools
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
