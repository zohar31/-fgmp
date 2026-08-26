import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, TrendingUp, BarChart3 } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/config";

const PUBLISHED = "2026-07-25";

export const metadata: Metadata = {
  title: "מחקר לידים ישראל 2026 — נתונים מ-50,000 קבוצות",
  description:
    "נתונים מקוריים על שוק הלידים בישראל 2026: כמות פוסטים יומית, מחירי לידים לפי תחום, זמני תגובה ושיעורי המרה. מבוסס על 50,000+ קבוצות פעילות.",
  keywords: [
    "מחקר לידים",
    "נתוני לידים ישראל",
    "סטטיסטיקות לידים",
    "שוק הלידים בישראל",
    "מחירי לידים 2026",
  ],
  alternates: { canonical: `${SITE.url}/data` },
  openGraph: {
    type: "article",
    title: "מחקר לידים ישראל 2026 — הנתונים המלאים",
    description:
      "נתונים מקוריים על שוק הלידים בישראל: כמויות, מחירים, זמני תגובה ושיעורי המרה מ-50,000+ קבוצות פייסבוק.",
    url: `${SITE.url}/data`,
    publishedTime: PUBLISHED,
  },
};

// Dataset schema — מסמן לגוגל שזה מקור נתונים מקורי (מועמד ל-citation).
const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "מחקר שוק הלידים בישראל 2026 — FGMP",
  description:
    "נתונים מצטברים על היקף הפעילות בקבוצות פייסבוק בישראל ועל שוק הלידים: כמות פוסטים יומית, מילות מפתח, זמני תגובה, מחירי לידים לפי תחום ושיעורי המרה.",
  inLanguage: "he-IL",
  datePublished: PUBLISHED,
  creator: { "@type": "Organization", name: SITE.brand, url: SITE.url },
  publisher: { "@type": "Organization", name: SITE.brand, url: SITE.url },
  license: `${SITE.url}/data`,
  url: `${SITE.url}/data`,
  keywords: ["לידים", "פייסבוק", "שיווק", "ישראל", "lead generation"],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/data` },
  headline: "מחקר לידים ישראל 2026 — נתונים מ-50,000 קבוצות פייסבוק",
  description:
    "נתונים מקוריים על שוק הלידים בישראל 2026 מבוססים על ניתוח מתמשך של 50,000+ קבוצות פייסבוק פעילות.",
  inLanguage: "he-IL",
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { "@type": "Organization", name: SITE.brand, url: SITE.url },
  publisher: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
    logo: { "@type": "ImageObject", url: `${SITE.url}/icon` },
  },
  image: `${SITE.url}/og-image.jpeg`,
};

const HEADLINE_STATS: { value: string; label: string }[] = [
  { value: "50,000+", label: "קבוצות פייסבוק פעילות בישראל בניטור רציף" },
  { value: "50-60 אלף", label: "פוסטים מנותחים ע\"י AI מדי יום" },
  { value: "1,000+", label: "לידים רלוונטיים נשלחים ללקוחות מדי יום" },
  { value: "4,670+", label: "מילות מפתח פעילות במערכת" },
  { value: "< 60 שניות", label: "זמן ממוצע מפרסום הפוסט ועד ההתראה בוואטסאפ" },
  { value: "07:00–02:00", label: "שעות סריקה יומיות (19 שעות רצף)" },
];

// מחירון לידים לפי תחום — מתוך סקירת מחירוני שוק (יולי 2026)
const PRICE_BENCH: [string, string][] = [
  ["אינסטלציה", "100–210 ₪"],
  ["שיפוצים", "50–210 ₪"],
  ["מיזוג אוויר", "80–200 ₪"],
  ["משכנתאות", "53–98 ₪"],
  ["ביטוח בריאות/חיים", "85–110 ₪"],
  ["עורכי דין", "40–100 ₪"],
  ["חשמלאי", "40–70 ₪"],
  ["הובלות", "20–75 ₪"],
  ["החזרי מס", "10–63 ₪"],
  ["ליד פיננסי פרימיום (מאומת)", "400–700 ₪"],
];

export default function DataResearchPage() {
  return (
    <>
      <JsonLd data={datasetSchema} />
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "דף הבית", url: SITE.url },
          { name: "מחקר לידים 2026", url: `${SITE.url}/data` },
        ])}
      />
      <Nav />
      <main id="main-content" className="container-x py-10 md:py-16">
        <Breadcrumbs
          items={[
            { name: "דף הבית", href: "/" },
            { name: "מחקר לידים 2026", href: "/data" },
          ]}
        />

        <article className="mx-auto mt-8 max-w-3xl">
          <header>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-200 ring-1 ring-white/10">
              <BarChart3 className="h-3.5 w-3.5 text-brand-400" />
              נתונים מקוריים · עודכן {new Date(PUBLISHED).toLocaleDateString("he-IL", { month: "long", year: "numeric" })}
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              מחקר לידים ישראל 2026 — הנתונים המלאים
            </h1>
            <p className="mt-4 text-xl leading-9 text-ink-200">
              כמה פוסטים באמת מתפרסמים בקבוצות הפייסבוק בישראל? כמה עולה ליד לפי תחום? הנה
              הנתונים, מבוססים על ניתוח מתמשך של 50,000+ קבוצות פעילות ועל סקירת מחירוני השוק.
            </p>
          </header>

          {/* מדדי-על */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {HEADLINE_STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white/[0.03] p-5 text-center ring-1 ring-white/10"
              >
                <div className="font-display text-2xl font-extrabold text-brand-300 sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-2 text-xs leading-5 text-ink-300">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="prose prose-invert prose-lg mt-14 max-w-none">
            <h2>1. היקף הפעילות בקבוצות הפייסבוק בישראל</h2>
            <p>
              שוק הלידים האורגני בקבוצות פייסבוק בישראל גדול בהרבה ממה שרוב העסקים מעריכים. מתוך
              ניטור רציף של יותר מ-50,000 קבוצות פעילות, המערכת מנתחת <strong>50,000–60,000
              פוסטים ביום</strong>. מתוכם, אלפי פוסטים הם פניות ישירות של אנשים שמחפשים שירות
              ("מחפש/ת", "מי ממליץ", "צריך דחוף") — כלומר לידים אורגניים בכוונת קנייה גבוהה.
            </p>
            <p>
              המשמעות: בכל תחום שירות פעיל מתפרסמות עשרות עד מאות פניות רלוונטיות בשבוע — זרם
              לקוחות שקיים כבר היום, בלי תלות בתקציב פרסום.
            </p>

            <h2>2. מחירון לידים לפי תחום (סקירת שוק 2026)</h2>
            <p>
              ריכזנו את מחירי הלידים הפומביים של חברות הלידים בישראל. המחיר הוא לליד בודד בקנייה
              ישירה או בקמפיין ממומן:
            </p>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl ring-1 ring-white/10">
            <table className="w-full min-w-[360px] text-right text-sm">
              <thead>
                <tr className="bg-white/5 text-ink-200">
                  <th className="px-5 py-3 font-bold">תחום</th>
                  <th className="px-5 py-3 font-bold">מחיר שוק לליד</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-ink-200">
                {PRICE_BENCH.map(([field, range]) => (
                  <tr key={field} className="odd:bg-white/[0.02]">
                    <td className="px-5 py-2.5 font-medium text-white">{field}</td>
                    <td className="px-5 py-2.5">{range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-ink-400">
            מקור: סקירת מחירונים פומביים של חברות לידים ישראליות, יולי 2026. מחירון מלא ומפורט:{" "}
            <Link href="/guides/lead-price-list" className="text-brand-300 underline">
              מחירון לידים 2026
            </Link>
            .
          </p>

          <div className="prose prose-invert prose-lg mt-14 max-w-none">
            <h2>3. זמן תגובה — הגורם שקובע סגירה</h2>
            <p>
              הנתון העקבי ביותר בשוק הלידים: <strong>מהירות התגובה קובעת את שיעור הסגירה יותר
              מכל משתנה אחר</strong>. מענה תוך 5 דקות מהפנייה מעלה את סיכויי הסגירה פי כמה לעומת
              מענה שעה מאוחר יותר. זו הסיבה שזמן ההתראה הממוצע במערכת — פחות מ-60 שניות מפרסום
              הפוסט — הוא יתרון תחרותי ישיר.
            </p>

            <h2>4. עלות לליד אורגני מול ממומן</h2>
            <p>
              כשמחלקים עלות חודשית קבועה על נפח הלידים האורגני, העלות בפועל לליד יורדת לטווח של{" "}
              <strong>3–10 ₪</strong> בתחומים פעילים — פי 5 עד פי 20 פחות מקניית ליד בודד או
              ממודעה ממומנת. וזאת על ליד <em>חם</em> יותר, כי הוא מגיע מאדם שכתב בעצמו שהוא מחפש.
            </p>

            <h2>מתודולוגיה</h2>
            <p>
              נתוני ההיקף (כמות קבוצות, פוסטים יומיים, לידים ומילות מפתח) הם נתונים תפעוליים
              מצטברים ממערכת {SITE.brand}, מעוגלים. נתוני המחירים הם סקירת מחירונים פומביים של
              חברות לידים וסוכנויות בישראל נכון ליולי 2026, ומייצגים טווחים שמשתנים לפי אזור,
              עונה ורמת תחרות. מוזמנים לצטט בליווי קישור למקור.
            </p>
          </div>

          <div className="mt-12 rounded-3xl bg-gradient-to-br from-brand-500/15 to-wa/15 p-8 ring-1 ring-white/10 md:p-10">
            <div className="flex items-start gap-3">
              <TrendingUp className="mt-1 h-6 w-6 shrink-0 text-brand-300" />
              <div>
                <h3 className="font-display text-2xl font-bold text-white">
                  הנתונים האלה הם לקוחות. תתחיל לקבל אותם.
                </h3>
                <p className="mt-2 text-ink-200">
                  {SITE.brand} הופכת את זרם הפוסטים הזה ללידים בוואטסאפ שלך.{" "}
                  {SITE.pricing.monthlyILS}₪/חודש · ערבות החזר {SITE.pricing.refundDays} ימים.
                </p>
                <div className="mt-6">
                  <Link href="/login" className="btn-wa text-base">
                    התחילו עכשיו
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/5 pt-8">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              למדריכי הלידים המלאים
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
