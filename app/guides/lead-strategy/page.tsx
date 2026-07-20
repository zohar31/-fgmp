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

const SLUG = "lead-strategy";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "מה זה אסטרטגיית לידים?",
    a: "אסטרטגיית לידים היא תוכנית מסודרת להשגת לקוחות חדשים: הגדרת יעד כמותי, בחירת ערוצי לידים, קביעת תהליך תגובה ומעקב, ומדידת התוצאות. זה ההפך מ'לחפש עוד לידים' באופן אקראי — זו מערכת שחוזרת על עצמה ומשתפרת.",
  },
  {
    q: "מאיפה מתחילים לבנות אסטרטגיית לידים?",
    a: "מהיעד. קודם מחשבים כמה לקוחות צריך כדי להגיע ליעד ההכנסה, ומשם כמה לידים — ורק אז בוחרים ערוצים ובונים תהליך. עסק שמתחיל מ'איזה ערוץ הכי טוב' במקום מהיעד — לרוב מבזבז תקציב.",
  },
  {
    q: "כמה זמן לוקח לראות תוצאות מאסטרטגיית לידים?",
    a: "ערוצים אורגניים (קבוצות פייסבוק, המלצות) מתחילים להביא לידים תוך ימים, אבל בניית מערכת יציבה ומדידה לוקחת 4-8 שבועות. הסוד הוא עקביות ומדידה — לא לזנוח אחרי שבוע.",
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
            <h2>למה &quot;עוד לידים&quot; זו לא אסטרטגיה</h2>
            <p>
              רוב בעלי העסקים אומרים &quot;אני צריך עוד לידים&quot; — אבל זו לא אסטרטגיה, זו משאלה.{" "}
              <strong>אסטרטגיית לידים היא מערכת</strong>: יעד ברור, ערוצים נכונים, תהליך תגובה, ומדידה
              שמשתפרת. עסק בלי אסטרטגיה זורק כסף על ערוץ אקראי, לא עוקב, ומתפלא שזה לא עובד. הנה מסגרת 5
              השלבים לבנות מכונת לידים אמיתית.
            </p>

            <h2>שלב 1 — הגדר יעד כמותי</h2>
            <p>
              התחל מהסוף: כמה לקוחות אתה צריך החודש כדי להגיע ליעד ההכנסה? חלק את זה בשיעור הסגירה שלך —
              וקיבלת כמה לידים אתה צריך. בלי מספר, אתה לא יכול לדעת אם אתה מצליח. ראה{" "}
              <Link href="/guides/how-many-leads-per-month" className="text-brand-300 underline">
                כמה לידים צריך עסק בחודש
              </Link>
              .
            </p>

            <h2>שלב 2 — בחר ערוצים (לא את כולם)</h2>
            <p>
              אל תנסה להיות בכל מקום. בחר 1-2 ערוצים שמתאימים לעסק שלך: לרוב עסק קטן, בסיס אורגני
              יציב (קבוצות פייסבוק, המלצות, גוגל עסקי) עם שכבת ממומן לפי הצורך. ראה{" "}
              <Link href="/guides/lead-sources" className="text-brand-300 underline">
                10 מקורות לידים
              </Link>{" "}
              ו-
              <Link href="/guides/organic-vs-paid-leads" className="text-brand-300 underline">
                אורגני מול ממומן
              </Link>
              .
            </p>

            <h2>שלב 3 — בנה תהליך תגובה מהיר</h2>
            <p>
              ליד שלא עונים לו מהר — מת. הגדר תהליך: איך ומתי אתה מגיב, מה אתה שואל, איך מעבירים
              לוואטסאפ. מהירות התגובה היא הגורם היחיד שנמצא ב-100% בשליטתך. ראה{" "}
              <Link href="/guides/speed-to-lead" className="text-brand-300 underline">
                מהירות תגובה לליד
              </Link>
              .
            </p>

            <h2>שלב 4 — עקוב ואל תוותר</h2>
            <p>
              60% מהעסקאות נסגרות בפולואפ, לא בפנייה הראשונה. בנה תהליך מעקב אחרי לידים שלא ענו. ראה{" "}
              <Link href="/guides/follow-up-cold-leads" className="text-brand-300 underline">
                איך עוקבים אחרי ליד שלא ענה
              </Link>
              .
            </p>

            <h2>שלב 5 — מדוד ושפר</h2>
            <p>
              מה שלא מודדים, לא משתפרים. עקוב אחרי עלות לליד, שיעור סגירה, וזמן תגובה — ושפר את החוליה
              החלשה. ראה{" "}
              <Link href="/guides/lead-kpis" className="text-brand-300 underline">
                7 מדדי הלידים
              </Link>{" "}
              ו-
              <Link href="/guides/lead-funnel" className="text-brand-300 underline">
                משפך לידים
              </Link>
              .
            </p>

            <h2>איך אוטומציה מייעלת את כל האסטרטגיה</h2>
            <p>
              המכשול הגדול ביישום אסטרטגיה הוא עקביות — קשה לסרוק קבוצות, להגיב מהר, ולעקוב, יום אחרי
              יום. {SITE.brand} מאוטמת את שלבי 2-3: סורקת עשרות אלפי קבוצות פייסבוק, מזהה לידים ב-AI,
              ושולחת אותם לוואטסאפ תוך שניות עם תגובה מוצעת. זה הופך את האסטרטגיה מ&quot;כוונה&quot;
              ל&quot;מערכת שרצה מעצמה&quot;. ראה{" "}
              <Link href="/guides/lead-automation" className="text-brand-300 underline">
                אוטומציית לידים
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
              אסטרטגיית לידים היא לא &quot;עוד לידים&quot; — היא מערכת של 5 שלבים: יעד, ערוצים, תגובה
              מהירה, מעקב, ומדידה. עסק שבונה אותה נכון מפסיק לרדוף אחרי לקוחות ומתחיל לקבל אותם בזרם
              קבוע. {SITE.brand} מאוטמת את החלק הקשה: {SITE.pricing.monthlyILS}₪/חודש, ערבות החזר מלא{" "}
              {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">הפוך את האסטרטגיה למערכת שרצה לבד</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} סורקת, מזהה ושולחת לידים לוואטסאפ — אתה רק מגיב וסוגר.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני רוצה לבנות אסטרטגיית לידים לעסק שלי")}
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
            related={["lead-funnel", "lead-kpis", "how-many-leads-per-month"]}
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
