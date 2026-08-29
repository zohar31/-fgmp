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

const SLUG = "leads-rechev-leasing";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "איפה אנשים מחפשים רכב או עסקת ליסינג?",
    a: "בקבוצות פייסבוק של רכב, ליסינג יד שנייה וקהילות אזוריות. נכתבות שם בכל יום בקשות כמו 'מחפש רכב משפחתי עד 80 אלף' או 'כדאי ליסינג או לקנות?'. אלה לקוחות בכוונת קנייה — ומי שמגיב ראשון עם הצעה ממוקדת תופס אותם.",
  },
  {
    q: "אפשר לקבל רק פניות ליסינג ולא מכירת רכב?",
    a: "כן. אתה מגדיר מילות מפתח — 'ליסינג', 'ליסינג תפעולי', 'החזר ליסינג' — והמערכת מסמנת רק פוסטים רלוונטיים אליך, בלי רעש.",
  },
  {
    q: "הפניות אמיתיות או לידים קנויים?",
    a: "אלה פוסטים אמיתיים של אנשים בקבוצות, לא דאטה קרה שנמכרה במקביל לחמישה סוכנים. פנייה בלעדית וחמה, בעלות חודשית קבועה.",
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
            <h2>שוק הרכב חי בקבוצות פייסבוק</h2>
            <p>
              קנייה, מכירה, ליסינג, טרייד-אין ותיקונים — כל שוק הרכב בישראל עובר דרך קבוצות פייסבוק.
              אנשים כותבים &quot;מחפש רכב יד ראשונה עד 100 אלף&quot;, &quot;ממליצים על עסקת
              ליסינג?&quot;, &quot;צריך מוסך אמין באזור&quot;. כל פוסט כזה הוא לקוח בכוונת קנייה — ובשוק
              הרכב, ערך העסקה גבוה מספיק כדי שכל פנייה כזו תהיה שווה.
            </p>

            <h2>למה קניית לידים לרכב לרוב לא משתלמת</h2>
            <p>
              לידים קנויים בתחום הרכב נמכרים במקביל לכמה סוכנים, מגיעים קרים, ועולים ביוקר. אתה
              מתחרה על אותו לקוח מול עוד ארבעה — וזה מוריד את שיעור הסגירה ומעלה את העלות לעסקה. ראה{" "}
              <Link href="/guides/why-buying-leads-fails" className="text-brand-300 underline">
                למה קניית לידים מבזבזת כסף
              </Link>
              . פנייה אמיתית מקבוצה היא בלעדית — אתה הראשון, ולבד.
            </p>

            <h2>איך תופסים פניות רכב בזמן אמת</h2>
            <p>
              {SITE.brand} סורקת 50,000+ קבוצות בזמן אמת, מזהה עם AI פוסטים של אנשים שמחפשים רכב או
              שירות רכב, ושולחת לך אותם לוואטסאפ תוך שניות — עם תגובה מוצעת. אתה מגיב עם הצעה ממוקדת
              כשההתעניינות בשיא. ראה{" "}
              <Link href="/guides/leads-from-facebook-groups" className="text-brand-300 underline">
                איך משיגים לידים מקבוצות פייסבוק
              </Link>
              .
            </p>

            <h2>מיקוד: ליסינג, מכירה או מוסך</h2>
            <p>
              אתה בוחר על מה לקבל התראות. סוכן ליסינג יגדיר &quot;ליסינג&quot;, &quot;ליסינג
              תפעולי&quot;; סוחר רכב יגדיר &quot;רכב יד שנייה&quot;, &quot;טרייד אין&quot;; מוסך יגדיר
              &quot;מוסך&quot;, &quot;תקלה ברכב&quot;. אם אתה בעל מוסך, ראה גם את דף{" "}
              <Link href="/lidim/lidim-lemoosach" className="text-brand-300 underline">
                לידים למוסך
              </Link>
              , ולסוחרים —{" "}
              <Link href="/lidim/lidim-mechirat-rechavim" className="text-brand-300 underline">
                לידים למכירת רכבים
              </Link>
              .
            </p>

            <h2>הראשון שמגיב סוגר</h2>
            <p>
              בשוק הרכב, הקונה פונה לכמה מקומות בבת אחת ומחליט מהר. תגובה תוך דקות — עם מחיר או זמינות
              — היא ההבדל בין עסקה לפספוס. קבלת הפנייה ישירות לוואטסאפ מאפשרת לך להיות תמיד הראשון.
              הרחבנו ב-
              <Link href="/guides/speed-to-lead" className="text-brand-300 underline">
                מהירות תגובה לליד
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
              בתחום הרכב והליסינג, הלקוחות מחפשים בקבוצות בכל יום, וערך העסקה גבוה. מי שתופס את
              הפניות ראשון, בלעדית ובעלות קבועה, בונה יתרון אמיתי על המתחרים. {SITE.brand}:{" "}
              {SITE.pricing.monthlyILS}₪/חודש קבוע, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">קבל פניות רכב וליסינג — לוואטסאפ</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} מזהה עם AI פניות רכב אמיתיות ושולחת לך אותן תוך שניות.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני עוסק בתחום הרכב/ליסינג ורוצה לקבל פניות")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base"
              >
                שאלה? דברו איתנו בוואטסאפ
              </a>
            </div>
            <p className="mt-4 text-sm text-ink-400">
              רוצה לראות את דף הקטגוריה?{" "}
              <Link href="/lidim/lidim-rechev-leasing" className="text-brand-300 underline">
                לידים לרכב וליסינג
              </Link>
            </p>
          </div>

          <RelatedGuides
            currentSlug={SLUG}
            related={["why-buying-leads-fails", "speed-to-lead", "leads-from-facebook-groups"]}
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
