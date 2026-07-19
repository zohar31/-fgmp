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

const SLUG = "filter-facebook-leads";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "איך מזהים ליד אמיתי בקבוצת פייסבוק?",
    a: "ליד אמיתי משדר כוונת קנייה: בקשה מפורשת ('מחפש/ת', 'ממליצים על', 'צריך'), צורך ספציפי, ולעיתים מסגרת זמן או אזור. פוסט שהוא פרסומת, שאלה כללית, או ספאם — הוא לא ליד. המפתח הוא לזהות את הכוונה, לא רק מילת מפתח.",
  },
  {
    q: "למה מילות מפתח לבד לא מספיקות?",
    a: "כי מילת מפתח תופסת גם רעש. 'צילום' יתפוס גם 'מחפש צלם' (ליד) וגם 'מוכר מצלמה' או 'קורס צילום' (לא ליד). בלי הבנת הקשר, אתה מוצף בפוסטים לא רלוונטיים. סינון מבוסס AI מבין את הכוונה מאחורי המילים.",
  },
  {
    q: "איך AI מסנן לידים טוב יותר מבן אדם?",
    a: "AI קורא כל פוסט, מבין את ההקשר והכוונה, ומסנן בשנייה — 24/7, בלי להתעייף ובלי לפספס. הוא מבחין בין 'מחפשת מאפרת לחתונה' (ליד חם) ל'ממליצה על מאפרת מעולה' (לא ליד), משהו שמילת מפתח פשוטה מפספסת.",
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
            <h2>לא כל פוסט הוא ליד</h2>
            <p>
              בכל קבוצת פייסבוק יש המון רעש: פרסומות של עסקים אחרים, ספאם, שאלות כלליות, בדיחות. בתוך
              כל זה מסתתרים הפוסטים היקרים באמת — <strong>אנשים שמחפשים בדיוק את השירות שלך</strong>.
              האתגר הוא לזהות אותם בלי לטבוע בשאר. הנה איך מסננים לידים אמיתיים מהרעש.
            </p>

            <h2>סימני ההיכר של ליד אמיתי</h2>
            <ul>
              <li><strong>בקשה מפורשת:</strong> &quot;מחפש/ת&quot;, &quot;צריך&quot;, &quot;ממליצים על&quot;, &quot;מי יכול&quot;.</li>
              <li><strong>צורך ספציפי:</strong> תיאור ברור של מה שהוא צריך.</li>
              <li><strong>הקשר של קנייה:</strong> אזור, תאריך, תקציב, דחיפות.</li>
            </ul>
            <p>
              לעומת זאת, &quot;ממליצה בחום על צלם מדהים!&quot; היא <em>לא</em> ליד — זו המלצה. וכך גם
              פרסומת, שאלה תיאורטית, או פוסט מכירה.
            </p>

            <h2>למה מילות מפתח לבד לא מספיקות</h2>
            <p>
              רוב האנשים מנסים לסנן לפי מילת מפתח — וזה נכשל. המילה &quot;שיפוץ&quot; תתפוס גם &quot;מחפש
              שיפוצניק&quot; (ליד) וגם &quot;סיימתי שיפוץ, תודה לכולם&quot; (לא ליד) וגם &quot;קורס
              שיפוצים&quot; (לא ליד). מילת מפתח לא מבינה <strong>כוונה</strong> — ולכן היא מציפה אותך
              ברעש, ואתה מבזבז זמן על סינון ידני.
            </p>

            <h2>הדרך הידנית — ולמה היא לא מחזיקה מעמד</h2>
            <p>
              אפשר לסנן ידנית: לקרוא כל פוסט, להבין אם יש כוונת קנייה, למחוק את הרעש. הבעיה: זה גוזל
              שעות ביום, אתה מתעייף, ואתה מפספס פוסטים כשאתה עסוק או ישן. בקנה מידה של עשרות קבוצות —
              זה בלתי אפשרי.
            </p>

            <h2>הפתרון: סינון AI שמבין כוונה</h2>
            <p>
              כאן AI משנה את המשחק. במקום להתאים מילים, מודל AI <strong>קורא ומבין את הכוונה</strong>
              מאחורי כל פוסט — בדיוק כמו בן אדם, אבל בשנייה, 24/7, בלי לפספס. הוא מבחין בין &quot;מחפשת
              מאפרת לאירוע&quot; (ליד חם) ל&quot;ממליצה על מאפרת&quot; (לא ליד), ומעביר אליך רק את
              האמיתיים.
            </p>
            <p>
              בדיוק זה מה ש-{SITE.brand} עושה: סורקת עשרות אלפי קבוצות, מסננת עם AI רק פוסטים עם כוונת
              קנייה אמיתית, ושולחת לך אותם לוואטסאפ — נקי מרעש, מוכן לתגובה. ראה גם{" "}
              <Link href="/guides/hot-vs-cold-leads" className="text-brand-300 underline">
                ליד חם מול ליד קר
              </Link>{" "}
              ו-
              <Link href="/guides/leads-from-facebook" className="text-brand-300 underline">
                לידים מפייסבוק
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
              המפתח ללידים איכותיים מפייסבוק הוא סינון: לזהות בתוך הרעש את הפוסטים עם כוונת קנייה
              אמיתית. מילות מפתח לבד מציפות אותך ברעש; סינון ידני לא מחזיק מעמד. סינון מבוסס AI מבין
              כוונה ומעביר אליך רק לידים אמיתיים. {SITE.brand} עושה את זה אוטומטית:{" "}
              {SITE.pricing.monthlyILS}₪/חודש, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">רק לידים אמיתיים — בלי רעש</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} מסננת עם AI את כל הרעש ושולחת לך רק פוסטים עם כוונת קנייה אמיתית.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני רוצה לקבל רק לידים אמיתיים מפייסבוק")}
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
            related={["leads-from-facebook", "hot-vs-cold-leads", "leads-from-facebook-groups"]}
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
