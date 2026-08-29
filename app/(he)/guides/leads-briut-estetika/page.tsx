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

const SLUG = "leads-briut-estetika";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "איפה לקוחות מחפשים קוסמטיקאית או מטפל?",
    a: "בקבוצות פייסבוק אזוריות וקהילות נשים — 'מי ממליצה על קוסמטיקאית טובה?', 'מחפשת טיפול פנים', 'ממליצים על דיאטנית?'. אלה לקוחות בכוונת קנייה, ומי שמגיבה ראשונה עם זמינות תופסת את התור.",
  },
  {
    q: "אני נותנת טיפול אחד בלבד — אפשר למקד?",
    a: "כן. תגדירי מילות מפתח כמו 'לק ג׳ל', 'טיפול פנים', 'עיסוי', 'ייעוץ תזונה' והמערכת תסמן רק פניות רלוונטיות אלייך, באזור שלך.",
  },
  {
    q: "כמה פניות אפשר לקבל בחודש?",
    a: "בריאות ואסתטיקה הם מהתחומים הפעילים ביותר בקבוצות. הנפח תלוי בתחום ובאזור, ובזכות ערבות ההחזר ל-3 ימים אפשר לבדוק אותו בלי סיכון.",
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
  twitter: { card: "summary_large_image", title: guide.title, description: guide.description },
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
            <h2>בריאות ואסתטיקה — עולם של המלצות</h2>
            <p>
              אף אחד לא בוחר קוסמטיקאית, מטפל או דיאטנית מפרסומת — בוחרים לפי המלצה. ולכן התחום חי
              בקבוצות: &quot;מי ממליצה על טיפול פנים באזור?&quot;, &quot;מחפשת הסרת שיער בלייזר&quot;,
              &quot;ממליצים על דיאטנית טובה?&quot;. כל בקשה כזו היא לקוחה חמה שמחפשת בדיוק אותך.
            </p>

            <h2>למה קשה לתפוס את הלידים האלה</h2>
            <p>
              הפוסטים האלה מתפרסמים בעשרות קבוצות אזוריות וקהילתיות ונעלמים תוך שעות מתחת לפוסטים
              חדשים. אי אפשר לשבת כל היום ולסרוק אותן, ובזמן שאת עסוקה בטיפול — מתפרסמת פנייה שלוש
              קוסמטיקאיות אחרות כבר הגיבו לה.
            </p>

            <h2>איך תופסים לידים לטיפולים בזמן אמת</h2>
            <p>
              {SITE.brand} סורקת 50,000+ קבוצות (כולל קבוצות נשים ואזוריות), מזהה עם AI פוסטים של מי
              שמחפש טיפול בתחום שלך, ושולחת לך אותם לוואטסאפ תוך שניות — עם תגובה מוצעת. את מגיבה עם
              זמינות כשההתעניינות בשיא. ראה{" "}
              <Link href="/guides/leads-from-facebook-groups" className="text-brand-300 underline">
                איך משיגים לידים מקבוצות פייסבוק
              </Link>
              .
            </p>

            <h2>מיקוד לפי טיפול ואזור</h2>
            <p>
              קוסמטיקאית תגדיר &quot;טיפול פנים&quot;, &quot;פילינג&quot;; מכון אסתטיקה יגדיר
              &quot;הסרת שיער&quot;, &quot;מיצוק&quot;; דיאטנית תגדיר &quot;ייעוץ תזונה&quot;,
              &quot;ירידה במשקל&quot;. אם את בתחום ספציפי, ראה גם את דף{" "}
              <Link href="/lidim/lidim-lakosmetikait" className="text-brand-300 underline">
                לידים לקוסמטיקאית
              </Link>{" "}
              ואת{" "}
              <Link href="/lidim/lidim-estetika" className="text-brand-300 underline">
                לידים לאסתטיקה
              </Link>
              .
            </p>

            <h2>לקוחה חמה = לקוחה חוזרת</h2>
            <p>
              בתחום הזה, לקוחה מרוצה חוזרת שוב ושוב וגם ממליצה. לכן כל פנייה חמה שווה הרבה מעבר לטיפול
              הראשון. תגובה מהירה ואישית — ראה{" "}
              <Link href="/guides/marketing-for-beauticians" className="text-brand-300 underline">
                שיווק לקוסמטיקאיות ואנשי טיפוח
              </Link>{" "}
              — היא שבונה את מערכת היחסים. הבן את ההבדל בין פנייה חמה לקרה ב-
              <Link href="/guides/hot-vs-cold-leads" className="text-brand-300 underline">
                ליד חם מול ליד קר
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
              בבריאות ואסתטיקה, הלקוחות מבקשות המלצה בקבוצות בכל יום. מי שתופסת את הלידים ראשונה,
              בעלות קבועה, ממלאת את היומן בלידים חמים ובונה בסיס לקוחות חוזר. {SITE.brand}:{" "}
              {SITE.pricing.monthlyILS}₪/חודש קבוע, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">מלא את היומן בלקוחות — לוואטסאפ</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} מזהה עם AI מי שמחפש טיפול בתחום שלך ושולחת לך אותו תוך שניות.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני בתחום הבריאות/אסתטיקה ורוצה לקבל פניות")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base"
              >
                שאלה? דברו איתנו בוואטסאפ
              </a>
            </div>
            <p className="mt-4 text-sm text-ink-400">
              רוצה לראות את דף הקטגוריה?{" "}
              <Link href="/lidim/lidim-briut-estetika" className="text-brand-300 underline">
                לידים לבריאות ואסתטיקה
              </Link>
            </p>
          </div>

          <RelatedGuides
            currentSlug={SLUG}
            related={["marketing-for-beauticians", "speed-to-lead", "hot-vs-cold-leads"]}
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
