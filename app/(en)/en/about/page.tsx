import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";
import { CheckCircle2, ArrowRight } from "lucide-react";

const URL = `${SITE.url}/en/about`;
const P = SITE_EN.pricing.monthlyUSD;
const R = SITE_EN.pricing.refundDays;

export const metadata: Metadata = {
  title: "About FGMP — Automated Facebook-Group Lead Generation",
  description:
    "FGMP is an AI service that scans public Facebook groups 24/7 and delivers hot leads to your WhatsApp. What it is, how it works, and what it costs.",
  alternates: {
    canonical: URL,
    languages: { "he-IL": `${SITE.url}/about`, "en-US": URL, "x-default": `${SITE.url}/about` },
  },
  openGraph: { type: "article", locale: "en_US", title: "About FGMP", url: URL },
};

export default function EnAbout() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About FGMP",
          url: URL,
          inLanguage: "en-US",
          mainEntity: {
            "@type": "Organization",
            name: SITE.brand,
            url: SITE.url,
            description: SITE_EN.descriptions.organization,
            areaServed: [{ "@type": "Country", name: "United States" }, { "@type": "Country", name: "Israel" }],
          },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE.url}/en` },
          { name: "About", url: URL },
        ])}
      />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16">
        <Breadcrumbs items={[{ name: "Home", href: "/en" }, { name: "About", href: "/en/about" }]} />

        <article className="mx-auto mt-8 max-w-3xl">
          <header>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              About FGMP
            </h1>
            <p className="mt-4 text-xl leading-9 text-ink-200">
              FGMP is an AI system that scans tens of thousands of active Facebook groups 24/7,
              finds people who are looking for a specific service in real time, and sends those hot
              leads straight to a business owner's WhatsApp.
            </p>
          </header>

          <div className="prose prose-invert prose-lg mt-12 max-w-none">
            <h2>What is FGMP?</h2>
            <p>
              FGMP (FB Group Monitor Pro) is an automated lead-generation service. It scans 50,000+
              active Facebook groups around the clock, uses AI to filter for the posts that match
              your trade, and delivers only the relevant leads to you — on WhatsApp or Telegram,
              within seconds of the post going up. You never have to be a member of any group.
            </p>

            <h2>How it works — four layers</h2>
            <ul>
              <li>
                <strong>Continuous scanning</strong> — 50,000+ active groups, monitored on our side,
                not through your account.
              </li>
              <li>
                <strong>AI filtering</strong> — the AI understands context and intent, not just
                keywords, and surfaces only real leads for your service.
              </li>
              <li>
                <strong>AI-written reply</strong> — every lead comes with a unique suggested reply
                the AI wrote for that specific post. Copy, paste, send.
              </li>
              <li>
                <strong>Instant WhatsApp alert</strong> — the post, a direct link, and the reply
                reach you in under a minute.
              </li>
            </ul>

            <h2>Who it's for</h2>
            <p>
              Any local service business people search for in Facebook groups: contractors,
              plumbers, electricians, HVAC techs, locksmiths, movers, cleaners, roofers, painters,
              real estate and insurance agents, lawyers, accountants, photographers, event planners,
              beauticians, personal trainers, and more.
            </p>

            <h2>What it costs</h2>
            <p>
              <strong>${P}/month</strong>, paid upfront at signup, for unlimited leads with no
              per-lead fees. There's a <strong>{R}-day money-back guarantee</strong> — if it's not
              for you, cancel within {R} days of your first payment for a full refund. After the {R}{" "}
              days, the paid month runs and isn't refundable. No contract, cancel anytime.
            </p>

            <h2>Is it legal?</h2>
            <p>
              Yes. The system analyzes public group content that's visible to any group member.
              There's no access to anyone's Facebook account, no automated actions on your behalf,
              and no violation of Facebook's terms.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">Ready to start?</h3>
            <p className="mt-2 text-ink-200">
              ${P}/month · {R}-day money-back guarantee · Cancel anytime.
            </p>
            <div className="mt-6">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
