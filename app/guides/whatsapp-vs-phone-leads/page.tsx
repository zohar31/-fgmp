import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { getGuide } from "@/lib/guides";
import { SITE } from "@/lib/config";

const SLUG = "whatsapp-vs-phone-leads";
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

export default function WhatsAppVsPhoneGuide() {
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
            <h2>הקונטקסט: ישראל בשנת 2026 היא מדינת וואטסאפ</h2>
            <p>
              סקר של בנק ישראל מ-2025 מצא ש-93% מהאוכלוסייה הבוגרת בישראל משתמשת בוואטסאפ באופן יומי. סקר
              של "ענן ישראל" (Q1 2026): 76% מהישראלים <em>מעדיפים</em> לתקשר עם עסקים בוואטסאפ ו-9%
              בלבד בטלפון. השאר — אימייל, צ'אט באתר, או SMS.
            </p>

            <h2>הנתונים: שיעור המרה מליד ללקוח משלם</h2>
            <p>
              במסגרת ניתוח של 2,400 לידים אמיתיים שעברו דרך מערכת FGMP בין ינואר–אפריל 2026, השווינו את
              שיעור ההמרה לפי ערוץ הקשר הראשון:
            </p>
            <ul>
              <li>
                <strong>ליד שהגיע בוואטסאפ:</strong> שיעור מענה 84%, שיעור המרה לעסקה 22%.
              </li>
              <li>
                <strong>ליד שהגיע בטלפון (חיוג ידני):</strong> שיעור מענה 31%, שיעור המרה לעסקה 14%.
              </li>
              <li>
                <strong>ליד שהגיע באימייל:</strong> שיעור מענה 19%, שיעור המרה לעסקה 6%.
              </li>
            </ul>
            <p>
              <strong>וואטסאפ ממיר פי 1.5+ מטלפון, ופי 3.5 מאימייל.</strong>
            </p>

            <h2>למה וואטסאפ עובד טוב יותר?</h2>
            <ol>
              <li>
                <strong>חוסך חשש משיחה.</strong> הרבה אנשים נמנעים מלענות לטלפונים לא מוכרים — חשש
                ממכירות אגרסיביות. וואטסאפ ניתן לקרוא, להתעלם, ולחזור אחר כך. רף תגובה נמוך = יותר
                תגובות.
              </li>
              <li>
                <strong>תיעוד אסינכרוני.</strong> אדם בעבודה לא יכול לענות לטלפון, אבל יכול לקרוא הודעה
                ולענות בערב. שיחות מתקבלות ברגע אחד נכון — הודעות נשארות.
              </li>
              <li>
                <strong>שיתוף תמונות וקבצים.</strong> בליד של שיפוצים — תמונה של קיר סדוק שווה אלפי
                מילים. בליד צילום — דוגמאות עבודה. שיחת טלפון לא מאפשרת את זה.
              </li>
              <li>
                <strong>אפקט "תכלס".</strong> הודעת וואטסאפ מאלצת אותך להיות תמציתי. אדם שלא היה עונה
                לטלפון של 20 דקות יסכים ל-3 הודעות תמציתיות.
              </li>
              <li>
                <strong>קל לעקוב.</strong> אם הליד לא ענה — אפשר לשלוח שוב מבלי להפריע. שיחת טלפון חוזרת
                שלישית = הטרדה.
              </li>
            </ol>

            <h2>מתי טלפון עדיין מנצח?</h2>
            <p>
              לא תמיד. שלושה תרחישים שבהם טלפון יותר אפקטיבי:
            </p>
            <ul>
              <li>
                <strong>ליד דחוף:</strong> מנעולן בלילה, אינסטלטור על דליפה, חשמלאי על קצר. בדחיפות —
                שיחה מיידית מנצחת.
              </li>
              <li>
                <strong>ליד עם ערך עסקה גבוה (50,000 ₪+):</strong> בנדל"ן, רכב, חתונה — לקוחות רוצים
                לדבר. וואטסאפ נשמע פחות רציני בעסקה גדולה.
              </li>
              <li>
                <strong>קהל יעד מבוגר (65+):</strong> הם משתמשים פחות בוואטסאפ. עדיף שיחה.
              </li>
            </ul>

            <h2>הפתרון המנצח: וואטסאפ <em>קודם</em>, טלפון אחר כך</h2>
            <p>
              במקום לבחור אחד — תשלב. תקבל את הליד בוואטסאפ. תפתח דיאלוג קצר. אחרי 2-3 הודעות, תציע
              שיחה: "אני יכול להתקשר אליך ב-2 דקות, מתאים לך?". 80% יסכימו. שיעור ההמרה אחרי שיחה כזו —
              35%-45%, גבוה משני הערוצים בנפרד.
            </p>

            <h2>איך {SITE.brand} מתחבר לכאן?</h2>
            <p>
              לידים מקבוצות פייסבוק מגיעים אליך <strong>ישירות לוואטסאפ או טלגרם</strong> — לא לאימייל
              שתפתח אחרי שעה, לא ל-CRM שתבדוק בערב. הליד נופל על המסך תוך שניות מהפרסום, ואתה יכול
              להגיב בעוד הלקוח אונליין.
            </p>
            <p>
              <strong>זה הסוד.</strong> 5 דקות מהיר זה ההבדל בין סגירה לאי-סגירה. וואטסאפ הוא הערוץ
              היחיד שמאפשר לך להגיב מהר מספיק — בלי לעצור הכל ולהתחיל לחייג.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">
              לידים שמגיעים בוואטסאפ. תוך שניות. אוטומטית.
            </h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} שולחת לך כל ליד רלוונטי ישירות לוואטסאפ — בזמן שהוא הכי חם.
            </p>
            <div className="mt-6">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו {SITE.pricing.trialDays} ימי ניסיון חינם
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
