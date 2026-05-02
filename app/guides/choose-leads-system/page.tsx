import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { getGuide } from "@/lib/guides";
import { SITE } from "@/lib/config";

const SLUG = "choose-leads-system";
const guide = getGuide(SLUG)!;

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
};

export default function ChooseSystemGuide() {
  return (
    <>
      <JsonLd data={articleSchema} />
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
                {new Date(guide.updatedAt).toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </div>
            <p className="mt-6 text-xl leading-9 text-ink-200">{guide.excerpt}</p>
          </header>

          <div className="prose prose-invert prose-lg mt-12 max-w-none">
            <p>
              <em>גילוי נאות: FGMP היא אחת המערכות בשוק. המדריך הזה נועד להגן עליך מבחירה גרועה —
              גם אם תבחר מערכת אחרת.</em>
            </p>

            <h2>למה כל המערכות נראות אותו דבר באתר</h2>
            <p>
              כל ספק טוען: "AI", "לידים חמים", "הכי מהיר", "מאות לקוחות". זה לא משנה אם זה מערכת חזקה
              או PowerPoint עם API. כדי להבחין — צריך לשאול את השאלות הנכונות.
            </p>

            <h2>9 הקריטריונים שבאמת קובעים</h2>

            <h3>1. כמה קבוצות סורקים — וחשוב יותר, אילו?</h3>
            <p>
              "אלפי קבוצות" זה חסר משמעות. שאל: <strong>"כמה מהקבוצות החזקות בתחום שלי אתם
              מכסים?"</strong> אם הספק לא יודע לענות תוך 10 שניות — אתה משלם על דאטה לא רלוונטית.
            </p>
            <p>
              ב-FGMP: 50,000+ קבוצות פעילות בישראל, כיסוי מלא של הקבוצות החזקות ב-50+ תחומים.
              אנחנו יודעים בדיוק אילו קבוצות מכסים בתחום שלך עוד לפני שאתה נרשם.
            </p>

            <h3>2. כמה זמן עובר מפוסט עד שאתה רואה את הליד?</h3>
            <p>
              קריטי. ליד שמגיע 4 שעות אחרי הפוסט = ליד מת. 5 דקות = זהב. שאל:
              <strong> "מה ה-latency הממוצע שלכם?"</strong>. תשובה איכותית: פחות מדקה. תשובה חלשה:
              "תוך מספר דקות".
            </p>

            <h3>3. סינון AI אמיתי או רק התאמת מילים?</h3>
            <p>
              "מילות מפתח" יחד עם "התאמה" = שום AI. AI אמיתי מבין הקשר: <em>"מי ממליץ על שיפוצניק
              זול?"</em> ו-<em>"שלום, אני שיפוצניק, מחפש עבודות"</em> — אותן מילים, משמעות הפוכה. רק
              AI מבחין. שאל לקבל דוגמאות אמיתיות לסינון מוצלח/כושל.
            </p>

            <h3>4. איך הליד מגיע אליך?</h3>
            <p>
              <strong>וואטסאפ ישיר</strong> — הכי טוב, הכי מהיר. <strong>טלגרם</strong> — טוב, פחות
              נפוץ אצל לקוחות. <strong>אימייל</strong> — סופי, איטי, ליד יקבר ב-Spam. <strong>אפליקציה
              ייעודית</strong> — אוטומטית מנותקת מהזרימה היומית. הימנע.
            </p>

            <h3>5. אופציה לבטל בלחיצה?</h3>
            <p>
              שאל: <strong>"אם ארצה לבטל היום — מה אני עושה?"</strong>. תשובות אדומות:
            </p>
            <ul>
              <li>"צריך לדבר עם נציג שירות" — נעילה.</li>
              <li>"חוזה ל-12 חודשים" — נעילה.</li>
              <li>"החזר רק בסוף החודש" — בעיה.</li>
            </ul>
            <p>תשובה ירוקה: "מהאזור האישי או בוואטסאפ, מיידי, ללא שאלות".</p>

            <h3>6. ניסיון חינם <em>אמיתי</em>?</h3>
            <p>
              "ניסיון בחינם" עם דרישה לכרטיס אשראי = פח. רוב הלקוחות שוכחים לבטל ומשלמים. ניסיון אמיתי
              = ללא כרטיס. ב-FGMP: {SITE.pricing.trialDays} ימים מלאים, ללא כרטיס אשראי, פעיל מהשנייה
              הראשונה.
            </p>

            <h3>7. האם הם מצליחים לתת תשובות לתחום הספציפי שלך?</h3>
            <p>
              שאל: <strong>"איך תזהו ליד למקצוע שלי?"</strong>. אם הם משיבים תשובה גנרית ("מילות מפתח
              שלך"), זה לא טוב. תשובה איכותית: דוגמאות ספציפיות + אופן הסינון + רשימת מילות שלילה.
            </p>

            <h3>8. שקיפות מספרים</h3>
            <p>
              ספק טוב ייתן לך נתונים אמיתיים מלקוחות פעילים בתחום שלך: כמה לידים בחודש בממוצע, שיעור
              המרה ממוצע, ROI טיפוסי. אם הם מתחמקים — סימן רע.
            </p>

            <h3>9. מי בעל המערכת?</h3>
            <p>
              חברה ישראלית? בעלים מזוהה בשם? או חברה אנונימית בחו"ל? במקרה של בעיה — כמה זמן יעבור עד
              שיענו? FGMP בבעלות צח אור, פעיל בישראל, וואטסאפ ישיר לתמיכה.
            </p>

            <h2>3 דגלים אדומים שצריכים להריץ אותך החוצה</h2>
            <ol>
              <li>
                <AlertTriangle className="inline h-5 w-5 text-amber-400" />{" "}
                <strong>"אנחנו מבטיחים X לידים בחודש".</strong> אף ספק לגיטימי לא מבטיח כמות. כמות
                לידים תלויה בתחום ובאזור — לא בספק.
              </li>
              <li>
                <AlertTriangle className="inline h-5 w-5 text-amber-400" />{" "}
                <strong>"חוזה שנתי במחיר מוזל".</strong> נעילה. ספק שבטוח באיכות מאפשר ביטול חודשי.
              </li>
              <li>
                <AlertTriangle className="inline h-5 w-5 text-amber-400" />{" "}
                <strong>אין סקירת שירות זמינה / סיפורי לקוחות.</strong> ספק בלי social proof =
                מסוכן. תבדוק אם הם מציגים שמות אמיתיים, צילומי מסך אמיתיים, ודוגמאות קונקרטיות.
              </li>
            </ol>

            <h2>טבלת השוואה — מה לעשות לפני שאתה משלם</h2>
            <p>
              לכל מערכת שאתה שוקל, ענה (כן/לא):
            </p>
            <ol>
              <li>50,000+ קבוצות פעילות בישראל מכוסות?</li>
              <li>Latency פחות מדקה מהפוסט עד הליד?</li>
              <li>סינון AI שמבין הקשר (לא רק מילים)?</li>
              <li>וואטסאפ או טלגרם ישיר (לא אימייל/אפליקציה ייעודית)?</li>
              <li>ביטול בלחיצה, ללא שאלות?</li>
              <li>ניסיון חינם ללא כרטיס אשראי?</li>
              <li>תשובה ספציפית לתחום שלך לפני שאתה נרשם?</li>
              <li>נתונים אמיתיים מלקוחות בתחום שלך?</li>
              <li>בעלים מזוהה / חברה ישראלית?</li>
            </ol>
            <p>
              <strong>9 כן = ספק איכותי.</strong> 7-8 = שווה ניסיון. 6 ומטה = חפש אחר.
            </p>

            <h2>למה אנחנו ממליצים שתבדוק אותנו</h2>
            <p>
              FGMP עומד ב-9 הקריטריונים. אבל אל תאמין לנו — תנסה. {SITE.pricing.trialDays} ימי ניסיון
              חינם, ללא כרטיס אשראי, ביטול בלחיצה. אתה לא מסתכן בכלום.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">
              בדיקה אובייקטיבית = ניסיון חינם.
            </h3>
            <p className="mt-2 text-ink-200">
              {SITE.pricing.trialDays} ימים מלאים. ללא כרטיס אשראי. תקבל לידים אמיתיים, תשפוט בעצמך.
            </p>
            <div className="mt-6">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו ניסיון חינם
              </Link>
            </div>
          </div>

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
