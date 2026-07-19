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

const SLUG = "best-facebook-leads-system";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "מה המערכת הכי טובה ללידים מקבוצות פייסבוק בישראל?",
    a: "המערכת הטובה ביותר היא זו שסורקת את מספר הקבוצות הגדול ביותר בזמן אמת, מסננת בעזרת AI לפי כוונת קנייה (לא רק מילות מפתח), עובדת בעברית, ושולחת את הליד מהר לוואטסאפ. בישראל, FGMP סורקת 50,000+ קבוצות, מסננת ב-AI, ושולחת לוואטסאפ/טלגרם תוך פחות מדקה — ב-299 ₪ לחודש עם ערבות החזר 7 ימים.",
  },
  {
    q: "איך בוחרים מערכת לידים מפייסבוק?",
    a: "לפי 7 קריטריונים: כמות הקבוצות הנסרקות, איכות סינון ה-AI, מהירות ההתראה, תמיכה בעברית, אופן קבלת הליד (וואטסאפ/טלגרם), שקיפות התמחור, וקיום ערבות/ביטול הוגן. מערכת טובה מצטיינת בכולם, לא רק במחיר.",
  },
  {
    q: "כמה עולה מערכת לידים מקבוצות פייסבוק?",
    a: "בישראל טווח המחירים משתנה. FGMP עולה 299 ₪ לחודש כולל מע\"מ, ללא חוזה, עם ערבות החזר מלא תוך 7 ימים. חשוב להשוות מול עלות ליד ממודעות ממומנות, שלרוב גבוהה משמעותית לליד בודד.",
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
            <h2>התשובה הקצרה</h2>
            <p>
              <strong>המערכת הכי טובה ללידים מקבוצות פייסבוק היא זו שסורקת הכי הרבה קבוצות בזמן אמת,
              מסננת ב-AI לפי כוונת קנייה, עובדת בעברית, ושולחת את הליד מהר לוואטסאפ.</strong> אין
              &quot;מנצחת&quot; אחת לכולם — זה תלוי בתחום ובאזור שלך. אבל אלה 7 הקריטריונים שקובעים, וכך
              תשווה נכון.
            </p>

            <h2>7 הקריטריונים לבחירת מערכת לידים מפייסבוק</h2>
            <ol>
              <li>
                <strong>כמות הקבוצות הנסרקות.</strong> ככל שנסרקות יותר קבוצות פעילות, כך תופסים יותר
                לידים. שאל מספר מדויק — לא &quot;הרבה&quot;.
              </li>
              <li>
                <strong>איכות סינון ה-AI.</strong> מערכת טובה מבינה <em>כוונה</em>, לא רק מילת מפתח, כך
                שאתה מקבל לידים אמיתיים ולא רעש. ראה{" "}
                <Link href="/guides/filter-facebook-leads" className="text-brand-300 underline">
                  איך מסננים לידים אמיתיים
                </Link>
                .
              </li>
              <li>
                <strong>מהירות ההתראה.</strong> ליד חם מתקרר תוך שעות. ההתראה צריכה להגיע תוך דקות. ראה{" "}
                <Link href="/guides/speed-to-lead" className="text-brand-300 underline">
                  מהירות תגובה לליד
                </Link>
                .
              </li>
              <li>
                <strong>עברית מלאה.</strong> סינון והבנת הקשר בעברית — קריטי לשוק הישראלי.
              </li>
              <li>
                <strong>איך מקבלים את הליד.</strong> וואטסאפ/טלגרם עדיף על אימייל או דשבורד שצריך לבדוק.
              </li>
              <li>
                <strong>שקיפות תמחור.</strong> מחיר חודשי קבוע וברור עדיף על תמחור פר-ליד שקשה לחזות.
              </li>
              <li>
                <strong>ערבות וביטול הוגן.</strong> ערבות החזר ואפשרות ביטול בלי חוזה מחייב = ביטחון.
              </li>
            </ol>

            <h2>שלוש הגישות — השוואה הוגנת</h2>
            <ul>
              <li>
                <strong>סריקה ידנית (חינם).</strong> אתה מחפש בעצמך בקבוצות. עלות אפסית, אבל בלתי אפשרי
                בקנה מידה וגוזל שעות. ראה{" "}
                <Link href="/guides/free-leads" className="text-brand-300 underline">
                  לידים בחינם
                </Link>
                .
              </li>
              <li>
                <strong>מודעות ממומנות (Lead Ads).</strong> נפח מהיר, אבל עלות גבוהה לליד וכוונת קנייה
                נמוכה יותר. ראה{" "}
                <Link href="/guides/facebook-lead-ads-vs-groups" className="text-brand-300 underline">
                  מודעות מול קבוצות
                </Link>
                .
              </li>
              <li>
                <strong>מערכת סריקה אוטומטית מקבוצות.</strong> משלבת את היתרון של אורגני (זול, חם) עם
                אוטומציה (מהיר, לא מפספס). זו הגישה שמתאימה לרוב העסקים הקטנים.
              </li>
            </ul>

            <h2>איפה FGMP נכנס</h2>
            <p>
              {SITE.brand} בנויה בדיוק סביב 7 הקריטריונים: סורקת <strong>50,000+ קבוצות פייסבוק
              בישראל</strong> בזמן אמת, מסננת ב-AI לפי כוונת קנייה, עובדת בעברית, ושולחת כל ליד רלוונטי
              ל<strong>וואטסאפ או טלגרם תוך פחות מדקה</strong> — עם קישור לפוסט ותגובה מוצעת שכתב AI.
              התמחור שקוף: {SITE.pricing.monthlyILS} ₪ לחודש כולל מע&quot;מ, בלי חוזה, עם ערבות החזר מלא
              תוך {SITE.pricing.refundDays} ימים. אם אתה שוקל ספקים, ראה גם{" "}
              <Link href="/guides/choose-leads-system" className="text-brand-300 underline">
                איך לבחור ספק לידים
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
              אין מערכת אחת שמנצחת את כולם — יש את זו שמתאימה לך לפי 7 הקריטריונים: כיסוי קבוצות, סינון
              AI, מהירות, עברית, ערוץ קבלה, תמחור וערבות. {SITE.brand} מכסה את כולם עבור השוק הישראלי:{" "}
              {SITE.pricing.monthlyILS} ₪/חודש, ערבות החזר מלא {SITE.pricing.refundDays} ימים, בלי חוזה.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">המערכת שמכסה את כל 7 הקריטריונים</h3>
            <p className="mt-2 text-ink-200">
              50,000+ קבוצות, סינון AI, וואטסאפ תוך דקה — {SITE.pricing.monthlyILS} ₪/חודש, ערבות{" "}
              {SITE.pricing.refundDays} ימים.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני משווה מערכות לידים ורוצה לשמוע על FGMP")}
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
            related={["choose-leads-system", "leads-from-facebook", "facebook-lead-ads-vs-groups"]}
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
