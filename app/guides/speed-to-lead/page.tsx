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

const SLUG = "speed-to-lead";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "כמה מהר צריך לענות לליד?",
    a: "כמה שיותר מהר — אידיאלית תוך 5 דקות מרגע הפנייה. מחקרים מראים שהסיכוי ליצור קשר אפקטיבי עם ליד צונח באופן דרמטי כבר אחרי 5 הדקות הראשונות, ויורד עוד יותר אחרי השעה הראשונה.",
  },
  {
    q: "מה זה Speed to Lead?",
    a: "Speed to Lead (מהירות תגובה לליד) הוא הזמן שעובר מרגע שליד נכנס ועד שאתה יוצר איתו קשר ראשון. זהו אחד הגורמים החזקים ביותר בשיעור הסגירה — ולרוב הזול ביותר לשיפור, כי הוא תלוי רק בך.",
  },
  {
    q: "למה מי שעונה ראשון זוכה בליד?",
    a: "כי ליד חם — במיוחד מקבוצת פייסבוק — לרוב פונה לכמה עסקים או מקבל כמה תגובות. האדם בוחר את מי שהגיב ראשון, ענייני וזמין. הראשון תופס את תשומת הלב, בונה אמון ראשוני, ולרוב סוגר לפני שהמתחרים בכלל הגיבו.",
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
            <h2>הגורם היחיד שאתה שולט בו לגמרי</h2>
            <p>
              את איכות הליד אתה לא תמיד קובע. את המחיר שהמתחרים גובים אתה לא קובע. אבל יש גורם אחד
              בסגירת לידים שנמצא ב-100% בשליטתך — <strong>כמה מהר אתה מגיב</strong>. וזה במקרה גם אחד
              הגורמים החזקים ביותר בשיעור הסגירה. במילים אחרות: זו ההזדמנות הזולה והקלה ביותר לסגור
              יותר עסקאות, בלי להוציא שקל נוסף על לידים.
            </p>

            <h2>מה זה Speed to Lead</h2>
            <p>
              <strong>Speed to Lead (מהירות תגובה לליד)</strong> הוא הזמן שעובר מרגע שליד נכנס — פוסט
              בקבוצה, הודעה, טופס — ועד שאתה יוצר איתו קשר ראשון. ככל שהזמן קצר יותר, כך גדל הסיכוי
              ליצור קשר אפקטיבי ולסגור. זה נכון בכל תחום, אבל קריטי במיוחד בלידים חמים.
            </p>

            <h2>הנתונים: למה 5 הדקות הראשונות מכריעות</h2>
            <p>
              מחקרים חוזרים בתחום המכירות מצביעים על אותו דפוס חד:
            </p>
            <ul>
              <li>
                <strong>תגובה תוך 5 דקות</strong> מעלה דרמטית את הסיכוי ליצור קשר אפקטיבי לעומת תגובה
                אחרי 30 דקות.
              </li>
              <li>
                <strong>אחרי השעה הראשונה</strong> הסיכוי ליצור קשר משמעותי צונח — הליד "התקרר", פנה
                למתחרים, או עבר הלאה.
              </li>
              <li>
                <strong>מי שעונה ראשון</strong> סוגר בשיעור גבוה משמעותית — לא כי הוא הזול או הטוב
                ביותר, אלא כי הוא <em>היה שם</em> כשהלקוח היה בשיא הכוונה.
              </li>
            </ul>
            <p>
              ההיגיון פשוט: כשמישהו כותב בקבוצה "מחפש מנעולן דחוף", הוא בשיא הצורך <em>עכשיו</em>. עוד
              שעתיים — הוא כבר מצא, או שמישהו אחר כבר בדרך אליו.
            </p>

            <h2>למה ליד מקבוצת פייסבוק רגיש למהירות פי כמה</h2>
            <p>
              בליד מטופס באתר, האדם פנה רק אליך. בליד מקבוצת פייסבוק, <strong>הפוסט פומבי</strong> —
              עשרות בעלי מקצוע רואים אותו, וכמה יגיבו. זה מרוץ. מי שמגיב ראשון, ענייני וזמין, תופס את
              השיחה הפרטית — והשאר מדברים לקיר. לכן בלידים אורגניים מקבוצות, מהירות היא לא יתרון; היא
              תנאי. ראה גם{" "}
              <Link href="/guides/leads-from-facebook-groups" className="text-brand-300 underline">
                איך משיגים לידים מקבוצות פייסבוק
              </Link>
              .
            </p>

            <h2>הבעיה: אי אפשר להיות מהיר ידנית</h2>
            <p>
              הכוונה טובה, אבל המציאות אכזרית: אתה בעבודה, בנהיגה, עם לקוח, או ישן. אתה לא יושב מול
              פייסבוק 24/7 מחכה שמישהו יכתוב. עד שתראה את הפוסט — אם בכלל — עברו שעות. <strong>הפער
              בין "אני יודע שצריך לענות מהר" ל"אני באמת עונה מהר" הוא איפה שרוב הלידים נשרפים.</strong>
            </p>

            <h2>הפתרון: התראה מיידית + תגובה מוכנה</h2>
            <p>שלושה דברים הופכים אותך מ"איטי" ל"ראשון":</p>
            <ol>
              <li>
                <strong>התראה בזמן אמת</strong> — שתדע על הליד תוך שניות מהפרסום, לא כשתיכנס לפייסבוק
                במקרה.
              </li>
              <li>
                <strong>תגובה מוכנה מראש</strong> — תבנית פתיחה (או תגובה מוצעת אוטומטית) שמאפשרת לך
                לענות במשפט אחד, מיד, בלי לחשוב מאפס.
              </li>
              <li>
                <strong>ערוץ אחד מרוכז</strong> — כל הלידים מגיעים למקום אחד (וואטסאפ), כך שאתה לא
                מפספס בין אפליקציות.
              </li>
            </ol>
            <p>
              בדיוק זה מה ש-{SITE.brand} עושה: ברגע שמישהו מפרסם פוסט שמחפש את השירות שלך באחת מ-50,000
              הקבוצות שאנחנו סורקים, אתה מקבל התראה לוואטסאפ תוך שניות — עם קישור לפוסט ו<strong>תגובה
              מוצעת שכתב AI</strong>. אתה הופך לראשון שמגיב, אוטומטית.
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
              מהירות תגובה היא הזול והקל ביותר מבין כל המנופים שמשפיעים על סגירת לידים — והכי מוזנח.
              חמש הדקות הראשונות שוות יותר מכל שעה אחרת. הבעיה היחידה היא שאי אפשר להיות מהיר ידנית סביב
              השעון — ולכן צריך אוטומציה. {SITE.brand} דואגת שתהיה הראשון שמגיב, בכל פעם:
              {SITE.pricing.monthlyILS}₪/חודש, ערבות החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">היה הראשון שמגיב — אוטומטית</h3>
            <p className="mt-2 text-ink-200">
              {SITE.brand} שולחת לך התראה לוואטסאפ תוך שניות מפרסום הפוסט, עם תגובה מוכנה. אתה רק שולח.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, קראתי על מהירות תגובה לליד ויש לי שאלה")}
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
            related={["lead-handling-mistakes", "follow-up-cold-leads", "leads-from-facebook-groups"]}
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
