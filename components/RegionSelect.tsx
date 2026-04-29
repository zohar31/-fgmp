"use client";

import { useEffect, useState } from "react";
import { Check, MapPin } from "lucide-react";
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
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(REGION_GROUPS.map((g) => g.name))
  );

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

  function toggleGroupOpen(name: string) {
    const next = new Set(openGroups);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    setOpenGroups(next);
  }

  const value = Array.from(selected).join(", ");
  const count = selected.size;

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={value} required={required} />

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-brand-300" />
          <span className="text-white">
            {count === 0 ? (
              <span className="text-ink-400">לא נבחרו אזורים עדיין</span>
            ) : (
              <>
                <strong>{count}</strong> אזורים נבחרו
              </>
            )}
          </span>
        </div>
        {count > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-ink-300 hover:text-white"
          >
            נקה הכל
          </button>
        )}
      </div>

      <div className="space-y-2">
        {REGION_GROUPS.map((group) => {
          const allChecked = group.items.every((i) => selected.has(i));
          const someChecked = group.items.some((i) => selected.has(i));
          const isOpen = openGroups.has(group.name);

          return (
            <div
              key={group.name}
              className="overflow-hidden rounded-xl bg-white/[0.03] ring-1 ring-white/5"
            >
              <div className="flex items-center justify-between gap-2 px-3 py-2">
                <button
                  type="button"
                  onClick={() => toggleGroupOpen(group.name)}
                  aria-expanded={isOpen}
                  className="flex flex-1 items-center gap-2 text-right"
                >
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded text-[10px] font-bold transition ${
                      allChecked
                        ? "bg-wa text-white"
                        : someChecked
                          ? "bg-brand-500/40 text-white"
                          : "bg-white/10 text-ink-400"
                    }`}
                  >
                    {allChecked ? <Check className="h-3 w-3" /> : someChecked ? "·" : ""}
                  </span>
                  <span className="text-sm font-bold text-white">{group.name}</span>
                  {someChecked && (
                    <span className="text-xs text-ink-400">
                      ({group.items.filter((i) => selected.has(i)).length}/{group.items.length})
                    </span>
                  )}
                </button>
                {group.name !== "ארצי" && (
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.name)}
                    className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-ink-200 ring-1 ring-white/10 hover:bg-white/10 hover:text-white"
                  >
                    {allChecked ? "בטל הכל" : "סמן הכל"}
                  </button>
                )}
              </div>

              {isOpen && (
                <div className="flex flex-wrap gap-1.5 border-t border-white/5 p-3">
                  {group.items.map((item) => {
                    const checked = selected.has(item);
                    const isExpander = !!EXPANSION_RULES[item];
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleItem(item)}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs ring-1 transition ${
                          checked
                            ? "bg-wa/20 text-wa ring-wa/40"
                            : "bg-white/5 text-ink-200 ring-white/10 hover:bg-white/10 hover:ring-white/20"
                        }`}
                        title={isExpander ? "כולל אוטומטית את האזורים שמתחתיו" : undefined}
                      >
                        {checked && <Check className="h-3 w-3" />}
                        {item}
                        {isExpander && !checked && (
                          <span className="text-[9px] text-ink-400">+</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
