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

const SLUG = "lead-kpis";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "מהם מדדי הלידים החשובים ביותר?",
    a: "חמשת המדדים הקריטיים: עלות לליד (CPL), שיעור סגירה (Conversion Rate), זמן תגובה, ערך לקוח ממוצע, ו-ROI (החזר על ההשקעה). יחד הם עונים על השאלה האמיתית — האם השגת הלידים שלך רווחית וגדלה.",
  },
  {
    q: "איך מחשבים עלות לליד?",
    a: "עלות לליד = סך ההוצאה על ערוץ (חודשי) חלקי מספר הלידים שהתקבלו ממנו. לדוגמה, מנוי של 299 ₪ שהביא 100 לידים = 2.99 ₪ לליד. השוואה בין ערוצים לפי CPL מגלה מהיכן משתלם להביא לידים.",
  },
  {
    q: "מה שיעור סגירה טוב לעסק קטן?",
    a: "משתנה מאוד לפי תחום, אבל טווח נפוץ הוא 10-30% מהלידים. חשוב פחות המספר המוחלט ויותר המגמה: אם שיפרת מ-15% ל-22%, אתה מרוויח יותר מאותם לידים. שיעור סגירה נמוך מצביע לרוב על איכות ליד נמוכה או טיפול איטי.",
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
            <h2>&quot;יש לי הרבה לידים&quot; זה לא מדד</h2>
            <p>
              כמות לידים לבד לא אומרת כלום. 300 לידים גרועים שווים פחות מ-30 טובים שנסגרים. כדי לדעת אם
              העסק שלך באמת גדל, צריך <strong>למדוד את הדברים הנכונים</strong>. הנה 7 מדדי הלידים
              הקריטיים — עם נוסחה פשוטה לכל אחד, בלי אקסל מסובך.
            </p>

            <h2>1. עלות לליד (CPL)</h2>
            <p>
              <strong>נוסחה:</strong> הוצאה חודשית על ערוץ ÷ מספר לידים. זה המדד להשוואה בין ערוצים —
              מגלה מאיפה משתלם להביא לידים. ליד ממודעה שעולה 80 ₪ מול ליד אורגני שעולה 3 ₪ — הבדל
              דרמטי. ראה{" "}
              <Link href="/guides/lead-cost-facebook-2026" className="text-brand-300 underline">
                כמה עולה ליד מפייסבוק
              </Link>
              .
            </p>

            <h2>2. שיעור סגירה (Conversion Rate)</h2>
            <p>
              <strong>נוסחה:</strong> לקוחות שנסגרו ÷ סך הלידים × 100. זה המדד הרגיש ביותר — שיפור קטן
              בו משנה את כל הכלכלה. אם תעלה מ-15% ל-25%, אתה צריך שני שליש פחות לידים לאותה הכנסה.
            </p>

            <h2>3. זמן תגובה ממוצע</h2>
            <p>
              <strong>נוסחה:</strong> ממוצע הזמן מרגע כניסת הליד עד התגובה הראשונה. ככל שקצר יותר, כך
              שיעור הסגירה גבוה יותר — זה המדד שהכי קל לשפר. ראה{" "}
              <Link href="/guides/speed-to-lead" className="text-brand-300 underline">
                מהירות תגובה לליד
              </Link>
              .
            </p>

            <h2>4. ערך לקוח ממוצע (ACV)</h2>
            <p>
              <strong>נוסחה:</strong> סך ההכנסה ÷ מספר הלקוחות. כמה שווה לקוח בממוצע? זה קובע כמה אתה
              יכול להרשות לעצמך להשקיע בכל ליד. לקוח שחוזר (מנוי, טיפול קבוע) שווה הרבה יותר מעסקה
              חד-פעמית.
            </p>

            <h2>5. החזר על ההשקעה (ROI)</h2>
            <p>
              <strong>נוסחה:</strong> (הכנסה מהלידים − עלות) ÷ עלות × 100. זה מדד-העל — הוא עונה על
              השאלה היחידה שחשובה: האם הערוץ מרוויח. ערוץ עם CPL גבוה אבל ROI חיובי עדיף על ערוץ זול
              שלא סוגר.
            </p>

            <h2>6. שיעור מענה (Response Rate)</h2>
            <p>
              <strong>נוסחה:</strong> לידים שהגיבו לך ÷ לידים שפנית אליהם. מדד לאיכות הפנייה והתזמון —
              אם רבים לא עונים, כנראה אתה מגיב מאוחר או שהמסר לא ממוקד.
            </p>

            <h2>7. מקור הליד (Lead Source)</h2>
            <p>
              לא נוסחה — הרגל. עקוב מאיפה הגיע כל ליד שנסגר (קבוצה, המלצה, מודעה). כך תדע איזה ערוץ
              באמת מביא לקוחות, ותשקיע יותר במה שעובד. ראה{" "}
              <Link href="/guides/lead-sources" className="text-brand-300 underline">
                10 מקורות לידים
              </Link>
              .
            </p>

            <h2>איך מודדים בלי מערכת מסובכת</h2>
            <p>
              לא צריך CRM יקר. טבלה פשוטה (או אפילו פנקס) עם: תאריך, מקור, האם נסגר, וסכום — מספיקה
              לחשב את כל 7 המדדים. {SITE.brand} מקלה על חלק מהמדידה: כל ליד מגיע לוואטסאפ עם מקור ותיוג,
              והתגובה המהירה משפרת אוטומטית את זמן התגובה ושיעור הסגירה. ראה{" "}
              <Link href="/guides/lead-strategy" className="text-brand-300 underline">
                אסטרטגיית לידים
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
              מה שלא מודדים, לא משתפרים. 7 מדדי הלידים — עלות לליד, שיעור סגירה, זמן תגובה, ערך לקוח,
              ROI, שיעור מענה ומקור — נותנים לך תמונה אמיתית של אם העסק גדל, ואיפה לשפר. התחל למדוד
              היום, ולו בטבלה פשוטה. {SITE.brand} עוזרת לשפר את המדדים שהכי קל להזיז — מקור ומהירות:{" "}
              {SITE.pricing.monthlyILS}₪/חודש, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">שפר את המדדים שהכי קל לשפר</h3>
            <p className="mt-2 text-ink-200">
              לידים איכותיים ממקור אורגני + תגובה תוך שניות = עלות לליד נמוכה ושיעור סגירה גבוה.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני רוצה להבין איך למדוד את הלידים שלי")}
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
            related={["lead-strategy", "lead-funnel", "lead-cost-facebook-2026"]}
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
