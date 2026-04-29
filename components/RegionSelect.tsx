"use client";

import { useEffect, useRef, useState } from "react";
import { Check, MapPin, ChevronDown, X } from "lucide-react";
import { REGION_GROUPS, EXPANSION_RULES, ALL_AREAS } from "@/lib/regions";

export function RegionSelect({
  name,
  defaultValue = "",
  required,
}: {
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const [selected, setSelected] = useState<Set<string>>(() => {
    return new Set(
      defaultValue
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    );
  });
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", onClickOutside);
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggleItem(item: string) {
    const next = new Set(selected);

    if (item === "כל הארץ") {
      if (next.has(item)) {
        next.clear();
      } else {
        next.add(item);
        ALL_AREAS.forEach((a) => next.add(a));
      }
      setSelected(next);
      return;
    }

    if (next.has(item)) {
      next.delete(item);
      next.delete("כל הארץ");
      const expansions = EXPANSION_RULES[item];
      if (expansions) expansions.forEach((e) => next.delete(e));
    } else {
      next.add(item);
      const expansions = EXPANSION_RULES[item];
      if (expansions) expansions.forEach((e) => next.add(e));
    }
    setSelected(next);
  }

  function toggleGroup(groupName: string) {
    const group = REGION_GROUPS.find((g) => g.name === groupName);
    if (!group) return;
    const next = new Set(selected);
    const allChecked = group.items.every((i) => next.has(i));
    if (allChecked) {
      group.items.forEach((i) => next.delete(i));
      next.delete("כל הארץ");
    } else {
      group.items.forEach((i) => next.add(i));
    }
    setSelected(next);
  }

  function clearAll() {
    setSelected(new Set());
  }

  function removeItem(item: string) {
    const next = new Set(selected);
    next.delete(item);
    next.delete("כל הארץ");
    const expansions = EXPANSION_RULES[item];
    if (expansions) expansions.forEach((e) => next.delete(e));
    setSelected(next);
  }

  const value = Array.from(selected).join(", ");
  const count = selected.size;
  const visibleSelected = Array.from(selected).filter((s) => s !== "כל הארץ");

  return (
    <div ref={wrapperRef} className="relative space-y-2">
      <input type="hidden" name={name} value={value} required={required} />

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="input flex w-full items-center justify-between gap-2 text-right"
      >
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-brand-300" />
          {count === 0 ? (
            <span className="text-ink-500">בחרו אזורי שירות...</span>
          ) : selected.has("כל הארץ") ? (
            <span className="text-white">
              <strong className="text-wa">כל הארץ</strong> ({ALL_AREAS.length} אזורים)
            </span>
          ) : (
            <span className="text-white">
              <strong>{visibleSelected.length}</strong> אזורים נבחרו
            </span>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-ink-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Selected chips (visible always when there are selections, even when popup closed) */}
      {visibleSelected.length > 0 && !selected.has("כל הארץ") && (
        <div className="flex flex-wrap gap-1.5">
          {visibleSelected.slice(0, 12).map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded-full bg-wa/10 px-2.5 py-1 text-xs text-wa ring-1 ring-wa/30"
            >
              {item}
              <button
                type="button"
                onClick={() => removeItem(item)}
                aria-label={`הסר ${item}`}
                className="rounded-full hover:bg-wa/20"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {visibleSelected.length > 12 && (
            <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-xs text-ink-300 ring-1 ring-white/10">
              +{visibleSelected.length - 12} עוד
            </span>
          )}
        </div>
      )}

      {/* Dropdown panel */}
      {open && (
        <div
          role="dialog"
          aria-label="בחירת אזורי שירות"
          className="absolute right-0 left-0 z-30 mt-1 max-h-[60vh] overflow-hidden rounded-2xl bg-bg-soft shadow-2xl ring-1 ring-white/10"
        >
          <div className="flex items-center justify-between gap-2 border-b border-white/5 px-4 py-3">
            <div className="text-sm">
              <span className="font-bold text-white">בחירת אזורי שירות</span>
              {count > 0 && (
                <span className="ms-2 text-xs text-ink-400">
                  ({visibleSelected.length} נבחרו)
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {count > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs text-ink-300 hover:text-white"
                >
                  נקה הכל
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="סגור"
                className="rounded-lg p-1 text-ink-300 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="max-h-[50vh] overflow-y-auto p-2">
            {REGION_GROUPS.map((group) => {
              const allChecked = group.items.every((i) => selected.has(i));
              const someChecked = group.items.some((i) => selected.has(i));

              return (
                <div key={group.name} className="mb-2 last:mb-0">
                  <div className="mb-1 flex items-center justify-between gap-2 px-2">
                    <span className="text-xs font-bold text-ink-300">{group.name}</span>
                    {group.name !== "ארצי" && (
                      <button
                        type="button"
                        onClick={() => toggleGroup(group.name)}
                        className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-ink-200 ring-1 ring-white/10 hover:bg-white/10 hover:text-white"
                      >
                        {allChecked ? "בטל הכל" : someChecked ? "סמן הכל" : "סמן הכל"}
                      </button>
                    )}
                  </div>
                  <ul className="space-y-0.5">
                    {group.items.map((item) => {
                      const checked = selected.has(item);
                      const isExpander = !!EXPANSION_RULES[item];
                      const isAll = item === "כל הארץ";
                      return (
                        <li key={item}>
                          <button
                            type="button"
                            onClick={() => toggleItem(item)}
                            role="checkbox"
                            aria-checked={checked}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-right text-sm transition ${
                              checked
                                ? "bg-wa/10 text-white"
                                : "text-ink-200 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <span
                              className={`grid h-4 w-4 shrink-0 place-items-center rounded border transition ${
                                checked
                                  ? "border-wa bg-wa"
                                  : "border-white/20 bg-transparent"
                              }`}
                            >
                              {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                            </span>
                            <span className="flex-1">
                              {isAll && <strong>{item}</strong>}
                              {!isAll && item}
                            </span>
                            {isExpander && (
                              <span className="shrink-0 rounded bg-brand-500/15 px-1.5 py-0.5 text-[9px] text-brand-300 ring-1 ring-brand-500/30">
                                כולל אוטומטית
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-white/5 px-4 py-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-wa px-5 py-2 text-sm font-bold text-white transition hover:bg-wa-dark"
            >
              סיום
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
