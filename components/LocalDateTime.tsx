"use client";

import { useEffect, useState } from "react";

// Renders a timestamp in the VIEWER's local timezone (client-side). Server
// components pin Asia/Jerusalem, which is wrong for US customers — this shows
// each user their own local date/time instead. Renders empty on the server to
// avoid a hydration mismatch, then fills in on mount.
export function LocalDateTime({
  iso,
  locale = "en-US",
  dateOnly = false,
}: {
  iso: string;
  locale?: string;
  dateOnly?: boolean;
}) {
  const [text, setText] = useState("");
  useEffect(() => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return;
    setText(dateOnly ? d.toLocaleDateString(locale) : d.toLocaleString(locale));
  }, [iso, locale, dateOnly]);
  return <span suppressHydrationWarning>{text}</span>;
}
