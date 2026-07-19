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

const SLUG = "lead-sources";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "מהם מקורות הלידים הטובים ביותר לעסק קטן?",
    a: "לרוב העסקים הקטנים, השילוב המנצח הוא לידים אורגניים מקבוצות פייסבוק (זול, כוונת קנייה גבוהה), המלצות מלקוחות קיימים (איכות הכי גבוהה), וגוגל עסקי (לידים מקומיים). מודעות ממומנות מוסיפות נפח אבל בעלות גבוהה ומשתנה.",
  },
  {
    q: "מה המקור הזול ביותר ללידים?",
    a: "לידים אורגניים מקבוצות פייסבוק וגוגל העסקי הם מהזולים ביותר — אין עלות לקליק, רק זמן או עלות חודשית קבועה של כלי אוטומציה. המלצות מלקוחות הן גם 'חינם', אבל תלויות בהיקף הלקוחות הקיים.",
  },
  {
    q: "כדאי להסתמך על מקור לידים אחד?",
    a: "לא. הסתמכות על ערוץ אחד מסוכנת — אם הוא מתייקר או משתנה, נשארת בלי לידים. עדיף שילוב של 2-3 מקורות, כשאחד מהם אורגני ויציב (כמו קבוצות פייסבוק) שמספק בסיס קבוע.",
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
            <h2>לפני שמשלמים על לידים — מכירים את המפה</h2>
            <p>
              הרבה עסקים קטנים קופצים ישר למודעות ממומנות, בלי לדעת שיש מקורות לידים זולים ואיכותיים
              יותר. הנה 10 מקורות הלידים העיקריים לעסק קטן ב-2026 — לכל אחד יש עלות, איכות ומהירות
              הקמה שונים. המטרה היא לבחור שילוב שמתאים <em>לך</em>, לא לרדוף אחרי הערוץ שכולם מדברים
              עליו.
            </p>

            <h2>המקורות בתשלום</h2>
            <ol>
              <li>
                <strong>מודעות פייסבוק ואינסטגרם.</strong> נפח גדול ומהיר, אבל עלות לליד גבוהה ומשתנה,
                ואיכות תלויה בטרגוט. ראה{" "}
                <Link href="/guides/lead-cost-facebook-2026" className="text-brand-300 underline">
                  כמה עולה ליד מפייסבוק
                </Link>
                .
              </li>
              <li>
                <strong>מודעות גוגל (חיפוש).</strong> כוונת קנייה גבוהה (אנשים מחפשים אקטיבית), אבל
                מילות מפתח תחרותיות יקרות.
              </li>
              <li>
                <strong>פלטפורמות לידים (לוחות / מכרזים).</strong> אתה קונה ליד מוכן — אבל לרוב אותו
                ליד נמכר לכמה עסקים, אז התחרות והמהירות קריטיות.
              </li>
              <li>
                <strong>משפיענים / שיתופי פעולה.</strong> חשיפה ממוקדת, אבל דורש תקציב ותיאום.
              </li>
            </ol>

            <h2>המקורות האורגניים (זולים / חינם)</h2>
            <ol start={5}>
              <li>
                <strong>קבוצות פייסבוק.</strong> אלפי אנשים כותבים כל יום שהם מחפשים שירות — לידים חמים
                עם כוונת קנייה, כמעט בחינם. האתגר: לתפוס אותם בזמן. ראה{" "}
                <Link href="/guides/leads-from-facebook-groups" className="text-brand-300 underline">
                  לידים מקבוצות פייסבוק
                </Link>
                .
              </li>
              <li>
                <strong>המלצות מלקוחות קיימים.</strong> איכות הלידים הגבוהה ביותר, שיעור סגירה מעולה —
                אבל תלוי בהיקף הלקוחות ובבקשה יזומה.
              </li>
              <li>
                <strong>גוגל עסקי (Google Business Profile).</strong> לידים מקומיים חינמיים ממי שמחפש
                שירות באזור — חובה לכל עסק מקומי.
              </li>
              <li>
                <strong>תוכן ו-SEO.</strong> מאמרים ומדריכים שמביאים תנועה אורגנית לאורך זמן. איטי
                להקמה, אבל &quot;נכס&quot; שממשיך לעבוד.
              </li>
              <li>
                <strong>טלגרם וקבוצות וואטסאפ.</strong> קהילות ממוקדות שבהן אנשים שואלים המלצות.
              </li>
              <li>
                <strong>רשת אישית וקהילה מקומית.</strong> ותיק אבל עובד — אנשים קונים מאנשים שהם
                מכירים.
              </li>
            </ol>

            <h2>איך בוחרים את השילוב הנכון</h2>
            <p>
              אין מקור מושלם אחד. הכלל: <strong>בסיס אורגני יציב + שכבת נפח בתשלום</strong>. תתחיל
              ממקור אורגני זול ויציב (קבוצות פייסבוק, גוגל עסקי, המלצות) שנותן זרם קבוע בעלות נמוכה,
              ותוסיף ממומן רק כשצריך יותר נפח. כך אתה לא תלוי בערוץ יקר יחיד. כדי לדעת כמה לידים לכוון,
              ראה{" "}
              <Link href="/guides/how-many-leads-per-month" className="text-brand-300 underline">
                כמה לידים צריך עסק בחודש
              </Link>
              .
            </p>

            <h2>המקור שרוב העסקים מפספסים</h2>
            <p>
              קבוצות פייסבוק הן מכרה הזהב הכי לא מנוצל: כוונת קנייה גבוהה, עלות אפסית — אבל בלתי אפשרי
              לסרוק אותן ידנית. בדיוק בשביל זה נבנתה {SITE.brand}: היא סורקת עשרות אלפי קבוצות בזמן אמת,
              מזהה עם AI רק לידים רלוונטיים, ושולחת לך אותם לוואטסאפ — הופכת את המקור האורגני הזה לזרם
              לידים קבוע, בעלות חודשית שפויה.
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
              יש הרבה יותר מקורות לידים ממודעות ממומנות. המפתח הוא לבנות שילוב: בסיס אורגני יציב וזול
              (קבוצות פייסבוק, המלצות, גוגל עסקי) עם שכבת נפח בתשלום לפי הצורך. {SITE.brand} הופכת את
              המקור האורגני הכי חזק — קבוצות פייסבוק — לאוטומטי: {SITE.pricing.monthlyILS}₪/חודש, ערבות
              החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">מקור לידים אורגני — אוטומטי</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} הופכת אלפי פוסטים בקבוצות פייסבוק לזרם לידים חמים ישר לוואטסאפ שלך.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני רוצה להבין אילו מקורות לידים מתאימים לי")}
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
            related={["free-leads", "organic-vs-paid-leads", "leads-from-facebook-groups"]}
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
