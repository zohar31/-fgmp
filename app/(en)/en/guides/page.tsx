import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { guidesEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";

const URL = `${SITE.url}/en/guides`;

export const metadata: Metadata = {
  title: "Lead Generation Guides for Small Business | FGMP",
  description:
    "Practical guides on lead generation for small businesses: how to get leads from Facebook groups, hot vs. cold leads, speed to lead, cost per lead, and more.",
  alternates: {
    canonical: URL,
    languages: { "he-IL": `${SITE.url}/guides`, "en-US": URL, "x-default": `${SITE.url}/guides` },
  },
  openGraph: { type: "website", locale: "en_US", title: "Lead Generation Guides — FGMP", url: URL },
};

export default function EnGuidesIndex() {
  const categories = Array.from(new Set(guidesEn.map((g) => g.category)));
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE.url}/en` },
          { name: "Guides", url: URL },
        ])}
      />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/en" },
            { name: "Guides", href: "/en/guides" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-200 ring-1 ring-white/10">
            <BookOpen className="h-3.5 w-3.5 text-brand-400" />
            Lead generation guides
          </div>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Get more customers — without chasing them.
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-200">
            Practical, no-fluff guides on finding leads in Facebook groups, filtering the noise,
            responding fast, and closing more deals.
          </p>
        </header>

        {/* Featured resources — glossary + free tools, for discovery. */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            {
              href: "/en/guides/glossary",
              title: "Lead Generation Glossary",
              desc: "Every lead term, defined briefly and clearly",
            },
            {
              href: "/en/tools",
              title: "Free Lead Calculators",
              desc: "Cost-per-lead, ROI, and leads-target tools",
            },
          ].map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group card flex flex-col p-5 ring-1 ring-brand-500/20 transition hover:ring-brand-500/50 hover:-translate-y-0.5"
            >
              <span className="font-display text-lg font-bold text-brand-200 group-hover:text-brand-100">
                {r.title}
              </span>
              <span className="mt-1 text-sm leading-6 text-ink-300">{r.desc}</span>
            </Link>
          ))}
        </div>

        {categories.map((category) => (
          <section key={category} className="mt-14">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{category}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {guidesEn
                .filter((g) => g.category === category)
                .map((g) => (
                  <article
                    key={g.slug}
                    className="group card flex h-full flex-col p-6 ring-1 ring-white/10 transition hover:ring-brand-500/40 hover:-translate-y-0.5"
                  >
                    <h3 className="font-display text-xl font-bold leading-snug text-white group-hover:text-brand-200">
                      <Link href={`/en/guides/${g.slug}`} className="after:absolute after:inset-0">
                        {g.title}
                      </Link>
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-ink-300">{g.excerpt}</p>
                    <div className="mt-5 flex items-center gap-3 text-xs text-ink-400">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {g.readTime} min read
                      </span>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}

        <section className="mt-16 rounded-3xl bg-gradient-to-br from-brand-500/10 to-wa/10 p-8 ring-1 ring-white/10 md:p-12">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Skip the reading — get leads automatically.
              </h2>
              <p className="mt-2 text-ink-200">
                {SITE.brand} scans Facebook groups 24/7 and sends leads to your WhatsApp. $
                {SITE_EN.pricing.monthlyUSD}/month · {SITE_EN.pricing.refundDays}-day money-back
                guarantee.
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
