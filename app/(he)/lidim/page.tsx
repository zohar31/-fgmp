import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/config";
import { landingPages } from "@/lib/landing-pages";
import { verticalPages } from "@/lib/landing-verticals";

export const metadata: Metadata = {
  title: "בחרו את סוג הלידים שלכם — לפי תחום ומקצוע | FGMP",
  description:
    "בעלי עסקים: בחרו את סוג הלידים — ביטוח, הלוואות, משכנתאות, נדל\"ן, החזרי מס, אסתטיקה, ועשרות מקצועות. FGMP מספקת לידים חמים מקבוצות פייסבוק בזמן אמת.",
  alternates: { canonical: `${SITE.url}/lidim` },
};

export default function LidimIndexPage() {
  const verticalSlugs = new Set(verticalPages.map((p) => p.slug));
  const broad = landingPages.filter(
    (p) => !p.keyword.startsWith("לידים ל") && !verticalSlugs.has(p.slug)
  );
  // מקצועות = "לידים ל..." שאינם קטגוריות ורטיקליות (אלה מוצגות בבורר נפרד).
  const niche = landingPages.filter(
    (p) => p.keyword.startsWith("לידים ל") && !verticalSlugs.has(p.slug)
  );

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
              בעלי עסקים? בחרו את סוג הלידים שלכם
            </h1>
            <p className="mt-4 text-xl leading-9 text-ink-200">
              FGMP סורקת 50,000+ קבוצות פייסבוק ושולחת לכם כל פנייה רלוונטית לוואטסאפ, בזמן אמת.
              בחרו את התחום שלכם — פיננסים, אשראי, נדל"ן, יופי, או אחד מעשרות המקצועות.
            </p>
          </header>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-white">
              לידים לפי סוג — לבעלי עסקים
            </h2>
            <p className="mt-2 text-ink-300">
              קטגוריות הלידים המבוקשות ביותר: פיננסים, אשראי, ביטוח, נדל"ן, מימוש זכויות ויופי.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {verticalPages.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/lidim/${p.slug}`}
                    className="group flex items-center justify-between gap-2 rounded-2xl bg-white/[0.03] px-4 py-3 ring-1 ring-white/10 transition hover:bg-white/[0.06] hover:ring-brand-500/40"
                  >
                    <span className="font-medium text-white group-hover:text-brand-200">
                      {p.keyword}
                    </span>
                    <ChevronLeft className="h-4 w-4 shrink-0 text-brand-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16">
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
