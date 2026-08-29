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

const SLUG = "leads-orchey-din";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "איפה אנשים מחפשים עורך דין?",
    a: "לרוב בקבוצת פייסבוק, עוד לפני גוגל — 'מי ממליץ על עו״ד גירושין?', 'צריך עורך דין לתביעה', 'מישהו מכיר עו״ד להוצאה לפועל?'. אנשים מבקשים המלצה מהקהילה, ומי שמגיב ראשון ובמקצועיות זוכה באמון ובתיק.",
  },
  {
    q: "זה עולה בקנה אחד עם כללי האתיקה של לשכת עורכי הדין?",
    a: "המערכת מאתרת פוסטים ציבוריים של אנשים שמבקשים בעצמם המלצה על עו״ד, ושולחת אותם אליך. אתה יוצר קשר כרגיל בתגובה לבקשה גלויה — אין פנייה יזומה אסורה, אין התחזות ואין שימוש במידע פרטי.",
  },
  {
    q: "אפשר לקבל רק פניות בתחום ההתמחות שלי?",
    a: "כן. תגדיר מילות מפתח — 'גירושין', 'תאונת דרכים', 'צוואה', 'דיני עבודה' — והמערכת תסמן רק פוסטים רלוונטיים אליך.",
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
            <h2>לקוחות מחפשים עו״ד בקבוצות — לפני גוגל</h2>
            <p>
              כשמישהו נקלע לצורך משפטי, התגובה הראשונה שלו היא לשאול את הקהילה: &quot;מי ממליץ על עו״ד
              גירושין טוב?&quot;, &quot;צריך עורך דין לחוזה שכירות&quot;, &quot;מישהו מכיר עו״ד
              להוצאה לפועל?&quot;. אלה לקוחות עם צורך אמיתי ותיק בעל ערך — והם מחכים להמלצה עכשיו.
            </p>

            <h2>למה לידים משפטיים קנויים בעייתיים</h2>
            <p>
              לידים משפטיים בשוק יקרים מאוד ולרוב נמכרים לכמה משרדים במקביל, כך שאתה מתקשר ללקוח
              שכבר דיבר עם שלושה עורכי דין אחרים. ראה{" "}
              <Link href="/guides/why-buying-leads-fails" className="text-brand-300 underline">
                למה קניית לידים מבזבזת כסף
              </Link>
              . פנייה אמיתית מקבוצה היא בלעדית — הפונה עוד לא דיבר עם אף אחד, ואתה הראשון.
            </p>

            <h2>איך תופסים פניות משפטיות בזמן אמת</h2>
            <p>
              {SITE.brand} סורקת 50,000+ קבוצות, מזהה עם AI פוסטים של אנשים שמבקשים עו״ד בתחום שלך,
              ושולחת לך אותם לוואטסאפ תוך שניות — עם תגובה מוצעת מקצועית ומדודה. אתה מגיב ראשון,
              כשהפונה עדיין מחפש. ראה עוד ב-
              <Link href="/guides/marketing-for-lawyers" className="text-brand-300 underline">
                שיווק לעורכי דין
              </Link>
              .
            </p>

            <h2>מיקוד לפי תחום התמחות</h2>
            <p>
              אתה לא רוצה כל פנייה — אתה רוצה את שלך. עו״ד משפחה יגדיר &quot;גירושין&quot;,
              &quot;מזונות&quot;, &quot;משמורת&quot;; עו״ד נדל״ן יגדיר &quot;חוזה מכר&quot;,
              &quot;ליווי עסקה&quot;. אם אתה בתחום ספציפי, ראה גם את דף{" "}
              <Link href="/lidim/lidim-leorech-din" className="text-brand-300 underline">
                לידים לעורך דין
              </Link>{" "}
              ואת{" "}
              <Link href="/lidim/lidim-leorech-din-mishpacha" className="text-brand-300 underline">
                לידים לעו״ד דיני משפחה
              </Link>
              .
            </p>

            <h2>המקצועיות בתגובה הראשונה בונה אמון</h2>
            <p>
              בתחום המשפטי, הפונה מחפש ביטחון. תגובה מהירה, אמפתית וברורה — בלי להבטיח תוצאות — יוצרת
              את האמון שסוגר פגישה. קבלת הפנייה מיד לוואטסאפ מאפשרת לך לענות בזמן, לפני שהפונה פנה
              למישהו אחר. ראה{" "}
              <Link href="/guides/speed-to-lead" className="text-brand-300 underline">
                מהירות תגובה לליד
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
              לקוחות משפטיים מבקשים המלצה בקבוצות בכל יום — ותיק אחד שווה הרבה. מי שתופס את הפניות
              האלה ראשון, בלעדית ובהתאמה לכללי האתיקה, בונה זרם תיקים יציב. {SITE.brand}:{" "}
              {SITE.pricing.monthlyILS}₪/חודש קבוע, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">קבל פניות משפטיות — לוואטסאפ</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} מזהה עם AI אנשים שמחפשים עו״ד בתחום שלך ושולחת לך אותם תוך שניות.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני עורך דין ורוצה לקבל פניות בתחום ההתמחות שלי")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base"
              >
                שאלה? דברו איתנו בוואטסאפ
              </a>
            </div>
            <p className="mt-4 text-sm text-ink-400">
              רוצה לראות את דף הקטגוריה?{" "}
              <Link href="/lidim/lidim-orchey-din-mishpat" className="text-brand-300 underline">
                לידים לעורכי דין ושירותים משפטיים
              </Link>
            </p>
          </div>

          <RelatedGuides
            currentSlug={SLUG}
            related={["marketing-for-lawyers", "why-buying-leads-fails", "speed-to-lead"]}
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
