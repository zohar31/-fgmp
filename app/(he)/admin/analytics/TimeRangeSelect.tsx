"use client";

import { useRouter } from "next/navigation";

const RANGES = [
  { key: "1d", label: "24 שעות" },
  { key: "7d", label: "7 ימים" },
  { key: "30d", label: "30 ימים" },
  { key: "90d", label: "90 ימים" },
] as const;

export function TimeRangeSelect({ current }: { current: string }) {
  const router = useRouter();

  return (
    <div className="inline-flex rounded-2xl bg-white/5 p-1 ring-1 ring-white/10">
      {RANGES.map((r) => {
        const active = current === r.key;
        return (
          <button
            key={r.key}
            onClick={() => router.push(`/admin/analytics?range=${r.key}`)}
            className={`rounded-xl px-3 py-1.5 text-sm font-medium transition ${
              active
                ? "bg-brand-500 text-white"
                : "text-ink-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            {r.label}
          </button>
        );
      })}
    </div>
  );
}
