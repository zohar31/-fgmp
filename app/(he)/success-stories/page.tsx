import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Star, Quote } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, softwareApplicationSchema } from "@/lib/jsonld";
import { customerReviews } from "@/lib/reviews";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "סיפורי לקוחות — עסקים שמקבלים לידים אמיתיים",
  description:
    "סיפורי הצלחה אמיתיים של עסקים בישראל שמקבלים לידים חמים מקבוצות פייסבוק עם FGMP — שיפוצניקים, קוסמטיקאיות, סוכני ביטוח, צלמים ועוד. דירוג ממוצע 5.0.",
  alternates: { canonical: `${SITE.url}/success-stories` },
  openGraph: {
    type: "website",
    title: "סיפורי לקוחות — FGMP",
    description: "עסקים אמיתיים מספרים איך FGMP הביאה להם לידים ולקוחות.",
    url: `${SITE.url}/success-stories`,
  },
};

const avg = (
  customerReviews.reduce((s, r) => s + r.rating, 0) / customerReviews.length
).toFixed(1);

export default function SuccessStoriesPage() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema(customerReviews)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "דף הבית", url: SITE.url },
          { name: "סיפורי לקוחות", url: `${SITE.url}/success-stories` },
        ])}
      />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "דף הבית", href: "/" },
            { name: "סיפורי לקוחות", href: "/success-stories" },
          ]}
        />

        <header className="mx-auto mt-8 max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-200 ring-1 ring-white/10">
            <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
            דירוג ממוצע {avg} · {customerReviews.length} עסקים
          </div>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            סיפורי לקוחות
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-200">
            עסקים אמיתיים מכל הארץ — שיפוצניקים, קוסמטיקאיות, סוכני ביטוח, צלמים ועוד — מספרים
            איך {SITE.brand} הפכה קבוצות פייסבוק לזרם לידים קבוע בוואטסאפ.
          </p>
        </header>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {customerReviews.map((r) => (
            <article
              key={r.name + r.business}
              className="card flex h-full flex-col p-6 ring-1 ring-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl" aria-hidden>
                  {r.emoji}
                </span>
                <span className="flex gap-0.5" aria-label={`דירוג ${r.rating} מתוך 5`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300" />
                  ))}
                </span>
              </div>
              <Quote className="mt-4 h-5 w-5 text-brand-400" aria-hidden />
              <p className="mt-2 flex-1 text-base leading-7 text-ink-100">{r.quote}</p>
              <div className="mt-5 border-t border-white/5 pt-4">
                <div className="font-display font-bold text-white">{r.name}</div>
                <div className="text-sm text-ink-300">
                  {r.business} · {r.region}
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mx-auto mt-16 max-w-3xl rounded-3xl bg-gradient-to-br from-brand-500/10 to-wa/10 p-8 text-center ring-1 ring-white/10 md:p-12">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            הסיפור הבא יכול להיות שלך.
          </h2>
          <p className="mt-2 text-ink-200">
            {SITE.brand} סורקת קבוצות פייסבוק 24/7 ושולחת לך לידים לוואטסאפ.{" "}
            {SITE.pricing.monthlyILS}₪/חודש · ערבות החזר {SITE.pricing.refundDays} ימים · בלי
            התחייבות.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/login" className="btn-wa text-base">
              התחילו עכשיו
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <div className="mx-auto mt-12 max-w-3xl border-t border-white/5 pt-8 text-center">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            למדריכי הלידים
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
