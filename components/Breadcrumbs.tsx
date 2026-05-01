import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="breadcrumb" className="text-sm text-ink-400">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-ink-200">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-white transition-colors">
                  {c.name}
                </Link>
              )}
              {!isLast && <ChevronLeft className="h-3 w-3 text-ink-500" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
