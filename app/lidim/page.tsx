import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/config";
import { landingPages } from "@/lib/landing-pages";

export const metadata: Metadata = {
  title: "כל מה שצריך לדעת על לידים — אינדקס מדריכים | FGMP",
  description:
    "מדריכים מעמיקים על לידים אורגניים, לידים בוואטסאפ, ולידים לפי מקצוע — שיפוצניק, קוסמטיקאית, עורך דין, סוכן ביטוח, צלם. כיצד FGMP מספקת לידים בזמן אמת.",
  alternates: { canonical: `${SITE.url}/lidim` },
};

export default function LidimIndexPage() {
  const broad = landingPages.filter((p) => !p.keyword.startsWith("לידים ל"));
  const niche = landingPages.filter((p) => p.keyword.startsWith("לידים ל"));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "דף הבית", url: SITE.url },
          { name: "לידים", url: `${SITE.url}/lidim` },
        ])}
      />
      <Nav />
      <main id="main-content" className="container-x py-10">
        <Breadcrumbs
          items={[
            { name: "דף הבית", href: "/" },
            { name: "לידים", href: "/lidim" },
          ]}
        />

        <article className="mx-auto mt-8 max-w-4xl">
          <header>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              כל המדריכים על לידים
            </h1>
            <p className="mt-4 text-xl leading-9 text-ink-200">
              מדריכים מעמיקים בעברית: מה זה ליד אורגני? איך משיגים לידים בוואטסאפ?
              מה מקבל שיפוצניק / קוסמטיקאית / עורך דין? כל התשובות במקום אחד.
            </p>
          </header>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-white">
              מושגי יסוד
            </h2>
            <p className="mt-2 text-ink-300">
              מדריכים כלליים על איך עובדים לידים אורגניים מקבוצות פייסבוק.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {broad.map((p) => (
                <PageCard key={p.slug} page={p} />
              ))}
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold text-white">
              לידים לפי תחום עיסוק
            </h2>
            <p className="mt-2 text-ink-300">
              איך עובדת FGMP בכל תחום ספציפי — לידים, סינון AI, וסקירה של הזרם בקבוצות.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {niche.map((p) => (
                <PageCard key={p.slug} page={p} />
              ))}
            </ul>
          </section>

          <div className="mt-16 border-t border-white/5 pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              חזרה לדף הבית
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function PageCard({ page }: { page: (typeof landingPages)[number] }) {
  return (
    <li>
      <Link
        href={`/lidim/${page.slug}`}
        className="card flex h-full flex-col p-5 transition hover:bg-white/[0.04]"
      >
        <h3 className="font-display text-lg font-bold text-white">{page.keyword}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-ink-300">
          {page.subheading.length > 130
            ? page.subheading.slice(0, 127) + "…"
            : page.subheading}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-300">
          קרא עוד
          <ChevronLeft className="h-3.5 w-3.5" />
        </span>
      </Link>
    </li>
  );
}
