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

const SLUG = "leads-for-service-businesses";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "איך משיגים לידים לבעל מקצוע?",
    a: "מקורות הלידים הטובים ביותר לבעלי מקצוע הם קבוצות פייסבוק מקומיות (אנשים שמחפשים שירות באזור), המלצות מלקוחות, וגוגל עסקי. הליד הכי חם הוא פוסט של מישהו שמחפש בדיוק את השירות שלך באזור שלך — והמפתח הוא להיות הראשון שמגיב.",
  },
  {
    q: "כמה לידים צריך בעל מקצוע?",
    a: "בעל מקצוע לרוב לא צריך נפח גדול — צריך לידים נכונים מהאזור שלו. גם 10-20 לידים איכותיים ורלוונטיים בחודש יכולים למלא יומן, כי שיעור הסגירה של ליד מקומי חם גבוה.",
  },
  {
    q: "למה מהירות תגובה כל כך קריטית לבעל מקצוע?",
    a: "כי כשמישהו כותב בקבוצה 'מחפש מנעולן/שיפוצניק דחוף', הוא פונה לכמה בעלי מקצוע בו-זמנית ובוחר את מי שהגיב ראשון וזמין. בתחום השירות, הראשון שמגיב לרוב סוגר — עוד לפני שהמתחרים ראו את הפוסט.",
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
            <h2>לבעל מקצוע יש צורך שונה בלידים</h2>
            <p>
              שיפוצניק, מנעולן, מאפרת, צלם, מוביל, קבלן, מדביר — לכולם משותף אותו דבר: הם{" "}
              <strong>נותני שירות מקומיים</strong>, ולכן הם לא צריכים אלפי לידים. הם צריכים את הלידים
              <em>הנכונים</em>: מהאזור שלהם, בזמן, ולשירות שהם באמת נותנים. ליד אחד רלוונטי מהשכונה שווה
              יותר ממאה לידים כלליים.
            </p>

            <h2>מאיפה מגיעים הלידים הכי טובים בתחום השירות</h2>
            <ul>
              <li>
                <strong>קבוצות פייסבוק מקומיות.</strong> &quot;מחפשים המלצה למנעולן בפתח תקווה&quot; —
                זה ליד חם, מקומי, עם כוונת קנייה מיידית. המקור מספר אחת לבעלי מקצוע.
              </li>
              <li>
                <strong>המלצות מלקוחות.</strong> בתחום השירות, מוניטין מקומי הוא הכל. לקוח מרוצה = כמה
                לידים.
              </li>
              <li>
                <strong>גוגל עסקי.</strong> מי שמחפש &quot;שיפוצניק לידי&quot; בגוגל — מוצא אותך לפי
                מיקום וביקורות.
              </li>
            </ul>
            <p>
              להעמקה על כל המקורות, ראה{" "}
              <Link href="/guides/lead-sources" className="text-brand-300 underline">
                10 מקורות לידים לעסק קטן
              </Link>
              .
            </p>

            <h2>למה מהירות היא הכל בתחום השירות</h2>
            <p>
              כשמישהו כותב &quot;צריך מנעולן דחוף&quot;, הוא לא מחכה. הוא פונה לכמה, ובוחר את הראשון
              שהגיב וזמין. בתחום השירות, <strong>הראשון שמגיב לרוב סוגר</strong> — לא הזול ולא הטוב
              ביותר. אם ראית את הפוסט אחרי שעתיים, כבר מישהו אחר בדרך. ראה{" "}
              <Link href="/guides/speed-to-lead" className="text-brand-300 underline">
                מהירות תגובה לליד
              </Link>
              .
            </p>

            <h2>הבעיה: אתה בעבודה, לא בפייסבוק</h2>
            <p>
              זה הקאץ&apos; של כל בעל מקצוע: כשאתה עובד — אתה לא ליד פייסבוק. וכשאתה פנוי לבדוק, הלידים
              כבר קרים. אי אפשר גם לעבוד וגם לשבת ולסרוק קבוצות כל היום. הפער הזה הוא איפה שרוב הלידים
              של בעלי מקצוע הולכים לאיבוד.
            </p>

            <h2>הפתרון: שהלידים יבואו אליך</h2>
            <p>
              במקום לרדוף אחרי לידים, תן להם להגיע אליך אוטומטית. {SITE.brand} סורקת עשרות אלפי קבוצות
              פייסבוק בישראל בזמן אמת, מזהה עם AI רק פוסטים שמחפשים <em>בדיוק את השירות שלך באזור
              שלך</em>, ושולחת לך אותם לוואטסאפ תוך שניות — עם קישור לפוסט ותגובה מוצעת. אתה ממשיך לעבוד,
              והלידים החמים מגיעים אליך. גם ניהול הלידים פשוט: ראה{" "}
              <Link href="/guides/manage-leads-whatsapp" className="text-brand-300 underline">
                איך לנהל לידים בוואטסאפ
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
              בעל מקצוע לא צריך יותר לידים — הוא צריך את הלידים הנכונים, מהאזור שלו, ולהגיב להם ראשון.
              המקור החזק ביותר הוא קבוצות פייסבוק מקומיות, והמפתח הוא מהירות. {SITE.brand} דואגת
              שתקבל בדיוק את הלידים הרלוונטיים לוואטסאפ ותהיה הראשון שמגיב:{" "}
              {SITE.pricing.monthlyILS}₪/חודש, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">לידים לבעל מקצוע — ישר לוואטסאפ</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} שולחת לך רק לידים רלוונטיים מהאזור והתחום שלך, בזמן אמת. אתה רק מגיב.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני בעל מקצוע ורוצה לקבל לידים מהאזור שלי")}
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
            related={["leads-from-facebook-groups", "speed-to-lead", "lead-sources"]}
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
