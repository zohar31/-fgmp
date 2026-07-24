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

const SLUG = "exclusive-vs-shared-leads";
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

export default function ExclusiveVsSharedGuide() {
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
            <h2>ההגדרות, בקצרה</h2>
            <ul>
              <li>
                <strong>ליד בלעדי (Exclusive)</strong> — נמסר לעסק אחד בלבד. אתה היחיד שמתקשר.
                מחיר שוק: פי 2-4 מליד רגיל; בפיננסים, ליד בלעדי מאומת מגיע ל-400-700 ₪.
              </li>
              <li>
                <strong>ליד משותף (Shared)</strong> — אותה פנייה נמכרת ל-3-5 עסקים במקביל (לפעמים
                יותר). זה הליד ה"זול" שרוב חברות הלידים מוכרות ב-35-150 ₪.
              </li>
            </ul>

            <h2>המתמטיקה שהופכת את ה"זול" ליקר</h2>
            <p>
              נניח ליד משותף ב-50 ₪ מול ליד בלעדי ב-150 ₪, בתחום עם שיעור סגירה בסיסי של 20%
              כשאתה לבד מול הלקוח:
            </p>
            <ul>
              <li>
                <strong>ליד בלעדי:</strong> 20% סגירה → עסקה אחת לכל 5 לידים →{" "}
                <strong>750 ₪ לעסקה</strong>.
              </li>
              <li>
                <strong>ליד משותף (מול 4 מתחרים):</strong> הסיכוי שלך לסגור צונח ל-4-6% (הלקוח
                מוצף, סוגר עם הראשון או הזול ביותר) → עסקה לכל 20 לידים בערך →{" "}
                <strong>1,000 ₪ לעסקה</strong>.
              </li>
            </ul>
            <p>
              כלומר: הליד ה"זול" פי 3 יצא <em>יקר יותר</em> לעסקה סגורה — ועוד לא חישבנו את הזמן
              שנשרף על 15 שיחות התחרות הנוספות ואת שחיקת המחיר שנובעת ממכרז ("קיבלתי הצעה זולה
              ממך, תרד").
            </p>

            <h2>איך מזהים מה בעצם מוכרים לך?</h2>
            <ol>
              <li>שאלו במפורש: "לכמה עסקים נוספים נמסר הליד?" — ודרשו את זה בכתב.</li>
              <li>סימן מובהק לליד משותף: הלקוח אומר "כבר התקשרו אליי שלושה".</li>
              <li>
                אם המחיר נראה טוב מכדי להיות אמיתי לתחום שלך (בדקו ב
                <Link href="/guides/lead-price-list">מחירון</Link>) — הוא כנראה משותף.
              </li>
            </ol>

            <h2>הדרך השלישית: ליד שהוא לא בלעדי ולא משותף — אלא ראשוני</h2>
            <p>
              יש קטגוריה שלישית שהשוק פחות מדבר עליה: הפוסט המקורי בקבוצת הפייסבוק, לפני שחברת
              לידים בכלל ארזה ומכרה אותו. כשמישהי כותבת "מחפשת חשמלאי דחוף ברעננה" — זה הליד
              במצבו הטהור. הוא אמנם גלוי לכל חברי הקבוצה, אבל בפועל מנצח בו מי שמגיב ראשון —
              ובדרך כלל אף אחד לא מנטר את הקבוצה בזמן אמת.
            </p>
            <p>
              בדיוק שם {SITE.brand} נותנת את הבלעדיות האמיתית: <strong>בלעדיות של זמן</strong>.
              המערכת סורקת 50,000+ קבוצות ושולחת לך את הפוסט לוואטסאפ תוך פחות מדקה מהפרסום — כשאתה
              עונה, רוב הסיכויים שאתה הראשון (וכידוע,{" "}
              <Link href="/guides/speed-to-lead">מי שעונה ראשון סוגר</Link>). והמחיר לא מתומחר פר
              ליד: {SITE.pricing.monthlyILS} ₪ לחודש על כל הלידים — בפועל 3-10 ₪ לליד, במקום 150 ₪
              על "בלעדיות" מחברה.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">
              הבלעדיות הכי טובה: להיות הראשון שעונה.
            </h3>
            <p className="mt-2 text-ink-200">
              פוסטים חמים מ-50,000+ קבוצות, לוואטסאפ תוך פחות מדקה. {SITE.pricing.monthlyILS}₪/חודש ·
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
            related={["lead-price-list", "buying-leads-israel", "speed-to-lead"]}
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
