import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, TrendingUp, Target } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";

const URL = `${SITE.url}/en/tools`;

export const metadata: Metadata = {
  title: "Free Business Tools — Lead & ROI Calculators | FGMP",
  description:
    "Free calculators for business owners: cost per lead, marketing ROI, and how many leads you need to hit your revenue goal.",
  alternates: { canonical: URL, languages: { "en-US": URL } },
  openGraph: { type: "website", locale: "en_US", title: "Free business tools — FGMP", url: URL },
};

const TOOLS = [
  { href: "/en/tools/cpl-calculator", icon: Calculator, title: "Cost Per Lead Calculator", desc: "What you really pay per lead — vs. the alternative." },
  { href: "/en/tools/roi-calculator", icon: TrendingUp, title: "Marketing ROI Calculator", desc: "ROI, cost per customer, and monthly revenue." },
  { href: "/en/tools/leads-target-calculator", icon: Target, title: "How Many Leads Do I Need?", desc: "Work backwards from your revenue goal." },
];

export default function EnToolsIndex() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: `${SITE.url}/en` }, { name: "Tools", url: URL }])} />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16">
        <Breadcrumbs items={[{ name: "Home", href: "/en" }, { name: "Tools", href: "/en/tools" }]} />
        <header className="mx-auto mt-6 max-w-3xl">
          <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Free tools for business owners
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-200">
            Quick calculators to help you plan and decide — cost per lead, ROI, and how many leads you
            actually need.
          </p>
        </header>
        <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-3">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group card flex h-full flex-col p-6 ring-1 ring-white/10 transition hover:ring-brand-500/40 hover:-translate-y-0.5"
            >
              <t.icon className="h-7 w-7 text-brand-300" />
              <h2 className="mt-4 font-display text-lg font-bold text-white group-hover:text-brand-200">{t.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-ink-300">{t.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-300">
                Open tool
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
        <section className="mx-auto mt-16 max-w-3xl rounded-3xl bg-gradient-to-br from-brand-500/10 to-wa/10 p-8 ring-1 ring-white/10 md:p-12">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Done calculating? Get the leads.</h2>
          <p className="mt-2 text-ink-200">
            FGMP scans Facebook groups 24/7 and sends leads to your WhatsApp. ${SITE_EN.pricing.monthlyUSD}/month · {SITE_EN.pricing.refundDays}-day money-back guarantee.
          </p>
          <div className="mt-6"><Link href="/login" className="btn-wa text-base">Get started<ArrowRight className="h-4 w-4" /></Link></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
