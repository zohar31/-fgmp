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

const SLUG = "lead-price-list";
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

// FAQ schema — שאילתות "כמה עולה ליד" הן שאילתות שאלה קלאסיות; FAQ מגדיל
// סיכוי ל-rich result ולציטוט במנועי AI.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "כמה עולה ליד בישראל ב-2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ליד ממוצע בישראל עולה 35-150 ₪ כשקונים מחברות לידים או מפרסמים במודעות. בתחומים פיננסיים (משכנתאות, ביטוח) המחיר מגיע ל-85-150 ₪ לליד, ולידים פרימיום מאומתים טלפונית נמכרים ב-400-700 ₪. לעומת זאת, במנוי חודשי קבוע כמו FGMP (299 ₪/חודש ללידים ללא הגבלה מקבוצות פייסבוק) העלות בפועל יורדת ל-3-10 ₪ לליד.",
      },
    },
    {
      "@type": "Question",
      name: "מה הליד הכי יקר בישראל?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "לידים פיננסיים פרימיום — מאומתים טלפונית ובלעדיים — נמכרים ב-400-700 ₪ ליחידה. אחריהם: פורקס והשקעות (עד 210 ₪), אינסטלציה ושיפוצים גדולים (עד 210 ₪), והטבות מס לגיל השלישי (עד 150 ₪).",
      },
    },
    {
      "@type": "Question",
      name: "איך משלמים הכי פחות על ליד?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "המפתח הוא מודל התמחור: תשלום פר ליד מתייקר ככל שצריך יותר לידים, בעוד מנוי חודשי קבוע נהיה זול יותר ככל שמגיעים יותר לידים. מערכת שסורקת קבוצות פייסבוק במנוי קבוע של 299 ₪/חודש מורידה את העלות ל-3-10 ₪ לליד בתחומים פעילים — פי 5-20 פחות מקנייה פר ליד.",
      },
    },
  ],
};

// תתי-העמודים של אשכול המחירון — מוצגים כבלוק ניווט בראש המאמר ומסומנים
// ב-ItemList schema. מבנה עוגן→תתי-עמודים עם קישורים פנימיים בולטים הוא
// מה שמייצר sitelinks בתוצאת גוגל ("מחירון לידים" + קישורי משנה).
const CLUSTER_PAGES: { slug: string; title: string; blurb: string }[] = [
  {
    slug: "lead-prices-professionals",
    title: "מחירון לידים לבעלי מקצוע",
    blurb: "שיפוצים, אינסטלציה, חשמל, מיזוג והובלות — מחיר ליד לפי מקצוע",
  },
  {
    slug: "lead-prices-finance",
    title: "מחירון לידים פיננסיים",
    blurb: "משכנתאות, ביטוח, הלוואות, החזרי מס ועורכי דין — התחומים היקרים",
  },
  {
    slug: "buying-leads-israel",
    title: "קניית לידים לעסקים",
    blurb: "כל מודלי התמחור, טווחי המחירים והמלכודות של חברות לידים",
  },
  {
    slug: "exclusive-vs-shared-leads",
    title: "לידים בלעדיים מול משותפים",
    blurb: "למה ליד בלעדי עולה פי 2-4 — ומתי הליד ה'זול' יקר יותר",
  },
  {
    slug: "calculate-cost-per-lead",
    title: "חישוב עלות לליד (CPL)",
    blurb: "הנוסחה, דוגמאות לפי תחום, ומה נחשב מחיר טוב לליד",
  },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "מחירון לידים לפי תחומים — כל המדריכים",
  itemListElement: CLUSTER_PAGES.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.title,
    url: `${SITE.url}/guides/${p.slug}`,
  })),
};

