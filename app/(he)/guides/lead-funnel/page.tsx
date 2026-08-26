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

const SLUG = "lead-funnel";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "מה זה משפך לידים?",
    a: "משפך לידים (Lead Funnel) הוא המסע שעובר לקוח פוטנציאלי מהרגע שהוא שומע עליך ועד שהוא משלם: מודעות → עניין → החלטה → פעולה. בכל שלב חלק מהאנשים 'נושרים', ולכן זה נראה כמו משפך — רחב למעלה, צר למטה.",
  },
  {
    q: "איפה מאבדים הכי הרבה לידים במשפך?",
    a: "לרוב בשלב המעבר מ'עניין' ל'החלטה' — הליד פנה, אבל לא ענו לו מספיק מהר או לא עשו מעקב, אז הוא התקרר או פנה למתחרה. זמן תגובה איטי ומעקב חסר הם החורים הגדולים ביותר במשפך.",
  },
  {
    q: "איך אוטומציה משפרת את המשפך?",
    a: "אוטומציה סותמת את החורים בשלבים הראשונים: היא תופסת את הליד ברגע שהוא מתעניין (סריקת קבוצות) ומאיצה את התגובה לשניות במקום שעות. כך פחות לידים נושרים לפני שהגעת אליהם.",
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
            <h2>לידים לא נעלמים — הם נופלים</h2>
            <p>
              כשעסק אומר &quot;איבדתי לידים&quot;, האמת היא שהם <strong>נפלו בין השלבים</strong> של
              המשפך. משפך לידים (Lead Funnel) מתאר את המסע מפנייה ראשונה ועד לקוח משלם — ובכל שלב חלק
              מהאנשים נושרים. מי שמבין את המשפך יודע בדיוק איפה הוא מאבד לקוחות, ואיך לסתום את החור.
            </p>

            <h2>4 שלבי משפך הלידים</h2>
            <ol>
              <li>
                <strong>מודעות (Awareness).</strong> הלקוח מגלה שאתה קיים — רואה פוסט, מודעה, המלצה.
              </li>
              <li>
                <strong>עניין (Interest).</strong> הוא פונה — כותב בקבוצה &quot;מחפש...&quot;, שולח
                הודעה, ממלא טופס. כאן נוצר <em>הליד</em>.
              </li>
              <li>
                <strong>החלטה (Decision).</strong> הוא משווה אותך למתחרים, שוקל מחיר, בוחן זמינות.
              </li>
              <li>
                <strong>פעולה (Action).</strong> הוא סוגר — משלם, קובע, מזמין.
              </li>
            </ol>

            <h2>איפה בדיוק נופלים לידים — ולמה</h2>
            <ul>
              <li>
                <strong>בין מודעות לעניין:</strong> הליד לא ראה אותך בכלל — לא היית שם כשהוא חיפש. פתרון:
                נוכחות בערוצים הנכונים (למשל סריקת קבוצות פייסבוק).
              </li>
              <li>
                <strong>בין עניין להחלטה (החור הגדול):</strong> הליד פנה, אבל ענית לו מאוחר מדי או לא
                עקבת — הוא התקרר או פנה למתחרה. ראה{" "}
                <Link href="/guides/speed-to-lead" className="text-brand-300 underline">
                  מהירות תגובה לליד
                </Link>
                .
              </li>
              <li>
                <strong>בין החלטה לפעולה:</strong> הליד כמעט סגר אבל היסס — חסר מעקב או דחיפה עדינה. ראה{" "}
                <Link href="/guides/follow-up-cold-leads" className="text-brand-300 underline">
                  מעקב אחרי ליד שלא ענה
                </Link>
                .
              </li>
            </ul>

            <h2>איך בונים משפך שממיר</h2>
            <p>
              משפך טוב מתחיל <strong>רחב ואיכותי</strong> (הרבה לידים עם כוונת קנייה) ו<strong>אוטם את
              הנשירה</strong> בכל שלב:
            </p>
            <ol>
              <li>
                <strong>למעלה:</strong> תפוס לידים חמים ממקור עם כוונת קנייה גבוהה (קבוצות פייסבוק). ראה{" "}
                <Link href="/guides/hot-vs-cold-leads" className="text-brand-300 underline">
                  ליד חם מול ליד קר
                </Link>
                .
              </li>
              <li>
                <strong>באמצע:</strong> הגב מהר, ענייני, ומוכן. זה סותם את החור הגדול ביותר.
              </li>
              <li>
                <strong>למטה:</strong> עקוב בעקביות עד שהליד סוגר או אומר &quot;לא&quot; ברור.
              </li>
            </ol>

            <h2>איך אוטומציה סותמת את החורים הראשונים</h2>
            <p>
              שני השלבים הראשונים של המשפך הם היכן שרוב הלידים נופלים — ושם אוטומציה עוזרת הכי הרבה.
              {SITE.brand} תופסת את הליד בדיוק ברגע שהוא מתעניין (סורקת עשרות אלפי קבוצות ומזהה ב-AI),
              ומאיצה את התגובה לשניות — עם תגובה מוצעת מוכנה. כך פחות לידים מתקררים לפני שהגעת אליהם, וכל
              המשפך מתמלא. ראה{" "}
              <Link href="/guides/lead-automation" className="text-brand-300 underline">
                אוטומציית לידים
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
              משפך לידים הוא המסע ממודעות ועד פעולה, וכל שלב מאבד חלק מהלקוחות. מי שמבין איפה נופלים
              הלידים — במיוחד בין עניין להחלטה — יכול לסתום את החורים ולהכפיל את התוצאות מאותם לידים.{" "}
              {SITE.brand} ממלאת את ראש המשפך ומאיצה את התגובה: {SITE.pricing.monthlyILS}₪/חודש, ערבות
              החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">מלא את ראש המשפך בלידים חמים</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} תופסת לידים עם כוונת קנייה ומאיצה את התגובה לשניות — פחות נשירה, יותר סגירות.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני רוצה לשפר את משפך הלידים שלי")}
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
            related={["lead-strategy", "lead-kpis", "speed-to-lead"]}
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
