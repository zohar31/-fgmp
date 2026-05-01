import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { guides } from "@/lib/guides";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "מדריכי לידים — איך להשיג לקוחות מקבוצות פייסבוק",
  description:
    "מדריכים מעמיקים בעברית: איך משיגים לידים חמים מקבוצות פייסבוק, השוואת מערכות, מילות מפתח מנצחות, ועוד. עדכון רציף.",
  alternates: { canonical: `${SITE.url}/guides` },
  openGraph: {
    title: "מדריכי לידים — FGMP",
    description: "מדריכים מעמיקים בעברית על איתור לידים מקבוצות פייסבוק.",
    url: `${SITE.url}/guides`,
  },
};

export default function GuidesIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "דף הבית", url: SITE.url },
          { name: "מדריכים", url: `${SITE.url}/guides` },
        ])}
      />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "דף הבית", href: "/" },
            { name: "מדריכים", href: "/guides" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-200 ring-1 ring-white/10">
            <BookOpen className="h-3.5 w-3.5 text-brand-400" />
            מדריכי לידים מקבוצות פייסבוק
          </div>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            איך להשיג לידים חמים — בלי לרדוף אחרי לקוחות.
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-200">
            מדריכים מעשיים בעברית. הכל על איתור לידים מקבוצות פייסבוק, סינון, סגירת לקוחות, וכלים שעושים את זה אוטומטי.
          </p>
        </header>

        <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <article
              key={g.slug}
              className="group card flex h-full flex-col p-6 ring-1 ring-white/10 transition hover:ring-brand-500/40 hover:-translate-y-0.5"
            >
              <div className="text-xs font-bold text-brand-300">{g.category}</div>
              <h2 className="mt-2 font-display text-xl font-bold leading-snug text-white group-hover:text-brand-200">
                <Link href={`/guides/${g.slug}`} className="after:absolute after:inset-0">
                  {g.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-ink-300">{g.excerpt}</p>
              <div className="mt-5 flex items-center gap-3 text-xs text-ink-400">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {g.readTime} דק׳ קריאה
                </span>
                <span>·</span>
                <time dateTime={g.updatedAt}>עודכן {formatDate(g.updatedAt)}</time>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-16 rounded-3xl bg-gradient-to-br from-brand-500/10 to-wa/10 p-8 ring-1 ring-white/10 md:p-12">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                במקום לקרוא — תקבל לידים אוטומטית.
              </h2>
              <p className="mt-2 text-ink-200">
                {SITE.brand} סורקת קבוצות פייסבוק 24/7 ושולחת לך לידים בוואטסאפ. {SITE.pricing.trialDays} ימי ניסיון חינם.
              </p>
            </div>
            <Link href="/login" className="btn-wa text-base whitespace-nowrap">
              התחילו עכשיו
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