// שורת מחירון: [תחום, טווח שוק ₪ לליד]
const PRICE_ROWS: [string, string][] = [
  ["שיפוצים כלליים", "50-210"],
  ["אינסטלציה", "100-210"],
  ["מיזוג אוויר", "80-200"],
  ["חשמלאי", "40-70"],
  ["הובלות", "20-75"],
  ["הדברה", "20-75"],
  ["גינון", "20-70"],
  ["איתור נזילות", "20-60"],
  ["עיצוב מטבחים", "70-150"],
  ["עבודות אלומיניום", "50-120"],
  ["בניית אתרים", "84-158"],
  ["עיצוב פנים", "53-84"],
  ["עורכי דין", "40-100"],
  ["משכנתאות", "53-98"],
  ["ביטוח בריאות / חיים", "85-110"],
  ["החזרי מס", "10-63"],
  ["הלוואות", "20-95"],
  ["השקעות נדל\"ן", "80-150"],
  ["רופאי שיניים", "30-126"],
  ["אסתטיקה (בוטוקס, לייזר)", "32-84"],
  ["קוסמטיקאיות", "20-70"],
  ["צילום אירועים", "53-105"],
  ["תקליטנים (DJ)", "30-80"],
  ["מורי נהיגה", "20-50"],
  ["טכנאים (מוצרי חשמל)", "30-74"],
  ["לימודים ותארים", "105-158"],
];

