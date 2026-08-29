import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedGuides } from "@/components/RelatedGuides";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { getGuide } from "@/lib/guides";
import { SITE, waLink } from "@/lib/config";

const SLUG = "leads-nadlan-hashkaot";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "איפה אנשים מחפשים מתווך או השקעת נדל״ן?",
    a: "בקבוצות פייסבוק של נדל״ן, השקעות וקהילות אזוריות — 'מי ממליץ על מתווך אמין?', 'מחפשת דירה להשקעה', 'איפה כדאי לקנות נכס מניב?'. ערך העסקה גבוה, ומי שמגיב ראשון ובונה אמון תופס את הלקוח.",
  },
  {
    q: "אני עוסק רק בהשקעות ולא בתיווך רגיל — אפשר למקד?",
    a: "כן. תגדיר מילות מפתח כמו 'דירה להשקעה', 'נכס מניב', 'קבוצת רכישה', 'נדל״ן בחו״ל' — והמערכת תסמן רק פוסטים רלוונטיים אליך.",
  },
  {
    q: "הפניות אמיתיות או לידים קנויים?",
    a: "אלה פוסטים אמיתיים של אנשים בקבוצות, לא דאטה שנמכרה במקביל לכמה מתווכים. פנייה בלעדית וחמה, בעלות חודשית קבועה.",
  },
];

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  keywords: guide.keywords,
  alternates: { canonical: `${SITE.url}/guides/${SLUG}` },
  openGraph: {
    type: "article",
    title: guide.title,
    description: guide.description,
    url: `${SITE.url}/guides/${SLUG}`,
    publishedTime: guide.publishedAt,
    modifiedTime: guide.updatedAt,
    authors: [SITE.legalName],
  },
  twitter: { card: "summary_large_image", title: guide.title, description: guide.description },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/guides/${SLUG}` },
  headline: guide.title,
  description: guide.description,
  inLanguage: "he-IL",
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
  keywords: guide.keywords.join(", "),
};

export default function GuidePage() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "דף הבית", url: SITE.url },
          { name: "מדריכים", url: `${SITE.url}/guides` },
          { name: guide.title, url: `${SITE.url}/guides/${SLUG}` },
        ])}
      />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "דף הבית", href: "/" },
            { name: "מדריכים", href: "/guides" },
            { name: guide.title, href: `/guides/${SLUG}` },
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
                {guide.readTime} דקות קריאה
              </span>
              <span>·</span>
              <time dateTime={guide.updatedAt}>
                עודכן {new Date(guide.updatedAt).toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </div>
            <p className="mt-6 text-xl leading-9 text-ink-200 speakable-summary">{guide.excerpt}</p>
          </header>

          <div className="prose prose-invert prose-lg mt-12 max-w-none">
            <h2>עסקאות נדל״ן מתחילות בשאלה בקבוצה</h2>
            <p>
              לפני שמישהו קונה, מוכר או משקיע — הוא שואל את הקהילה: &quot;מי ממליץ על מתווך אמין?&quot;,
              &quot;כדאי לקנות דירה להשקעה עכשיו?&quot;, &quot;מחפש נכס מניב באזור&quot;. בנדל״ן, ערך
              העסקה הבודדת גבוה במיוחד — ולכן כל פנייה כזו שווה פי כמה מליד רגיל.
            </p>

            <h2>למה לידי נדל״ן קנויים מאכזבים</h2>
            <p>
              לידים קנויים בתחום הנדל״ן יקרים מאוד ולרוב נמכרים לכמה מתווכים במקביל, כך שאתה מתחרה
              על אותו לקוח מהרגע הראשון. ראה{" "}
              <Link href="/guides/why-buying-leads-fails" className="text-brand-300 underline">
                למה קניית לידים מבזבזת כסף
              </Link>
              . פנייה אמיתית מקבוצה מגיעה אליך בלעדית — הפונה עוד לא דיבר עם אף מתווך.
            </p>

            <h2>איך תופסים פניות נדל״ן בזמן אמת</h2>
            <p>
              {SITE.brand} סורקת 50,000+ קבוצות (כולל קבוצות נדל״ן והשקעות), מזהה עם AI פוסטים של מי
              שמחפש לקנות, למכור או להשקיע, ושולחת לך אותם לוואטסאפ תוך שניות — עם תגובה מוצעת. אתה
              יוצר קשר ראשון, כשהכוונה חמה. ראה{" "}
              <Link href="/guides/leads-from-facebook-groups" className="text-brand-300 underline">
                איך משיגים לידים מקבוצות פייסבוק
              </Link>
              .
            </p>

            <h2>מיקוד: תיווך, מכירה או השקעות</h2>
            <p>
              מתווך יגדיר &quot;דירה למכירה&quot;, &quot;מחפש דירה&quot;; משקיע יגדיר &quot;דירה
              להשקעה&quot;, &quot;נכס מניב&quot;, &quot;קבוצת רכישה&quot;. אם אתה סוכן נדל״ן, ראה גם את
              דף{" "}
              <Link href="/lidim/lidim-lesokhen-nadlan" className="text-brand-300 underline">
                לידים לסוכן נדל״ן
              </Link>{" "}
              ואת{" "}
              <Link href="/lidim/lidim-hashkaot" className="text-brand-300 underline">
                לידים להשקעות
              </Link>
              .
            </p>

            <h2>בנדל״ן, האמון מוכר</h2>
            <p>
              עסקה בערך גבוה דורשת אמון, והוא מתחיל בתגובה הראשונה. מענה מהיר, מקצועי ולא לחוץ בונה
              את הביטחון שמוביל לפגישה. קבלת הפנייה מיד לוואטסאפ נותנת לך את יתרון הראשוניות. הבן את
              ההבדל בין פנייה חמה לקרה ב-
              <Link href="/guides/hot-vs-cold-leads" className="text-brand-300 underline">
                ליד חם מול ליד קר
              </Link>
              .
            </p>

            <h2 className="faq-question">שאלות נפוצות</h2>
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="faq-question">{f.q}</h3>
                <p className="faq-answer">{f.a}</p>
              </div>
            ))}

            <h2>סיכום</h2>
            <p>
              בנדל״ן ובהשקעות, כל עסקה מתחילה בשאלה בקבוצה, וערך העסקה גבוה. מי שתופס את הפניות האלה
              ראשון, בלעדית ובעלות קבועה, בונה יתרון עצום. {SITE.brand}:{" "}
              {SITE.pricing.monthlyILS}₪/חודש קבוע, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">קבל פניות נדל״ן והשקעות — לוואטסאפ</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} מזהה עם AI פניות נדל״ן אמיתיות בערך גבוה ושולחת לך אותן תוך שניות.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני עוסק בנדל״ן/השקעות ורוצה לקבל פניות")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base"
              >
                שאלה? דברו איתנו בוואטסאפ
              </a>
            </div>
            <p className="mt-4 text-sm text-ink-400">
              רוצה לראות את דף הקטגוריה?{" "}
              <Link href="/lidim/lidim-nadlan-hashkaot" className="text-brand-300 underline">
                לידים לנדל״ן והשקעות
              </Link>
            </p>
          </div>

          <RelatedGuides
            currentSlug={SLUG}
            related={["why-buying-leads-fails", "speed-to-lead", "hot-vs-cold-leads"]}
          />

          <div className="mt-12 border-t border-white/5 pt-8">
            <Link href="/guides" className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              חזרה לכל המדריכים
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
