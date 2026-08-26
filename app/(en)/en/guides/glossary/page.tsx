import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { glossaryEn } from "@/lib/glossary-en";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";

const URL = `${SITE.url}/en/guides/glossary`;

export const metadata: Metadata = {
  title: "Lead Generation Glossary — 24 Terms Every Business Should Know | FGMP",
  description:
    "A plain-English glossary of lead generation terms: hot lead, cold lead, CPL, CPA, close rate, lead funnel, exclusive lead, and more. Short, clear definitions — each linked to a deep-dive guide.",
  keywords: [
    "lead generation glossary",
    "lead terms",
    "what is a lead",
    "CPL CPA",
    "lead definitions",
  ],
  alternates: {
    canonical: URL,
    languages: { "he-IL": `${SITE.url}/guides/milon`, "en-US": URL },
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    title: "Lead Generation Glossary — FGMP",
    description: "Every lead generation term, defined clearly and simply.",
    url: URL,
  },
};

// DefinedTermSet — built from the glossary so it stays in sync.
const definedTermSet = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Lead Generation Glossary",
  inLanguage: "en-US",
  url: URL,
  hasDefinedTerm: glossaryEn.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    ...(t.aka?.length ? { alternateName: t.aka } : {}),
    description: t.def,
    inDefinedTermSet: URL,
    url: `${URL}#${t.anchor}`,
  })),
};

export default function GlossaryPageEn() {
  return (
    <>
      <JsonLd data={definedTermSet} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE.url}/en` },
          { name: "Guides", url: `${SITE.url}/en/guides` },
          { name: "Lead Generation Glossary", url: URL },
        ])}
      />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16" dir="ltr">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/en" },
            { name: "Guides", href: "/en/guides" },
            { name: "Glossary", href: "/en/guides/glossary" },
          ]}
        />

        <header className="mx-auto mt-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-200 ring-1 ring-white/10">
            <BookOpen className="h-3.5 w-3.5 text-brand-400" />
            Glossary
          </div>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Lead Generation Glossary
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-200">
            The {glossaryEn.length} most important terms in the world of leads — defined briefly, in plain
            English. Each term links to its in-depth guide.
          </p>
        </header>

        <nav aria-label="Terms" className="mx-auto mt-8 max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {glossaryEn.map((t) => (
              <a
                key={t.anchor}
                href={`#${t.anchor}`}
                className="rounded-full bg-white/5 px-3 py-1.5 text-sm text-ink-200 ring-1 ring-white/10 transition hover:text-white hover:ring-brand-500/40"
              >
                {t.term}
              </a>
            ))}
          </div>
        </nav>

        <dl className="mx-auto mt-10 max-w-3xl space-y-4">
          {glossaryEn.map((t) => (
            <div
              key={t.anchor}
              id={t.anchor}
              className="scroll-mt-24 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10"
            >
              <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-xl font-bold text-white">{t.term}</span>
                {t.aka?.length ? (
                  <span className="text-sm text-ink-400">{t.aka.join(" · ")}</span>
                ) : null}
              </dt>
              <dd className="mt-3 text-base leading-7 text-ink-200">
                {t.def}
                {t.guide ? (
                  <>
                    {" "}
                    <Link
                      href={`/en/guides/${t.guide}`}
                      className="whitespace-nowrap text-brand-300 underline underline-offset-2 hover:text-brand-200"
                    >
                      Full guide →
                    </Link>
                  </>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>

        <section className="mx-auto mt-16 max-w-3xl rounded-3xl bg-gradient-to-br from-brand-500/10 to-wa/10 p-8 ring-1 ring-white/10 md:p-12">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            You know the terms — now get the leads.
          </h2>
          <p className="mt-2 text-ink-200">
            {SITE.brand} scans Facebook groups 24/7 and sends hot leads to your WhatsApp.{" "}
            ${SITE_EN.pricing.monthlyUSD}/month · {SITE_EN.pricing.refundDays}-day money-back guarantee.
          </p>
          <div className="mt-6">
            <Link href="/login" className="btn-wa text-base">
              Get started
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </section>

        <div className="mx-auto mt-12 max-w-3xl border-t border-white/5 pt-8">
          <Link
            href="/en/guides"
            className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all guides
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
