"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/account") ||
      pathname === "/login"
    ) {
      return;
    }

    const sp = new URLSearchParams(searchParams.toString());
    const body = {
      path: pathname,
      referrer: document.referrer || "",
      utm_source: sp.get("utm_source") || "",
      utm_medium: sp.get("utm_medium") || "",
      utm_campaign: sp.get("utm_campaign") || "",
    };

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    }).catch(() => {});
  }, [pathname, searchParams]);

  return null;
}
