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

const SLUG = "facebook-lead-ads-vs-groups";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "מה עדיף — מודעות לידים בפייסבוק או לידים מקבוצות?",
    a: "תלוי במטרה. מודעות (Lead Ads) מביאות נפח מהר אבל בעלות לליד גבוהה ובכוונת קנייה נמוכה יותר (הליד ראה פרסומת, לא חיפש אקטיבית). לידים מקבוצות מגיעים ממי שכתב בעצמו שהוא מחפש — חמים יותר וזולים יותר, אבל דורשים מהירות תגובה.",
  },
  {
    q: "כמה עולה ליד ממודעת פייסבוק?",
    a: "משתנה מאוד לפי תחום ותחרות — לרוב עשרות שקלים לליד, ולעיתים יותר. ליד אורגני מקבוצה עולה כמעט כלום מעבר לזמן או לעלות חודשית קבועה של כלי אוטומציה.",
  },
  {
    q: "אפשר לשלב את שתי השיטות?",
    a: "בהחלט, וזה מומלץ. בסיס אורגני יציב מקבוצות (זול, חם) עם שכבת מודעות ממומנות לנפח נוסף כשצריך. כך אתה לא תלוי בערוץ ממומן יקר אחד, ויש לך זרם לידים קבוע.",
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
            <h2>שני עולמות של לידים מפייסבוק</h2>
            <p>
              יש שתי דרכים עיקריות להשיג לידים מפייסבוק, והן שונות מהיסוד. <strong>מודעות לידים
              (Lead Ads)</strong> — אתה משלם כדי לדחוף טופס לקהל שאתה מגדיר. <strong>לידים מקבוצות</strong>
              {" "}— אתה תופס אנשים שכתבו בעצמם שהם מחפשים שירות. ההבדל הזה — מי יזם את הפנייה — משנה הכל:
              עלות, איכות ושיעור סגירה.
            </p>

            <h2>מודעות לידים בפייסבוק (Lead Ads)</h2>
            <p><strong>יתרונות:</strong></p>
            <ul>
              <li>נפח מהיר — אפשר לייצר הרבה לידים בזמן קצר.</li>
              <li>שליטה בטרגוט — גיל, אזור, תחומי עניין.</li>
              <li>טופס בתוך פייסבוק — חוויית מילוי חלקה.</li>
            </ul>
            <p><strong>חסרונות:</strong></p>
            <ul>
              <li>עלות לליד גבוהה ומשתנה — התקציב רק גדל.</li>
              <li>כוונת קנייה נמוכה — הליד ראה פרסומת, לא חיפש אקטיבית.</li>
              <li>לידים &quot;קרים&quot; יחסית — הרבה משאירים פרטים ומתחרטים.</li>
            </ul>

            <h2>לידים מקבוצות פייסבוק (אורגני)</h2>
            <p><strong>יתרונות:</strong></p>
            <ul>
              <li>כוונת קנייה גבוהה — האדם כתב בעצמו &quot;מחפש/ת...&quot;.</li>
              <li>עלות אפסית לליד — אין תשלום לקליק.</li>
              <li>ליד חם ומקומי — לרוב נסגר בשיעור גבוה.</li>
            </ul>
            <p><strong>חסרונות:</strong></p>
            <ul>
              <li>דורש מהירות — הפוסט פומבי, המתחרים רואים אותו גם.</li>
              <li>בלתי אפשרי לסרוק ידנית בקנה מידה.</li>
            </ul>

            <h2>ההבדל שקובע: כוונת קנייה</h2>
            <p>
              זה הלב של ההשוואה. במודעה, <em>אתה</em> יזמת את הקשר — הלקוח סתם גלל וראה. בקבוצה,{" "}
              <em>הלקוח</em> יזם — הוא כתב שהוא צריך את השירות <em>עכשיו</em>. ליד עם כוונה עצמית נסגר
              בשיעור גבוה בהרבה. לכן, לשקל, ליד מקבוצה לרוב מחזיר יותר. ראה גם{" "}
              <Link href="/guides/hot-vs-cold-leads" className="text-brand-300 underline">
                ליד חם מול ליד קר
              </Link>
              .
            </p>

            <h2>מתי בכל זאת כדאי מודעות</h2>
            <p>
              מודעות מנצחות כשצריך <strong>נפח גדול ומהיר</strong>, יש תקציב, והמוצר מתאים לקהל רחב.
              לעסק קטן עם תקציב מוגבל שמחפש לידים איכותיים — הבסיס צריך להיות אורגני, ומודעות הן תוספת
              לפי הצורך. להשוואת עלויות מלאה ראה{" "}
              <Link href="/guides/lead-cost-facebook-2026" className="text-brand-300 underline">
                כמה עולה ליד מפייסבוק
              </Link>
              .
            </p>

            <h2>איך מנצלים את הערוץ האורגני בלי לשבת על פייסבוק</h2>
            <p>
              החיסרון היחיד של לידים מקבוצות הוא שצריך מהירות ועקביות. {SITE.brand} פותרת בדיוק את זה:
              סורקת עשרות אלפי קבוצות בזמן אמת, מזהה עם AI רק לידים עם כוונת קנייה, ושולחת לך אותם
              לוואטסאפ תוך שניות. אתה מקבל את היתרון של הערוץ האורגני (זול, חם) בלי המחיר שלו (זמן ידני).
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
              מודעות לידים מביאות נפח בעלות גבוהה ובכוונה נמוכה; לידים מקבוצות מביאים לידים חמים ממי
              שחיפש בעצמו, בעלות אפסית. לעסק קטן, הבסיס הנכון הוא אורגני מקבוצות, עם מודעות כתוספת.{" "}
              {SITE.brand} הופכת את הערוץ האורגני לאוטומטי: {SITE.pricing.monthlyILS}₪/חודש, ערבות החזר
              מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">לידים חמים מקבוצות — בלי תקציב מודעות</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} תופסת לידים עם כוונת קנייה אמיתית ושולחת אותם לוואטסאפ שלך.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני רוצה להבין מה עדיף לי — מודעות או לידים מקבוצות")}
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
            related={["leads-from-facebook", "lead-cost-facebook-2026", "organic-vs-paid-leads"]}
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
