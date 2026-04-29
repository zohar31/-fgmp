"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { SITE } from "@/lib/config";

const links = [
  { href: "/#how", label: "איך זה עובד" },
  { href: "/#who", label: "למי זה מתאים" },
  { href: "/#pricing", label: "מחיר" },
  { href: "/#faq", label: "שאלות" },
  { href: "/accessibility", label: "נגישות" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-bg/80 backdrop-blur-lg ring-1 ring-white/5"
          : "bg-transparent"
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={SITE.brand}
          className="shrink-0"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-2 text-sm font-medium text-ink-200 hover:bg-white/5 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-xl px-3 py-2 text-sm font-medium text-ink-200 hover:bg-white/5 hover:text-white transition-colors"
          >
            התחברות
          </Link>
          <Link
            href="/login"
            className="btn-wa text-sm py-2 px-4"
          >
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">התחילו חינם</span>
            <span className="sm:hidden">חינם</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
