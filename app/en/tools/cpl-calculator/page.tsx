import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";
import { CplCalculatorEn } from "./CplCalculatorEn";

const URL = `${SITE.url}/en/tools/cpl-calculator`;

export const metadata: Metadata = {
  title: "Cost Per Lead Calculator (CPL) — Free Tool | FGMP",
  description:
    "Free cost-per-lead calculator: enter your monthly spend and lead count to see your true CPL — and compare it to FGMP. Quick tool for US business owners.",
  keywords: ["cost per lead calculator", "cpl calculator", "how much does a lead cost"],
  alternates: { canonical: URL, languages: { "en-US": URL } },
  openGraph: { type: "website", locale: "en_US", title: "Cost Per Lead Calculator — FGMP", url: URL },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Cost Per Lead Calculator",
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
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: `${SITE.url}/en` }, { name: "Tools", url: `${SITE.url}/en/tools` }, { name: "Cost per lead", url: URL }])} />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16">
        <Breadcrumbs items={[{ name: "Home", href: "/en" }, { name: "Tools", href: "/en/tools" }, { name: "Cost per lead", href: "/en/tools/cpl-calculator" }]} />
        <article className="mx-auto mt-8 max-w-3xl">
          <header>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-200 ring-1 ring-white/10">
              <Calculator className="h-3.5 w-3.5 text-brand-400" />
              Free tool
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Cost Per Lead Calculator
            </h1>
            <p className="mt-4 text-lg leading-8 text-ink-200">
              What are you really paying per lead? Enter your monthly spend and lead count to see your
              true CPL — compared to FGMP.
            </p>
          </header>
          <div className="mt-10 rounded-3xl bg-white/[0.02] p-6 ring-1 ring-white/10 md:p-8">
            <CplCalculatorEn />
          </div>
          <div className="prose prose-invert prose-lg mt-12 max-w-none">
            <h2>Why cost per lead is only half the story</h2>
            <p>
              CPL matters, but the number that decides profitability is cost per acquisition (CPA) — CPL
              ÷ close rate. Learn more in <Link href="/en/guides/cost-per-lead">how much a lead costs</Link>{" "}
              and <Link href="/en/guides/organic-vs-paid-leads">organic vs. paid leads</Link>.
            </p>
          </div>
          <div className="mt-12 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">Want to drop your CPL to a few dollars?</h3>
            <p className="mt-2 text-ink-200">
              FGMP delivers unlimited Facebook-group leads for ${SITE_EN.pricing.monthlyUSD}/month · {SITE_EN.pricing.refundDays}-day money-back guarantee.
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
