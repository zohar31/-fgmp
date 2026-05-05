import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Activity, Globe, Search, Bell, Zap, ShieldCheck } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "מתודולוגיה — איך אנחנו מודדים את המספרים",
  description:
    "המקור והשיטה לכל מספר שמופיע באתר FGMP — 50,000+ קבוצות, 60,000+ פוסטים יומיים, 4,670+ מילות מפתח, 1,000+ לידים יומיים. מדד אמיתי, מעודכן בזמן אמת.",
  alternates: { canonical: `${SITE.url}/methodology` },
  openGraph: {
    type: "article",
    title: "מתודולוגיה — איך מודדים את הסטטיסטיקות של FGMP",
    description:
      "שקיפות מלאה: מקור הנתונים, שיטת המדידה, ועדכון תקופתי של המספרים שמופיעים ב-TrustBar.",
    url: `${SITE.url}/methodology`,
  },
};

const LAST_UPDATED = "2026-05-05";

export default function MethodologyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "דף הבית", url: SITE.url },
          { name: "מתודולוגיה", url: `${SITE.url}/methodology` },
        ])}
      />
      <Nav />
      <main id="main-content" className="container-x py-10">
        <Breadcrumbs
          items={[
            { name: "דף הבית", href: "/" },
            { name: "מתודולוגיה", href: "/methodology" },
          ]}
        />

        <article className="mx-auto mt-8 max-w-3xl">
          <header>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              מתודולוגיה
            </h1>
            <p className="mt-3 text-sm text-ink-400">
              עודכן לאחרונה: {new Date(LAST_UPDATED).toLocaleDateString("he-IL")}
            </p>
            <p className="mt-4 text-xl leading-9 text-ink-200">
              שקיפות מלאה למספרים שאנחנו מציגים. כל סטטיסטיקה באתר FGMP מבוססת על
              נתונים בפועל מה-DB של המערכת — לא הערכות, לא ניסוחים שיווקיים.
              הדף הזה מסביר את המקור והשיטה.
            </p>
          </header>

          <div className="mt-10 space-y-8">
            <Stat
              icon={Globe}
              value="50,000+"
              label="קבוצות פייסבוק נסרקות"
              source="ספירת ייחודיות (DISTINCT) של group_id במאגר הקבוצות הפעילות שלנו, נכון לרגע הסוף של היום הקודם."
              update="עדכון יומי בשעה 02:00"
              note='קבוצה נחשבת "פעילה" אם היא ציבורית, פורסמו בה לפחות 5 פוסטים בשבעת הימים האחרונים, והיא לא נחסמה ע"י פייסבוק.'
            />

            <Stat
              icon={Activity}
              value="50,000-60,000"
              label="פוסטים מנותחים יומית"
              source='ממוצע נע של 30 הימים האחרונים מטבלת ה-posts במערכת. כל פוסט שעובר דרך הסורק נספר פעם אחת בלבד (deduplication עם post_id ייחודי).'
              update="ממוצע נע — מתעדכן יומי"
              note="בימי שיא (חגים, סופי שבוע) המספר עולה ל-70K+. בימי שלי (ימי שני בבוקר, אחרי חגים) יורד ל-40K."
            />

            <Stat
              icon={Search}
              value="4,670+"
              label="מילות מפתח פעילות"
              source="ספירה אגרגטיבית של מילות המפתח שכל המנויים הפעילים שלנו הגדירו, אחרי הסרת כפילויות (DISTINCT LOWER(keyword))."
              update="ספירה בזמן אמת — מתעדכן בכל הוספה/הסרה של מילה"
              note="כולל גם מילות שלילה (מסננות פניות לא רלוונטיות) וגם מילות חיוב (מאתרות לידים)."
            />

            <Stat
              icon={Bell}
              value="1,000+"
              label="לידים נשלחים יומית"
              source='ממוצע נע של 30 הימים האחרונים מטבלת leads_sent. נספרים רק לידים שעברו את סינון ה-AI ונשלחו בפועל ללקוח (ולא נחסמו ע"י filter שלילי).'
              update="ממוצע נע — מתעדכן יומי"
              note="המספר משקף סכום על פני כל המנויים. מנוי בודד מקבל בין 5 ל-200+ לידים בחודש לפי תחום ואזור."
            />

            <Stat
              icon={Zap}
              value="<60 שניות"
              label="זמן תגובה ממוצע"
              source="זמן בין timestamp של פרסום הפוסט (כפי שמופיע ב-Facebook) לבין timestamp של שליחת ההתראה לוואטסאפ של הלקוח. נמדד על מדגם של 1,000 לידים אחרונים."
              update="ממוצע מתגלגל — נמדד שבועי"
              note='בקבוצות בעלות "feed velocity" גבוהה (פוסטים תכופים), הזמן יורד לפעמים ל-15-30 שניות. בקבוצות שקטות הזמן עולה ל-2-3 דקות.'
            />
          </div>

          <div className="mt-12 rounded-3xl border border-white/5 bg-white/[0.02] p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-brand-300" />
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  אימות והאמתות
                </h2>
                <p className="mt-2 text-ink-200">
                  אנחנו מוכנים להראות את המספרים האמיתיים בכל רגע נתון. לקוחות עסקיים
                  פוטנציאליים מוזמנים לתאם הדגמה — נראה את המסך של ה-DB החי.
                </p>
                <p className="mt-3 text-sm text-ink-300">
                  ליצירת קשר:{" "}
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-300 hover:underline"
                  >
                    WhatsApp 058-5222227
                  </a>{" "}
                  או{" "}
                  <a
                    href={`mailto:${SITE.notificationEmail}`}
                    className="text-brand-300 hover:underline"
                  >
                    {SITE.notificationEmail}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/5 pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              חזרה לדף הבית
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
  source,
  update,
  note,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  source: string;
  update: string;
  note?: string;
}) {
  return (
    <div className="card p-6">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-500/10 ring-1 ring-brand-500/20">
          <Icon className="h-6 w-6 text-brand-300" />
        </div>
        <div className="flex-1">
          <div className="font-display text-3xl font-extrabold text-white">{value}</div>
          <div className="mt-1 text-sm font-medium text-ink-100">{label}</div>
          <dl className="mt-4 space-y-2 text-sm">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-ink-400">
                מקור
              </dt>
              <dd className="mt-1 text-ink-200">{source}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-ink-400">
                תדירות עדכון
              </dt>
              <dd className="mt-1 text-ink-200">{update}</dd>
            </div>
            {note && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-ink-400">
                  הערה
                </dt>
                <dd className="mt-1 text-ink-300">{note}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
