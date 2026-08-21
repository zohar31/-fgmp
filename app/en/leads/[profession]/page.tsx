import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";
import { professionsEn, getProfessionEn, citiesEn } from "@/lib/geo-en";

export function generateStaticParams() {
  return professionsEn.map((p) => ({ profession: p.slug }));
}

// Trades with a dedicated in-depth lead guide — builds a two-way internal
// cluster (geo hub ⇄ guide). Extend as more trade guides are added.
const TRADE_GUIDE: Record<string, { slug: string; label: string }> = {
  mover: { slug: "mover-leads", label: "How moving companies get more booked jobs" },
  locksmith: { slug: "locksmith-leads", label: "How locksmiths get more calls" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ profession: string }>;
}): Promise<Metadata> {
  const { profession } = await params;
  const p = getProfessionEn(profession);
  if (!p) return {};
  const url = `${SITE.url}/en/leads/${profession}`;
  const title = `${p.noun.charAt(0).toUpperCase() + p.noun.slice(1)} Leads — Exclusive ${p.service} Leads from Facebook Groups | FGMP`;
  const description = `Get exclusive ${p.noun} leads from Facebook groups, delivered to your WhatsApp in real time. FGMP scans 50,000+ groups for ${p.service} requests. $${SITE_EN.pricing.monthlyUSD}/mo, ${SITE_EN.pricing.refundDays}-day money-back guarantee.`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { "en-US": url } },
    openGraph: { type: "article", locale: "en_US", title, description, url },
  };
}

export default async function ProfessionEnPage({
  params,
}: {
  params: Promise<{ profession: string }>;
}) {
  const { profession } = await params;
  const p = getProfessionEn(profession);
  if (!p) notFound();

  const url = `${SITE.url}/en/leads/${profession}`;
  const P = SITE_EN.pricing.monthlyUSD;
  const R = SITE_EN.pricing.refundDays;
  const Noun = p.noun.charAt(0).toUpperCase() + p.noun.slice(1);
  const tradeGuide = TRADE_GUIDE[profession];

  const faq = [
    {
      q: `How do I get ${p.noun} leads?`,
      a: `The warmest ${p.noun} leads come from people posting in local Facebook groups asking for ${p.service}. FGMP scans those groups 24/7 and sends each request to your WhatsApp with a ready-to-send reply — so you respond first.`,
    },
    {
      q: `Are these exclusive leads?`,
      a: `Effectively yes — you get the original group request, not a lead resold to several competitors. You reply directly to the person who posted.`,
    },
    {
      q: `How much do ${p.noun} leads cost?`,
      a: `$${P}/month flat, no per-lead fees, no contract. In an active trade like ${p.service} that works out to just a few dollars per lead. There's a ${R}-day money-back guarantee.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE.url}/en` },
          { name: "Leads", url: `${SITE.url}/en/leads` },
          { name: `${p.noun} leads`, url },
        ])}
      />
      <JsonLd data={faqSchema(faq)} />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-14">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/en" },
            { name: "Leads", href: "/en/leads" },
            { name: `${p.noun} leads`, href: `/en/leads/${profession}` },
          ]}
        />

        <article className="mx-auto mt-8 max-w-3xl">
          <header>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {Noun} Leads — from Facebook groups, straight to your WhatsApp
            </h1>
            <p className="mt-4 text-xl leading-9 text-ink-200">
              Every day, people post in local Facebook groups asking for {p.service}. FGMP finds those{" "}
              {p.service} requests in real time and sends each one to your WhatsApp — before your
              competitors even see them.
            </p>
          </header>

          <div className="prose prose-invert prose-lg mt-10 max-w-none">
            <h2>Why Facebook-group leads beat bought leads for {p.nounPlural}</h2>
            <ul className="not-prose space-y-3">
              {[
                `Real requests from real people — "${p.searchExamples[0]}" — not resold data.`,
                "You reply first, while the lead is still hot — whoever answers first wins the job.",
                "Every lead comes with an AI-written reply tailored to that exact post.",
                `Flat $${P}/month — unlimited leads, no per-lead fees, no contract.`,
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-wa" />
                  <span className="text-ink-100">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {tradeGuide && (
            <div className="mt-10 rounded-2xl bg-white/[0.03] p-5 ring-1 ring-brand-500/20">
              <Link
                href={`/en/guides/${tradeGuide.slug}`}
                className="group inline-flex items-center gap-2 font-display text-lg font-bold text-brand-200 hover:text-brand-100"
              >
                📘 Deep dive: {tradeGuide.label}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <p className="mt-1 text-sm text-ink-300">
                The full playbook for getting {p.noun} leads — channels, speed, and what it costs.
              </p>
            </div>
          )}

          <section className="mt-12">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white">
              <MapPin className="h-5 w-5 text-brand-300" />
              {Noun} leads by city
            </h2>
            <p className="mt-2 text-ink-300">A dedicated page for each metro — with that city's local groups.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {citiesEn.map((c) => (
                <Link
                  key={c.slug}
                  href={`/en/leads/${profession}/${c.slug}`}
                  className="rounded-full bg-white/5 px-3 py-1.5 text-sm text-ink-200 ring-1 ring-white/10 transition hover:text-white hover:ring-brand-500/40"
                >
                  {c.name}, {c.state}
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-brand-300" />
              <div>
                <h3 className="font-display text-2xl font-bold text-white">Ready for more {p.noun} jobs?</h3>
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
            </div>
          </div>

          <div className="mt-8 border-t border-white/5 pt-8">
            <Link href="/en/leads" className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white">
              <ArrowRight className="h-4 w-4 rotate-180" />
              All trades
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
