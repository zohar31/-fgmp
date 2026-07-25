import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, MessageCircle, ShieldCheck, MapPin } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { SITE, waLink } from "@/lib/config";
import {
  allGeoParams,
  getCity,
  getGeoProfession,
  buildGeoContent,
  cities,
} from "@/lib/geo";

export function generateStaticParams() {
  return allGeoParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}): Promise<Metadata> {
  const { slug, city } = await params;
  const p = getGeoProfession(slug);
  const c = getCity(city);
  if (!p || !c) return {};
  const content = buildGeoContent(p, c, SITE.pricing.monthlyILS, SITE.pricing.refundDays);
  const url = `${SITE.url}/lidim/${slug}/${city}`;
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: content.metaTitle,
      description: content.metaDescription,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

export default async function GeoLandingRoute({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const { slug, city } = await params;
  const p = getGeoProfession(slug);
  const c = getCity(city);
  if (!p || !c) notFound();

  const content = buildGeoContent(p, c, SITE.pricing.monthlyILS, SITE.pricing.refundDays);
  const url = `${SITE.url}/lidim/${slug}/${city}`;

  // LocalBusiness-flavored Service schema — areaServed pinned to this city.
  const localServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `לידים ${p.nounGenitive} ב${c.name} — ${SITE.brand}`,
    serviceType: `Lead Generation — ${p.service}`,
    description: content.metaDescription,
    provider: {
      "@type": "Organization",
      name: SITE.brand,
      url: SITE.url,
    },
    areaServed: [
      { "@type": "City", name: c.name },
      ...c.nearby.map((n) => ({ "@type": "City", name: n })),
    ],
    inLanguage: "he-IL",
    url,
    offers: {
      "@type": "Offer",
      price: SITE.pricing.monthlyILS,
      priceCurrency: "ILS",
      url: `${SITE.url}/login`,
    },
  };

  // Sibling cities for internal linking (same region first, then fill up to 6).
  const siblings = [
    ...cities.filter((x) => x.slug !== c.slug && x.region === c.region),
    ...cities.filter((x) => x.slug !== c.slug && x.region !== c.region),
  ].slice(0, 6);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "דף הבית", url: SITE.url },
          { name: "לידים", url: `${SITE.url}/lidim` },
          { name: `לידים ${p.nounGenitive}`, url: `${SITE.url}/lidim/${slug}` },
          { name: c.name, url },
        ])}
      />
      <JsonLd data={localServiceSchema} />
      <JsonLd data={faqSchema(content.faq)} />

      <Nav />
      <main id="main-content" className="container-x py-10">
        <Breadcrumbs
          items={[
            { name: "דף הבית", href: "/" },
            { name: "לידים", href: "/lidim" },
            { name: `לידים ${p.nounGenitive}`, href: `/lidim/${slug}` },
            { name: c.name, href: `/lidim/${slug}/${city}` },
          ]}
        />

        <article className="mx-auto mt-8 max-w-3xl">
          <header>
            <div className="pill inline-flex items-center gap-1.5 text-brand-300 ring-brand-500/30">
              <MapPin className="h-3.5 w-3.5" />
              {content.kicker}
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {content.h1}
            </h1>
            <p className="mt-4 text-xl leading-9 text-ink-200">{content.subheading}</p>
          </header>

          <div className="prose prose-invert prose-lg mt-12 max-w-none">
            {content.intro.map((para, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{
                  __html: para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
            ))}

            <h2>
              למה {SITE.brand} ל{p.noun} ב{c.name}
            </h2>
            <ul className="not-prose space-y-3">
              {content.benefits.map((b, i) => (
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

            <h2>
              שאלות נפוצות — לידים {p.nounGenitive} ב{c.name}
            </h2>
            <div className="not-prose space-y-4">
              {content.faq.map((f, i) => (
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
          </div>

          <div className="mt-12 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-brand-300" />
              <div>
                <h3 className="font-display text-2xl font-bold text-white">
                  התחל לקבל לידים ב{c.name} — עם ערבות החזר {SITE.pricing.refundDays} ימים
                </h3>
                <p className="mt-2 text-ink-200">
                  {SITE.pricing.monthlyILS} ₪/חודש · בלי התחייבות · לידים ללא הגבלה מהקבוצות של{" "}
                  {c.name} והאזור. לא מרוצה תוך {SITE.pricing.refundDays} ימים? כל הכסף חוזר.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/login" className="btn-wa text-base">
                    <CheckCircle2 className="h-5 w-5" />
                    התחילו עכשיו
                  </Link>
                  <a
                    href={waLink(`היי, אני ${p.noun} מ${c.name} ורוצה לשמוע על לידים מקבוצות פייסבוק`)}
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

          {/* Internal linking — same profession in nearby/other cities */}
          <div className="mt-12 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <h3 className="text-sm font-bold text-ink-100">
              לידים {p.nounGenitive} בערים נוספות
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/lidim/${slug}/${s.slug}`}
                  className="rounded-full bg-white/5 px-3 py-1.5 text-sm text-ink-200 ring-1 ring-white/10 transition hover:text-white hover:ring-brand-500/40"
                >
                  {s.name}
                </Link>
              ))}
            </div>
            <p className="mt-4 text-sm text-ink-400">{content.nearbyLine}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={`/lidim/${slug}`}
              className="inline-flex items-center gap-2 text-sm text-brand-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              כל המידע על לידים {p.nounGenitive}
            </Link>
            <Link
              href="/lidim"
              className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white"
            >
              עוד דפי לידים לפי תחום
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
