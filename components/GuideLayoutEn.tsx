import Link from "next/link";
import { ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { getGuideEn, guidesEn } from "@/lib/guides-en";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";

export type Block =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] };

function rich(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-brand-300 underline underline-offset-2 hover:text-brand-200">$1</a>'
    );
}

// English guide layout (LTR). Mirrors the Hebrew GuideLayout but pulls from
// guidesEn and links within the /en tree.
export function GuideLayoutEn({
  slug,
  blocks,
  related,
  faq,
}: {
  slug: string;
  blocks: Block[];
  related?: string[];
  faq?: { q: string; a: string }[];
}) {
  const guide = getGuideEn(slug)!;
  const url = `${SITE.url}/en/guides/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: guide.title,
    description: guide.description,
    inLanguage: "en-US",
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: { "@type": "Organization", name: SITE.brand, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/icon` },
    },
    image: `${SITE.url}/og-image.jpeg`,
  };

  const relatedGuides = (related || [])
    .map((s) => guidesEn.find((g) => g.slug === s))
    .filter(Boolean)
    .slice(0, 3) as typeof guidesEn;

  return (
    <>
      <JsonLd data={articleSchema} />
      {faq && faq.length > 0 && <JsonLd data={faqSchema(faq)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE.url}/en` },
          { name: "Guides", url: `${SITE.url}/en/guides` },
          { name: guide.title, url },
        ])}
      />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/en" },
            { name: "Guides", href: "/en/guides" },
            { name: guide.title, href: `/en/guides/${slug}` },
          ]}
        />

        <article className="mx-auto mt-8 max-w-3xl">
          <header>
            <div className="text-sm font-bold text-brand-300">{guide.category}</div>
            <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {guide.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink-400">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {guide.readTime} min read
              </span>
              <span>·</span>
              <time dateTime={guide.updatedAt}>
                {new Date(guide.updatedAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
            <p className="mt-6 text-xl leading-9 text-ink-200">{guide.excerpt}</p>
          </header>

          <div className="prose prose-invert prose-lg mt-12 max-w-none">
            {blocks.map((b, i) => {
              if ("h2" in b) return <h2 key={i}>{b.h2}</h2>;
              if ("h3" in b) return <h3 key={i}>{b.h3}</h3>;
              if ("p" in b) return <p key={i} dangerouslySetInnerHTML={{ __html: rich(b.p) }} />;
              if ("ul" in b)
                return (
                  <ul key={i}>
                    {b.ul.map((li, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: rich(li) }} />
                    ))}
                  </ul>
                );
              if ("ol" in b)
                return (
                  <ol key={i}>
                    {b.ol.map((li, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: rich(li) }} />
                    ))}
                  </ol>
                );
              return null;
            })}
          </div>

          {faq && faq.length > 0 && (
            <section className="mt-14">
              <h2 className="font-display text-2xl font-bold text-white">Frequently asked questions</h2>
              <div className="mt-6 space-y-4">
                {faq.map((f, i) => (
                  <details key={i} className="group rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/5">
                    <summary className="cursor-pointer font-display font-bold text-white">{f.q}</summary>
                    <p className="mt-3 text-sm leading-7 text-ink-200">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">
              Want hot leads without chasing them?
            </h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} scans Facebook groups 24/7 and sends leads to your WhatsApp.{" "}
              ${SITE_EN.pricing.monthlyUSD}/month · {SITE_EN.pricing.refundDays}-day money-back
              guarantee · No contract.
            </p>
            <div className="mt-6">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                Get started
              </Link>
            </div>
          </div>

          {relatedGuides.length > 0 && (
            <section className="mt-14 border-t border-white/5 pt-10">
              <h2 className="font-display text-2xl font-bold text-white">Related guides</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {relatedGuides.map((g) => (
                  <article
                    key={g.slug}
                    className="group card relative flex h-full flex-col p-6 ring-1 ring-white/10 transition hover:ring-brand-500/40 hover:-translate-y-0.5"
                  >
                    <div className="text-xs font-bold text-brand-300">{g.category}</div>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-white group-hover:text-brand-200">
                      <Link href={`/en/guides/${g.slug}`} className="after:absolute after:inset-0">
                        {g.title}
                      </Link>
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-ink-300">{g.excerpt}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 border-t border-white/5 pt-8">
            <Link href="/en/guides" className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white">
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to all guides
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
