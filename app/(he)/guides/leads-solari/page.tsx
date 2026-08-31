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

const SLUG = "leads-solari";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "איפה בעלי בתים מחפשים חברת סולאר?",
    a: "בקבוצות פייסבוק אזוריות ובקבוצות בנייה ושיפוצים — 'מי ממליץ על חברת סולאר?', 'כמה עולה מערכת לבית?', 'שווה גג מניב?'. אלה בעלי בתים בכוונת קנייה, ומי שמגיב ראשון עם מידע ענייני תופס את הלקוח.",
  },
  {
    q: "עדיף לקנות לידים לסולאר או לאתר אותם?",
    a: "לידים לסולאר בשוק יקרים מאוד ולרוב נמכרים לכמה חברות במקביל. איתור פוסטים אמיתיים מקבוצות נותן פנייה בלעדית וחמה בעלות קבועה — יתרון עצום בתחום עם ערך עסקה גבוה.",
  },
  {
    q: "אפשר למקד לפי אזור או סוג מערכת?",
    a: "כן. תגדיר מילות מפתח ('מערכת סולארית', 'גג מניב', 'אגירת אנרגיה') ואזורי שירות, והמערכת תסמן רק פוסטים רלוונטיים אליך.",
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
            <h2>הביקוש לסולאר מזנק — והלקוחות שואלים בקבוצות</h2>
            <p>
              מחירי החשמל עולים והעניין באנרגיה סולארית בשיא. לפני שבעל בית סוגר עם חברת סולאר, הוא
              שואל את הקהילה: &quot;מי ממליץ על חברת סולאר אמינה?&quot;, &quot;כמה מחזירה מערכת על
              הגג?&quot;, &quot;שווה גג מניב?&quot;. כל בקשה כזו היא לקוח בכוונת קנייה גבוהה ובעל ערך
              עסקה משמעותי.
            </p>

            <h2>למה לידים לסולאר קנויים שורפים כסף</h2>
            <p>
              לידים לסולאר הם מהיקרים בשוק, ולרוב נמכרים לכמה חברות במקביל — אתה מתקשר ללקוח שכבר
              קיבל שלוש הצעות. ראה{" "}
              <Link href="/guides/why-buying-leads-fails" className="text-brand-300 underline">
                למה קניית לידים מבזבזת כסף
              </Link>
              . פנייה אמיתית מקבוצה מגיעה אליך בלעדית — לפני שהתחרות בכלל ראתה אותה.
            </p>

            <h2>איך תופסים לידים לסולאר בזמן אמת</h2>
            <p>
              {SITE.brand} סורקת 50,000+ קבוצות (כולל קבוצות בנייה, חשמל ואזוריות), מזהה עם AI פוסטים
              של בעלי בתים שמתעניינים בסולאר, ושולחת לך אותם לוואטסאפ תוך שניות — עם תגובה מוצעת. אתה
              מגיב ראשון, כשההתעניינות בשיא. ראה{" "}
              <Link href="/guides/leads-from-facebook-groups" className="text-brand-300 underline">
                איך משיגים לידים מקבוצות פייסבוק
              </Link>
              .
            </p>

            <h2>מיקוד: ביתי, מסחרי או אגירה</h2>
            <p>
              מתקין ביתי יגדיר &quot;מערכת סולארית לבית&quot;, &quot;פאנלים&quot;; מי שעוסק במסחרי
              יגדיר &quot;גג מניב&quot;, &quot;מערכת מסחרית&quot;; ומי שמתמחה באגירה יגדיר &quot;סוללת
              אגירה&quot;. אם אתה בתחום, ראה גם את דף{" "}
              <Link href="/lidim/lidim-solari" className="text-brand-300 underline">
                לידים לסולאר
              </Link>{" "}
              ואת{" "}
              <Link href="/lidim/lidim-leshipuznik" className="text-brand-300 underline">
                לידים לשיפוצים ובנייה
              </Link>
              .
            </p>

            <h2>ערך עסקה גבוה — האמון קובע</h2>
            <p>
              מערכת סולארית היא השקעה של עשרות אלפי שקלים, ולכן האמון קריטי. תגובה מהירה, מקצועית ולא
              לחוצה — עם נתונים על החזר ההשקעה — בונה את הביטחון שסוגר. קבלת הפנייה מיד לוואטסאפ נותנת
              לך את יתרון הראשוניות. הבן את ההבדל בין פנייה חמה לקרה ב-
              <Link href="/guides/hot-vs-cold-leads" className="text-brand-300 underline">
                ליד חם מול ליד קר
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
              תחום הסולאר צומח, וכל לקוח שווה הרבה. מי שתופס את הלידים לסולאר ראשון, בלעדית ובעלות
              קבועה, בונה יתרון אמיתי בשוק תחרותי. {SITE.brand}:{" "}
              {SITE.pricing.monthlyILS}₪/חודש קבוע, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">קבל לידים לסולאר — לוואטסאפ</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} מזהה עם AI בעלי בתים שמתעניינים במערכת סולארית ושולחת לך אותם תוך שניות.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני עוסק בתחום הסולאר ורוצה לקבל פניות")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base"
              >
                שאלה? דברו איתנו בוואטסאפ
              </a>
            </div>
            <p className="mt-4 text-sm text-ink-400">
              רוצה לראות את דף הקטגוריה?{" "}
              <Link href="/lidim/lidim-solari" className="text-brand-300 underline">
                לידים לסולאר
              </Link>
            </p>
          </div>

          <RelatedGuides
            currentSlug={SLUG}
            related={["why-buying-leads-fails", "speed-to-lead", "hot-vs-cold-leads"]}
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
