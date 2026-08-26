import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, MapPin } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { SITE, waLink } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";
import {
  allGeoEnParams,
  getCityEn,
  getProfessionEn,
  buildGeoEnContent,
  citiesEn,
} from "@/lib/geo-en";

export function generateStaticParams() {
  return allGeoEnParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ profession: string; city: string }>;
}): Promise<Metadata> {
  const { profession, city } = await params;
  const p = getProfessionEn(profession);
  const c = getCityEn(city);
  if (!p || !c) return {};
  const content = buildGeoEnContent(p, c, SITE_EN.pricing.monthlyUSD, SITE_EN.pricing.refundDays);
  const url = `${SITE.url}/en/leads/${profession}/${city}`;
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: url, languages: { "en-US": url } },
    openGraph: { type: "article", locale: "en_US", title: content.metaTitle, description: content.metaDescription, url },
    twitter: { card: "summary_large_image", title: content.metaTitle, description: content.metaDescription },
  };
}

export default async function GeoEnPage({
  params,
}: {
  params: Promise<{ profession: string; city: string }>;
}) {
  const { profession, city } = await params;
  const p = getProfessionEn(profession);
  const c = getCityEn(city);
  if (!p || !c) notFound();

  const content = buildGeoEnContent(p, c, SITE_EN.pricing.monthlyUSD, SITE_EN.pricing.refundDays);
  const url = `${SITE.url}/en/leads/${profession}/${city}`;

  const localServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${p.noun} leads in ${c.name}, ${c.state} — ${SITE.brand}`,
    serviceType: `Lead Generation — ${p.service}`,
    description: content.metaDescription,
    provider: { "@type": "Organization", name: SITE.brand, url: SITE.url },
    areaServed: [
      { "@type": "City", name: `${c.name}, ${c.state}` },
      ...c.nearby.map((n) => ({ "@type": "City", name: n })),
    ],
    inLanguage: "en-US",
    url,
    offers: { "@type": "Offer", price: SITE_EN.pricing.monthlyUSD, priceCurrency: "USD", url: `${SITE.url}/login` },
  };

  const siblings = [
    ...citiesEn.filter((x) => x.slug !== c.slug && x.region === c.region),
    ...citiesEn.filter((x) => x.slug !== c.slug && x.region !== c.region),
  ].slice(0, 6);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE.url}/en` },
          { name: "Leads", url: `${SITE.url}/en/leads` },
          { name: `${p.noun} leads`, url: `${SITE.url}/en/leads/${profession}` },
          { name: `${c.name}, ${c.state}`, url },
        ])}
      />
      <JsonLd data={localServiceSchema} />
      <JsonLd data={faqSchema(content.faq)} />

      <Nav />
      <main id="main-content" className="container-x py-10">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/en" },
            { name: "Leads", href: "/en/leads" },
            { name: `${p.noun} leads`, href: `/en/leads/${profession}` },
            { name: c.name, href: `/en/leads/${profession}/${city}` },
          ]}
        />

        <article className="mx-auto mt-8 max-w-3xl">
          <header>
            <div className="pill inline-flex items-center gap-1.5 text-brand-300 ring-brand-500/30">
              <MapPin className="h-3.5 w-3.5" />
              {content.kicker}
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {content.h1}
            </h1>
            <p className="mt-4 text-xl leading-9 text-ink-200">{content.subheading}</p>
          </header>

          <div className="prose prose-invert prose-lg mt-12 max-w-none">
            {content.intro.map((para, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
            ))}

            <h2>Why {SITE.brand} for {p.nounPlural} in {c.name}</h2>
            <ul className="not-prose space-y-3">
              {content.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-wa" />
                  <span
                    className="text-ink-100"
                    dangerouslySetInnerHTML={{ __html: b.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }}
                  />
                </li>
              ))}
            </ul>

            <h2>FAQ — {p.noun} leads in {c.name}</h2>
            <div className="not-prose space-y-4">
              {content.faq.map((f, i) => (
                <details key={i} className="group rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/5">
                  <summary className="cursor-pointer font-display font-bold text-white">{f.q}</summary>
                  <p className="mt-3 text-sm leading-7 text-ink-200">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-brand-300" />
              <div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Start getting leads in {c.name} — with a {SITE_EN.pricing.refundDays}-day money-back guarantee
                </h3>
                <p className="mt-2 text-ink-200">
                  ${SITE_EN.pricing.monthlyUSD}/month · No contract · Unlimited leads from {c.name}-area groups.
                  Not happy within {SITE_EN.pricing.refundDays} days? Full refund.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/login" className="btn-wa text-base">
                    <CheckCircle2 className="h-5 w-5" />
                    Get started
                  </Link>
                  <a
                    href={waLink(`Hi, I'm a ${p.noun} in ${c.name} and want to hear about Facebook-group leads`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-base"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <h3 className="text-sm font-bold text-ink-100">{p.noun.charAt(0).toUpperCase() + p.noun.slice(1)} leads in other cities</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/en/leads/${profession}/${s.slug}`}
                  className="rounded-full bg-white/5 px-3 py-1.5 text-sm text-ink-200 ring-1 ring-white/10 transition hover:text-white hover:ring-brand-500/40"
                >
                  {s.name}, {s.state}
                </Link>
              ))}
            </div>
            <p className="mt-4 text-sm text-ink-400">{content.nearbyLine}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link href={`/en/leads/${profession}`} className="inline-flex items-center gap-2 text-sm text-brand-300 hover:text-white">
              <ArrowRight className="h-4 w-4 rotate-180" />
              All about {p.noun} leads
            </Link>
            <Link href="/en/leads" className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white">
              More lead pages by trade
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
