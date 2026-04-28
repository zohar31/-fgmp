"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export function SearchInput() {
  const router = useRouter();
  const sp = useSearchParams();
  const initial = sp.get("q") || "";
  const [value, setValue] = useState(initial);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(sp.toString());
      const trimmed = value.trim();
      if (trimmed) {
        params.set("q", trimmed);
      } else {
        params.delete("q");
      }
      router.replace(`/admin${params.toString() ? `?${params}` : ""}`, {
        scroll: false,
      });
    }, 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="חיפוש לפי שם, אימייל, טלפון, ח.פ., או טוקן..."
        className="input pl-3 pr-10"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          aria-label="נקה חיפוש"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/5 p-1 text-ink-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
