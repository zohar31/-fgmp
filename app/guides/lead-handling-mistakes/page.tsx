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

const SLUG = "lead-handling-mistakes";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "למה אני מקבל לידים אבל לא סוגר עסקאות?",
    a: "ברוב המקרים הבעיה היא לא הלידים אלא הטיפול בהם: תגובה איטית (השעה הראשונה קריטית), זריקת מחיר מוקדם מדי, היעדר מעקב אחרי מי שלא ענה, או הודעה ראשונה שלא בונה אמון. תיקון של 2-3 מהטעויות האלה מעלה שיעור סגירה משמעותית.",
  },
  {
    q: "כמה מהר צריך לענות לליד?",
    a: "כמה שיותר מהר — אידיאלית תוך 5 דקות. שיעור הסגירה צונח דרמטית כבר אחרי השעה הראשונה. בלידים מקבוצות פייסבוק זה קריטי במיוחד, כי מי שעונה ראשון לרוב זוכה בלקוח.",
  },
  {
    q: "כמה פעמים כדאי לעקוב אחרי ליד שלא ענה?",
    a: "לפחות 3-4 פעמים, פרוסות על מספר ימים. כ-60% מהעסקאות נסגרות בפנייה השנייה או השלישית, אבל רוב העסקים שולחים הודעה אחת ומוותרים. מעקב מנומס (לא נודניק) הוא ההבדל בין ליד שאבד לעסקה.",
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
            <p>
              הנה אמת לא נעימה: רוב העסקים שמתלוננים על "אין לקוחות" לא סובלים ממחסור בלידים — אלא
              מ<strong>טיפול גרוע בלידים שכבר יש להם</strong>. ליד הוא נכס שמתכלה בזמן: כל דקה שעוברת,
              כל הודעה לא מנוסחת נכון, וכל מעקב שלא נעשה — שווים כסף שיורד לפח. הנה 9 הטעויות שעולות לך
              הכי הרבה לקוחות, מסודרות מהקטלנית ביותר.
            </p>

            <h2>1. תגובה איטית מדי</h2>
            <p>
              זו הרוצחת מספר אחת. שיעור הסגירה צונח דרמטית כבר אחרי השעה הראשונה — ובלידים חמים מקבוצות
              פייסבוק, מי שעונה <em>ראשון</em> לרוב זוכה. אם אתה עונה אחרי 3 שעות, ברוב המקרים מישהו אחר
              כבר סגר. <strong>התיקון:</strong> התראה מיידית על כל ליד + מטרה לענות תוך 5 דקות. הרחבנו
              על זה ב{" "}
              <Link href="/guides/speed-to-lead" className="text-brand-300 underline">
                מהירות תגובה לליד
              </Link>
              .
            </p>

            <h2>2. זריקת מחיר בהודעה הראשונה</h2>
            <p>
              "כמה זה עולה?" — ואתה זורק מספר. טעות. בלי להבין את הצורך, המחיר תמיד נשמע גבוה. מי שמקבל
              מחיר במשפט אחד משווה אותך לזול ביותר ונעלם. <strong>התיקון:</strong> קודם שאלה אחת
              ממוקדת ("תוכל לתאר לי בקצרה מה בדיוק צריך?"), אחר כך הצעה מותאמת.
            </p>

            <h2>3. אפס מעקב אחרי מי שלא ענה</h2>
            <p>
              60% מהעסקאות נסגרות בפנייה השנייה או השלישית — אבל רוב העסקים שולחים הודעה אחת ומוותרים.
              ליד שלא ענה הוא לא "לא". הוא "לא עכשיו". <strong>התיקון:</strong> מערכת מעקב פשוטה — פנייה
              שנייה אחרי 24 שעות, שלישית אחרי 3 ימים. ראה{" "}
              <Link href="/guides/follow-up-cold-leads" className="text-brand-300 underline">
                איך עוקבים אחרי ליד שלא ענה
              </Link>
              .
            </p>

            <h2>4. הודעה ראשונה גנרית</h2>
            <p>
              "היי, ראיתי שאתה מחפש. אפשר לעזור?" — חלש. לא בונה אמון, לא מבדל אותך מ-5 אחרים שכתבו אותו
              דבר. <strong>התיקון:</strong> שם + עיסוק + ערך מיידי + שאלה אחת. למשל: "היי, אני דני,
              שיפוצניק מפתח תקווה. מהתיאור שלך זה נשמע כמו תיקון נקודתי — תוכל לשלוח תמונה? אגיד לך מיד אם
              זה מה שחשבתי."
            </p>

            <h2>5. אין מקום מסודר לנהל לידים</h2>
            <p>
              לידים שמפוזרים בין הודעות וואטסאפ, פתקים, וזיכרון — נשכחים. אתה לא יודע למי ענית, מי מחכה
              לתשובה, ומי כבר סגר. <strong>התיקון:</strong> שיטת ניהול פשוטה (אפילו תוויות בוואטסאפ
              Business). ראה{" "}
              <Link href="/guides/manage-leads-whatsapp" className="text-brand-300 underline">
                איך לנהל לידים בוואטסאפ
              </Link>
              .
            </p>

            <h2>6. לא עוברים לערוץ אישי מספיק מהר</h2>
            <p>
              להישאר בתגובות הפומביות בפייסבוק זה להילחם על תשומת הלב מול כל המתחרים שמגיבים גם.
              <strong> התיקון:</strong> תגובה קצרה שמוסיפה ערך בפוסט, ומיד "שלחתי לך הודעה פרטית" /
              "כתוב לי לוואטסאפ" — והמשך השיחה בערוץ אישי ושקט.
            </p>

            <h2>7. מתייחסים לכל הלידים אותו דבר</h2>
            <p>
              ליד "צריך מנעולן דחוף עכשיו" וליד "אולי בעתיד אשפץ" דורשים טיפול שונה לגמרי. ערבוב ביניהם
              גורם לך לבזבז אנרגיה על קרים ולהזניח חמים. <strong>התיקון:</strong> תעדף לפי דחיפות —
              קודם החמים, מיד.
            </p>

            <h2>8. מבטיחים יותר מדי בהתחלה</h2>
            <p>
              כדי לסגור מהר, קל ליפול לפיתוי להבטיח מחיר נמוך מדי או זמן אספקה לא ריאלי. זה חוזר כבומרנג:
              לקוח מאוכזב, ביקורת שלילית. <strong>התיקון:</strong> תבטיח מה שאתה יכול לקיים, ותעמוד בזה.
              אמינות סוגרת יותר מהבטחות.
            </p>

            <h2>9. לא מבקשים את העסקה</h2>
            <p>
              שיחה נחמדה, הסבר יפה — ואז שתיקה, כי לא ביקשת לסגור. הרבה עסקאות "נופלות בין הכיסאות" כי
              אף אחד לא הציע צעד הבא קונקרטי. <strong>התיקון:</strong> תמיד סיים בקריאה לפעולה ברורה:
              "אפשר לקבוע ליום שלישי ב-10?" / "אשלח לך הצעה היום, מתאים?"
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
              שלוש מתוך תשע הטעויות האלה כנראה קורות אצלך עכשיו — והן עולות לך בלקוחות בלי שתדע. החדשות
              הטובות: כולן ניתנות לתיקון בלי להוציא שקל נוסף על לידים. תתחיל מהמהירות (מספר 1) ומהמעקב
              (מספר 3) — שם נמצא הרווח הכי גדול. וכשתרצה שהלידים <em>עצמם</em> יגיעו אליך מהר ומסוננים,
              {SITE.brand} עושה את זה אוטומטית — {SITE.pricing.monthlyILS}₪/חודש, ערבות החזר מלא{" "}
              {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">תפסיק לאבד לידים</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} שולחת לך כל ליד רלוונטי לוואטסאפ תוך שניות — כך שתענה ראשון, בכל פעם.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, קראתי על הטעויות בטיפול בלידים ויש לי שאלה")}
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
            related={["speed-to-lead", "follow-up-cold-leads", "manage-leads-whatsapp"]}
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
