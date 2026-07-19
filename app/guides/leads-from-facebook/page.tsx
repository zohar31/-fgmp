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

const SLUG = "leads-from-facebook";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "איך משיגים לידים מפייסבוק?",
    a: "יש ארבע דרכים עיקריות: קבוצות פייסבוק (לידים אורגניים חמים ממי שמחפש שירות), מודעות ממומנות (Lead Ads), עמוד עסקי (תוכן והודעות), ומרקטפלייס. לרוב העסקים הקטנים, לידים אורגניים מקבוצות הם הזולים והחמים ביותר.",
  },
  {
    q: "לידים מפייסבוק זה בחינם?",
    a: "לידים מקבוצות פייסבוק ומהעמוד העסקי הם אורגניים — בלי עלות לקליק. הם עולים בזמן ובעקביות, או בעלות חודשית קבועה של כלי אוטומציה. מודעות ממומנות, לעומת זאת, עולות כסף לכל ליד.",
  },
  {
    q: "מה הדרך הכי טובה להשיג לידים מפייסבוק לעסק קטן?",
    a: "לרוב העסקים הקטנים — קבוצות פייסבוק. בכל יום אלפי אנשים כותבים שהם מחפשים שירות, וזה ליד חם עם כוונת קנייה. עם מערכת שסורקת ומתריעה אוטומטית אתה תופס אותם בזמן בלי לשבת מול פייסבוק כל היום.",
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
  twitter: {
    card: "summary_large_image",
    title: guide.title,
    description: guide.description,
  },
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
            <h2>פייסבוק הוא מקור הלידים הגדול בישראל</h2>
            <p>
              עם מיליוני משתמשים פעילים ועשרות אלפי קבוצות, פייסבוק הוא המקום שבו הלקוחות שלך מבלים —
              ומחפשים שירותים. אבל רוב העסקים מנצלים רק ערוץ אחד (בדרך כלל מודעות), ומפספסים את השאר.
              הנה כל הדרכים להשיג <strong>לידים מפייסבוק</strong>, ואיזו מהן מתאימה לך.
            </p>

            <h2>1. לידים מקבוצות פייסבוק (אורגני)</h2>
            <p>
              המקור החם והזול ביותר. בכל יום אנשים כותבים בקבוצות &quot;מחפש/ת...&quot; — פנייה ישירה עם
              כוונת קנייה. אתה לא משלם על הליד; אתה רק צריך לתפוס אותו בזמן. זה הערוץ שרוב העסקים
              הקטנים מרוויחים ממנו הכי הרבה. הרחבה מלאה:{" "}
              <Link href="/guides/leads-from-facebook-groups" className="text-brand-300 underline">
                איך משיגים לידים מקבוצות פייסבוק
              </Link>
              .
            </p>

            <h2>2. מודעות לידים ממומנות (Facebook Lead Ads)</h2>
            <p>
              טופס לידים בתוך פייסבוק, ממוקד לקהל שאתה בוחר. מביא נפח מהר, אבל בעלות לליד גבוהה
              ומשתנה, ובאיכות שתלויה בטרגוט. מתאים כשצריך הרבה לידים מהר ויש תקציב. השוואה מלאה:{" "}
              <Link href="/guides/facebook-lead-ads-vs-groups" className="text-brand-300 underline">
                מודעות פייסבוק מול קבוצות
              </Link>
              .
            </p>

            <h2>3. עמוד עסקי ותוכן</h2>
            <p>
              פוסטים, סרטונים והמלצות בעמוד העסקי בונים אמון ומביאים פניות בהודעות לאורך זמן. איטי,
              אבל מחזק את כל שאר הערוצים.
            </p>

            <h2>4. פייסבוק מרקטפלייס</h2>
            <p>
              רלוונטי בעיקר למוצרים ולחלק מהשירותים — אנשים מחפשים בו אקטיבית, אבל התחרות על מחיר
              גבוהה.
            </p>

            <h2>איזה ערוץ מנצח לעסק קטן</h2>
            <p>
              אם התקציב מוגבל והמטרה היא לידים חמים ואיכותיים — <strong>קבוצות פייסבוק</strong> מנצחות
              כמעט תמיד: כוונת קנייה גבוהה, עלות אפסית. מודעות מוסיפות נפח כשצריך. הבסיס האידיאלי הוא
              ערוץ אורגני יציב מקבוצות, ועליו שכבת ממומן לפי הצורך. כדי לדעת כמה לידים לכוון, ראה{" "}
              <Link href="/guides/how-many-leads-per-month" className="text-brand-300 underline">
                כמה לידים צריך עסק בחודש
              </Link>
              .
            </p>

            <h2>הבעיה עם לידים מקבוצות — והפתרון</h2>
            <p>
              קבוצות פייסבוק הן מכרה זהב, אבל בלתי אפשרי לסרוק עשרות קבוצות ידנית 24/7 ולתפוס כל פוסט
              בזמן. בדיוק לשם כך נבנתה {SITE.brand}: היא סורקת עשרות אלפי קבוצות בזמן אמת, מזהה עם AI רק
              פוסטים שמחפשים את השירות שלך, ושולחת לך אותם לוואטסאפ תוך שניות — עם קישור לפוסט ותגובה
              מוצעת. כל הכוח של לידים מפייסבוק, בלי הזמן הידני.
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
              פייסבוק מציע כמה ערוצי לידים — קבוצות, מודעות, עמוד עסקי ומרקטפלייס. לעסק קטן, לידים
              אורגניים מקבוצות הם הזולים והחמים ביותר, והבסיס הנכון להתחיל ממנו. {SITE.brand} הופכת אותם
              לזרם אוטומטי ישר לוואטסאפ: {SITE.pricing.monthlyILS}₪/חודש, ערבות החזר מלא{" "}
              {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">לידים מפייסבוק — אוטומטית לוואטסאפ</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} סורקת עשרות אלפי קבוצות ושולחת לך כל ליד רלוונטי תוך שניות.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני רוצה לקבל לידים מפייסבוק לעסק שלי")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base"
              >
                שאלה? דברו איתנו בוואטסאפ
              </a>
            </div>
          </div>

          <RelatedGuides
            currentSlug={SLUG}
            related={["leads-from-facebook-groups", "facebook-lead-ads-vs-groups", "filter-facebook-leads"]}
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
