import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";
import { professionsEn, citiesEn } from "@/lib/geo-en";

const URL = `${SITE.url}/en/leads`;

export const metadata: Metadata = {
  title: "Leads by Trade & City — Facebook-Group Leads to WhatsApp | FGMP",
  description:
    "Choose your trade and city. FGMP scans local Facebook groups 24/7 and sends every relevant request to your WhatsApp — plumbers, electricians, movers, roofers, and more, across major US cities.",
  alternates: { canonical: URL, languages: { "en-US": URL } },
  openGraph: { type: "website", locale: "en_US", title: "Leads by trade & city — FGMP", url: URL },
};

export default function EnLeadsIndex() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: `${SITE.url}/en` }, { name: "Leads", url: URL }])} />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16">
        <Breadcrumbs items={[{ name: "Home", href: "/en" }, { name: "Leads", href: "/en/leads" }]} />

        <header className="mx-auto mt-6 max-w-3xl">
          <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Business owner? Choose your leads.
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-200">
            FGMP scans 50,000+ Facebook groups and sends every relevant request to your WhatsApp, in
            real time. Pick your trade — then your city. ${SITE_EN.pricing.monthlyUSD}/month,{" "}
            {SITE_EN.pricing.refundDays}-day money-back guarantee.
          </p>
        </header>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Leads by trade</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {professionsEn.map((p) => (
              <Link
                key={p.slug}
                href={`/en/leads/${p.slug}`}
                className="group flex items-center justify-between gap-2 rounded-2xl bg-white/[0.03] px-4 py-3 ring-1 ring-white/10 transition hover:bg-white/[0.06] hover:ring-brand-500/40"
              >
                <span className="font-medium text-white capitalize group-hover:text-brand-200">
                  {p.noun} leads
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-brand-300" />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white sm:text-3xl">
            <MapPin className="h-6 w-6 text-brand-300" />
            Cities we cover
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {citiesEn.map((c) => (
              <span
                key={c.slug}
                className="rounded-full bg-white/5 px-3 py-1.5 text-sm text-ink-200 ring-1 ring-white/10"
              >
                {c.name}, {c.state}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-400">
            Pick a trade above to see its dedicated page for each city.
          </p>
        </section>

        <section className="mt-16 rounded-3xl bg-gradient-to-br from-brand-500/10 to-wa/10 p-8 ring-1 ring-white/10 md:p-12">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Your next customers are already asking.
              </h2>
              <p className="mt-2 text-ink-200">
                ${SITE_EN.pricing.monthlyUSD}/month · Unlimited leads · {SITE_EN.pricing.refundDays}-day
                money-back guarantee.
              </p>
            </div>
            <Link href="/login" className="btn-wa text-base whitespace-nowrap">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
