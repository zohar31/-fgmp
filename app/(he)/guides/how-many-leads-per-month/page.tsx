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

const SLUG = "how-many-leads-per-month";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "כמה לידים צריך עסק קטן בחודש?",
    a: "אין מספר קסם — זה תלוי בשיעור הסגירה שלך, בגודל העסקה הממוצעת וביעד ההכנסה. הנוסחה: לקוחות נדרשים = יעד הכנסה ÷ עסקה ממוצעת; לידים נדרשים = לקוחות נדרשים ÷ שיעור סגירה. לדוגמה, עסק שרוצה 20,000 ₪ בחודש, עם עסקה ממוצעת של 1,000 ₪ ושיעור סגירה של 20%, צריך כ-100 לידים בחודש.",
  },
  {
    q: "עדיף הרבה לידים או לידים איכותיים?",
    a: "לידים איכותיים כמעט תמיד מנצחים. 30 לידים חמים ורלוונטיים יסגרו יותר עסקאות מ-200 לידים קרים — וגם יעלו לך פחות זמן וכסף לטפל בהם. הגדל כמות רק אחרי שווידאת שהאיכות והטיפול טובים.",
  },
  {
    q: "איך מגדילים כמות לידים בלי להגדיל תקציב?",
    a: "הערוץ הזול ביותר הוא לידים אורגניים מקבוצות פייסבוק — אנשים שמחפשים את השירות שלך עכשיו, בלי עלות לקליק. עם מערכת שסורקת ומתריעה אוטומטית אפשר להוסיף עשרות לידים בחודש בעלות חודשית קבועה, בלי תקציב מדיה משתנה.",
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
            <h2>למה &quot;כמה שיותר&quot; היא תשובה גרועה</h2>
            <p>
              הרבה בעלי עסקים חושבים שהמטרה היא כמה שיותר לידים. אבל לידים לא באמת עולים
              &quot;כלום&quot; — כל ליד דורש זמן טיפול, מעקב ואנרגיה. 200 לידים קרים בחודש שאתה לא
              מספיק לטפל בהם גרועים מ-40 לידים חמים שאתה סוגר. השאלה הנכונה היא לא &quot;כמה שיותר&quot;
              אלא <strong>כמה לידים אני צריך כדי להגיע ליעד ההכנסה שלי</strong> — ומשם לכוון.
            </p>

            <h2>הנוסחה: מחשבים אחורה מיעד ההכנסה</h2>
            <p>במקום לנחש, מחשבים אחורה בשלושה צעדים:</p>
            <ol>
              <li>
                <strong>כמה לקוחות אני צריך?</strong> יעד ההכנסה החודשי ÷ גודל העסקה הממוצעת.
              </li>
              <li>
                <strong>כמה לידים לכל לקוח?</strong> חלק את מספר הלקוחות ב<em>שיעור הסגירה</em> שלך
                (כמה מתוך הלידים באמת הופכים ללקוח).
              </li>
              <li>
                <strong>קבע יעד חודשי</strong> — וזה המספר שאליו אתה מכוון, לא &quot;כמה שיותר&quot;.
              </li>
            </ol>

            <h2>דוגמה אמיתית</h2>
            <p>נניח עסק שירותים קטן:</p>
            <ul>
              <li>יעד הכנסה: <strong>20,000 ₪ בחודש</strong></li>
              <li>עסקה ממוצעת: <strong>1,000 ₪</strong></li>
              <li>שיעור סגירה: <strong>20%</strong> (ליד אחד מכל חמישה נסגר)</li>
            </ul>
            <p>
              החישוב: 20,000 ÷ 1,000 = <strong>20 לקוחות</strong> נדרשים. 20 ÷ 20% ={" "}
              <strong>100 לידים בחודש</strong>. זהו — היעד הוא כ-100 לידים, לא &quot;אינסוף&quot;.
              עכשiv אפשר לתכנן ערוצים סביב מספר אמיתי.
            </p>

            <h2>איך איכות הליד משנה את כל החשבון</h2>
            <p>
              שים לב לגורם הרגיש ביותר בנוסחה: <strong>שיעור הסגירה</strong>. אם תעלה אותו מ-20% ל-30%,
              אותם 20 לקוחות דורשים רק ~67 לידים במקום 100 — כלומר שליש פחות לידים לאותה הכנסה. לכן
              איכות ומהירות טיפול שוות יותר מכמות. ליד חם ורלוונטי, שמטופל מהר, נסגר בשיעור גבוה בהרבה
              מליד קר. ראה גם{" "}
              <Link href="/guides/hot-vs-cold-leads" className="text-brand-300 underline">
                ליד חם מול ליד קר
              </Link>{" "}
              ו-
              <Link href="/guides/speed-to-lead" className="text-brand-300 underline">
                מהירות תגובה לליד
              </Link>
              .
            </p>

            <h2>מעט מדי לידים — ומדי הרבה</h2>
            <p>
              <strong>מעט מדי:</strong> לא תגיע ליעד, ותרגיש שהעסק &quot;תקוע&quot;.{" "}
              <strong>יותר מדי (ובאיכות נמוכה):</strong> תשקיע שעות בסינון ובמעקב אחרי אנשים שלא
              יקנו, ותשרוף לידים טובים כי לא הספקת לענות להם בזמן. המספר הנכון הוא זה שאתה{" "}
              <em>מסוגל לטפל בו היטב</em> ושמביא אותך ליעד — לא יותר.
            </p>

            <h2>איך משיגים את מספר הלידים הזה — בעלות שפויה</h2>
            <p>
              אחרי שיש לך יעד (למשל 100 לידים), השאלה היא מאיפה. לידים ממומנים עובדים אבל התקציב
              משתנה וגדל. הערוץ הזול והיציב ביותר הוא <strong>לידים אורגניים מקבוצות פייסבוק</strong> —
              אנשים שמפרסמים <em>עכשיו</em> שהם מחפשים את השירות שלך. במקום לרדוף אחריהם ידנית,{" "}
              {SITE.brand} סורקת עשרות אלפי קבוצות בזמן אמת ושולחת לך כל ליד רלוונטי ישר לוואטסאפ —
              בעלות חודשית קבועה, בלי תקציב מדיה משתנה. ראה גם{" "}
              <Link href="/guides/lead-cost-facebook-2026" className="text-brand-300 underline">
                כמה עולה ליד מפייסבוק
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
              &quot;כמה לידים אני צריך?&quot; היא שאלה עם תשובה מדויקת: מחשבים אחורה מיעד ההכנסה, דרך
              גודל העסקה ושיעור הסגירה. התוצאה נותנת לך יעד חודשי אמיתי לכוון אליו — ומזכירה שהעלאת
              איכות ומהירות שוות יותר מהעלאת כמות. {SITE.brand} עוזרת להשיג את הלידים האלה אוטומטית:{" "}
              {SITE.pricing.monthlyILS}₪/חודש, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">הגע ליעד הלידים שלך — אוטומטית</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} שולחת לך לידים רלוונטיים מקבוצות פייסבוק ישר לוואטסאפ, בעלות חודשית קבועה.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני רוצה להבין כמה לידים מתאימים לעסק שלי")}
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
            related={["lead-cost-facebook-2026", "organic-vs-paid-leads", "hot-vs-cold-leads"]}
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
