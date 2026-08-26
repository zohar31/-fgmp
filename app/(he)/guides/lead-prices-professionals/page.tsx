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

const SLUG = "lead-prices-professionals";
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

// [מקצוע, טווח שוק ₪ לליד, הערה]
const ROWS: [string, string, string][] = [
  ["אינסטלציה", "100-210", "הליד היקר בבית — דחיפות גבוהה, סגירה מהירה"],
  ["שיפוצים כלליים", "50-210", "טווח רחב — תלוי בהיקף הפרויקט"],
  ["מיזוג אוויר", "80-200", "עונתי — מזנק בקיץ"],
  ["עיצוב מטבחים", "70-150", "עסקאות גדולות, מכרז מול 2-3 ספקים"],
  ["עבודות אלומיניום", "50-120", "פרגולות, חלונות, רשתות"],
  ["הדברה", "20-75", "עסקה קטנה אבל חוזרת"],
  ["הובלות", "20-75", "תחרות גבוהה, סגירה מהירה"],
  ["חשמלאי", "40-70", "ביקוש יציב כל השנה"],
  ["גינון", "20-70", "עונתי, פוטנציאל ריטיינר חודשי"],
  ["איתור נזילות", "20-60", "דחיפות גבוהה — הלקוח סוגר באותו יום"],
  ["טכנאי מוצרי חשמל", "30-74", "עסקאות קטנות, נפח גבוה"],
  ["מנעולן", "20-60", "ליד 'עכשיו או כלום' — מהירות תגובה קריטית"],
];

export default function LeadPricesProfessionalsGuide() {
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
              <Link href="/guides/lead-price-list">מחירון הלידים המלא של {SITE.brand}</Link> — כאן
              נצלול לתחום שבו הכי הרבה עסקים קטנים קונים לידים: בעלי מקצוע ושירותי בית.
            </p>
            <h2>מחירון לידים לבעלי מקצוע — טבלה לפי תחום</h2>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl ring-1 ring-white/10">
            <table className="w-full min-w-[480px] text-right text-sm">
              <thead>
                <tr className="bg-white/5 text-ink-200">
                  <th className="px-5 py-3 font-bold">מקצוע</th>
                  <th className="px-5 py-3 font-bold">מחיר שוק לליד (₪)</th>
                  <th className="px-5 py-3 font-bold">מה מייחד את התחום</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-ink-200">
                {ROWS.map(([field, range, note]) => (
                  <tr key={field} className="odd:bg-white/[0.02]">
                    <td className="px-5 py-2.5 font-medium text-white">{field}</td>
                    <td className="px-5 py-2.5">{range} ₪</td>
                    <td className="px-5 py-2.5 text-ink-300">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-ink-400">
            סקירת מחירונים פומביים של חברות לידים ישראליות, יולי 2026. מחיר לליד בודד בקנייה ישירה
            או בקמפיין ממומן.
          </p>

          <div className="prose prose-invert prose-lg mt-10 max-w-none">
            <h2>למה ליד לאינסטלטור עולה פי 3 מליד לחשמלאי?</h2>
            <p>
              שלושה גורמים מזניקים את מחיר הליד במקצועות הבית:
            </p>
            <ol>
              <li>
                <strong>דחיפות.</strong> צנרת שהתפוצצה לא מחכה להצעות מחיר. לקוח כזה סוגר עם הראשון
                שעונה — ולכן מפרסמים מוכנים לשלם הרבה על הליד שלו.
              </li>
              <li>
                <strong>שווי עסקה.</strong> החלפת צנרת או שיפוץ חדר רחצה = אלפי עד עשרות אלפי
                שקלים. תיקון שקע = 250 ₪. המחיר של הליד עוקב אחרי הרווח.
              </li>
              <li>
                <strong>תחרות פרסומית.</strong> "אינסטלטור בתל אביב" היא מילת מפתח שעולה עשרות
                שקלים לקליק בגוגל. העלות הזו מתגלגלת ישירות למחיר הליד.
              </li>
            </ol>

            <h2>הבעיה של בעלי מקצוע עם קניית לידים</h2>
            <p>
              דווקא במקצועות האלה, קניית לידים ביחידות סובלת משתי בעיות קשות:
            </p>
            <ul>
              <li>
                <strong>הליד כמעט תמיד משותף.</strong> חברות הלידים מוכרות את אותה פנייה ל-3-5 בעלי
                מקצוע. בתחום שבו הראשון שמתקשר לוקח את העבודה — לשלם 100 ₪ על ליד שמתחרה כבר קיבל
                לפניך זו מתכונת להפסד (
                <Link href="/guides/exclusive-vs-shared-leads">ליד בלעדי מול משותף — המספרים</Link>).
              </li>
              <li>
                <strong>אין שליטה על הנפח.</strong> בחודש חלש החברה תשלח לך פחות לידים; בחודש חזק —
                החשבון מתנפח. ההוצאה לא צפויה.
              </li>
            </ul>

            <h2>החלופה: כל הפניות בקבוצות פייסבוק — במחיר קבוע</h2>
            <p>
              בכל יום מתפרסמים בקבוצות הפייסבוק בישראל אלפי פוסטים כמו "מחפשת אינסטלטור דחוף
              בפ"ת" או "המלצות על שיפוצניק אמין באזור השרון?". אלה הלידים הכי חמים שיש — אנשים
              שמבקשים את השירות במילים שלהם, עכשיו.
            </p>
            <p>
              {SITE.brand} סורקת 50,000+ קבוצות פייסבוק פעילות 24/7 ושולחת לך כל פוסט כזה בתחום
              ובאזור שלך לוואטסאפ — תוך פחות מדקה, עם תגובה מוצעת שכתב AI. העלות: {SITE.pricing.monthlyILS} ₪
              לחודש, בלי הגבלת לידים:
            </p>
            <ul>
              <li>שיפוצניק שמקבל 60 פניות בחודש → <strong>~5 ₪ לליד</strong> (מול 50-210 ₪ בשוק)</li>
              <li>אינסטלטור שמקבל 40 פניות בחודש → <strong>~7.5 ₪ לליד</strong> (מול 100-210 ₪ בשוק)</li>
              <li>מוביל שמקבל 100 פניות בחודש → <strong>~3 ₪ לליד</strong> (מול 20-75 ₪ בשוק)</li>
            </ul>
            <p>
              והכי חשוב במקצועות הדחופים: אתה מקבל את הפוסט לפני שהמתחרים בכלל ראו אותו — כי{" "}
              <Link href="/guides/speed-to-lead">מי שעונה ראשון לוקח את העבודה</Link>.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">
              בעל מקצוע? הלקוחות שלך כבר מחפשים אותך בקבוצות.
            </h3>
            <p className="mt-2 text-ink-200">
              כל הפניות בתחום שלך, ישר לוואטסאפ, ב-{SITE.pricing.monthlyILS}₪/חודש · ערבות החזר{" "}
              {SITE.pricing.refundDays} ימים.
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
            related={["lead-price-list", "leads-for-service-businesses", "exclusive-vs-shared-leads"]}
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
