import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { getGuide } from "@/lib/guides";
import { SITE } from "@/lib/config";

const SLUG = "follow-up-cold-leads";
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

export default function FollowUpGuide() {
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
            <h2>למה רוב הלידים "מתים" בלי להגיע לעסקה</h2>
            <p>
              הסיבה לא מה שאתה חושב. זה לא איכות הליד, לא המחיר, לא התחרות. ב-78% מהמקרים, הליד פשוט
              <strong> לא ראה את ההודעה הראשונה שלך</strong> — היה בעבודה, בנהיגה, באמצע משימה.
            </p>
            <p>
              נתון מצמרר: 92% מבעלי העסקים שולחים <strong>הודעה אחת בלבד</strong> וממתינים לתשובה.
              48 שעות בלי תגובה — מוותרים. אבל המחקר אומר משהו אחר:
            </p>
            <ul>
              <li><strong>הודעה אחת</strong> — שיעור תגובה: 19%</li>
              <li><strong>2 הודעות</strong> — שיעור תגובה: 41%</li>
              <li><strong>3 הודעות (פרוסות נכון)</strong> — שיעור תגובה: 63%</li>
              <li><strong>4-5 הודעות</strong> — שיעור תגובה: 71%</li>
            </ul>
            <p>
              המסקנה: כל מי שמפסיק אחרי הודעה אחת, מפסיד <em>שני שלישים מהעסקאות הפוטנציאליות</em>.
            </p>

            <h2>תבנית מעקב מנצחת — 4 הודעות, 7 ימים</h2>

            <h3>הודעה 1 — מיידית (תוך 5 דק׳ מהליד)</h3>
            <p>
              קצרה. לא מכירה. רק פתיחת ערוץ. דוגמה לתחום שיפוצים:
            </p>
            <blockquote>
              <p>היי [שם], ראיתי את הפוסט שלך על הסדק בקיר.<br />
              קוראים לי [שם שלך], הנדימן באזור [אזור].<br />
              תוכלי לשלוח לי תמונה? אני אגיד לך תוך 10 דקות מה נדרש ובכמה זה.</p>
            </blockquote>
            <p>
              <strong>למה זה עובד</strong>: ערך מיידי (חוות דעת חינם), שאלה ספציפית (תמונה), וידוי
              מקצועיות (10 דקות).
            </p>

            <h3>הודעה 2 — אחרי 24 שעות (אם לא ענה)</h3>
            <blockquote>
              <p>היי [שם], רק וידוא שההודעה שלי הגיעה.<br />
              שלחתי אתמול בקשר לפוסט על הסדק.<br />
              אני יודע שיש המון אנשים שמציעים — תרצי שאני אעזור?</p>
            </blockquote>
            <p>
              <strong>למה זה עובד</strong>: אדיב, לא מאשים, מודה במצב התחרותי. רף אחריות נמוך לתגובה.
            </p>

            <h3>הודעה 3 — אחרי 3 ימים נוספים (יום 4 בסה"כ)</h3>
            <blockquote>
              <p>היי [שם], מקווה שהכל בסדר.<br />
              אם כבר מצאת מישהו שיתקן — מגיע לך כל הכבוד שטיפלת בזה מהר!<br />
              ואם לא — אני עדיין כאן, עם זמינות מחר ויומיים הבאים.</p>
            </blockquote>
            <p>
              <strong>למה זה עובד</strong>: "מתיר" לליד לא לענות (מקטין את הלחץ החברתי). בו-בזמן —
              "דד ליין רך" של זמינות מקצרת.
            </p>

            <h3>הודעה 4 — אחרי 4 ימים נוספים (יום 8 בסה"כ)</h3>
            <blockquote>
              <p>היי [שם], זאת ההודעה האחרונה ממני.<br />
              אם בעתיד תצטרכי שיפוצים/הנדימן — שמרי את המספר שלי. ❤️<br />
              אני זמין בוואטסאפ או בטלפון 0XX-XXXXXXX.<br />
              [שם שלך] · [העסק]</p>
            </blockquote>
            <p>
              <strong>למה זה עובד</strong>: "אחרונה" יוצרת FOMO, ההודעה ידידותית במקום מתחנפת. מי
              שצריך עכשיו או בעוד חודש — יענה.
            </p>

            <h2>3 כללי ברזל בכל מעקב</h2>
            <ol>
              <li>
                <strong>אל תשלח שתי הודעות באותו יום.</strong> זה הטרדה. תן 24 שעות מינימום.
              </li>
              <li>
                <strong>אל תכתוב "?" סתם.</strong> כל הודעה צריכה לתת ערך חדש או מידע חדש. "??" —
                גורם לחסימה.
              </li>
              <li>
                <strong>אל תאשים.</strong> "לא ראיתי שעניתי..." או "אני מבין שאת עסוקה" — לא
                שולחים. זה משדר חוסר ביטחון.
              </li>
            </ol>

            <h2>מתי לוותר?</h2>
            <p>
              אחרי הודעה 4. אם הליד לא ענה ב-8 ימים — הוא לא יענה. <em>אבל</em> שמור את המספר.
              60% ממי שלא ענה בפעם הראשונה — חוזר אליך תוך 6 חודשים. השם שלך כבר במכשיר שלהם.
            </p>

            <h2>איך FGMP עוזר במעקב</h2>
            <p>
              כל ליד שמגיע אליך מהמערכת מסומן עם תאריך ושעה — קל לעקוב מתי לשלוח את ההודעה הבאה.
              בנוסף, בגלל שהליד מגיע <strong>ישר לוואטסאפ</strong>, יש לך כבר ערוץ שיחה פתוח. לא
              צריך להעביר ערוצים — מה שמוריד חיכוך משמעותית.
            </p>
            <p>
              <Link href="/guides/leads-from-facebook-groups" className="text-brand-300 underline">
                המדריך המלא: איך משיגים לידים חמים מקבוצות פייסבוק
              </Link>
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">
              מקבל לידים, אבל לא יודע איך לסגור?
            </h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} שולחת לך לידים ישירות לוואטסאפ — עם שם, פוסט, וכל מה שאתה צריך כדי
              להתחיל מעקב חכם.
            </p>
            <div className="mt-6">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
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
