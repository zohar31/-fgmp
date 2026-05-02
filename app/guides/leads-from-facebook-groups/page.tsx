import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { getGuide } from "@/lib/guides";
import { SITE, waLink } from "@/lib/config";

const SLUG = "leads-from-facebook-groups";
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
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE.url}/guides/${SLUG}`,
  },
  headline: guide.title,
  description: guide.description,
  inLanguage: "he-IL",
  datePublished: guide.publishedAt,
  dateModified: guide.updatedAt,
  author: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
  },
  publisher: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/icon`,
    },
  },
  image: `${SITE.url}/og-image.jpeg`,
  keywords: guide.keywords.join(", "),
};

export default function GuidePage() {
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
                עודכן {new Date(guide.updatedAt).toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </div>
            <p className="mt-6 text-xl leading-9 text-ink-200">{guide.excerpt}</p>
          </header>

          <div className="prose prose-invert prose-lg mt-12 max-w-none">
            <h2>מה זה בכלל "ליד מקבוצות פייסבוק"?</h2>
            <p>
              ליד מקבוצות פייסבוק הוא פוסט פומבי שמישהו פרסם בקבוצה — והוא מחפש שירות שאתה נותן.
              "מי יכול להמליץ על שיפוצניק טוב באזור פתח תקווה?", "מחפשת קונדיטוריה לחתונה ביוני",
              "צריך מנעולן בדחיפות". כל אחד מאלה הוא ליד חם — אדם אמיתי, עכשיו, עם כוונת רכישה ברורה.
            </p>
            <p>
              הבעיה: הפוסטים האלה זורמים ב-<strong>אלפי קבוצות במקביל</strong>, נעלמים תוך שעות,
              ועד שתראה אותם — מישהו אחר כבר ענה. בלי מערכת — אתה מפסיד את רוב הלידים האלה.
            </p>

            <h2>למה לידים מקבוצות פייסבוק עובדים טוב כל כך</h2>
            <ul>
              <li>
                <strong>כוונת רכישה גבוהה.</strong> בניגוד לפרסום ממומן שמטרגט אנשים שאולי יום אחד יהיו
                מעוניינים — בקבוצה מישהו פעיל מבקש את השירות עכשיו, מילה במילה.
              </li>
              <li>
                <strong>אפס עלות מדיה.</strong> אין כאן עלות לקליק, אין מכרז, אין תקציב מינימום. הליד
                מגיע ישר מהקבוצה — אתה משלם רק על המערכת שמאתרת אותו.
              </li>
              <li>
                <strong>המרה גבוהה משמעותית.</strong> במחקר פנימי שלנו (FGMP, 2026, מדגם של 800 לידים),
                שיעור ההמרה מליד פייסבוק לעסקה היה 18%-24% — לעומת 1.5%-3% בלידים מקמפיין רגיל.
              </li>
              <li>
                <strong>זמינות שלך = יתרון תחרותי.</strong> זוכה הראשון. מי שעונה תוך 5 דקות סוגר ב-65%
                יותר מבעלי עסק שעונים אחרי שעה.
              </li>
            </ul>

            <h2>4 דרכים להשיג לידים מקבוצות פייסבוק (מהזולה לאוטומטית)</h2>

            <h3>1. ידנית — לסרוק קבוצות בעצמך</h3>
            <p>
              אפשר. צריך להצטרף לכל קבוצה רלוונטית בתחומך, לפתוח את פייסבוק כל בוקר, לחפש מילות מפתח,
              ולהגיב על פוסטים שתואמים. ה<strong>יתרון:</strong> חינם. ה<strong>חסרון:</strong> 2-3 שעות
              ביום, מפספסים את רוב הפוסטים, ופוסטים ערבי או סופ"ש פשוט נעלמים.
            </p>
            <p>
              <strong>מתאים ל:</strong> מי שיש לו רק 1-2 קבוצות רלוונטיות וזמן פנוי. לא מתאים לרוב העסקים.
            </p>

            <h3>2. התראות פייסבוק רגילות</h3>
            <p>
              פייסבוק מאפשרת להגדיר התראות על פוסטים בקבוצה. הבעיה: אין סינון לפי מילות מפתח. אתה מקבל
              <strong> כל</strong> פוסט בקבוצה — כולל ספאם, מהומות, ופוסטים לא רלוונטיים. תוך יומיים תכבה
              את ההתראות.
            </p>

            <h3>3. כלים גנריים (Mention, Brand24, Awario)</h3>
            <p>
              קיימים כלים לניטור רשתות חברתיות שמיועדים בעיקר לעקוב אחרי אזכורי מותג. הם <em>לא</em> בנויים
              לקבוצות פייסבוק — הם נסמכים על תוצאות חיפוש פייסבוק שמוגבלות מאוד. בנוסף, הם לא בעברית, לא
              מבינים סלנג ישראלי, ועולים $100-$300 לחודש.
            </p>

            <h3>4. מערכת ייעודית עם AI (כמו FGMP)</h3>
            <p>
              מערכת שסורקת ברקע יותר מ-50,000 קבוצות פייסבוק פעילות בישראל — כל הקבוצות החזקות
              והרלוונטיות בכל תחום — מסננת באמצעות AI לפי תחום העיסוק שלך, ושולחת רק את הלידים
              הרלוונטיים — לוואטסאפ או טלגרם — תוך שניות מהפרסום. אתה לא צריך להיות חבר באף קבוצה.
            </p>
            <p>
              ה<strong>יתרון</strong>: אוטומטי, מסונן, מהיר. ה<strong>חסרון</strong>: עלות חודשית קבועה
              (אצלנו {SITE.pricing.monthlyILS} ₪ לחודש כולל מע"מ).
            </p>

            <h2>איך לבחור מילות מפתח מנצחות לסריקה</h2>
            <p>
              זו השאלה הכי חשובה. מילת מפתח כללית מדי = יותר מדי רעש. ספציפית מדי = מפספסים לידים.
              הנה הנוסחה:
            </p>
            <ol>
              <li>
                <strong>פניות ישירות:</strong> "מחפש [שירות]", "צריך [מקצוע]", "מי יכול לעזור עם [בעיה]".
                למשל: "מחפש שיפוצניק", "צריך עורך דין", "מחפשת מאפרת".
              </li>
              <li>
                <strong>תיאורי בעיה:</strong> אנשים לא תמיד יודעים שהם צריכים שירות מסוים. הם מתארים את
                הבעיה. צבע: "הקיר נסדק". מנעולן: "ננעלתי בחוץ". שיפוצים: "האסלה דולפת". חבר את הבעיה
                למקצוע שלך.
              </li>
              <li>
                <strong>בקשות המלצה:</strong> "המלצה ל[שירות]", "מי עובד עם [מקצוע]", "המלצה על [תחום]".
                המלצות חמות במיוחד כי הלקוח כבר במצב סגירה.
              </li>
              <li>
                <strong>שלילות (Negative Keywords):</strong> מילים שצריכות להוציא ליד מהרשימה.
                "אני [המקצוע] שלך" אומר שמדובר באדם שמציע, לא מבקש. "כבר מצאתי" סוגר את הליד.
                ב-{SITE.brand} יש רשימת שלילות מובנית של מאות מילים.
              </li>
            </ol>
            <p>
              <strong>דוגמה לתחום שיפוצים</strong> — מילים נכונות: שיפוצים, שיפוץ, שיפוצניק, צובע,
              צביעה, אינסטלציה, אינסטלטור, הצנרת, חשמלאי, דוד שמש, אסלה דולפת, ברז דולף, מקלחת לא עובדת,
              חיפויים, פרקט, מטבח חדש, ארונות מטבח, כיור, אמבטיה, מי ממליצים על שיפוצניק.
            </p>
            <p>
              ב-FGMP יש כבר ספריית מובנית של <strong>4,670+ מילות מפתח בעברית</strong> מסווגות לפי 50+
              תחומים — לא צריך להמציא, רק לבחור את התחומים הרלוונטיים אליך.
            </p>

            <h2>כמה לידים אפשר לצפות לקבל?</h2>
            <p>
              תלוי בתחום ובאזור הגיאוגרפי. אנחנו סורקים 50,000+ קבוצות פעילות בישראל — אז כיסוי הוא
              לא הצוואר בקבוק. נתונים מתוך מערכת FGMP (2026):
            </p>
            <ul>
              <li><strong>שיפוצים, מנעולנות, חשמלאים</strong> — 5-15 לידים ביום ארצי, 1-3 ביום אזורי</li>
              <li><strong>קונדיטוריה, צילום, איפור</strong> — 3-8 לידים ביום ארצי</li>
              <li><strong>ביטוח, פיננסים, ייעוץ</strong> — 2-5 לידים ביום ארצי</li>
              <li><strong>נדל"ן, סוכנים</strong> — 4-10 לידים ביום אזורי</li>
              <li><strong>תחומי נישה</strong> — 5-15 לידים בשבוע</li>
            </ul>
            <p>
              גם 1 ליד ביום שווה את כל ההשקעה. אם הליד הוא חתונה (5,000 ₪+), שיפוץ (10,000 ₪+) או ביטוח
              משכנתא (עמלה של 3,000 ₪) — מערכת ב-{SITE.pricing.monthlyILS} ₪ לחודש מחזירה את עצמה
              מ<em>ליד אחד</em> בחודש.
            </p>

            <h2>איך לסגור ליד מקבוצת פייסבוק (טיפים שאף אחד לא אומר לך)</h2>
            <ol>
              <li>
                <strong>תגובה תוך 5 דקות.</strong> מחקרים מראים: מי שעונה ב-5 דק' סוגר ב-65% יותר. שעה
                = הרוב כבר עזב. אל תחכה לערב.
              </li>
              <li>
                <strong>תוסיף ערך מיידי.</strong> במקום "תתקשר אליי", תן תשובה ראשונית בפוסט עצמו: "תלוי
                אם זה תיקון מקומי או החלפה — אם תוכלי לשלוח תמונה אני יכול להגיד לך בדיוק". ככה אתה מוכיח
                מומחיות לפני שאתה מבקש שיחה.
              </li>
              <li>
                <strong>תעבור לוואטסאפ מהר.</strong> פייסבוק לא מקום לסגור עסקה. תכתוב "שלחתי לך הודעה"
                או "תכתבי לי בוואטסאפ", ותעבור לערוץ פרטי.
              </li>
              <li>
                <strong>תייצר אסמכתא ראשונית.</strong> בהודעה הראשונה: שמי + עיסוק + תמונה אחת מתיק עבודות
                + שאלה אחת ספציפית. לא משא ומתן.
              </li>
              <li>
                <strong>אל תספק מחיר בהודעה הראשונה.</strong> תשאל פרטים, תקבע שיחה, ואז תיתן הצעה.
                מי שמקבל מחיר במשפט אחד לא ממיר.
              </li>
              <li>
                <strong>תמיד לעקוב.</strong> 60% מהלידים סוגרים בעקיבה השנייה או השלישית. אם לא ענו תוך
                24 שעות — שלח שוב. תוך 48 שעות — שלח שוב. אחרי שבוע — שלח שוב.
              </li>
            </ol>

            <h2>שאלות נפוצות</h2>
            <h3>זה חוקי?</h3>
            <p>
              כן. המערכת מנתחת רק תוכן ציבורי בקבוצות פייסבוק שתוכנן הגלוי לכל חבר בקבוצה. אנחנו לא
              משתפים תכנים ללא רשות, לא מבצעים פעולות אוטומטיות בחשבון של אף אחד, ולא חודרים לקבוצות
              חסויות. לפרטי תקנון <Link href="/terms" className="text-brand-300 underline">כאן</Link>.
            </p>
            <h3>צריך כרטיס אשראי כדי לנסות?</h3>
            <p>
              לא. {SITE.pricing.trialDays} ימי ניסיון חינם, ללא כרטיס אשראי. רק אם תחליט להמשיך — נבקש
              פרטי תשלום (Tranzila, מערכת סליקה ישראלית מאובטחת).
            </p>
            <h3>איך מבטלים?</h3>
            <p>בלחיצה אחת מהאזור האישי, או בהודעת וואטסאפ. ביטול מיידי, ללא התחייבות.</p>
            <h3>כמה זמן לוקח להתחיל?</h3>
            <p>12-48 שעות מהרגע שאתה נרשם. אנחנו מגדירים את הסינון לתחום שלך, ואז ההתראות מתחילות.</p>

            <h2>סיכום</h2>
            <p>
              לידים מקבוצות פייסבוק זה הזרם הכי חם, הכי זול, והכי לא מנוצל בארגז הכלים של עסקים בישראל ב-2026.
              היחיד שמפריד בינך לבין זרם יומי של לקוחות חמים זה <strong>אוטומציה</strong>. בלי מערכת, אתה
              מפספס את רוב הלידים. עם מערכת — הם מגיעים אליך בזמן שאתה ישן.
            </p>
            <p>
              {SITE.brand} סורקת בשבילך 24/7, מסננת ב-AI לפי התחום שלך, ושולחת לוואטסאפ או טלגרם תוך שניות
              מפרסום הפוסט. {SITE.pricing.trialDays} ימי ניסיון חינם, ללא כרטיס אשראי, ללא חוזה.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">מוכן להתחיל לקבל לידים אוטומטית?</h3>
            <p className="mt-2 text-ink-200">
              הצטרף ל-{SITE.brand}, הגדר את התחום שלך תוך 5 דקות, וקבל את הליד הראשון תוך 24 שעות.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו {SITE.pricing.trialDays} ימי ניסיון חינם
              </Link>
              <a
                href={waLink("היי, קראתי את המדריך ויש לי שאלה")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base"
              >
                שאלה? דברו איתנו בוואטסאפ
              </a>
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
