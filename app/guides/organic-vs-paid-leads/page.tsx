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

const SLUG = "organic-vs-paid-leads";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "מה ההבדל בין ליד אורגני לליד ממומן?",
    a: "ליד ממומן מגיע דרך פרסום ששילמת עליו (Facebook Lead Ads, Google Ads) ועולה בדרך כלל 15-150 ₪ לליד. ליד אורגני מגיע בלי תשלום על מדיה — מהמלצה, מחיפוש בגוגל, או מפוסט בקבוצת פייסבוק שבו מישהו מחפש את השירות שלך. עלות הליד האורגני נמוכה משמעותית.",
  },
  {
    q: "לידים אורגניים יותר טובים מממומנים?",
    a: "לרוב כן מבחינת איכות ועלות — כי האדם יזם את הפנייה בעצמו, מה שמעיד על כוונת רכישה גבוהה. אבל ממומן נותן שליטה מיידית בכמות. עסק שרוצה זרם יציב ובר-שליטה ישלב את שניהם; עסק שרוצה לחתוך עלויות יעבור לאורגני.",
  },
  {
    q: "כמה עולה ליד אורגני מקבוצות פייסבוק?",
    a: "בשיטה ידנית — 'חינם' אבל עולה לך שעות ביום. עם מערכת אוטומטית כמו FGMP, העלות היא מנוי קבוע (299 ₪/חודש) ללא קשר לכמות הלידים — בתחומים פעילים זה יוצא פחות מ-3 ₪ לליד.",
  },
  {
    q: "אפשר להסתמך רק על לידים אורגניים?",
    a: "הרבה עסקי שירות בישראל עושים את זה בהצלחה — במיוחד בתחומים עם ביקוש גבוה בקבוצות (שיפוצים, מנעולנות, אירועים). היתרון: עלות נמוכה וקבועה. בתחומים נישתיים מאוד כדאי לשלב עם מקור נוסף לביטחון.",
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
            <h2>שתי דרכים להשיג לידים — וההבדל ביניהן שווה כסף</h2>
            <p>
              כל ליד שמגיע לעסק שלך הגיע באחת משתי דרכים: <strong>שילמת על מדיה כדי להביא אותו</strong>{" "}
              (ליד ממומן), או <strong>הוא הגיע מעצמו</strong> (ליד אורגני). ההבדל נשמע טכני, אבל הוא קובע
              את העלות שלך לליד, את שיעור הסגירה, ואת כמות הכסף שתשרוף עד שתבין מה עובד. בואו נפרק את זה
              לעומק, עם נתונים אמיתיים מ-2026.
            </p>

            <h2>מה זה ליד ממומן?</h2>
            <p>
              ליד ממומן מגיע דרך פרסום ששילמת עליו: <strong>Facebook/Instagram Lead Ads</strong>,{" "}
              <strong>Google Ads</strong>, טאבולה, ועוד. אתה בונה קמפיין, מגדיר קהל יעד, ומשלם לפי קליק
              או לפי ליד. היתרון הגדול: <strong>שליטה מיידית בכמות</strong> — מגדיל תקציב, מקבל יותר
              לידים, היום.
            </p>
            <p>החסרונות:</p>
            <ul>
              <li><strong>עלות מצטברת</strong> — 15-150 ₪ לליד, ובתחומים תחרותיים (ביטוח, נדל"ן, עו"ד) הרבה יותר.</li>
              <li><strong>איכות משתנה</strong> — הרבה לידים הם "סקרנים" שלחצו על מודעה מבלי כוונה אמיתית.</li>
              <li><strong>צריך מומחיות</strong> — קמפיין לא מנוהל נכון שורף כסף מהר.</li>
              <li><strong>תלות במערכת פרסום</strong> — שינוי מדיניות או עליית מחירים פוגעים בך מיד.</li>
            </ul>

            <h2>מה זה ליד אורגני?</h2>
            <p>
              ליד אורגני מגיע <strong>בלי תשלום על מדיה</strong>: המלצה מפה לאוזן, מישהו שמצא אותך בגוגל,
              או — המקור הכי לא מנוצל בישראל — <strong>פוסט בקבוצת פייסבוק</strong> שבו אדם כותב "מחפש
              שיפוצניק באזור המרכז" או "מי ממליץ על צלמת לברית". האדם <em>יזם</em> את הפנייה, וזה משנה
              הכל: כוונת הרכישה גבוהה, והוא כבר במצב חיפוש פעיל.
            </p>
            <p>היתרונות:</p>
            <ul>
              <li><strong>עלות מדיה אפסית</strong> — אתה לא משלם פר-ליד.</li>
              <li><strong>איכות גבוהה</strong> — האדם ביקש, לא הגיב למודעה אקראית.</li>
              <li><strong>שיעור סגירה גבוה</strong> — לרוב פי כמה מליד ממומן.</li>
            </ul>
            <p>
              החיסרון ההיסטורי: <strong>קשה לשלוט בכמות ולתפוס את הלידים בזמן.</strong> אי אפשר לעקוב
              ידנית אחרי אלפי קבוצות. בדיוק כאן נכנסת אוטומציה (עוד מעט).
            </p>

            <h2>השוואה ישירה — אורגני מול ממומן</h2>
            <table>
              <thead>
                <tr>
                  <th>פרמטר</th>
                  <th>ליד ממומן</th>
                  <th>ליד אורגני (קבוצות פייסבוק)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>עלות לליד</td><td>15-150 ₪+</td><td>אפסית / מנוי קבוע</td></tr>
                <tr><td>זמן הקמה</td><td>שעות (קמפיין)</td><td>מיידי (מערכת מוכנה)</td></tr>
                <tr><td>שליטה בכמות</td><td>גבוהה</td><td>תלוי ביקוש בתחום</td></tr>
                <tr><td>כוונת רכישה</td><td>בינונית</td><td>גבוהה — האדם יזם</td></tr>
                <tr><td>שיעור סגירה טיפוסי</td><td>1.5%-3%</td><td>15%-25%</td></tr>
                <tr><td>תלות בפלטפורמה</td><td>גבוהה</td><td>נמוכה</td></tr>
              </tbody>
            </table>
            <p>
              לניתוח עלויות מפורט יותר ראה{" "}
              <Link href="/guides/lead-cost-facebook-2026" className="text-brand-300 underline">
                כמה עולה ליד מפייסבוק ב-2026
              </Link>
              .
            </p>

            <h2>אז מה משתלם לעסק קטן ב-2026?</h2>
            <p>
              אין תשובה אחת — תלוי בתחום, בתקציב, ובדחיפות. הנה הכלל המעשי:
            </p>
            <ul>
              <li>
                <strong>צריך לידים מחר בבוקר, ויש תקציב</strong> → התחל ממומן. מהיר, אבל עקוב אחרי
                עלות-לעסקה ולא רק עלות-לליד.
              </li>
              <li>
                <strong>רוצה לחתוך עלויות ולבנות זרם יציב</strong> → אורגני. במיוחד בתחומים פעילים
                בקבוצות (שיפוצים, אירועים, מנעולנות, נדל"ן).
              </li>
              <li>
                <strong>הכי חכם לרוב</strong> → שילוב: ממומן לזרם בסיס ובר-שליטה, אורגני להורדת עלות
                ממוצעת והגדלת ROI.
              </li>
            </ul>

            <h2>איך הופכים לידים אורגניים לזרם יציב</h2>
            <p>
              הבעיה היחידה של לידים אורגניים מקבוצות פייסבוק היא <strong>תפיסה בזמן</strong>: הפוסטים
              זורמים באלפי קבוצות במקביל ונעלמים תוך שעות. הפתרון הוא אוטומציה. {SITE.brand} סורקת
              ברקע 50,000+ קבוצות פייסבוק פעילות בישראל, מסננת ב-AI לפי התחום שלך, ושולחת רק את הלידים
              הרלוונטיים לוואטסאפ או טלגרם — תוך שניות מהפרסום. אתה משלם {SITE.pricing.monthlyILS} ₪
              קבוע בחודש, בלי תשלום פר-ליד, ובלי לנהל קמפיינים.
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
              ליד ממומן קונה לך זמן ושליטה — תמורת כסף. ליד אורגני קונה לך איכות ועלות נמוכה — תמורת
              שיטה. עסקים חכמים ב-2026 לא בוחרים צד אחד: הם בונים זרם אורגני קבוע (שמוריד את העלות
              הממוצעת לליד דרמטית) ומשלימים בממומן לפי הצורך. {SITE.brand} הופכת את הצד האורגני
              לאוטומטי — {SITE.pricing.monthlyILS}₪/חודש, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">רוצה זרם לידים אורגני אוטומטי?</h3>
            <p className="mt-2 text-ink-200">
              בלי קמפיינים, בלי תשלום פר-ליד. {SITE.brand} סורקת קבוצות פייסבוק 24/7 ושולחת לידים לוואטסאפ.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, קראתי את ההשוואה בין לידים אורגניים לממומנים ויש לי שאלה")}
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
            related={["lead-cost-facebook-2026", "what-is-a-lead", "leads-from-facebook-groups"]}
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
