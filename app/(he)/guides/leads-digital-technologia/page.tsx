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

const SLUG = "leads-digital-technologia";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "איפה בעלי עסקים מחפשים ספקי דיגיטל?",
    a: "בקבוצות פייסבוק של יזמים, בעלי עסקים וקהילות מקצועיות — 'מי בונה אתרים במחיר הוגן?', 'צריך מנהל קמפיינים', 'ממליצים על איש SEO?'. אלה לקוחות עם תקציב וכוונה, והם מחפשים ספק עכשיו.",
  },
  {
    q: "מגיעות פניות מבעלי עסקים ולא רק פרטיים?",
    a: "כן. המערכת סורקת גם קבוצות יזמים ובעלי עסקים, שם נכתבות בקשות לספקי דיגיטל (אתרים, קמפיינים, עיצוב, SEO) כל הזמן — בדיוק הלקוחות הכי שווים לפרילנסר או סוכנות.",
  },
  {
    q: "אני נותן שירות אחד בלבד — אפשר למקד?",
    a: "כן. תגדיר מילות מפתח כמו 'בניית אתר', 'ניהול קמפיינים', 'עיצוב לוגו' והמערכת תסמן רק פניות רלוונטיות לשירות שלך.",
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
            <h2>בעלי עסקים מחפשים ספקי דיגיטל בקבוצות</h2>
            <p>
              &quot;מי בונה אתרים במחיר הוגן?&quot;, &quot;צריך מנהל קמפיינים לפייסבוק&quot;, &quot;מחפש
              מעצב גרפי ללוגו&quot;, &quot;ממליצים על איש SEO?&quot; — בקבוצות של יזמים ובעלי עסקים
              נכתבות בקשות כאלה כל יום. אלה הלקוחות הכי שווים בתחום: יש להם תקציב, כוונה, וצורך מיידי.
            </p>

            <h2>הבעיה עם ההשגה הרגילה של לקוחות</h2>
            <p>
              רוב הפרילנסרים מחכים להפניות מפה לאוזן או שורפים תקציב על מודעות. שתי הדרכים איטיות
              ותלויות מזל. בינתיים, בקבוצות, לקוחות מבקשים ספק בדיוק כמוך — אבל אי אפשר לשבת ולסרוק
              עשרות אלפי קבוצות ידנית כדי לתפוס אותם.
            </p>

            <h2>איך תופסים פרויקטים בזמן אמת</h2>
            <p>
              {SITE.brand} סורקת 50,000+ קבוצות (כולל קבוצות יזמים ובעלי עסקים), מזהה עם AI פוסטים של
              מי שמחפש שירות דיגיטל בתחום שלך, ושולחת לך אותם לוואטסאפ תוך שניות — עם תגובה מוצעת. אתה
              שולח הצעה ראשון, כשהלקוח עוד מחפש. ראה{" "}
              <Link href="/guides/leads-from-facebook-groups" className="text-brand-300 underline">
                איך משיגים לידים מקבוצות פייסבוק
              </Link>
              .
            </p>

            <h2>מיקוד לפי השירות שלך</h2>
            <p>
              בונה אתרים יגדיר &quot;בניית אתר&quot;, &quot;חנות אונליין&quot;; מנהל קמפיינים יגדיר
              &quot;קמפיין&quot;, &quot;פרסום ממומן&quot;; מעצב יגדיר &quot;לוגו&quot;, &quot;מיתוג&quot;.
              אם אתה בתחום מסוים, ראה גם את דף{" "}
              <Link href="/lidim/lidim-lemarketing" className="text-brand-300 underline">
                לידים לשיווק
              </Link>{" "}
              ואת{" "}
              <Link href="/lidim/lidim-lebiniyat-atarim" className="text-brand-300 underline">
                לידים לבניית אתרים
              </Link>
              .
            </p>

            <h2>ההצעה הראשונה מנצחת</h2>
            <p>
              בעולם הפרילנס, הלקוח מקבל כמה הצעות ובוחר מהר — לרוב את הראשון שהרשים אותו. תגובה מהירה
              עם דוגמאות וזמינות ברורה עדיפה על כל פורטפוליו ששלחת יום אחרי. ראה{" "}
              <Link href="/guides/marketing-for-social-media-managers" className="text-brand-300 underline">
                שיווק למנהלי סושיאל ודיגיטל
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
              בתחום הדיגיטל והטכנולוגיה, לקוחות עסקיים מבקשים ספקים בקבוצות בכל יום. מי שתופס את
              הפניות האלה ראשון, בעלות קבועה, ממלא את יומן הפרויקטים בלי להיות תלוי בהפניות. {SITE.brand}:{" "}
              {SITE.pricing.monthlyILS}₪/חודש קבוע, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">קבל פרויקטים דיגיטליים — לוואטסאפ</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} מזהה עם AI בעלי עסקים שמחפשים שירותי דיגיטל ושולחת לך אותם תוך שניות.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני נותן שירותי דיגיטל/טכנולוגיה ורוצה לקבל פניות")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base"
              >
                שאלה? דברו איתנו בוואטסאפ
              </a>
            </div>
            <p className="mt-4 text-sm text-ink-400">
              רוצה לראות את דף הקטגוריה?{" "}
              <Link href="/lidim/lidim-digital-technologia" className="text-brand-300 underline">
                לידים לדיגיטל וטכנולוגיה
              </Link>
            </p>
          </div>

          <RelatedGuides
            currentSlug={SLUG}
            related={["marketing-for-social-media-managers", "why-buying-leads-fails", "leads-from-facebook-groups"]}
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
