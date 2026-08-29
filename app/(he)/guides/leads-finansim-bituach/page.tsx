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

const SLUG = "leads-finansim-bituach";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "איפה אנשים מחפשים סוכן ביטוח או יועץ פיננסי?",
    a: "בקבוצות פייסבוק — 'מי עשה לכם סדר בביטוחים?', 'איפה לוקחים הלוואה בריבית טובה?', 'ממליצים על יועץ משכנתאות?'. אלה פניות בכוונה גבוהה, ומי שמגיב ראשון עם ערך זוכה באמון ובעסקה.",
  },
  {
    q: "איך זה חוקי מבחינת פרטיות?",
    a: "המערכת מנתחת תוכן ציבורי שגלוי לכל חבר בקבוצה, ומאתרת אנשים שמבקשים בעצמם המלצה. אין גישה לחשבונות ואין התחזות — רק איתור פוסט פומבי ושליחתו אליך.",
  },
  {
    q: "אני מתמחה בתחום פיננסי אחד — אפשר למקד?",
    a: "כן. תגדיר מילות מפתח לפי ההתמחות — 'ביטוח בריאות', 'איחוד הלוואות', 'החזר מס', 'תכנון פנסיוני' — והמערכת תסמן רק פוסטים רלוונטיים.",
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
            <h2>פיננסים וביטוח — שוק של אמון והמלצה</h2>
            <p>
              אנשים לא בוחרים סוכן ביטוח או יועץ פיננסי מפרסומת — הם שואלים את הקהילה. &quot;מי עשה
              לכם סדר בביטוחים?&quot;, &quot;איפה כדאי לקחת הלוואה?&quot;, &quot;ממליצים על יועץ
              פנסיוני?&quot;. כל בקשה כזו היא לקוח בכוונה גבוהה — ומי שמגיב ראשון עם תשובה עניינית
              זוכה באמון ובעסקה.
            </p>

            <h2>למה לידים פיננסיים קנויים שורפים כסף</h2>
            <p>
              לידים פיננסיים בשוק יקרים (עשרות עד מאות שקלים לליד) ולרוב נמכרים לכמה סוכנים במקביל,
              קרים ומשומשים. אתה מתקשר למי שכבר דיבר עם חמישה סוכנים אחרים. ראה{" "}
              <Link href="/guides/why-buying-leads-fails" className="text-brand-300 underline">
                למה קניית לידים מבזבזת כסף
              </Link>{" "}
              ואת{" "}
              <Link href="/guides/lead-prices-finance" className="text-brand-300 underline">
                מחירון לידים בתחום הפיננסי
              </Link>
              . פנייה אמיתית מקבוצה היא בלעדית וחמה.
            </p>

            <h2>איך תופסים פניות פיננסיות בזמן אמת</h2>
            <p>
              {SITE.brand} סורקת 50,000+ קבוצות, מזהה עם AI פוסטים של מי שמחפש ביטוח, הלוואה, משכנתא
              או ייעוץ, ושולחת לך אותם לוואטסאפ תוך שניות — עם תגובה מוצעת מקצועית. אתה מגיב ראשון,
              בתחום שבו מהירות שווה עסקה. ראה{" "}
              <Link href="/guides/leads-from-facebook-groups" className="text-brand-300 underline">
                איך משיגים לידים מקבוצות פייסבוק
              </Link>
              .
            </p>

            <h2>מיקוד לפי התמחות</h2>
            <p>
              סוכן ביטוח יגדיר &quot;ביטוח בריאות&quot;, &quot;ביטוח חיים&quot;; סוכן אשראי יגדיר
              &quot;הלוואה&quot;, &quot;איחוד הלוואות&quot;; יועץ משכנתאות יגדיר &quot;משכנתא&quot;,
              &quot;מחזור משכנתא&quot;. אם אתה בתחום ספציפי, ראה גם את דף{" "}
              <Link href="/lidim/lidim-lesochen-bituach" className="text-brand-300 underline">
                לידים לסוכן ביטוח
              </Link>{" "}
              ואת{" "}
              <Link href="/lidim/lidim-halvaot" className="text-brand-300 underline">
                לידים להלוואות
              </Link>
              .
            </p>

            <h2>הראשון שמגיב זוכה באמון</h2>
            <p>
              בתחום הפיננסי, הפונה מחפש מישהו שיעשה לו סדר. תגובה מהירה, ברורה ובגובה העיניים — לפני
              שאר הסוכנים — היא שיוצרת את האמון ומובילה לפגישה. קבלת הפנייה מיד לוואטסאפ נותנת לך את
              יתרון הראשוניות. ראה{" "}
              <Link href="/guides/marketing-for-insurance-agents" className="text-brand-300 underline">
                שיווק לסוכני ביטוח
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
              פיננסים וביטוח הם שוק שחי על אמון, ואנשים מבקשים המלצות בקבוצות בכל יום. מי שתופס את
              הפניות האלה ראשון, בלעדית ובעלות קבועה, בונה זרם לקוחות יציב. {SITE.brand}:{" "}
              {SITE.pricing.monthlyILS}₪/חודש קבוע, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">קבל פניות פיננסים וביטוח — לוואטסאפ</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} מזהה עם AI מי שמחפש ביטוח, הלוואה או ייעוץ ושולחת לך אותו תוך שניות.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני בתחום הפיננסים/ביטוח ורוצה לקבל פניות")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base"
              >
                שאלה? דברו איתנו בוואטסאפ
              </a>
            </div>
            <p className="mt-4 text-sm text-ink-400">
              רוצה לראות את דף הקטגוריה?{" "}
              <Link href="/lidim/lidim-finansim-bituach" className="text-brand-300 underline">
                לידים לפיננסים וביטוח
              </Link>
            </p>
          </div>

          <RelatedGuides
            currentSlug={SLUG}
            related={["marketing-for-insurance-agents", "lead-prices-finance", "why-buying-leads-fails"]}
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
