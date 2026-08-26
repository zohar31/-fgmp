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

const SLUG = "hot-vs-cold-leads";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "מה ההבדל בין ליד חם לליד קר?",
    a: "ליד חם הוא אדם עם כוונת קנייה עכשווית — הוא מחפש את השירות שלך ברגע זה (למשל מישהו שכותב בקבוצה 'מחפש צלם לחתונה בעוד שבועיים'). ליד קר הוא אדם שאולי יתעניין בעתיד אבל לא מחפש כרגע. ליד חם נסגר בשיעור גבוה בהרבה ודורש תגובה מהירה.",
  },
  {
    q: "איך מזהים ליד חם?",
    a: "מחפשים סימני כוונה: בקשה מפורשת ('מחפש', 'ממליצים על', 'צריך'), מסגרת זמן ('לשבוע הבא', 'דחוף'), ופירוט צורך ספציפי. ליד מקבוצת פייסבוק שבו אדם מתאר בדיוק מה הוא צריך ומתי — הוא מהחמים ביותר שיש.",
  },
  {
    q: "עדיף להתמקד בלידים חמים או לחמם לידים קרים?",
    a: "לעסק קטן עם זמן מוגבל — עדיף להתמקד בלידים חמים, כי הם נסגרים מהר ובעלות נמוכה. חימום לידים קרים דורש מערך תוכן ומעקב לאורך זמן, ומתאים יותר לעסקים עם צוות שיווק. הדרך היעילה ביותר להשיג זרם קבוע של לידים חמים היא איתור אוטומטי של פוסטים עם כוונת קנייה.",
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
            <h2>ליד זה לא ליד — יש הבדל עצום</h2>
            <p>
              המילה &quot;ליד&quot; מכסה שני דברים שונים לגמרי. <strong>ליד חם</strong> הוא אדם שמחפש
              את השירות שלך <em>עכשיו</em>. <strong>ליד קר</strong> הוא אדם שאולי יתעניין מתישהו, אבל
              לא כרגע. הטעות הנפוצה של עסקים קטנים היא לטפל בשניהם אותו דבר — וכך לשרוף את הליד החם
              (שדרש תגובה מיידית) ולבזבז אנרגיה על הליד הקר (שעדיין לא בשל).
            </p>

            <h2>ליד חם — מה זה ואיך נראה</h2>
            <p>
              ליד חם משדר <strong>כוונת קנייה עכשווית</strong>. הסימנים:
            </p>
            <ul>
              <li><strong>בקשה מפורשת:</strong> &quot;מחפש&quot;, &quot;ממליצים על&quot;, &quot;צריך&quot;, &quot;מי יכול&quot;.</li>
              <li><strong>מסגרת זמן:</strong> &quot;לשבוע הבא&quot;, &quot;דחוף&quot;, &quot;עד סוף החודש&quot;.</li>
              <li><strong>צורך ספציפי:</strong> תיאור מדויק של מה שהוא צריך ואיפה.</li>
            </ul>
            <p>
              דוגמה מושלמת: מישהו שכותב בקבוצת פייסבוק &quot;מחפשת מאפרת לחתונה ב-14/8 באזור המרכז,
              ממליצים?&quot;. זה ליד חם ברמה הגבוהה ביותר — כוונה, זמן וצורך, הכל ביחד.
            </p>

            <h2>ליד קר — מה זה ואיך נראה</h2>
            <p>
              ליד קר הוא איש קשר שאין לו כוונת קנייה מיידית: מישהו שהוריד מדריך חינם, נרשם לרשימת
              תפוצה, או עשה לייק לעמוד. הוא לא &quot;רע&quot; — הוא פשוט <em>לא עכשיו</em>. ליד קר דורש
              חימום לאורך זמן (תוכן, ערך, מעקב) לפני שהוא בשל לקנייה, ולכן שיעור הסגירה המיידי שלו נמוך.
            </p>

            <h2>למה זה קובע את שיעור הסגירה שלך</h2>
            <p>
              ליד חם נסגר בשיעור גבוה בהרבה מליד קר — פשוט כי הוא כבר רוצה לקנות. אבל יש תנאי:{" "}
              <strong>מהירות</strong>. ליד חם &quot;מתקרר&quot; תוך שעות, כי הוא לרוב פונה לכמה עסקים
              בו-זמנית. מי שמגיב ראשון תופס אותו. לכן ההשקעה הכי משתלמת היא לזהות לידים חמים ולהגיב
              להם מיד. הרחבנו על זה ב-
              <Link href="/guides/speed-to-lead" className="text-brand-300 underline">
                מהירות תגובה לליד
              </Link>
              .
            </p>

            <h2>איך לטפל בכל סוג — נכון</h2>
            <ul>
              <li>
                <strong>ליד חם:</strong> תגובה תוך דקות, ענייני וזמין. אל תמכור מיד מחיר — קודם תראה
                שהבנת את הצורך. ראה{" "}
                <Link href="/guides/lead-handling-mistakes" className="text-brand-300 underline">
                  טעויות שהורגות לידים
                </Link>
                .
              </li>
              <li>
                <strong>ליד קר:</strong> אל תלחץ למכירה. תן ערך, הישאר בקשר, ועקוב בעדינות — חלק
                יבשילו. ראה{" "}
                <Link href="/guides/follow-up-cold-leads" className="text-brand-300 underline">
                  איך עוקבים אחרי ליד שלא ענה
                </Link>
                .
              </li>
            </ul>

            <h2>איפה מוצאים לידים חמים בכמות</h2>
            <p>
              המקור העשיר ביותר ללידים חמים בישראל הוא <strong>קבוצות פייסבוק</strong>: בכל יום אלפי
              אנשים כותבים פוסטים עם כוונת קנייה מפורשת. האתגר הוא לתפוס אותם בזמן. {SITE.brand} סורקת
              עשרות אלפי קבוצות בזמן אמת, מזהה בעזרת AI רק פוסטים עם כוונת קנייה אמיתית (לא רעש), ושולחת
              לך אותם ישר לוואטסאפ — כך שאתה מקבל זרם קבוע של לידים חמים בלבד. ראה גם{" "}
              <Link href="/guides/leads-from-facebook-groups" className="text-brand-300 underline">
                איך משיגים לידים מקבוצות פייסבוק
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
              ליד חם וליד קר הם שני עולמות. הליד החם רוצה לקנות עכשיו ודורש תגובה מיידית; הליד הקר עוד
              בודק ודורש חימום. מי שמזהה את ההבדל ומטפל בכל סוג נכון — סוגר יותר, בפחות מאמץ. הדרך
              הפשוטה ביותר להתמקד בלידים החמים היא לתת למערכת לזהות אותם בשבילך. {SITE.brand}:{" "}
              {SITE.pricing.monthlyILS}₪/חודש, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">קבל רק לידים חמים — לוואטסאפ</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} מזהה עם AI רק פוסטים עם כוונת קנייה אמיתית ושולחת לך אותם תוך שניות.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני רוצה לקבל לידים חמים לעסק שלי")}
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
            related={["what-is-a-lead", "speed-to-lead", "leads-from-facebook-groups"]}
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
