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

const SLUG = "free-leads";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "אפשר באמת להשיג לידים בחינם?",
    a: "כן. לידים אורגניים מקבוצות פייסבוק, המלצות מלקוחות, גוגל עסקי ותוכן — כולם מביאים לידים בלי עלות לקליק. ה\"חינם\" עולה בזמן ובעקביות, אבל לעסק קטן זה לרוב משתלם הרבה יותר מפרסום ממומן.",
  },
  {
    q: "מה הדרך הכי מהירה להשיג לידים בחינם?",
    a: "קבוצות פייסבוק. בכל יום אנשים כותבים בהן שהם מחפשים שירות — אלה לידים חמים עם כוונת קנייה, בחינם. האתגר היחיד הוא לתפוס אותם בזמן, ולכן אוטומציה של הסריקה הופכת את השיטה הזו למעשית.",
  },
  {
    q: "לידים בחינם פחות איכותיים מלידים בתשלום?",
    a: "בדרך כלל להפך. לידים אורגניים — מישהו שכתב בעצמו שהוא מחפש שירות, או לקוח שהמליץ עליך — הם לרוב חמים ואיכותיים יותר מליד ממומן קר, כי הכוונה מגיעה מהאדם עצמו ולא מפרסומת.",
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
            <h2>&quot;לידים בחינם&quot; — האמת המלאה</h2>
            <p>
              כן, אפשר להשיג לידים בלי לשלם על פרסום. אבל בואו נהיה כנים: אין באמת &quot;חינם&quot; —
              הלידים האורגניים עולים ב<strong>זמן ובעקביות</strong> במקום בכסף. לעסק קטן שאין לו תקציב
              מדיה, זו לרוב העסקה הכי טובה: אתה משקיע מאמץ (או כלי אוטומציה זול) במקום מאות שקלים
              לחודש על מודעות. הנה 7 הדרכים האמיתיות.
            </p>

            <h2>1. קבוצות פייסבוק — המקור החם ביותר</h2>
            <p>
              בכל יום אלפי אנשים כותבים בקבוצות &quot;מחפש/ת...&quot;. אלה לידים חמים עם כוונת קנייה,
              בחינם. החיסרון היחיד: בלתי אפשרי לעקוב אחרי הכל ידנית. ראה{" "}
              <Link href="/guides/leads-from-facebook-groups" className="text-brand-300 underline">
                לידים מקבוצות פייסבוק
              </Link>
              .
            </p>

            <h2>2. גוגל עסקי (Google Business Profile)</h2>
            <p>
              פרופיל חינמי שמופיע כשמישהו מחפש שירות באזור שלך. ביקורות טובות + פרטים מלאים = לידים
              מקומיים חינמיים. חובה לכל עסק מקומי.
            </p>

            <h2>3. המלצות מלקוחות קיימים</h2>
            <p>
              הליד האיכותי ביותר שיש. פשוט לבקש: אחרי כל עבודה מוצלחת, בקש מהלקוח להמליץ או לשתף. עולה
              רק את הביטחון לבקש.
            </p>

            <h2>4. קבוצות וערוצי טלגרם / וואטסאפ</h2>
            <p>
              קהילות מקצועיות ומקומיות שבהן אנשים שואלים המלצות. נוכחות ערכית (לא ספאם) מביאה פניות.
            </p>

            <h2>5. תוכן ו-SEO</h2>
            <p>
              מאמר או סרטון שעונה על שאלה שהלקוחות שלך שואלים בגוגל, מביא תנועה אורגנית לאורך זמן. איטי,
              אבל נכס שממשיך לעבוד בלי לשלם על כל קליק.
            </p>

            <h2>6. שיתופי פעולה עם עסקים משלימים</h2>
            <p>
              צלם + מאפרת, שיפוצניק + מעצב פנים. הפניות הדדיות בין עסקים שפונים לאותו קהל — לידים
              חינמיים ואמינים.
            </p>

            <h2>7. רשת אישית וקהילה מקומית</h2>
            <p>
              קבוצות שכונתיות, ועדי בית, אירועים מקומיים. אנשים קונים מאנשים שהם מכירים — הנוכחות
              המקומית שלך היא מקור לידים.
            </p>

            <h2>איפה ה&quot;חינם&quot; באמת עולה</h2>
            <p>
              המחיר האמיתי של לידים אורגניים הוא <strong>זמן ועקביות</strong>. צריך להיות שם כל יום,
              לענות מהר, לא לפספס. כאן רוב העסקים נכשלים — לא כי אין לידים חינם, אלא כי אין להם זמן
              לתפוס אותם. הפתרון הוא לאוטמט את החלק שגוזל זמן. ראה{" "}
              <Link href="/guides/lead-automation" className="text-brand-300 underline">
                אוטומציית לידים
              </Link>
              .
            </p>

            <h2>איך הופכים לידים חינמיים לזרם קבוע</h2>
            <p>
              קבוצות פייסבוק הן מקור הלידים החינמי הכי חזק — אבל רק אם תופסים את הפוסטים בזמן.{" "}
              {SITE.brand} סורקת עשרות אלפי קבוצות בזמן אמת, מזהה עם AI רק לידים רלוונטיים, ושולחת לך
              אותם לוואטסאפ. במקום &quot;חינם אבל ידני ובלתי אפשרי&quot;, אתה מקבל זרם לידים חמים קבוע
              בעלות חודשית שפויה.
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
              לידים בחינם הם אמיתיים — קבוצות פייסבוק, המלצות, גוגל עסקי, תוכן ועוד. הם עולים בזמן, לא
              בכסף, ולרוב איכותיים יותר מלידים ממומנים. האתגר היחיד הוא עקביות ומהירות — וזה בדיוק מה
              ש-{SITE.brand} מאוטמת: {SITE.pricing.monthlyILS}₪/חודש, ערבות החזר מלא{" "}
              {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">לידים אורגניים — בלי הכאב ראש</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} תופסת בשבילך את הלידים החינמיים מקבוצות פייסבוק ושולחת אותם לוואטסאפ.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני רוצה לקבל לידים אורגניים לעסק שלי")}
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
            related={["lead-sources", "organic-vs-paid-leads", "leads-from-facebook-groups"]}
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
