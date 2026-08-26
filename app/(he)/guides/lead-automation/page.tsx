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

const SLUG = "lead-automation";
const guide = getGuide(SLUG)!;

const faqs = [
  {
    q: "מה זה אוטומציית לידים?",
    a: "אוטומציית לידים היא שימוש בכלים שמבצעים אוטומטית שלבים בתהליך הליד — איתור הלידים, התראה מיידית, תגובה ראשונה ומעקב — במקום לעשות הכל ידנית. המטרה היא שאף ליד לא ייפול כי היית עסוק, ושתגיב מהר יותר מהמתחרים.",
  },
  {
    q: "אילו שלבים בתהליך הליד כדאי לאוטמט?",
    a: "כדאי לאוטמט את השלבים החוזרים והתלויים בזמן: איתור לידים (סריקת מקורות), התראה בזמן אמת, ניסוח תגובה ראשונה, ותזכורות מעקב. את השלב האנושי — השיחה, ההיכרות, סגירת העסקה — עדיף להשאיר לך, כי שם האמון נבנה.",
  },
  {
    q: "צריך מתכנת או תקציב גדול כדי להתחיל?",
    a: "לא. עסק קטן יכול להתחיל עם כלי מוכן שמחבר את השלבים בשבילו — למשל מערכת שסורקת קבוצות פייסבוק, מזהה לידים רלוונטיים ושולחת אותם לוואטסאפ עם תגובה מוצעת. זה עובד מהיום הראשון בעלות חודשית קבועה, בלי פיתוח.",
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
            <h2>מה אוטומציית לידים באמת אומרת</h2>
            <p>
              &quot;אוטומציה&quot; נשמעת מפחידה — כאילו רובוט ידבר עם הלקוחות שלך. זה לא זה.{" "}
              <strong>אוטומציית לידים</strong> פירושה שהשלבים החוזרים והתלויים בזמן בתהליך — איתור,
              התראה, תגובה ראשונה, מעקב — קורים אוטומטית, כדי שאף ליד לא ייפול בגלל שהיית בעבודה או
              ישן. השיחה עצמה, האמון, הסגירה — נשארים אנושיים. אתה פשוט מפסיק לפספס.
            </p>

            <h2>למה עסק קטן צריך את זה דווקא</h2>
            <p>
              דווקא לעסק קטן, בלי צוות שיווק, האוטומציה קריטית: אתה גם בעל המקצוע, גם המכירות, גם
              השירות. אין לך זמן לשבת מול פייסבוק כל היום או לזכור לעקוב אחרי כל פנייה. כל ליד שנשכח הוא
              כסף שהלך. אוטומציה נכונה נותנת לך את היתרון של עסק גדול — <strong>מהירות ועקביות</strong> —
              בלי לשכור אף אחד.
            </p>

            <h2>4 שלבים בתהליך הליד — ומה לאוטמט בכל אחד</h2>
            <ol>
              <li>
                <strong>איתור לידים.</strong> במקום לחפש ידנית בקבוצות, מערכת סורקת מקורות בזמן אמת
                ומזהה פוסטים רלוונטיים. זה החלק שהכי משתלם לאוטמט — הוא בלתי אפשרי ידנית בקנה מידה.
              </li>
              <li>
                <strong>התראה מיידית.</strong> ברגע שנמצא ליד — התראה תוך שניות (לוואטסאפ), לא &quot;כשאזכר
                לבדוק&quot;. זה מה שהופך אותך לראשון שמגיב. ראה{" "}
                <Link href="/guides/speed-to-lead" className="text-brand-300 underline">
                  מהירות תגובה לליד
                </Link>
                .
              </li>
              <li>
                <strong>תגובה ראשונה.</strong> תבנית פתיחה מוכנה — או תגובה מוצעת שכתב AI לפי הפוסט —
                שמאפשרת לך לענות במשפט אחד, מיד. אתה עדיין מאשר ושולח; פשוט לא מתחיל מאפס.
              </li>
              <li>
                <strong>מעקב.</strong> תזכורת לחזור ללידים שלא ענו. 60% מהעסקאות נסגרות בפולואפ. ראה{" "}
                <Link href="/guides/follow-up-cold-leads" className="text-brand-300 underline">
                  איך עוקבים אחרי ליד שלא ענה
                </Link>
                .
              </li>
            </ol>

            <h2>מה דווקא לא לאוטמט</h2>
            <p>
              אל תאוטמט את <strong>הקשר האנושי</strong>. לקוח מזהה מיד הודעה גנרית ומנותקת. האוטומציה
              צריכה להביא אותך <em>מהר ומוכן</em> לשיחה — לא להחליף את השיחה. את ההיכרות, ההבנה של
              הצורך, המחיר וההתאמה — תעשה אתה. הכלל: אוטמט את <em>מה שחוזר ותלוי בזמן</em>, השאר אנושי
              את <em>מה שבונה אמון</em>.
            </p>

            <h2>איך מתחילים — בלי מתכנת</h2>
            <p>
              אתה לא צריך לבנות מערכת. הדרך הפשוטה ביותר לעסק קטן היא כלי מוכן שמחבר את ארבעת השלבים:
              {" "}{SITE.brand} סורקת עשרות אלפי קבוצות פייסבוק בזמן אמת, מזהה בעזרת AI רק לידים עם
              כוונת קנייה, ושולחת לך אותם לוואטסאפ עם קישור לפוסט ותגובה מוצעת. זה עובד מהיום הראשון,
              בעלות חודשית קבועה, בלי פיתוח ובלי תקציב מדיה משתנה. אם אתה שוקל ספקים, ראה{" "}
              <Link href="/guides/choose-leads-system" className="text-brand-300 underline">
                איך לבחור מערכת לידים
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
              אוטומציית לידים היא לא רובוט שמדבר במקומך — היא מנגנון שדואג שאף ליד לא ייפול, ושאתה מגיב
              מהר ומוכן. אוטמט את האיתור, ההתראה, התגובה הראשונה והמעקב; השאר אנושי את השיחה עצמה. עסק
              קטן יכול להתחיל היום, בלי מתכנת. {SITE.brand}: {SITE.pricing.monthlyILS}₪/חודש, ערבות
              החזר מלא {SITE.pricing.refundDays} ימים.
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">אוטמט את הלידים שלך — היום</h3>
            <p className="mt-2 text-ink-200">
              איתור, התראה ותגובה מוצעת — אוטומטית, ישר לוואטסאפ. אתה רק מאשר ושולח.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו עכשיו — {SITE.pricing.monthlyILS}₪/חודש
              </Link>
              <a
                href={waLink("היי, אני רוצה לשמוע על אוטומציית לידים לעסק שלי")}
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
            related={["choose-leads-system", "manage-leads-whatsapp", "leads-from-facebook-groups"]}
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
