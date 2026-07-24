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

const SLUG = "calculate-cost-per-lead";
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

export default function CalculateCplGuide() {
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
            <h2>הנוסחה הבסיסית: עלות לליד (CPL)</h2>
            <p>
              <strong>CPL = סך ההוצאה על הערוץ ÷ מספר הלידים שהגיעו ממנו.</strong>
            </p>
            <p>
              וחשוב: "סך ההוצאה" כולל הכול — תקציב מודעות, דמי ניהול לסוכנות, מנויים לכלים. עסק
              ששילם 2,000 ₪ על מודעות + 1,500 ₪ לסוכנות וקיבל 35 לידים לא שילם 57 ₪ לליד — הוא
              שילם <strong>100 ₪ לליד</strong>.
            </p>

            <h2>הנוסחה שחשובה באמת: עלות לעסקה סגורה (CPA)</h2>
            <p>
              <strong>CPA = CPL ÷ שיעור הסגירה.</strong> ליד זול עם סגירה אפסית יקר מליד יקר
              שנסגר. שלוש דוגמאות אמיתיות מהמחירים בשוק (
              <Link href="/guides/lead-price-list">המחירון המלא</Link>):
            </p>
            <ul>
              <li>
                <strong>Lead Ads, שיפוצים:</strong> ליד 45 ₪, סגירה 2.5% → <strong>1,800 ₪ לעסקה</strong>.
              </li>
              <li>
                <strong>ליד קנוי משותף:</strong> ליד 80 ₪, סגירה 5% → <strong>1,600 ₪ לעסקה</strong>.
              </li>
              <li>
                <strong>ליד אורגני מקבוצה ({SITE.brand}):</strong> ~5 ₪ לליד (במנוי{" "}
                {SITE.pricing.monthlyILS} ₪ עם 60 לידים), סגירה ~20% → <strong>~25 ₪ לעסקה</strong>.
              </li>
            </ul>
            <p>
              אותו עסק, אותו שירות — פער של פי 60 בעלות ללקוח משלם. לכן משווים ערוצים רק ב-CPA,
              לעולם לא ב-CPL.
            </p>

            <h2>מה נחשב CPL "טוב"? כלל ה-10%</h2>
            <p>
              כלל אצבע פשוט: <strong>עלות העסקה הסגורה (CPA) לא צריכה לעלות על 10% מהרווח הגולמי
              מעסקה ממוצעת.</strong> עסקה שמכניסה 3,000 ₪ רווח מצדיקה CPA של עד 300 ₪. מכאן גוזרים
              אחורה את ה-CPL המותר: עם סגירה של 15%, מותר לך לשלם עד 45 ₪ לליד. עם סגירה של 3% —
              רק 9 ₪.
            </p>
            <p>
              שימו לב מה זה אומר: <em>שיפור שיעור הסגירה מכפיל את תקציב הלידים המותר שלך</em>. הדרך
              הזולה ביותר לשפר סגירה היא{" "}
              <Link href="/guides/speed-to-lead">לענות ראשון</Link> — ולכן מערכת שמביאה את הליד
              בדקה הראשונה משפרת לך את שני הצדדים של הנוסחה בבת אחת.
            </p>

            <h2>שלושה מספרים לעקוב אחריהם כל חודש</h2>
            <ol>
              <li><strong>CPL פר ערוץ</strong> — כמה עלה ליד מכל מקור (מודעות, קנייה, {SITE.brand}, המלצות).</li>
              <li><strong>שיעור סגירה פר ערוץ</strong> — כמה מהלידים של כל מקור הפכו ללקוחות.</li>
              <li><strong>CPA פר ערוץ</strong> — המכפלה. זה המספר שמחליט איפה לשים את הכסף בחודש הבא.</li>
            </ol>
            <p>
              מי שרוצה להעמיק בשאר המדדים — יש לנו{" "}
              <Link href="/guides/lead-kpis">מדריך מלא ל-7 מדדי לידים</Link>. ומי שרוצה פשוט להוריד
              את ה-CPL לחד-ספרתי: {SITE.brand} ב-{SITE.pricing.monthlyILS} ₪ לחודש, לידים ללא
              הגבלה, ערבות החזר {SITE.pricing.refundDays} ימים. תריץ חודש, תמדוד CPA, ותשווה בעצמך
              — זה כל הסיפור.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">
              רוצה CPL חד-ספרתי? תתחיל למדוד מול {SITE.brand}.
            </h3>
            <p className="mt-2 text-ink-200">
              {SITE.pricing.monthlyILS}₪/חודש · לידים ללא הגבלה · ערבות החזר {SITE.pricing.refundDays} ימים —
              נתונים אמיתיים תוך שבוע.
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
            related={["lead-price-list", "lead-kpis", "how-many-leads-per-month"]}
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
