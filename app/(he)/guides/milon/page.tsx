import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { glossary } from "@/lib/glossary";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "מילון מונחי לידים — 24 מושגים שכל עסק חייב להכיר | FGMP",
  description:
    "מילון מונחי לידים בעברית: ליד חם, ליד קר, CPL, CPA, שיעור המרה, משפך לידים, ליד בלעדי ועוד. הגדרות קצרות וברורות לכל מושג — עם קישור למדריך מעמיק.",
  keywords: [
    "מילון מונחי לידים",
    "מה זה ליד",
    "מונחי שיווק",
    "CPL CPA",
    "הגדרות לידים",
  ],
  alternates: {
    canonical: `${SITE.url}/guides/milon`,
    languages: { "he-IL": `${SITE.url}/guides/milon`, "en-US": `${SITE.url}/en/guides/glossary` },
  },
  openGraph: {
    type: "article",
    title: "מילון מונחי לידים — FGMP",
    description: "כל מונחי הלידים בעברית, מוגדרים בקצרה ובבירור.",
    url: `${SITE.url}/guides/milon`,
  },
};

// DefinedTermSet — נבנה דינמית מהמילון כדי שיישאר מסונכרן.
const definedTermSet = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "מילון מונחי לידים",
  inLanguage: "he-IL",
  url: `${SITE.url}/guides/milon`,
  hasDefinedTerm: glossary.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    ...(t.aka?.length ? { alternateName: t.aka } : {}),
    description: t.def,
    inDefinedTermSet: `${SITE.url}/guides/milon`,
    url: `${SITE.url}/guides/milon#${t.anchor}`,
  })),
};

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={definedTermSet} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "דף הבית", url: SITE.url },
          { name: "מדריכים", url: `${SITE.url}/guides` },
          { name: "מילון מונחי לידים", url: `${SITE.url}/guides/milon` },
        ])}
      />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "דף הבית", href: "/" },
            { name: "מדריכים", href: "/guides" },
            { name: "מילון מונחים", href: "/guides/milon" },
          ]}
        />

        <header className="mx-auto mt-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-200 ring-1 ring-white/10">
            <BookOpen className="h-3.5 w-3.5 text-brand-400" />
            מילון מונחים
          </div>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            מילון מונחי לידים
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-200">
            {glossary.length} המושגים החשובים בעולם הלידים — מוגדרים בקצרה, בעברית פשוטה. כל מונח
            עם קישור למדריך המעמיק שלו.
          </p>
        </header>

        {/* אינדקס אותיות/קפיצה מהיר */}
        <nav aria-label="מונחים" className="mx-auto mt-8 max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {glossary.map((t) => (
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
          {glossary.map((t) => (
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
                      href={`/guides/${t.guide}`}
                      className="whitespace-nowrap text-brand-300 underline underline-offset-2 hover:text-brand-200"
                    >
                      ← מדריך מלא
                    </Link>
                  </>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>

        <section className="mx-auto mt-16 max-w-3xl rounded-3xl bg-gradient-to-br from-brand-500/10 to-wa/10 p-8 ring-1 ring-white/10 md:p-12">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            מכירים את המונחים — עכשיו תקבלו את הלידים.
          </h2>
          <p className="mt-2 text-ink-200">
            {SITE.brand} סורקת קבוצות פייסבוק 24/7 ושולחת לידים חמים לוואטסאפ.{" "}
            {SITE.pricing.monthlyILS}₪/חודש · ערבות החזר {SITE.pricing.refundDays} ימים.
          </p>
          <div className="mt-6">
            <Link href="/login" className="btn-wa text-base">
              התחילו עכשיו
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <div className="mx-auto mt-12 max-w-3xl border-t border-white/5 pt-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            חזרה לכל המדריכים
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
