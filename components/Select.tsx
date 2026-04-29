"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export function Select({
  name,
  options,
  defaultValue = "",
  placeholder = "בחרו אפשרות",
  required,
  onChange,
}: {
  name: string;
  options: readonly string[];
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}) {
  const [value, setValueState] = useState<string>(defaultValue);
  const setValue = (v: string) => {
    setValueState(v);
    onChange?.(v);
  };
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(options.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        setValue(options[activeIndex]);
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, activeIndex, options]);

  useEffect(() => {
    if (open && value) {
      const i = options.indexOf(value);
      if (i >= 0) setActiveIndex(i);
    }
  }, [open, value, options]);

  return (
    <div ref={wrapperRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="input flex w-full items-center justify-between gap-2 text-right"
      >
        <span className={value ? "text-white" : "text-ink-500"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-ink-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute z-30 mt-1 max-h-72 w-full overflow-auto rounded-xl bg-bg-soft p-1 shadow-2xl ring-1 ring-white/10"
        >
          {options.map((opt, i) => {
            const selected = opt === value;
            const active = i === activeIndex;
            return (
              <li
                key={opt}
                role="option"
                aria-selected={selected}
                onClick={() => {
                  setValue(opt);
                  setOpen(false);
                }}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  active ? "bg-brand-500/15 text-white" : "text-ink-200"
                }`}
              >
                <span>{opt}</span>
                {selected && <Check className="h-4 w-4 text-wa" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
