import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedGuides } from "@/components/RelatedGuides";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { getGuide } from "@/lib/guides";
import { SITE } from "@/lib/config";

const SLUG = "lead-prices-finance";
const guide = getGuide(SLUG)!;

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
};

// [תחום, טווח שוק ₪ לליד]
const ROWS: [string, string][] = [
  ["ייעוץ משכנתאות", "53-98"],
  ["מחזור משכנתא", "50-100"],
  ["ביטוח בריאות / חיים", "85-110"],
  ["קרנות פנסיה", "85-120"],
  ["הלוואות אישיות", "20-35"],
  ["הלוואות כנגד נכס", "80-115"],
  ["איחוד הלוואות", "80-120"],
  ["החזרי מס", "10-63"],
  ["תיקון 190 / קופות גמל", "80-150"],
  ["ניהול תיקי השקעות", "80-115"],
  ["השקעות נדל\"ן", "80-150"],
  ["השקעות אלטרנטיביות", "80-125"],
  ["פורקס ומסחר", "84-210"],
  ["מימוש זכויות רפואיות", "60-110"],
  ["עורכי דין", "40-100"],
  ["חדלות פירעון", "90-110"],
];

export default function LeadPricesFinanceGuide() {
  return (
    <>
      <JsonLd data={articleSchema} />
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
                {new Date(guide.updatedAt).toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </div>
            <p className="mt-6 text-xl leading-9 text-ink-200">{guide.excerpt}</p>
          </header>

          <div className="prose prose-invert prose-lg mt-12 max-w-none">
            <p>
              זהו פרק מתוך{" "}
              <Link href="/guides/lead-price-list">מחירון הלידים המלא של {SITE.brand}</Link> —
              והפעם: התחומים שבהם הלידים היקרים ביותר בישראל.
            </p>
            <h2>מחירון לידים פיננסיים, ביטוח ומשפט — 2026</h2>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl ring-1 ring-white/10">
            <table className="w-full min-w-[380px] text-right text-sm">
              <thead>
                <tr className="bg-white/5 text-ink-200">
                  <th className="px-5 py-3 font-bold">תחום</th>
                  <th className="px-5 py-3 font-bold">מחיר שוק לליד (₪)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-ink-200">
                {ROWS.map(([field, range]) => (
                  <tr key={field} className="odd:bg-white/[0.02]">
                    <td className="px-5 py-2.5 font-medium text-white">{field}</td>
                    <td className="px-5 py-2.5">{range} ₪</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-ink-400">
            סקירת מחירונים פומביים של חברות לידים ישראליות, יולי 2026. ומעל הכול: ליד פיננסי{" "}
            <strong className="text-ink-200">פרימיום</strong> — מאומת טלפונית ובלעדי — נמכר ב-
            <strong className="text-ink-200">400-700 ₪ ליחידה</strong>.
          </p>

          <div className="prose prose-invert prose-lg mt-10 max-w-none">
            <h2>למה לידים פיננסיים כל כך יקרים?</h2>
            <ol>
              <li>
                <strong>שווי לקוח עצום.</strong> תיק משכנתא ממוצע מגלגל ליועץ 8,000-15,000 ₪.
                פוליסת ביטוח משלמת עמלות שנים קדימה. לקוח אחד מצדיק עשרות לידים כושלים.
              </li>
              <li>
                <strong>רגולציה מצמצמת היצע.</strong> פרסום פיננסי מוגבל (הוראות רשות שוק ההון,
                מגבלות מטא וגוגל על קטגוריות אשראי) — פחות ערוצים, יותר ביקוש לכל ליד.
              </li>
              <li>
                <strong>מלחמת ענקים.</strong> בנקים, חברות ביטוח וסוכנויות ארציות מתחרות על אותן
                מילות מפתח. עסק קטן שנכנס למכרז הזה משלם את מחיר הענקים.
              </li>
            </ol>

            <h2>המלכודת: ליד יקר ≠ ליד טוב</h2>
            <p>
              דווקא בתחום הכי יקר, שיעור הלידים "המתים" גבוה במיוחד: אנשים שמילאו טופס בשביל
              הגרלה, סקרנים שלא זוכרים שנרשמו, ומספרים שגויים. ליד ביטוח ב-100 ₪ עם 30% נתונים
              מתים = 143 ₪ לליד אמיתי, עוד לפני שדיברת עם לקוח. לכן נולד שוק ה"פרימיום" של
              400-700 ₪ — ליד שמישהו כבר התקשר אליו וּוידא שהוא רציני.
            </p>

            <h2>מאיפה מגיע ליד פיננסי חם באמת? מהקבוצות.</h2>
            <p>
              בקבוצות הפייסבוק הישראליות מתפרסמים כל יום פוסטים כמו "ממליצים על יועץ משכנתאות
              באזור המרכז?", "מחפשת סוכן ביטוח שיעשה לי סדר", "מישהו מכיר עו"ד מקרקעין טוב?".
              הפוסטים האלה הם בדיוק הליד שהשוק מוכר ב-400-700 ₪: אדם אמיתי, בכוונת קנייה מפורשת,
              שביקש בעצמו.
            </p>
            <p>
              ההבדל: דרך {SITE.brand} הפוסט הזה מגיע אליך לוואטסאפ תוך פחות מדקה מהפרסום — במנוי
              קבוע של {SITE.pricing.monthlyILS} ₪ לחודש, בלי תמחור פר ליד. יועץ משכנתאות שמקבל 30
              פניות רלוונטיות בחודש משלם בפועל <strong>~10 ₪ לליד</strong> — על ליד שהשוק מתמחר
              ב-53-98 ₪ (ובגרסה המאומתת: פי 40-70 יותר).
            </p>
            <p>
              עסקה אחת שנסגרת מכסה את המנוי לשנים קדימה. זו הסיבה שהתחומים הפיננסיים הם המנויים
              עם ה-ROI הגבוה ביותר אצלנו — כפי שמוסבר גם ב
              <Link href="/guides/calculate-cost-per-lead">מדריך חישוב העלות לליד</Link>.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">
              ליד פיננסי בשוק: עד 700 ₪. אצלנו: ~10 ₪.
            </h3>
            <p className="mt-2 text-ink-200">
              כל הפניות בתחום שלך מ-50,000+ קבוצות, ישר לוואטסאפ. {SITE.pricing.monthlyILS}₪/חודש ·
              ערבות החזר {SITE.pricing.refundDays} ימים.
            </p>
            <div className="mt-6">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו
              </Link>
            </div>
          </div>

          <RelatedGuides
            currentSlug={SLUG}
            related={["lead-price-list", "buying-leads-israel", "calculate-cost-per-lead"]}
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
