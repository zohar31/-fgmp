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

const SLUG = "leads-shiputzim-ubniya";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "איפה בעלי בתים מחפשים שיפוצניק או קבלן?",
    a: "רובם מתחילים בקבוצת פייסבוק אזורית — 'מי ממליץ על שיפוצניק אמין?', 'צריך קבלן לתוספת בנייה'. זה קורה עוד לפני חיפוש בגוגל, כי אנשים סומכים על המלצה מהקבוצה. מי שמגיב ראשון לפוסט כזה לרוב זוכה בעבודה.",
  },
  {
    q: "עדיף לקנות לידים לשיפוצים או לאתר אותם לבד?",
    a: "לידים קנויים בענף השיפוצים לרוב משותפים לכמה בעלי מקצוע, קרים, ויקרים (40–120 ₪ לליד). איתור פוסטים אמיתיים מקבוצות נותן פנייה בלעדית, חמה ובעלות קבועה — בלי תשלום פר ליד.",
  },
  {
    q: "אפשר לקבל רק פניות באזור שלי ובהתמחות שלי?",
    a: "כן. אתה מגדיר אזורי שירות ומילות מפתח ('שיפוץ מטבח', 'עבודות גבס', 'איטום גג') והמערכת מסמנת רק פוסטים רלוונטיים אליך.",
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
  twitter: { card: "summary_large_image", title: guide.title, description: guide.description },
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
            <h2>הלקוחות שלך כבר מדברים — בקבוצות</h2>
            <p>
              שיפוצים ובנייה הם החלטה של אמון. לפני שבעל בית מזמין קבלן, הוא שואל בקבוצת הפייסבוק
              האזורית: &quot;מי ממליץ על שיפוצניק?&quot;, &quot;צריך קבלן לתוספת בנייה&quot;, &quot;מחפש
              בעל מקצוע לאיטום גג&quot;. כל בקשה כזו היא לקוח בכוונת קנייה גבוהה — והוא מחכה לתשובה
              עכשיו, לא בעוד שבוע.
            </p>
            <p>
              הבעיה: הפוסטים האלה נבלעים בעשרות אלפי קבוצות, ואי אפשר לשבת ולסרוק אותן ידנית. מי
              שמגיב ראשון תופס את העבודה — ובענף השיפוצים, הראשון שמתקשר לרוב סוגר.
            </p>

            <h2>למה קניית לידים לשיפוצים שורפת כסף</h2>
            <p>
              הפיתוי לקנות לידים מובן, אבל בענף הזה זה לרוב הפסד: הליד נמכר <strong>במקביל לכמה
              שיפוצניקים</strong>, הוא קר (מילא טופס לפני שבועיים), והעלות מצטברת — 40 עד 120 ₪ לליד,
              בלי ערובה שייסגר. הרחבנו על זה ב-
              <Link href="/guides/why-buying-leads-fails" className="text-brand-300 underline">
                למה קניית לידים מבזבזת כסף
              </Link>
              .
            </p>
            <p>
              החלופה: פנייה אמיתית מקבוצה — <strong>בלעדית, חמה, ובעלות קבועה</strong>. לא אתה מול
              עוד ארבעה מתחרים על אותו טופס, אלא אתה הראשון שמגיב לאדם אמיתי שכתב הרגע שהוא צריך.
            </p>

            <h2>איך תופסים פניות שיפוצים חמות אוטומטית</h2>
            <p>
              במקום לסרוק ידנית, {SITE.brand} סורקת 50,000+ קבוצות בישראל בזמן אמת, מזהה עם AI רק
              פוסטים עם כוונת קנייה בתחום שלך, ושולחת לך אותם לוואטסאפ תוך פחות מדקה — עם תגובה מוצעת
              מוכנה. אתה רק בוחר: להגיב או לא. ראה גם{" "}
              <Link href="/guides/leads-from-facebook-groups" className="text-brand-300 underline">
                איך משיגים לידים מקבוצות פייסבוק
              </Link>
              .
            </p>

            <h2>מיקוד לפי התמחות ואזור</h2>
            <p>
              לא כל שיפוצניק עושה הכול. לכן אתה מגדיר מילות מפתח לפי ההתמחות — &quot;שיפוץ מטבח&quot;,
              &quot;החלפת צנרת&quot;, &quot;עבודות גבס&quot;, &quot;ריצוף&quot; — ואזורי שירות, והמערכת
              מסמנת רק פוסטים שרלוונטיים אליך. כך אתה לא מוצף בפניות לא רלוונטיות, ומקבל בדיוק את סוג
              העבודה שאתה רוצה. אם אתה בתחום ספציפי, ראה גם את דף{" "}
              <Link href="/lidim/lidim-leshipuznik" className="text-brand-300 underline">
                לידים לשיפוצניק
              </Link>{" "}
              ואת{" "}
              <Link href="/lidim/lidim-lekablan" className="text-brand-300 underline">
                לידים לקבלן
              </Link>
              .
            </p>

            <h2>מהירות התגובה קובעת הכול</h2>
            <p>
              בענף השיפוצים, פנייה &quot;מתקררת&quot; תוך שעות. בעל הבית מפרסם, מקבל שלוש-ארבע
              המלצות, ומתקשר לראשונים. אם הגעת אליו רבע שעה אחרי כולם — כבר סגרו לך את החלון. לכן
              קבלת הפנייה <em>לוואטסאפ תוך שניות</em> היא ההבדל בין ליד לעבודה. הרחבנו ב-
              <Link href="/guides/speed-to-lead" className="text-brand-300 underline">
                מהירות תגובה לליד
              </Link>{" "}
              ובמדריך{" "}
              <Link href="/guides/marketing-for-contractors" className="text-brand-300 underline">
                שיווק לבעלי מקצוע ושיפוצניקים
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
              בענף השיפוצים והבנייה, הלקוחות כבר מבקשים המלצה בקבוצות — כל יום. מי שתופס את הפניות
              האלה ראשון, בלי לקנות לידים משומשים, בונה זרם עבודה קבוע בעלות אחת. {SITE.brand}:{" "}
              {SITE.pricing.monthlyILS}₪/חודש קבוע, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">קבל פניות שיפוצים חמות — לוואטסאפ</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} סורקת 50,000+ קבוצות ושולחת לך כל פנייה רלוונטית בתחום שלך תוך שניות.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני בעל מקצוע בתחום השיפוצים ורוצה לקבל פניות לעסק")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base"
              >
                שאלה? דברו איתנו בוואטסאפ
              </a>
            </div>
            <p className="mt-4 text-sm text-ink-400">
              רוצה לראות את דף הקטגוריה?{" "}
              <Link href="/lidim/lidim-shiputzim-ubniya" className="text-brand-300 underline">
                לידים לשיפוצים ובנייה
              </Link>
            </p>
          </div>

          <RelatedGuides
            currentSlug={SLUG}
            related={["marketing-for-contractors", "why-buying-leads-fails", "leads-from-facebook-groups"]}
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
