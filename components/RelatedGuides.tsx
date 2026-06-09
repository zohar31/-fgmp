import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { guides } from "@/lib/guides";

// בלוק "מדריכים קשורים" — קישורים פנימיים בתחתית כל מדריך.
// קישורים פנימיים משפרים גילוי (crawl discovery), מחלקים סמכות בין דפים,
// ובונים topical authority סביב נושא הלידים.
//
// בחירת המדריכים: קודם רשימה מפורשת (related), אחר כך אותו קטגוריה,
// ואז משלימים משאר המדריכים — תמיד עד 3, בלי הדף הנוכחי.
export function RelatedGuides({
  currentSlug,
  related,
  limit = 3,
}: {
  currentSlug: string;
  related?: string[];
  limit?: number;
}) {
  const current = guides.find((g) => g.slug === currentSlug);
  const pool = guides.filter((g) => g.slug !== currentSlug);

  const picked: typeof guides = [];
  const take = (slug: string) => {
    if (picked.length >= limit) return;
    const g = pool.find((x) => x.slug === slug && !picked.includes(x));
    if (g) picked.push(g);
  };

  // 1. רשימה מפורשת
  related?.forEach(take);
  // 2. אותה קטגוריה
  if (current) {
    pool
      .filter((g) => g.category === current.category)
      .forEach((g) => take(g.slug));
  }
  // 3. השלמה משאר המדריכים
  pool.forEach((g) => take(g.slug));

  if (picked.length === 0) return null;

  return (
    <section className="mt-14 border-t border-white/5 pt-10">
      <h2 className="font-display text-2xl font-bold text-white">מדריכים קשורים</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {picked.map((g) => (
          <article
            key={g.slug}
            className="group card relative flex h-full flex-col p-6 ring-1 ring-white/10 transition hover:ring-brand-500/40 hover:-translate-y-0.5"
          >
            <div className="text-xs font-bold text-brand-300">{g.category}</div>
            <h3 className="mt-2 font-display text-lg font-bold leading-snug text-white group-hover:text-brand-200">
              <Link href={`/guides/${g.slug}`} className="after:absolute after:inset-0">
                {g.title}
              </Link>
            </h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-ink-300">{g.excerpt}</p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-ink-400">
              <Clock className="h-3 w-3" />
              {g.readTime} דק׳ קריאה
              <ArrowLeft className="ms-auto h-3.5 w-3.5 text-brand-400" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
