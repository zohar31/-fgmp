import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { SITE, waLink } from "@/lib/config";
import { getLandingPage, landingPages } from "@/lib/landing-pages";

export function generateStaticParams() {
  return landingPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `${SITE.url}/lidim/${slug}` },
    openGraph: {
      type: "article",
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${SITE.url}/lidim/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function LandingPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/lidim/${slug}` },
    headline: page.h1,
    description: page.metaDescription,
    inLanguage: "he-IL",
    author: { "@type": "Organization", name: SITE.brand, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.brand, url: SITE.url },
    datePublished: "2026-05-05",
    dateModified: "2026-05-05",
    keywords: [page.keyword, ...page.relatedTerms].join(", "),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "דף הבית", url: SITE.url },
          { name: "לידים", url: `${SITE.url}/lidim` },
          { name: page.keyword, url: `${SITE.url}/lidim/${slug}` },
        ])}
      />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema(page.faq)} />

      <Nav />
      <main id="main-content" className="container-x py-10">
        <Breadcrumbs
          items={[
            { name: "דף הבית", href: "/" },
            { name: "לידים", href: "/lidim" },
            { name: page.keyword, href: `/lidim/${slug}` },
          ]}
        />

        <article className="mx-auto mt-8 max-w-3xl">
          <header>
            {page.kicker && (
              <div className="pill text-brand-300 ring-brand-500/30">
                {page.kicker}
              </div>
            )}
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-4 text-xl leading-9 text-ink-200">
              {page.subheading}
            </p>
          </header>

          <div className="prose prose-invert prose-lg mt-12 max-w-none">
            {page.intro.map((p, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{
                  __html: p
                    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\n/g, "<br/>"),
                }}
              />
            ))}

            <h2>למה {SITE.brand} לתחום "{page.keyword}"</h2>
            <ul className="not-prose space-y-3">
              {page.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-wa" />
                  <span
                    className="text-ink-100"
                    dangerouslySetInnerHTML={{
                      __html: b.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                    }}
                  />
                </li>
              ))}
            </ul>

            <h2>שאלות נפוצות — {page.keyword}</h2>
            <div className="not-prose space-y-4">
              {page.faq.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/5"
                >
                  <summary className="cursor-pointer font-display font-bold text-white">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-ink-200">{f.a}</p>
                </details>
              ))}
            </div>

            <h2>איך מתחילים</h2>
            <ol className="not-prose space-y-2 list-decimal pl-5 text-ink-100 marker:text-brand-300">
              <li>
                לחיצה על "התחילו עכשיו" → התחברות עם Google (לחיצה אחת, בלי סיסמה).
              </li>
              <li>
                מילוי פרטי העסק (שם, אזורים, מילות מפתח) — 5 דקות.
              </li>
              <li>
                תשלום {SITE.pricing.monthlyILS} ₪/חודש דרך כרטיס אשראי (Tranzila, מאובטח).
              </li>
              <li>
                הפעלת WhatsApp ע"י שליחת הודעה אחת — והמערכת מתחילה לסרוק עבורך.
              </li>
              <li>
                <strong>תוך 12-48 שעות</strong> מתחילים להגיע הלידים הראשונים לוואטסאפ שלך.
              </li>
            </ol>
          </div>

          <div className="mt-12 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-brand-300" />
              <div>
                <h3 className="font-display text-2xl font-bold text-white">
                  ערבות החזר {SITE.pricing.refundDays} ימים
                </h3>
                <p className="mt-2 text-ink-200">
                  תוך {SITE.pricing.refundDays} ימים מהתשלום הראשון, אם תחליט שזה לא בשבילך —
                  מבקש ביטול דרך האזור האישי, האדמין מאשר, ומקבל את כל ה-{SITE.pricing.monthlyILS} ₪
                  בחזרה. ללא חוזה, ללא התחייבות.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/login" className="btn-wa text-base">
                    <CheckCircle2 className="h-5 w-5" />
                    התחילו עכשיו
                  </Link>
                  <a
                    href={waLink(`היי, אני רוצה לשמוע פרטים על ${page.keyword}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-base"
                  >
                    <MessageCircle className="h-5 w-5" />
                    שיחה בוואטסאפ
                  </a>
                </div>
              </div>
            </div>
          </div>

          {page.relatedTerms.length > 0 && (
            <div className="mt-12 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
              <h3 className="text-sm font-bold text-ink-100">מונחים קשורים</h3>
              <p className="mt-2 text-sm leading-7 text-ink-300">
                {page.relatedTerms.join(" · ")}
              </p>
            </div>
          )}

          <div className="mt-12 border-t border-white/5 pt-8">
            <Link
              href="/lidim"
              className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              עוד דפי לידים לפי תחום
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
