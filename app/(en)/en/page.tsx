import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ScanSearch,
  Filter,
  MessageSquareText,
  Bell,
  CheckCircle2,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppMockupEn } from "@/components/WhatsAppMockupEn";
import { JsonLd } from "@/lib/jsonld";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";

const URL = `${SITE.url}/en`;

export const metadata: Metadata = {
  title: "FGMP — Automated Facebook-Group Leads, Straight to Your WhatsApp",
  description: SITE_EN.descriptions.meta,
  alternates: {
    canonical: URL,
    languages: { "he-IL": SITE.url, "en-US": URL, "x-default": SITE.url },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: URL,
    siteName: SITE.brand,
    title: "FGMP — Automated Facebook-Group Leads to WhatsApp",
    description: SITE_EN.descriptions.og,
    images: [{ url: "/og-image.jpeg", width: 1200, height: 630, alt: "FGMP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FGMP — Automated Facebook-Group Leads to WhatsApp",
    description: SITE_EN.descriptions.og,
    images: ["/og-image.jpeg"],
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: `${SITE.brand} — Facebook-group lead generation`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "en-US",
  url: URL,
  description: SITE_EN.descriptions.software,
  offers: {
    "@type": "Offer",
    price: SITE_EN.pricing.monthlyUSD,
    priceCurrency: "USD",
    url: `${SITE.url}/login`,
  },
  provider: { "@type": "Organization", name: SITE.brand, url: SITE.url },
};

// Service schema — US market, for AI engines and Google.
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: `${SITE.brand} — Facebook-group lead generation`,
  serviceType: "Lead Generation",
  description: SITE_EN.descriptions.service,
  provider: { "@type": "Organization", name: SITE.brand, url: SITE.url },
  areaServed: { "@type": "Country", name: "United States" },
  audience: { "@type": "BusinessAudience", audienceType: "US local service businesses" },
  inLanguage: "en-US",
  url: URL,
  offers: {
    "@type": "Offer",
    price: SITE_EN.pricing.monthlyUSD,
    priceCurrency: "USD",
    url: `${SITE.url}/login`,
  },
};

// HowTo schema — English, for rich results and AI answers.
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to get leads from Facebook groups automatically",
  description: "From a post in a group to a lead in your WhatsApp, in four steps.",
  totalTime: "PT1M",
  inLanguage: "en-US",
  step: [
    { "@type": "HowToStep", position: 1, name: "A request is posted in a Facebook group", text: "Someone posts publicly asking for a service you provide." },
    { "@type": "HowToStep", position: 2, name: "AI scans and filters the post", text: "FGMP detects the post within seconds and matches it to your trade and keywords." },
    { "@type": "HowToStep", position: 3, name: "An alert is sent to you", text: "You get a WhatsApp message with the post, a direct link, and an AI-written reply." },
    { "@type": "HowToStep", position: 4, name: "You reply and win the job", text: "You review the reply, send it first, and turn the lead into a customer." },
  ],
};

const faqs = [
  {
    q: "How does FGMP work?",
    a: "FGMP does four things: (1) scans tens of thousands of active Facebook groups 24/7 — you don't need to be a member of any of them; (2) uses AI to understand intent and surface only posts from people looking for your service; (3) writes a unique suggested reply for each post; and (4) sends the post, link, and reply straight to your WhatsApp in under a minute.",
  },
  {
    q: "Do I have to be a member of the Facebook groups?",
    a: "No. The scanning happens on our side across public group content. You don't grant Facebook permissions and we never operate on your account.",
  },
  {
    q: "How much does it cost?",
    a: `$${SITE_EN.pricing.monthlyUSD}/month, paid upfront at signup. There's a money-back guarantee for the first ${SITE_EN.pricing.refundDays} days — cancel within ${SITE_EN.pricing.refundDays} days of your first payment for a full refund. After that, cancelling stops future charges but the current month isn't refunded. No contract, cancel anytime.`,
  },
  {
    q: "How fast do leads arrive?",
    a: "Once your business details are set up, the first leads typically start arriving within 12–48 hours as the AI tunes filtering to your trade.",
  },
  {
    q: "Is it legal?",
    a: "Yes. The system analyzes public group content visible to any group member. There's no access to anyone's account, no automated actions on your behalf, and no Facebook terms violation.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en-US",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function EnHome() {
  const price = SITE_EN.pricing.monthlyUSD;
  const refund = SITE_EN.pricing.refundDays;

  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={faqSchema} />
      <Nav />
      <main id="main-content">
        {/* Hero */}
        <section className="container-x py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-200 ring-1 ring-white/10">
              <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
              AI lead generation from Facebook groups
            </div>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">
              Your next customers are <span className="gradient-text">already asking</span> in
              Facebook groups.
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink-200">
              Every day, people post in Facebook groups looking for a service like yours. FGMP's AI
              scans them 24/7 and sends each relevant lead — with a ready-to-send reply — straight to
              your WhatsApp, in under a minute.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                Get started — ${price}/mo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#how" className="btn-ghost text-base">
                See how it works
              </a>
            </div>
            <p className="mt-4 text-sm text-ink-400">
              {refund}-day money-back guarantee · No contract · Cancel anytime
            </p>
          </div>

          {/* Trust stats */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["50,000+", "active groups scanned"],
              ["50–60K", "posts analyzed daily"],
              ["1,000+", "leads delivered daily"],
              ["< 60 sec", "post → your WhatsApp"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-white/[0.03] p-5 text-center ring-1 ring-white/10">
                <div className="font-display text-2xl font-extrabold text-brand-300">{v}</div>
                <div className="mt-1 text-xs text-ink-300">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="container-x py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-lg text-ink-300">
              Four layers, fully automated — from a post in a group to a lead in your WhatsApp.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-4">
            {[
              { Icon: ScanSearch, title: "Continuous scanning", desc: "50,000+ active Facebook groups scanned around the clock — you're not a member of any of them." },
              { Icon: Filter, title: "AI filtering", desc: "AI understands context and intent — not just keywords — and surfaces only real leads for your trade." },
              { Icon: MessageSquareText, title: "AI-written reply", desc: "Each lead comes with a unique reply the AI wrote for that specific post. Copy, paste, send." },
              { Icon: Bell, title: "Instant WhatsApp alert", desc: "The post, a direct link, and the suggested reply land in your WhatsApp in under a minute." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="card flex h-full flex-col p-6 ring-1 ring-white/10">
                <Icon className="h-7 w-7 text-brand-300" />
                <h3 className="mt-4 font-display text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-300">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WhatsApp lead mockup demo */}
        <WhatsAppMockupEn />

        {/* Who it's for */}
        <section id="who" className="container-x py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              Built for local service businesses
            </h2>
            <p className="mt-3 text-lg text-ink-300">
              If people look for you in Facebook groups, FGMP works for you.
            </p>
          </div>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
            {[
              "Contractors", "Plumbers", "Electricians", "HVAC", "Locksmiths", "Movers",
              "Handymen", "Cleaners", "Roofers", "Painters", "Real estate agents", "Insurance agents",
              "Lawyers", "Accountants", "Photographers", "Event planners", "Beauticians", "Personal trainers",
            ].map((n) => (
              <span key={n} className="rounded-full bg-white/5 px-4 py-1.5 text-sm text-ink-200 ring-1 ring-white/10">
                {n}
              </span>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="container-x py-16 md:py-20">
          <div className="mx-auto max-w-xl">
            <div className="card rounded-3xl p-8 text-center ring-1 ring-brand-500/30 md:p-10">
              <h2 className="font-display text-3xl font-extrabold text-white">Simple pricing</h2>
              <div className="mt-6 flex items-end justify-center gap-2">
                <span className="font-display text-6xl font-extrabold text-white">${price}</span>
                <span className="mb-2 text-ink-300">/month</span>
              </div>
              <p className="mt-2 text-sm text-ink-400">Unlimited leads · No per-lead fees</p>
              <ul className="mt-8 space-y-3 text-left">
                {[
                  "Unlimited leads from 50,000+ Facebook groups",
                  "AI-written reply for every single lead",
                  "Delivered to WhatsApp or Telegram in under a minute",
                  `${refund}-day full money-back guarantee`,
                  "No contract — cancel anytime",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-wa" />
                    <span className="text-ink-100">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/login" className="btn-wa w-full justify-center text-base">
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink-400">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-300" />
                Secure checkout · Billed monthly
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="container-x py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-display text-3xl font-extrabold text-white sm:text-4xl">
              Frequently asked questions
            </h2>
            <div className="mt-10 space-y-4">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/5">
                  <summary className="cursor-pointer font-display font-bold text-white">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-ink-200">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container-x pb-24">
          <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 text-center ring-1 ring-white/10 md:p-12">
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              Stop chasing customers. Let them come to you.
            </h2>
            <p className="mt-3 text-ink-200">
              ${price}/month · {refund}-day money-back guarantee · No contract.
            </p>
            <div className="mt-6 flex justify-center">
              <Link href="/login" className="btn-wa text-base">
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
