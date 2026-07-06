"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

type Lead = { group: string; text: string; keywords: string[]; time: string };

// The Hero phone mockup, live. Pulls real recent leads and shows them in a
// WhatsApp-style chat inside the phone frame. Until data arrives it shows a
// neutral "searching" skeleton — never a stale hard-coded lead screenshot.
export function LiveLeadPhone() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch("/api/recent-leads", { cache: "no-store" });
        const d = await r.json();
        if (alive && Array.isArray(d?.leads) && d.leads.length) setLeads(d.leads);
      } catch {
        /* keep what we have */
      }
    };
    load();
    const id = setInterval(load, 20000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    if (leads.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % leads.length), 4200);
    return () => clearInterval(id);
  }, [leads.length]);

  const lead = leads.length ? leads[idx % leads.length] : null;

  return (
    <div className="relative animate-float">
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-500/30 via-transparent to-wa/20 blur-3xl" />
      <div className="mx-auto aspect-[9/19] max-w-xs rounded-[2.5rem] bg-gradient-to-br from-bg-card to-bg-soft p-3 shadow-2xl ring-1 ring-white/10">
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] bg-[#0b141a]">
          {/* WhatsApp header */}
          <div className="flex items-center gap-2 bg-[#1f2c34] px-4 py-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-wa/20 text-sm font-bold text-wa">
              F
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold text-white">FGMP</div>
              <div className="flex items-center gap-1 text-[10px] text-wa">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-wa" />
                לידים בזמן אמת
              </div>
            </div>
          </div>

          {/* chat area */}
          <div className="flex-1 space-y-3 overflow-hidden p-3">
            {lead ? (
              <div key={idx} className="animate-fade-up space-y-2">
                <div className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-ink-300">
                  <Bell className="h-3 w-3 text-wa" />
                  ליד חדש · {lead.time || "עכשיו"}
                </div>
                <div className="max-w-[92%] rounded-2xl rounded-tr-sm bg-[#005c4b] p-3 shadow">
                  {lead.group && (
                    <div className="mb-1 text-[11px] font-bold text-emerald-200">
                      📌 {lead.group}
                    </div>
                  )}
                  <p className="text-[13px] leading-5 text-white/95">{lead.text}…</p>
                  {lead.keywords.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {lead.keywords.map((k) => (
                        <span
                          key={k}
                          className="rounded-full bg-white/15 px-1.5 py-0.5 text-[10px] text-white/90"
                        >
                          #{k}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-1 text-left text-[9px] text-emerald-200/70">✓✓</div>
                </div>
              </div>
            ) : (
              // neutral skeleton while loading — no stale lead
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-ink-300">
                  <span className="inline-block h-1.5 w-1.5 animate-ping rounded-full bg-wa" />
                  מאתר לידים חדשים…
                </div>
                <div className="h-16 max-w-[92%] animate-pulse-slow rounded-2xl rounded-tr-sm bg-white/5" />
                <div className="h-12 max-w-[80%] animate-pulse-slow rounded-2xl rounded-tr-sm bg-white/5" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-4 top-12 hidden rotate-3 rounded-2xl bg-wa px-4 py-2 text-sm font-bold text-white shadow-glow-wa md:block">
        <Bell className="inline h-4 w-4 ms-1" />
        ליד חדש!
      </div>
    </div>
  );
}
