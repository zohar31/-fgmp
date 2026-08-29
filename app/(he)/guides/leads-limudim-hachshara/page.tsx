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

const SLUG = "leads-limudim-hachshara";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "איפה אנשים מחליטים איפה ללמוד?",
    a: "ההחלטה מתחילה בקבוצות פייסבוק — 'איזה קורס דיגיטל משתלם?', 'ממליצים על מכללה?', 'מחפש מורה פרטי'. אנשים סומכים על המלצות הקבוצה יותר מפרסומת. מי שמגיב ראשון עם מידע ענייני תופס את הנרשם.",
  },
  {
    q: "זה מתאים גם למורה פרטי עצמאי, לא רק למכללה?",
    a: "בהחלט. מורים פרטיים הם מהמשתמשים המובהקים — בקבוצות אזוריות והוריות נכתבות בקשות למורים ומדריכים כל יום. אתה מגדיר את הנושא שלך והמערכת מסמנת רק פניות רלוונטיות.",
  },
  {
    q: "אפשר למקד לנושא לימוד ספציפי?",
    a: "כן. תגדיר מילות מפתח כמו 'קורס עיצוב', 'שיעורי אנגלית', 'הכנה לפסיכומטרי' — ותקבל רק פניות בתחום שלך.",
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
            <h2>ההחלטה איפה ללמוד מתחילה בקבוצה</h2>
            <p>
              לפני שנרשמים לקורס או להכשרה, אנשים שואלים את הקהילה: &quot;איזה קורס באמת שווה?&quot;,
              &quot;ממליצים על מכללה למקצוע?&quot;, &quot;מחפשת מורה פרטי לבן שלי&quot;. כל שאלה כזו
              היא מתעניין חם — הוא כבר החליט ללמוד, נשאר רק לבחור אצל מי. מי שמגיב ראשון עם תשובה
              עניינית תופס את הנרשם.
            </p>

            <h2>למה פרסום ממומן לבדו לא מספיק</h2>
            <p>
              קמפיינים ממומנים בתחום הלימודים יקרים והתחרות עליהם עזה, כי כולם מפרסמים לאותו קהל.
              הפנייה בקבוצה שונה: אדם שמבקש המלצה בעצמו כבר בשל, והמלצה מהקהילה שווה יותר מכל מודעה.
              היתרון האמיתי הוא לתפוס את הפניות האורגניות האלה לפני כולם.
            </p>

            <h2>איך תופסים לידים ללימודים בזמן אמת</h2>
            <p>
              {SITE.brand} סורקת 50,000+ קבוצות בישראל, מזהה עם AI פוסטים של אנשים שמחפשים ללמוד
              בתחום שלך, ושולחת לך אותם לוואטסאפ תוך שניות — עם תגובה מוצעת. אתה פונה כשההתעניינות
              בשיא, לא יום אחרי. ראה{" "}
              <Link href="/guides/leads-from-facebook-groups" className="text-brand-300 underline">
                איך משיגים לידים מקבוצות פייסבוק
              </Link>
              .
            </p>

            <h2>מיקוד הלידים לפי נושא וקהל</h2>
            <p>
              מכללה תגדיר &quot;קורס תעודה&quot;, &quot;הסבה מקצועית&quot;; מורה פרטי יגדיר &quot;שיעורים
              פרטיים&quot;, &quot;עזרה בבגרות&quot;; מדריך יגדיר את הנושא שלו. אם אתה מורה פרטי, ראה גם
              את דף{" "}
              <Link href="/lidim/lidim-lemore-prati" className="text-brand-300 underline">
                לידים למורה פרטי
              </Link>
              . המערכת מתמקדת גם בקבוצות הוריות ואזוריות, שם הביקוש ללימודים גבוה.
            </p>

            <h2>הפנייה הראשונה קובעת</h2>
            <p>
              בלימודים, המתעניין רוצה תשובה ברורה: מה לומדים, כמה זמן, כמה עולה, ומתי מתחילים. תשובה
              מהירה, חמה ואישית — עדיפה על כל ברושור. ראה איך לנסח אותה נכון ב-
              <Link href="/guides/first-message-to-lead" className="text-brand-300 underline">
                ההודעה הראשונה לליד
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
              בתחום הלימודים וההכשרה, כל נרשם מתחיל בשאלה בקבוצה. מי שתופס את הלידים האלה ראשון,
              בעלות קבועה, ממלא קורסים בלי לשרוף תקציב פרסום — זרם קבוע של לידים חמים ללימודים. {SITE.brand}:{" "}
              {SITE.pricing.monthlyILS}₪/חודש קבוע, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">קבל מתעניינים ללימודים — לוואטסאפ</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} מזהה עם AI אנשים שמחפשים ללמוד בתחום שלך ושולחת לך אותם תוך שניות.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני בתחום הלימודים/הכשרה ורוצה לקבל פניות")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base"
              >
                שאלה? דברו איתנו בוואטסאפ
              </a>
            </div>
            <p className="mt-4 text-sm text-ink-400">
              רוצה לראות את דף הקטגוריה?{" "}
              <Link href="/lidim/lidim-limudim-hachshara" className="text-brand-300 underline">
                לידים ללימודים והכשרה
              </Link>
            </p>
          </div>

          <RelatedGuides
            currentSlug={SLUG}
            related={["leads-from-facebook-groups", "speed-to-lead", "first-message-to-lead"]}
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
