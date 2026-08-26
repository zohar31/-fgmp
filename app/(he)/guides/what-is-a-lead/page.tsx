import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedGuides } from "@/components/RelatedGuides";
import { JsonLd, breadcrumbSchema, faqSchema, leadDefinedTermSchema } from "@/lib/jsonld";
import { getGuide } from "@/lib/guides";
import { SITE, waLink } from "@/lib/config";

const SLUG = "what-is-a-lead";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "מה זה ליד במילים פשוטות?",
    a: "ליד הוא אדם שהביע עניין בשירות או במוצר שלך — בין אם השאיר פרטים בטופס, שלח הודעה, או כתב בפומבי 'מחפש שיפוצניק'. ליד הוא לקוח פוטנציאלי, לא לקוח קיים.",
  },
  {
    q: "מה ההבדל בין ליד חם לליד קר?",
    a: "ליד חם הוא אדם שמחפש את השירות עכשיו, באופן אקטיבי (למשל פוסט 'מי ממליץ על מנעולן בדחיפות'). ליד קר הוא אדם שאולי יתעניין בעתיד אבל לא ביקש שום דבר כרגע. ליד חם נסגר בשיעור גבוה בהרבה.",
  },
  {
    q: "מה ההבדל בין ליד ללקוח?",
    a: "ליד הוא פנייה — מישהו שהתעניין. לקוח הוא מי שכבר שילם. המסע מליד ללקוח עובר דרך תגובה מהירה, בניית אמון, והצעה. רוב הלידים לא הופכים ללקוחות — לכן כמות ואיכות הלידים קריטיות.",
  },
  {
    q: "מאיפה מגיעים לידים לעסק קטן?",
    a: "המקורות הנפוצים: מודעות ממומנות (פייסבוק/גוגל), המלצות מפה לאוזן, אתר אינטרנט, ולידים אורגניים מקבוצות פייסבוק — אנשים שכותבים בפומבי שהם מחפשים שירות. לכל מקור עלות ואיכות שונה.",
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
  twitter: {
    card: "summary_large_image",
    title: guide.title,
    description: guide.description,
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
  keywords: guide.keywords.join(", "),
};

export default function GuidePage() {
  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={leadDefinedTermSchema()} />
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
            <h2>מה זה ליד? ההגדרה הפשוטה</h2>
            <p>
              <strong>ליד (Lead) הוא לקוח פוטנציאלי שהביע עניין בשירות או במוצר שלך.</strong> זהו אדם
              אמיתי שעשה פעולה כלשהי שמסמנת כוונה — מילא טופס, שלח הודעה בוואטסאפ, התקשר, או כתב בפומבי
              בקבוצת פייסבוק "מחפש בעל מקצוע". הוא עדיין לא לקוח — הוא לא שילם כלום — אבל הוא הצעד הראשון
              בדרך לעסקה.
            </p>
            <p>
              המילה מגיעה מאנגלית: <em>to lead</em> — להוביל. הליד "מוביל" אותך אל לקוח אפשרי. בעברית
              עסקית מקובל פשוט להגיד "ליד" (וברבים "לידים"). כל עסק שחי ממכירות — שיפוצניק, עורך דין,
              קוסמטיקאית, סוכן ביטוח, צלם — חי מזרם קבוע של לידים.
            </p>

            <h2>ליד מול לקוח — ההבדל הקריטי</h2>
            <p>
              זו הנקודה שמבלבלת הכי הרבה בעלי עסקים: <strong>ליד הוא לא לקוח.</strong> ליד הוא הזדמנות.
              בין הליד ללקוח המשלם יש מסע: תגובה מהירה, בניית אמון, מענה להתנגדויות, והצעה ברורה. רוב
              הלידים <em>לא</em> הופכים ללקוחות — וזה נורמלי. בעסקי שירות בישראל, שיעור המרה בריא נע בין
              15% ל-30% (מתוך כלל הלידים האיכותיים).
            </p>
            <p>
              לכן שני דברים קובעים את ההכנסה שלך: <strong>כמה לידים אתה מקבל</strong> ו
              <strong>איזה אחוז מהם אתה סוגר</strong>. אם תכפיל את אחד מהם — תכפיל את ההכנסה. רוב
              העסקים מתמקדים רק בראשון (להשיג עוד לידים) ושוכחים שהשני (לסגור טוב יותר) לרוב זול וקל יותר
              לשיפור.
            </p>

            <h2>סוגי לידים — חם, פושר, וקר</h2>
            <p>
              לא כל הלידים שווים. ההבדל המרכזי הוא <strong>רמת הכוונה</strong> ו<strong>הזמן שעבר</strong>:
            </p>
            <ul>
              <li>
                <strong>ליד חם</strong> — אדם שמחפש את השירות <em>עכשיו</em>, אקטיבית. לדוגמה: מישהו
                שכותב בקבוצה "ננעלתי בחוץ, צריך מנעולן דחוף בראשון לציון". כוונת רכישה מקסימלית, חלון
                זמן קצר. אלו הלידים הכי שווים — ושיעור הסגירה שלהם הכי גבוה.
              </li>
              <li>
                <strong>ליד פושר</strong> — מישהו שהתעניין אבל לא בוער לו. למשל הוריד מדריך, נרשם
                לרשימת תפוצה, או שאל מחיר "להבא". צריך טיפוח (nurturing) לאורך זמן.
              </li>
              <li>
                <strong>ליד קר</strong> — אדם שאתה פנית אליו בלי שביקש (שיחת מכירה יזומה, רשימה שקנית).
                שיעור ההמרה נמוך, נדרש הרבה מאמץ. רוב עסקי השירות הקטנים עדיף שיתמקדו בלידים חמים.
              </li>
            </ul>
            <p>
              להרחבה על למה מהירות התגובה משנה כל כך עבור לידים חמים, ראה{" "}
              <Link href="/guides/speed-to-lead" className="text-brand-300 underline">
                מהירות תגובה לליד
              </Link>
              .
            </p>

            <h2>ליד אורגני מול ליד ממומן</h2>
            <p>
              חיתוך נוסף וחשוב — <strong>איך הליד הגיע אליך</strong>:
            </p>
            <ul>
              <li>
                <strong>ליד ממומן</strong> — הגיע דרך פרסום ששילמת עליו (Facebook Lead Ads, Google Ads).
                אתה משלם פר-קליק או פר-ליד, בדרך כלל 15-150 ₪ לליד. שולט בכמות, אבל העלות מצטברת.
              </li>
              <li>
                <strong>ליד אורגני</strong> — הגיע בלי תשלום על פרסום: המלצה מפה לאוזן, חיפוש בגוגל,
                או פוסט בקבוצת פייסבוק שבו מישהו מחפש בדיוק אותך. עלות נמוכה מאוד, איכות לרוב גבוהה —
                כי האדם <em>יזם</em> את הפנייה.
              </li>
            </ul>
            <p>
              איזה עדיף? תלוי בעסק. עשינו על זה השוואה מלאה עם נתונים ב{" "}
              <Link href="/guides/organic-vs-paid-leads" className="text-brand-300 underline">
                לידים אורגניים מול ממומנים
              </Link>
              .
            </p>

            <h2>מאיפה לידים מגיעים לעסק קטן בישראל?</h2>
            <ol>
              <li><strong>מפה לאוזן והמלצות</strong> — הכי איכותי, אבל לא ניתן לשליטה או הגדלה.</li>
              <li><strong>מודעות ממומנות</strong> — מהיר להפעלה, אבל עולה כסף וההמרה לא תמיד מצדיקה.</li>
              <li><strong>אתר ו-SEO</strong> — בונה נכס לטווח ארוך, אבל לוקח חודשים.</li>
              <li>
                <strong>קבוצות פייסבוק</strong> — אלפי אנשים ביום כותבים "מחפש X". מקור עצום, חינמי,
                אבל בלתי אפשרי לעקוב ידנית אחרי כל הקבוצות.
              </li>
            </ol>
            <p>
              בדיוק את הבעיה האחרונה {SITE.brand} פותרת: המערכת סורקת 50,000+ קבוצות פייסבוק בישראל,
              מזהה את הפוסטים שמחפשים את השירות שלך, ושולחת לך אותם לוואטסאפ תוך שניות.
            </p>

            <h2>איך הופכים ליד ללקוח? (תמצית)</h2>
            <ol>
              <li><strong>תגיב מהר</strong> — תוך דקות, לא שעות. מי שעונה ראשון סוגר הכי הרבה.</li>
              <li><strong>תוסיף ערך לפני שתבקש</strong> — תשובה מקצועית קצרה בונה אמון מיידי.</li>
              <li><strong>תעבור לערוץ אישי</strong> — וואטסאפ או שיחה, לא תגובות פומביות.</li>
              <li><strong>אל תזרוק מחיר מוקדם מדי</strong> — קודם להבין צורך, אז להציע.</li>
              <li><strong>תעקוב</strong> — 60% מהעסקאות נסגרות בפנייה השנייה או השלישית.</li>
            </ol>
            <p>
              כל אחד מהשלבים האלה הוא מקום שבו עסקים מאבדים לידים. ריכזנו את הכשלים הנפוצים ב{" "}
              <Link href="/guides/lead-handling-mistakes" className="text-brand-300 underline">
                9 טעויות שהורגות לידים
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
              ליד הוא לקוח פוטנציאלי שהביע עניין — והוא חומר הגלם של כל עסק. ככל שהלידים חמים יותר
              (אנשים שמחפשים <em>עכשיו</em>) ואיכותיים יותר — כך קל יותר לסגור. הזרם החם, הזול והכי לא
              מנוצל בישראל הוא לידים אורגניים מקבוצות פייסבוק. {SITE.brand} הופכת אותו לאוטומטי:
              {SITE.pricing.monthlyILS}₪/חודש, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">רוצה לידים חמים אוטומטית?</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} מזהה אנשים שמחפשים את השירות שלך בקבוצות פייסבוק ושולחת לך אותם לוואטסאפ — תוך שניות.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, קראתי את המדריך על לידים ויש לי שאלה")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base"
              >
                שאלה? דברו איתנו בוואטסאפ
              </a>
            </div>
          </div>

          <RelatedGuides
            currentSlug={SLUG}
            related={["organic-vs-paid-leads", "speed-to-lead", "lead-handling-mistakes"]}
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