export default function LeadPriceListGuide() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={itemListSchema} />
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

          {/* בלוק ניווט לאשכול המחירון — קישורים פנימיים בולטים בראש העמוד */}
          <nav aria-label="מחירון לידים לפי תחומים" className="mt-10 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
            <h2 className="font-display text-lg font-bold text-white">מחירון לידים לפי תחומים — כל המדריכים</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {CLUSTER_PAGES.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/guides/${p.slug}`}
                    className="group block rounded-xl p-3 ring-1 ring-white/5 transition hover:ring-brand-500/40"
                  >
                    <span className="font-bold text-brand-300 group-hover:text-brand-200">{p.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-ink-300">{p.blurb}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="prose prose-invert prose-lg mt-12 max-w-none">
            <h2>מחירון לידים — התשובה הקצרה</h2>
            <p>
              ערכנו סקירת שוק על המחירונים הפומביים של חברות הלידים וסוכנויות הפרסום הגדולות
              בישראל. השורה התחתונה:
            </p>
            <ul>
              <li>
                <strong>ליד ממוצע בישראל: 35-150 ₪</strong> — כשקונים אותו מחברת לידים או משלמים
                עליו במודעות ממומנות.
              </li>
              <li>
                <strong>לידים פיננסיים (משכנתא, ביטוח, השקעות): 50-210 ₪</strong> — התחומים היקרים
                בשוק.
              </li>
              <li>
                <strong>ליד פרימיום מאומת טלפונית ובלעדי: 400-700 ₪</strong> — כן, ליד אחד.
              </li>
              <li>
                <strong>ליד במנוי חודשי קבוע ({SITE.brand}): 3-10 ₪ בפועל</strong> — {SITE.pricing.monthlyILS} ₪
                לחודש, לידים ללא הגבלה מ-50,000+ קבוצות פייסבוק. על זה בהמשך.
              </li>
            </ul>

            <h2>טבלת מחירי לידים לפי תחום (2026)</h2>
            <p>
              הטווחים הבאים מרכזים את מחירי השוק כפי שמפורסמים במחירוני חברות לידים ישראליות —
              מחיר <em>לליד בודד</em> בקנייה ישירה או בקמפיין ממומן:
            </p>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl ring-1 ring-white/10">
            <table className="w-full min-w-[420px] text-right text-sm">
              <thead>
                <tr className="bg-white/5 text-ink-200">
                  <th className="px-5 py-3 font-bold">תחום</th>
                  <th className="px-5 py-3 font-bold">מחיר שוק לליד (₪)</th>
                  <th className="px-5 py-3 font-bold">ליד ב-{SITE.brand} (₪)*</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-ink-200">
                {PRICE_ROWS.map(([field, range]) => (
                  <tr key={field} className="odd:bg-white/[0.02]">
                    <td className="px-5 py-2.5 font-medium text-white">{field}</td>
                    <td className="px-5 py-2.5">{range} ₪</td>
                    <td className="px-5 py-2.5 font-bold text-wa">3-10 ₪</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-ink-400">
            * עלות בפועל לליד במנוי {SITE.pricing.monthlyILS} ₪/חודש, לפי 30-100 לידים בחודש בתחומים
            פעילים. מחירי השוק — סקירת מחירונים פומביים, יולי 2026. המחירים משתנים לפי אזור, עונה
            ורמת תחרות.
          </p>

          <div className="prose prose-invert prose-lg mt-10 max-w-none">
            <h2>מה קובע כמה עולה ליד?</h2>
            <ol>
              <li>
                <strong>שווי העסקה בתחום.</strong> ליד למשכנתא שווה ללקוח עשרות אלפי שקלים בעמלות —
                לכן משלמים עליו 100 ₪ בשמחה. ליד לתיקון סלולר שווה 200 ₪ — לכן הוא עולה 20-50 ₪.
              </li>
              <li>
                <strong>רמת התחרות על הקהל.</strong> ביטוח, משכנתאות ונדל"ן הם שדה קרב פרסומי.
                כשעשרות מפרסמים מתחרים על אותו גולש, מחיר הקליק — ואיתו מחיר הליד — מטפס.
              </li>
              <li>
                <strong>בלעדיות.</strong> ליד שנמכר רק לך עולה פי 2-4 מליד שנמכר במקביל ל-3-5
                מתחרים. פירטנו על זה ב
                <Link href="/guides/exclusive-vs-shared-leads">מדריך ליד בלעדי מול משותף</Link>.
              </li>
              <li>
                <strong>רמת האימות.</strong> ליד "גולמי" (טופס שמולא) זול; ליד שעבר אימות טלפוני
                ותיאום ציפיות יקר משמעותית — עד 700 ₪ בפיננסים.
              </li>
              <li>
                <strong>מודל התמחור.</strong> וזה הסעיף שרוב העסקים מפספסים — כי הוא היחיד שבשליטתך
                המלאה.
              </li>
            </ol>

            <h2>שלושת מודלי התמחור — וההבדל הדרמטי ביניהם</h2>
            <h3>1. תשלום פר ליד (Pay per Lead)</h3>
            <p>
              קונים לידים ביחידות מחברת לידים. יתרון: משלמים רק על מה שמקבלים. חיסרון: המחיר
              ליחידה גבוה (35-150 ₪), הליד לרוב משותף, וככל שהעסק גדל — ההוצאה גדלה איתו באופן
              ליניארי. 50 לידים בחודש בתחום ממוצע = 3,500-5,000 ₪.
            </p>
            <h3>2. קמפיין ממומן (Lead Ads / Google Ads)</h3>
            <p>
              משלמים לפלטפורמה על קליקים/המרות. ליד מ-Lead Ads עולה 35-180 ₪ ומגוגל 50-300 ₪ —
              ובנוסף צריך לממן ניהול קמפיינים (1,500-4,000 ₪/חודש לסוכנות). פירוט מלא ב
              <Link href="/guides/lead-cost-facebook-2026">השוואת עלויות הלידים מפייסבוק</Link>.
            </p>
            <h3>3. מנוי חודשי קבוע (המודל של {SITE.brand})</h3>
            <p>
              משלמים סכום קבוע — {SITE.pricing.monthlyILS} ₪ לחודש — ומקבלים את <strong>כל</strong> הלידים
              שהמערכת מאתרת בתחום שלך, בלי הגבלה ובלי תמחור פר יחידה. המערכת סורקת 50,000+ קבוצות
              פייסבוק פעילות בישראל 24/7, מזהה אנשים שכותבים "מחפש/ת" את השירות שלך, ושולחת לך את
              הפוסט לוואטסאפ תוך פחות מדקה.
            </p>
            <p>החשבון פשוט:</p>
            <ul>
              <li>30 לידים בחודש → {SITE.pricing.monthlyILS}/30 = <strong>~10 ₪ לליד</strong></li>
              <li>60 לידים בחודש → {SITE.pricing.monthlyILS}/60 = <strong>~5 ₪ לליד</strong></li>
              <li>100 לידים בחודש → {SITE.pricing.monthlyILS}/100 = <strong>~3 ₪ לליד</strong></li>
            </ul>
            <p>
              וההיפוך המבני חשוב לא פחות מהמספר: בתשלום פר ליד, <em>יותר לידים = הוצאה גדולה
              יותר</em>. במנוי קבוע, <em>יותר לידים = מחיר נמוך יותר לליד</em>. זה המודל היחיד בשוק
              שבו הצמיחה שלך מוזילה את השיווק במקום לייקר אותו.
            </p>

            <h2>ההשוואה שסוגרת את הפינה: עלות לליד בכל מודל</h2>
            <p>ניקח עסק שירותים ממוצע (שיפוצים) שצריך 50 לידים בחודש:</p>
            <ul>
              <li>
                <strong>קניית לידים מחברה:</strong> 50 × 80 ₪ = <strong>4,000 ₪ בחודש</strong> (ולרוב
                הלידים משותפים ל-3-5 מתחרים).
              </li>
              <li>
                <strong>Lead Ads + ניהול קמפיין:</strong> 50 × 45 ₪ + 2,000 ₪ ניהול = <strong>4,250 ₪
                בחודש</strong> (ואיכות משתנה — חלק לא זוכרים שהשאירו פרטים).
              </li>
              <li>
                <strong>{SITE.brand}:</strong> <strong>{SITE.pricing.monthlyILS} ₪ בחודש. נקודה.</strong> ליד
                שמגיע ממישהו שכתב בעצמו, בקבוצה, שהוא מחפש — כלומר ליד חם מהסוג שממיר הכי טוב.
              </li>
            </ul>
            <p>
              פער של יותר מפי 13 בעלות החודשית — על לידים שדווקא <em>חמים יותר</em>, כי הם לא
              "השאירו פרטים במודעה" אלא ביקשו את השירות במילים שלהם. זה בדיוק ההבדל בין{" "}
              <Link href="/guides/hot-vs-cold-leads">ליד חם לליד קר</Link>.
            </p>

            <h2>אז כמה "צריך" לעלות ליד?</h2>
            <p>
              המספר הנכון הוא לא מחיר הליד — אלא <strong>עלות העסקה הסגורה</strong> ביחס לרווח ממנה
              (איך מחשבים? <Link href="/guides/calculate-cost-per-lead">מדריך חישוב CPL</Link>).
              כלל אצבע: עלות הליד לא צריכה לעלות על 10% מהרווח הממוצע מעסקה. אם עסקה ממוצעת מכניסה
              לך 2,000 ₪ רווח — ליד ב-200 ₪ הוא גבולי, ליד ב-10 ₪ הוא מכונת כסף.
            </p>
            <p>
              ולכן ההמלצה שלנו פשוטה: לפני שקונים לידים ביחידות או שופכים תקציב על מודעות, מתחילים
              מהערוץ הזול והחם ביותר — לידים אורגניים מקבוצות פייסבוק במנוי קבוע. ב-{SITE.brand} זה{" "}
              {SITE.pricing.monthlyILS} ₪ לחודש עם ערבות החזר מלא {SITE.pricing.refundDays} ימים: אם
              בשבוע הראשון לא קיבלת לידים אמיתיים בתחום שלך — מקבלים את הכסף בחזרה, בלי שאלות.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">
              במקום לשלם 80 ₪ לליד — שלם {SITE.pricing.monthlyILS} ₪ על כולם.
            </h3>
            <p className="mt-2 text-ink-200">
              לידים ללא הגבלה מ-50,000+ קבוצות פייסבוק, ישר לוואטסאפ. {SITE.pricing.monthlyILS}₪/חודש ·
              ערבות החזר {SITE.pricing.refundDays} ימים · בלי התחייבות.
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
            related={["lead-prices-professionals", "lead-prices-finance", "buying-leads-israel"]}
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
