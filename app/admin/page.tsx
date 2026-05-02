import Link from "next/link";
import { db, schema } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { ActivateButton } from "./ActivateButton";
import { SearchInput } from "./SearchInput";
import { CheckCircle2, Clock, XCircle, ChevronLeft, RefreshCw } from "lucide-react";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase() || "";

  const users = await db
    .select({
      id: schema.users.id,
      email: schema.users.email,
      name: schema.users.name,
      createdAt: schema.users.createdAt,
    })
    .from(schema.users)
    .orderBy(desc(schema.users.createdAt));

  const subs = await db.select().from(schema.subscriptions);
  const settings = await db.select().from(schema.businessSettings);

  // ── Last delivered push per user — לזיהוי "צריך לדחוף שוב" ──
  const deliveredPushes = await db
    .select()
    .from(schema.extensionPushes)
    .where(eq(schema.extensionPushes.status, "delivered"))
    .orderBy(desc(schema.extensionPushes.pushedAt));

  const lastPushByUser = new Map<string, Date>();
  for (const p of deliveredPushes) {
    if (!lastPushByUser.has(p.userId)) lastPushByUser.set(p.userId, p.pushedAt);
  }

  const subByUser = new Map(subs.map((s) => [s.userId, s]));
  const settingsByUser = new Map(settings.map((s) => [s.userId, s]));

  const filteredUsers = query
    ? users.filter((u) => {
        const cfg = settingsByUser.get(u.id);
        const sub = subByUser.get(u.id);
        const haystack = [
          u.name,
          u.email,
          cfg?.businessName,
          cfg?.contactName,
          cfg?.leadPhone,
          cfg?.contactEmail,
          cfg?.vatId,
          sub?.activationToken,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      })
    : users;

  const totals = {
    all: users.length,
    pendingSetup: subs.filter((s) => s.status === "pending_setup").length,
    pendingActivation: subs.filter((s) => s.status === "pending_activation").length,
    trialActive: subs.filter((s) => s.status === "trial_active").length,
    active: subs.filter((s) => s.status === "active").length,
    cancelled: subs.filter((s) => s.status === "cancelled").length,
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">מנויים</h1>
        <p className="mt-2 text-ink-300">
          רשימת כל המשתמשים, סטטוס המנוי, ואישור הפעלה ידני.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Stat label="סה״כ" value={totals.all} />
        <Stat label="הגדרות" value={totals.pendingSetup} accent="amber" />
        <Stat label="ממתין הפעלה" value={totals.pendingActivation} accent="brand" />
        <Stat label="ניסיון פעיל" value={totals.trialActive} accent="wa" />
        <Stat label="פעיל" value={totals.active} accent="wa" />
        <Stat label="מבוטל" value={totals.cancelled} accent="ink" />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput />
        {query && (
          <p className="text-xs text-ink-400">
            {filteredUsers.length} מתוך {users.length} מנויים תואמים לחיפוש
          </p>
        )}
      </div>

      {users.length === 0 ? (
        <div className="card p-8 text-center text-ink-300">אין עדיין משתמשים.</div>
      ) : filteredUsers.length === 0 ? (
        <div className="card p-8 text-center text-ink-300">
          לא נמצאו תוצאות לחיפוש "<span className="text-white">{query}</span>".
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-xs text-ink-400">
                <tr>
                  <th className="p-3 text-right font-medium">משתמש</th>
                  <th className="p-3 text-right font-medium">עסק</th>
                  <th className="p-3 text-right font-medium">סטטוס</th>
                  <th className="p-3 text-right font-medium">טוקן</th>
                  <th className="p-3 text-right font-medium">טלפון לידים</th>
                  <th className="p-3 text-right font-medium">פעולות</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((u) => {
                  const sub = subByUser.get(u.id);
                  const cfg = settingsByUser.get(u.id);
                  return (
                    <tr key={u.id} className="hover:bg-white/[0.02]">
                      <td className="p-3 align-top">
                        <Link
                          href={`/admin/users/${u.id}`}
                          className="block hover:text-brand-300"
                        >
                          <div className="font-semibold text-white">{u.name || "—"}</div>
                          <div className="text-xs text-ink-400" dir="ltr">{u.email}</div>
                          <div className="mt-0.5 text-[10px] text-ink-500">
                            {new Date(u.createdAt).toLocaleDateString("he-IL")}
                          </div>
                        </Link>
                      </td>
                      <td className="p-3 align-top">
                        <Link href={`/admin/users/${u.id}`} className="block hover:text-brand-300">
                          <div className="text-white">{cfg?.businessName || "—"}</div>
                          <div className="text-xs text-ink-400">{cfg?.niche || "—"}</div>
                        </Link>
                      </td>
                      <td className="p-3 align-top">
                        <div className="flex flex-col gap-1">
                          <StatusBadge status={sub?.status} activated={!!sub?.activatedAt} />
                          {sub?.suspendedAt && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-300 ring-1 ring-amber-500/30">
                              ⏸ מושעה
                            </span>
                          )}
                          {(() => {
                            // Indicator: עודכן אחרי הדחיפה האחרונה — צריך לדחוף שוב
                            if (!sub?.activatedAt) return null;
                            if (!cfg?.updatedAt) return null;
                            const lastPush = lastPushByUser.get(u.id);
                            const settingsTime = cfg.updatedAt.getTime();
                            const pushTime = lastPush ? lastPush.getTime() : 0;
                            const needsPush = !lastPush || settingsTime > pushTime + 5000;
                            // 5s buffer כדי לא להציג ישר אחרי דחיפה
                            if (!needsPush) return null;
                            return (
                              <span
                                className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-300 ring-1 ring-amber-500/40"
                                title={
                                  lastPush
                                    ? `המנוי עדכן נתונים אחרי הדחיפה האחרונה (${lastPush.toLocaleString("he-IL")})`
                                    : "מעולם לא נדחף לתוסף"
                                }
                              >
                                <RefreshCw className="h-3 w-3" />
                                {lastPush ? "עודכן — צריך לדחוף שוב" : "טרם נדחף"}
                              </span>
                            );
                          })()}
                        </div>
                      </td>
                      <td className="p-3 align-top">
                        {sub?.activationToken ? (
                          <code dir="ltr" className="rounded bg-white/5 px-2 py-1 text-[10px] text-brand-300">
                            {sub.activationToken}
                          </code>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-3 align-top text-xs" dir="ltr">
                        {cfg?.leadPhone || "—"}
                      </td>
                      <td className="p-3 align-top">
                        <div className="flex flex-col gap-2">
                          {sub && sub.status === "pending_activation" && !sub.activatedAt ? (
                            <ActivateButton
                              userId={u.id}
                              defaultPhone={cfg?.leadPhone || ""}
                            />
                          ) : sub?.activatedAt ? (
                            <span className="text-xs text-wa">
                              ✓ {new Date(sub.activatedAt).toLocaleDateString("he-IL")}
                            </span>
                          ) : null}
                          <Link
                            href={`/admin/users/${u.id}`}
                            className="inline-flex items-center gap-1 text-xs text-brand-300 hover:text-brand-200"
                          >
                            פרטים מלאים
                            <ChevronLeft className="h-3 w-3" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  accent = "ink",
}: {
  label: string;
  value: number;
  accent?: "wa" | "brand" | "amber" | "ink";
}) {
  const colors = {
    wa: "text-wa",
    brand: "text-brand-300",
    amber: "text-amber-300",
    ink: "text-ink-200",
  };
  return (
    <div className="card p-4 text-center">
      <div className="text-xs text-ink-400">{label}</div>
      <div className={`mt-1 font-display text-2xl font-extrabold ${colors[accent]}`}>
        {value}
      </div>
    </div>
  );
}

function StatusBadge({ status, activated }: { status?: string | null; activated: boolean }) {
  const map: Record<string, { label: string; cls: string; Icon: typeof CheckCircle2 }> = {
    pending_setup: { label: "הגדרות", cls: "bg-amber-500/10 text-amber-300 ring-amber-500/30", Icon: Clock },
    pending_activation: { label: "ממתין", cls: "bg-brand-500/10 text-brand-300 ring-brand-500/30", Icon: Clock },
    trial_active: { label: "ניסיון", cls: "bg-wa/10 text-wa ring-wa/30", Icon: CheckCircle2 },
    active: { label: "פעיל", cls: "bg-wa/10 text-wa ring-wa/30", Icon: CheckCircle2 },
    cancelled: { label: "מבוטל", cls: "bg-ink-500/10 text-ink-300 ring-ink-500/30", Icon: XCircle },
    expired: { label: "פג תוקף", cls: "bg-ink-500/10 text-ink-300 ring-ink-500/30", Icon: XCircle },
  };
  const m = map[status || ""] || { label: status || "—", cls: "bg-white/5 text-ink-300 ring-white/10", Icon: Clock };
  const Icon = m.Icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs ring-1 ${m.cls}`}>
      <Icon className="h-3 w-3" />
      {m.label}
      {activated && status === "trial_active" && <span className="ml-1">✓</span>}
    </span>
  );
}
