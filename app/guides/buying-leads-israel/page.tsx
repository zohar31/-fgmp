import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedGuides } from "@/components/RelatedGuides";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { getGuide } from "@/lib/guides";
import { SITE } from "@/lib/config";

const SLUG = "buying-leads-israel";
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

export default function BuyingLeadsGuide() {
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
            <h2>שלושת מודלי התמחור בקניית לידים</h2>
            <h3>1. תשלום פר ליד (Pay per Lead)</h3>
            <p>
              המודל הנפוץ: משלמים על כל ליד שנמסר. טווח השוק בישראל — <strong>35-150 ₪ לליד</strong>{" "}
              רגיל, ובתחומים פיננסיים עד 210 ₪ (המחירון המלא —{" "}
              <Link href="/guides/lead-price-list">כאן</Link>). נשמע הוגן: אין ליד, אין תשלום.
              בפועל, ההגדרה של "ליד" נמצאת בחוזה של המוכר — וזה המקור לרוב הוויכוחים.
            </p>
            <h3>2. ריטיינר חודשי</h3>
            <p>
              סכום קבוע בחודש (בשוק: 1,500-6,000 ₪) תמורת התחייבות לכמות לידים, לרוב בלעדיים. יתרון:
              עלות צפויה ובלעדיות. חיסרון: ההתחייבות היא של החברה כלפי הכמות, לא כלפי האיכות — 40
              לידים גרועים עדיין עומדים בחוזה.
            </p>
            <h3>3. עמלת סגירה (Success fee)</h3>
            <p>
              משלמים אחוז מהעסקה רק כשנסגרת. נפוץ בנדל"ן ובעסקאות גדולות. יתרון: אפס סיכון מקדים.
              חיסרון: העמלות גבוהות (10-25%), והמודל דורש שקיפות מלאה שלך מול הספק — רוב העסקים
              הקטנים לא אוהבים לחשוף כמה הם סוגרים.
            </p>

            <h2>5 המלכודות של קניית לידים — מה לבדוק לפני שמשלמים</h2>
            <ol>
              <li>
                <strong>הליד משותף.</strong> השאלה הראשונה לספק: "לכמה עסקים נוספים נמסר הליד?"
                ליד שנמכר ל-4 מתחרים שווה רבע מהמחיר — פירטנו את המתמטיקה ב
                <Link href="/guides/exclusive-vs-shared-leads">מדריך ליד בלעדי מול משותף</Link>.
              </li>
              <li>
                <strong>הגדרת "ליד תקין".</strong> האם מספר שלא עונה נחשב ליד? מישהו שאומר "לא
                השארתי פרטים"? דרשו מדיניות זיכוי כתובה על לידים פסולים.
              </li>
              <li>
                <strong>גיל הליד.</strong> ליד בן שעה שווה זהב; ליד בן שבועיים שווה כמעט כלום.
                שאלו מתי הליד נוצר — לא מתי נמסר. (
                <Link href="/guides/speed-to-lead">למה כל דקה קובעת</Link>)
              </li>
              <li>
                <strong>מקור הליד.</strong> ליד מטופס "השאירו פרטים וזכו באייפון" הוא לא ליד — הוא
                משתתף בהגרלה. שאלו מאיזה קמפיין ובאיזו הבטחה נאסף.
              </li>
              <li>
                <strong>התחייבות לתקופה.</strong> ספקים שדורשים 3-6 חודשים מראש לא נותנים לך לצאת
                כשמתברר שהאיכות חלשה. התחילו תמיד חודש-בחודשו.
              </li>
            </ol>

            <h2>אז האם משתלם לקנות לידים?</h2>
            <p>
              תלוי מה משווים. אם החלופה היא לשבת בלי טלפונים — כן, גם ליד משותף ב-80 ₪ יכול להחזיר
              את עצמו. אבל ב-2026 יש חלופה שהופכת את החישוב: במקום לקנות לידים <em>ביחידות</em>,
              אפשר לקבל את <em>כל</em> הפניות האורגניות בתחום שלך מקבוצות הפייסבוק — במנוי קבוע.
            </p>
            <p>
              {SITE.brand} סורקת 50,000+ קבוצות פייסבוק ישראליות 24/7, ושולחת לוואטסאפ שלך כל פוסט
              של אדם שמחפש את השירות שלך — תוך פחות מדקה, עם תגובה מוצעת מוכנה. {SITE.pricing.monthlyILS} ₪
              לחודש, בלי הגבלת כמות:
            </p>
            <ul>
              <li>קניית 50 לידים בשוק: <strong>2,500-6,000 ₪ בחודש</strong>, רובם משותפים.</li>
              <li>
                50 לידים דרך {SITE.brand}: <strong>{SITE.pricing.monthlyILS} ₪ בחודש</strong> — ~6 ₪
                לליד, וכל ליד הוא אדם שכתב בעצמו שהוא מחפש.
              </li>
            </ul>
            <p>
              ובניגוד לחברת לידים — אין התחייבות, ויש ערבות החזר מלא {SITE.pricing.refundDays} ימים.
              אם תוך שבוע לא ראית לידים אמיתיים בתחום שלך, מקבלים את הכסף בחזרה.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">
              לפני שאתה קונה לידים ביחידות — תבדוק מה כבר מחכה לך בקבוצות.
            </h3>
            <p className="mt-2 text-ink-200">
              לידים ללא הגבלה ב-{SITE.pricing.monthlyILS}₪/חודש · ערבות החזר {SITE.pricing.refundDays} ימים ·
              בלי התחייבות.
            </p>
            <div className="mt-6">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו
              </Link>
            </div>
          </div>

          <RelatedGuides
            currentSlug={SLUG}
            related={["lead-price-list", "exclusive-vs-shared-leads", "choose-leads-system"]}
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
