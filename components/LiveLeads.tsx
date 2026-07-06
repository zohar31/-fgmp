"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

type Lead = { group: string; text: string; keywords: string[]; time: string };

export function LiveLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [idx, setIdx] = useState(0);

  // Poll the live feed (server-side proxy → sanitized WA-server /posts).
  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch("/api/recent-leads", { cache: "no-store" });
        const data = await res.json();
        if (alive && Array.isArray(data?.leads)) setLeads(data.leads);
      } catch {
        /* keep whatever we have */
      }
    }
    load();
    const id = setInterval(load, 20000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // Rotate through the recent leads.
  useEffect(() => {
    if (leads.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % leads.length), 4200);
    return () => clearInterval(id);
  }, [leads.length]);

  // Graceful: render nothing until real data arrives (never show an empty box).
  if (leads.length === 0) return null;

  const lead = leads[idx % leads.length];

  return (
    <section className="py-20 md:py-28" aria-label="לידים אמיתיים בזמן אמת">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="pill text-wa ring-wa/30">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-wa" />
            </span>
            בשידור חי
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl text-balance">
            לידים אמיתיים ש-FGMP מצאה{" "}
            <span className="gradient-text">ברגעים האחרונים</span>
          </h2>
          <p className="mt-4 text-ink-300">
            מתעדכן חי מהמערכת — פוסטים אמיתיים מקבוצות פייסבוק בישראל
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-md">
          <div className="card overflow-hidden p-0">
            <div className="flex items-center gap-3 bg-wa/10 px-5 py-3 ring-1 ring-wa/20">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-wa/20 text-wa">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">FGMP · ליד חדש</div>
                <div className="text-[11px] text-ink-400">{lead.time || "עכשיו"}</div>
              </div>
            </div>

            <div key={idx} className="animate-fade-up space-y-3 p-5">
              {lead.group && (
                <div className="text-xs font-semibold text-brand-300">📌 {lead.group}</div>
              )}
              <p className="rounded-2xl rounded-tr-sm bg-wa/10 p-3 text-sm leading-6 text-ink-100 ring-1 ring-wa/20">
                {lead.text}…
              </p>
              {lead.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {lead.keywords.map((k) => (
                    <span
                      key={k}
                      className="rounded-full bg-brand-500/10 px-2 py-0.5 text-[11px] text-brand-200 ring-1 ring-brand-500/30"
                    >
                      #{k}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {leads.slice(0, 8).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx % leads.length ? "w-6 bg-wa" : "w-1.5 bg-white/15"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
