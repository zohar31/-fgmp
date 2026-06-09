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

const SLUG = "manage-leads-whatsapp";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "איך מנהלים לידים בוואטסאפ בלי לאבד אותם?",
    a: "השיטה הכי פשוטה היא WhatsApp Business עם תוויות (Labels): צור תוויות כמו 'ליד חדש', 'ממתין לתשובה', 'נסגר'. כל ליד מקבל תווית, וכך אתה רואה תמיד מי מחכה לך. הוסף תבניות הודעות (Quick Replies) לתגובה מהירה. לרוב העסקים הקטנים זה מספיק — בלי CRM יקר.",
  },
  {
    q: "האם צריך CRM כדי לנהל לידים?",
    a: "לא בהכרח. עסק קטן עם עד כמה עשרות לידים בחודש מסתדר מצוין עם WhatsApp Business + תוויות + טבלה פשוטה. CRM הופך משתלם כשיש כמה אנשי מכירות, מאות לידים בחודש, או צורך בדוחות ומעקב מורכב.",
  },
  {
    q: "מה ההבדל בין וואטסאפ רגיל ל-WhatsApp Business?",
    a: "WhatsApp Business (אפליקציה חינמית נפרדת) מוסיפה כלים עסקיים: תוויות לסידור לקוחות, תבניות הודעות, הודעת פתיחה אוטומטית, פרופיל עסקי עם שעות פעילות וקטלוג. לניהול לידים זה הבדל משמעותי לעומת הוואטסאפ הרגיל.",
  },
  {
    q: "איך לא לשכוח לעקוב אחרי ליד בוואטסאפ?",
    a: "השתמש בתווית 'ממתין לתשובה' לכל מי שלא ענה, ועבור עליה פעם ביום. בנוסף אפשר לסמן צ'אט ככוכב או להשתמש ב'הזכר לי' (תזכורת). הכלל: אף ליד לא יוצא מהרשימה עד שנסגר או שסירב במפורש.",
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
              בישראל, וואטסאפ הוא ערוץ המכירה. 76% מהלקוחות מעדיפים לתקשר עם עסק שם, ורוב הלידים — בין
              אם מפרסום ובין אם מקבוצות פייסבוק — מגיעים בסוף לוואטסאפ. אבל בלי שיטה, וואטסאפ הופך
              לערימה כאוטית של צ'אטים: אתה לא זוכר למי ענית, מי מחכה, ומי כבר סגר. הנה איך לנהל לידים
              בוואטסאפ בצורה מסודרת — מהשיטה הפשוטה ביותר ועד השאלה מתי באמת צריך CRM.
            </p>

            <h2>שלב 1: עבור ל-WhatsApp Business (חינם)</h2>
            <p>
              אם אתה עדיין על וואטסאפ רגיל לעסק — זו הטעות הראשונה לתקן. <strong>WhatsApp Business</strong>{" "}
              היא אפליקציה חינמית נפרדת שמוסיפה בדיוק את הכלים שצריך לניהול לידים:
            </p>
            <ul>
              <li><strong>תוויות (Labels)</strong> — לסווג צ'אטים לפי סטטוס. הכלי החשוב ביותר.</li>
              <li><strong>תבניות הודעות (Quick Replies)</strong> — תשובות מוכנות בקיצור מקלדת.</li>
              <li><strong>הודעת פתיחה / היעדרות אוטומטית</strong> — מגיב מיד גם כשאתה עסוק.</li>
              <li><strong>פרופיל עסקי</strong> — שם, תחום, שעות, קישור לאתר, קטלוג.</li>
            </ul>

            <h2>שלב 2: בנה מערכת תוויות פשוטה</h2>
            <p>
              זה הלב של ניהול לידים בוואטסאפ. צור 4-5 תוויות שמייצגות את שלבי המסע של הליד:
            </p>
            <ol>
              <li><strong>🆕 ליד חדש</strong> — הרגע נכנס, עוד לא טיפלת.</li>
              <li><strong>⏳ ממתין לתשובה</strong> — ענית, מחכה שהוא יחזור.</li>
              <li><strong>📞 בתהליך</strong> — שיחה פעילה, הצעה על השולחן.</li>
              <li><strong>✅ נסגר</strong> — הפך ללקוח.</li>
              <li><strong>❌ לא רלוונטי</strong> — סירב או לא מתאים.</li>
            </ol>
            <p>
              עכשיו כל ליד שנכנס מקבל תווית, וכל בוקר אתה עובר על "ממתין לתשובה" ו"בתהליך" — וכך אף ליד
              לא נופל בין הכיסאות. זה הפתרון לטעות שתיארנו ב{" "}
              <Link href="/guides/lead-handling-mistakes" className="text-brand-300 underline">
                9 טעויות שהורגות לידים
              </Link>
              .
            </p>

            <h2>שלב 3: הכן תבניות הודעות</h2>
            <p>
              מהירות מנצחת (ראה{" "}
              <Link href="/guides/speed-to-lead" className="text-brand-300 underline">
                מהירות תגובה לליד
              </Link>
              ), ותבניות מאפשרות לענות תוך שניות בלי לאבד אישיות. הכן 3-4 תבניות:
            </p>
            <ul>
              <li><strong>פתיחה</strong> — הצגה עצמית + שאלה ממקדת.</li>
              <li><strong>מענה למחיר</strong> — איך לבקש פרטים לפני שמוסרים מחיר.</li>
              <li><strong>מעקב 1</strong> — תזכורת מנומסת אחרי 24 שעות.</li>
              <li><strong>מעקב 2</strong> — תזכורת אחרונה אחרי כמה ימים.</li>
            </ul>
            <p>טיפ: התאם אישית כל תבנית בשם הלקוח לפני שליחה — זה מכפיל את שיעור התגובה.</p>

            <h2>שלב 4: שגרת מעקב יומית</h2>
            <p>
              הקדש 10 דקות בבוקר ו-10 בערב: עבור על תווית "ממתין לתשובה", שלח מעקב למי שלא חזר אליך
              במשך 24 שעות, ועדכן תוויות. 60% מהעסקאות נסגרות בפנייה השנייה או השלישית — השגרה הזו שווה
              כסף אמיתי. למבנה מעקב מלא ראה{" "}
              <Link href="/guides/follow-up-cold-leads" className="text-brand-300 underline">
                איך עוקבים אחרי ליד שלא ענה
              </Link>
              .
            </p>

            <h2>מתי באמת צריך CRM?</h2>
            <p>
              CRM (מערכת לניהול קשרי לקוחות) הוא כלי מצוין — אבל לא לכל אחד, ולא מההתחלה. הנה הכלל:
            </p>
            <table>
              <thead>
                <tr>
                  <th>המצב שלך</th>
                  <th>מה צריך</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>עד ~30 לידים בחודש, איש אחד</td><td>WhatsApp Business + תוויות. זהו.</td></tr>
                <tr><td>עשרות-מאות לידים, צריך דוחות</td><td>CRM קל (כמו monday / Pipedrive)</td></tr>
                <tr><td>צוות מכירות, חלוקת לידים</td><td>CRM מלא + אינטגרציית וואטסאפ</td></tr>
              </tbody>
            </table>
            <p>
              אל תקנה CRM יקר "כי ככה עושים". רוב העסקים הקטנים בישראל מנהלים מצוין עם וואטסאפ Business
              ותוויות. שדרג רק כשאתה <em>מרגיש</em> שהשיטה הפשוטה לא מספיקה.
            </p>

            <h2>השלב שלפני הכל: שהלידים בכלל יגיעו</h2>
            <p>
              כל מערכת ניהול שווה רק אם יש מה לנהל. {SITE.brand} דואגת לצד הזה: סורקת 50,000+ קבוצות
              פייסבוק, מזהה אנשים שמחפשים את השירות שלך, ושולחת אותם <em>ישירות לוואטסאפ</em> שלך עם
              קישור לפוסט ותגובה מוצעת. הליד נוחת אצלך מוכן לטיפול — אתה רק נותן לו תווית ועונה.
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
              ניהול לידים בוואטסאפ לא דורש כלים יקרים — דורש שיטה: WhatsApp Business, מערכת תוויות
              פשוטה, כמה תבניות, ושגרת מעקב יומית. זה מספיק לרוב המוחלט של העסקים הקטנים בישראל. וכשתרצה
              שהוואטסאפ יתמלא בלידים חמים אוטומטית — {SITE.brand} שולחת לך אותם ישירות,
              {SITE.pricing.monthlyILS}₪/חודש, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">קבל לידים ישר לוואטסאפ</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} סורקת קבוצות פייסבוק 24/7 ושולחת כל ליד רלוונטי לוואטסאפ שלך — מוכן לטיפול.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, קראתי את המדריך על ניהול לידים בוואטסאפ ויש לי שאלה")}
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
            related={["lead-handling-mistakes", "follow-up-cold-leads", "speed-to-lead"]}
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
