import Link from "next/link";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { guides } from "@/lib/guides";

export function GuidesPreview() {
  const top = guides.slice(0, 3);
  return (
    <section
      id="guides"
      aria-label="מדריכי לידים"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="pill text-brand-300 ring-brand-500/30">
            <BookOpen className="h-3.5 w-3.5" />
            מדריכים מעמיקים
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl text-balance">
            איך משיגים לידים — <span className="gradient-text">המדריכים שלנו</span>
          </h2>
          <p className="mt-4 text-ink-300">
            ניתוחים מעמיקים בעברית. הכל על איתור, סינון, וסגירת לידים מקבוצות פייסבוק.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {top.map((g) => (
            <article
              key={g.slug}
              className="group relative card flex h-full flex-col p-6 ring-1 ring-white/10 transition hover:ring-brand-500/40 hover:-translate-y-0.5"
            >
              <div className="text-xs font-bold text-brand-300">{g.category}</div>
              <h3 className="mt-2 font-display text-lg font-bold leading-snug text-white">
                <Link href={`/guides/${g.slug}`} className="after:absolute after:inset-0">
                  {g.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-ink-300">{g.excerpt}</p>
              <div className="mt-5 flex items-center gap-3 text-xs text-ink-400">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {g.readTime} דק׳ קריאה
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-white"
          >
            כל המדריכים
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/lidim"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-white"
          >
            לידים לפי תחום עיסוק
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
