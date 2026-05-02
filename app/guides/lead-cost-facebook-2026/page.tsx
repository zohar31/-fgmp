import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { getGuide } from "@/lib/guides";
import { SITE } from "@/lib/config";

const SLUG = "lead-cost-facebook-2026";
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

export default function LeadCostGuide() {
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
            <h2>4 ערוצי לידים — והעלות האמיתית של כל אחד</h2>

            <h3>1. מודעות ממומנות בפייסבוק (Lead Ads)</h3>
            <p>
              <strong>עלות ממוצעת לליד בישראל ב-2026:</strong> 35-180 ₪.
            </p>
            <p>
              העלות תלויה במידה רבה ב<em>תחום</em>: ביטוח ופיננסים — 80-180 ₪. שיפוצים — 25-60 ₪.
              שירותים יומיומיים (ניקיון, גינון) — 15-35 ₪. נדל"ן — 50-150 ₪.
            </p>
            <p>
              <strong>הבעיה הסמויה:</strong> איכות הליד משתנה דרמטית. מחקר של HubSpot מראה ש-30%-50%
              מהלידים מ-Lead Ads הם מספרי טלפון לא תקינים, אנשים שלא זוכרים שהשאירו פרטים, או שאינם
              באמת מעוניינים בקנייה. אז העלות "האמיתית" לליד <em>איכותי</em> בפועל גבוהה ב-50%-100%
              מהמספר על המסך.
            </p>

            <h3>2. גוגל אדס (PPC)</h3>
            <p>
              <strong>עלות ממוצעת לליד בישראל ב-2026:</strong> 50-300 ₪.
            </p>
            <p>
              גוגל יקר יותר אבל לידים איכותיים יותר — אדם שחיפש פעיל "שיפוצניק במרכז" כבר במצב רכישה.
              בעיה: רף כניסה גבוה. כדי להיות בעמוד הראשון על מילים תחרותיות בעברית, ההצעה המינימלית
              היא 4-12 ₪ לקליק, ושיעור ההמרה מקליק לליד הוא 5%-15%.
            </p>

            <h3>3. SEO אורגני (Inbound)</h3>
            <p>
              <strong>עלות לליד אחרי 6 חודשי בנייה:</strong> 5-20 ₪.
            </p>
            <p>
              הזולה ביותר אם מצליחים. אבל דורש: בלוג עם 20+ מאמרי איכות, אופטימיזציה טכנית, בניית
              קישורים, וסבלנות של 6-12 חודשים. עלות ההקמה: 10,000-40,000 ₪. אחרי שזה מתחיל לעבוד —
              לידים זולים מאוד, אבל זה לא קסם של חודשיים.
            </p>

            <h3>4. לידים מקבוצות פייסבוק (FGMP)</h3>
            <p>
              <strong>עלות לליד אצל לקוחות {SITE.brand}:</strong> 5-30 ₪ בממוצע.
            </p>
            <p>
              זה הזרם הכי לא-מנוצל בישראל. עלות חודשית קבועה של {SITE.pricing.monthlyILS} ₪. ממוצע
              לידים בחודש בלקוחות פעילים: 30-150 (תלוי בתחום, באזור הגיאוגרפי ובמילות המפתח שתבחר —
              אנחנו סורקים 50,000+ קבוצות פייסבוק פעילות בישראל, לא הקבוצות שלך). חישוב פשוט:
            </p>
            <ul>
              <li>30 לידים בחודש = {SITE.pricing.monthlyILS}/30 = ~10 ₪ לליד</li>
              <li>60 לידים בחודש = {SITE.pricing.monthlyILS}/60 = ~5 ₪ לליד</li>
              <li>100 לידים בחודש = {SITE.pricing.monthlyILS}/100 = ~3 ₪ לליד</li>
            </ul>
            <p>
              <strong>איכות הליד:</strong> שיעור ההמרה מליד פייסבוק קבוצה לעסקה אצל הלקוחות שלנו עומד
              על 18%-24% — לעומת 1.5%-3% מ-Lead Ads. לכן ה<em>עלות האמיתית לעסקה סגורה</em> זולה
              משמעותית.
            </p>

            <h2>השוואה: עלות לליד לעומת עלות לעסקה סגורה</h2>
            <p>
              ההשוואה הנכונה לא "כמה עולה ליד" — אלא "כמה עולה <strong>לקוח משלם</strong>". טבלה
              מקצרת לתחום שיפוצים (נתוני 2026):
            </p>
            <ul>
              <li>
                <strong>Facebook Lead Ads:</strong> 45 ₪ לליד × 30 לידים = 1,350 ₪. שיעור המרה 2.5% =
                כמעט 0.75 עסקאות. <strong>1,800 ₪ לעסקה.</strong>
              </li>
              <li>
                <strong>Google Ads:</strong> 130 ₪ לליד × 12 לידים = 1,560 ₪. שיעור המרה 8% = ~1
                עסקה. <strong>1,560 ₪ לעסקה.</strong>
              </li>
              <li>
                <strong>FGMP:</strong> {SITE.pricing.monthlyILS} ₪ × 60 לידים = ~5 ₪ לליד. שיעור המרה
                20% = 12 עסקאות. <strong>~25 ₪ לעסקה.</strong>
              </li>
            </ul>
            <p>
              ה-ROI שונה בסדר גודל. אבל שים לב: זה לא "במקום". הלידים מקבוצות הם <em>בנוסף</em> ל-Lead
              Ads ול-Google. הם זרם נפרד שעד עכשיו לא נוצל.
            </p>

            <h2>איך מורידים עלות לליד? 5 כללים</h2>
            <ol>
              <li>
                <strong>אל תתחרה במלים יקרות.</strong> "ביטוח" עולה 12 ₪ לקליק. "ביטוח לגן ילדים" 1.20 ₪.
                ספציפיות מורידה עלות פי 10.
              </li>
              <li>
                <strong>השתמש ב-3 ערוצים במקביל.</strong> כל ערוץ נותן ליד שונה. הסתמכות על אחד = יקר ושביר.
              </li>
              <li>
                <strong>תחזק שיעור המרה.</strong> ירידה משיעור המרה של 5% ל-3% מכפילה את עלות הליד שלך.
                תשובה תוך 5 דק' היא הדרך הזולה ביותר להעלות שיעור המרה.
              </li>
              <li>
                <strong>תייצר אסמכתא חברתית.</strong> ביקורות, תמונות עבודה, סרטונים. לידים שראו 10
                ביקורות חיוביות ממירים פי 2.5.
              </li>
              <li>
                <strong>נצל ערוצים בעלות חודשית קבועה.</strong> Lead Ads העלות לליד עולה כשמגדילים
                תקציב. {SITE.brand} (ולמעשה כל שירות SaaS) — מספר הלידים גדל אבל העלות נשארת קבועה.
                זו הוואקום של scaling זול.
              </li>
            </ol>

            <h2>המסקנה</h2>
            <p>
              ב-2026, ליד מפייסבוק "אמיתי" עולה הרבה יותר ממה שמופיע בדשבורד. הבעיה היא לא הליד —
              הבעיה היא איכות. אם עלות עסקה סגורה היא הקריטריון (וזה הקריטריון הנכון) — לידים מקבוצות
              פייסבוק הם סגנון לידים זול ב-עשרות פעמים. לא מחליף את שאר הערוצים, אבל חייב להיות בערכת
              הכלים של כל עסק שירותים בישראל.
            </p>
            <p>
              <Link href="/guides/leads-from-facebook-groups" className="text-brand-300 underline">
                המדריך המלא: איך משיגים לידים חמים מקבוצות פייסבוק
              </Link>
            </p>
          </div>

          <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <h3 className="font-display text-2xl font-bold text-white">
              רוצה לראות את העלות האמיתית עבור התחום שלך?
            </h3>
            <p className="mt-2 text-ink-200">
              {SITE.pricing.trialDays} ימי ניסיון חינם. תקבל לידים אמיתיים, תחשב את שיעור ההמרה שלך,
              ותחליט.
            </p>
            <div className="mt-6">
              <Link href="/login" className="btn-wa text-base">
                <CheckCircle2 className="h-5 w-5" />
                התחילו ניסיון חינם
              </Link>
            </div>
          </div>

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
