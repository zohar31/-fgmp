import Link from "next/link";
import { db, schema } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { Bot, ChevronLeft, CheckCircle2, AlertCircle } from "lucide-react";

export default async function AgentLogPage({
  searchParams,
}: {
  searchParams: Promise<{ tool?: string; userId?: string }>;
}) {
  const { tool, userId } = await searchParams;

  // Build filters
  const filters = [];
  if (tool) filters.push(eq(schema.agentActions.toolName, tool));
  if (userId) filters.push(eq(schema.agentActions.userId, userId));

  const actions = await db
    .select()
    .from(schema.agentActions)
    .where(filters.length === 1 ? filters[0] : undefined)
    .orderBy(desc(schema.agentActions.createdAt))
    .limit(200);

  // Per-tool counts (stats card)
  const allActions = filters.length
    ? await db.select().from(schema.agentActions).limit(2000)
    : actions;
  const toolCounts: Record<string, number> = {};
  for (const a of allActions) {
    toolCounts[a.toolName] = (toolCounts[a.toolName] || 0) + 1;
  }

  // Look up business names for the userIds we found
  const userIds = Array.from(
    new Set(actions.filter((a) => a.userId).map((a) => a.userId!))
  );
  const settingsByUser = new Map<string, { businessName: string | null; contactName: string | null }>();
  if (userIds.length > 0) {
    const settings = await db
      .select({
        userId: schema.businessSettings.userId,
        businessName: schema.businessSettings.businessName,
        contactName: schema.businessSettings.contactName,
      })
      .from(schema.businessSettings);
    for (const s of settings) {
      settingsByUser.set(s.userId, {
        businessName: s.businessName,
        contactName: s.contactName,
      });
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-3">
          <Bot className="h-7 w-7 text-brand-300" />
          <h1 className="font-display text-3xl font-extrabold text-white">פעולות סוכן AI</h1>
        </div>
        <p className="mt-2 text-ink-300">
          יומן ביקורת של כל הפעולות שהסוכן באתר ביצע — אימותים, צפייה בנתונים, שינויי
          מילות מפתח, העברות לאדמין.
        </p>
      </header>

      {/* Stats by tool */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { key: "send_verification_code", label: "שליחות קוד" },
          { key: "verify_code", label: "אימותים" },
          { key: "get_my_status", label: "צפייה סטטוס" },
          { key: "get_my_settings", label: "צפייה הגדרות" },
          { key: "get_my_keywords", label: "צפייה מילים" },
          { key: "add_keywords", label: "הוספת מילים", accent: "wa" },
          { key: "remove_keywords", label: "הסרת מילים", accent: "amber" },
          { key: "escalate_to_admin", label: "העברות לאדמין", accent: "brand" },
        ].map((c) => (
          <Link
            key={c.key}
            href={`/admin/agent-log?tool=${c.key}`}
            className={`card p-4 text-center transition hover:bg-white/5 ${
              tool === c.key ? "ring-2 ring-brand-500" : ""
            }`}
          >
            <div className="text-xs text-ink-400">{c.label}</div>
            <div
              className={`mt-1 font-display text-2xl font-extrabold ${
                c.accent === "wa"
                  ? "text-wa"
                  : c.accent === "amber"
                    ? "text-amber-300"
                    : c.accent === "brand"
                      ? "text-brand-300"
                      : "text-ink-100"
              }`}
            >
              {toolCounts[c.key] || 0}
            </div>
          </Link>
        ))}
      </div>

      {/* Active filter banner */}
      {(tool || userId) && (
        <div className="card flex items-center justify-between p-3 ring-1 ring-brand-500/30">
          <div className="text-sm text-ink-200">
            <span className="text-ink-400">מסנן פעיל: </span>
            {tool && <code className="rounded bg-white/5 px-2 py-1 text-brand-300">{tool}</code>}
            {userId && (
              <code className="ml-2 rounded bg-white/5 px-2 py-1 text-brand-300">user: {userId.slice(0, 8)}…</code>
            )}
          </div>
          <Link
            href="/admin/agent-log"
            className="text-xs text-rose-300 hover:underline"
          >
            ✕ נקה פילטר
          </Link>
        </div>
      )}

      {/* Actions table */}
      <div className="card overflow-hidden">
        {actions.length === 0 ? (
          <div className="p-8 text-center text-ink-300">
            אין פעולות להציג {tool ? `עבור הכלי ${tool}` : ""}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-xs text-ink-400">
                <tr>
                  <th className="p-3 text-right font-medium">זמן</th>
                  <th className="p-3 text-right font-medium">משתמש</th>
                  <th className="p-3 text-right font-medium">כלי</th>
                  <th className="p-3 text-right font-medium">פרמטרים</th>
                  <th className="p-3 text-right font-medium">תוצאה</th>
                  <th className="p-3 text-right font-medium">סטטוס</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {actions.map((a) => {
                  const info = a.userId ? settingsByUser.get(a.userId) : null;
                  return (
                    <tr key={a.id} className="hover:bg-white/[0.02]">
                      <td className="p-3 align-top text-xs text-ink-400" dir="ltr">
                        {new Date(a.createdAt).toLocaleString("he-IL", {
                          timeZone: "Asia/Jerusalem",
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>
                      <td className="p-3 align-top">
                        {a.userId ? (
                          <Link
                            href={`/admin/users/${a.userId}`}
                            className="block hover:text-brand-300"
                          >
                            <div className="font-semibold text-white">
                              {info?.businessName || info?.contactName || "—"}
                            </div>
                            <code className="text-[10px] text-ink-500" dir="ltr">
                              {a.userId.slice(0, 8)}
                            </code>
                          </Link>
                        ) : (
                          <span className="text-ink-500">אנונימי</span>
                        )}
                      </td>
                      <td className="p-3 align-top">
                        <Link
                          href={`/admin/agent-log?tool=${a.toolName}`}
                          className="rounded-lg bg-brand-500/10 px-2 py-1 text-xs font-mono text-brand-300 ring-1 ring-brand-500/30 hover:bg-brand-500/20"
                        >
                          {a.toolName}
                        </Link>
                      </td>
                      <td className="p-3 align-top">
                        <pre
                          className="max-w-xs overflow-hidden text-ellipsis whitespace-pre-wrap break-all text-[10px] leading-tight text-ink-300"
                          dir="ltr"
                        >
                          {(a.args || "").slice(0, 200)}
                        </pre>
                      </td>
                      <td className="p-3 align-top">
                        <pre
                          className="max-w-xs overflow-hidden text-ellipsis whitespace-pre-wrap break-all text-[10px] leading-tight text-ink-300"
                          dir="ltr"
                        >
                          {(a.result || a.error || "").slice(0, 250)}
                        </pre>
                      </td>
                      <td className="p-3 align-top">
                        {a.error ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] text-rose-300 ring-1 ring-rose-500/30">
                            <AlertCircle className="h-3 w-3" />
                            שגיאה
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-wa/10 px-2 py-0.5 text-[10px] text-wa ring-1 ring-wa/30">
                            <CheckCircle2 className="h-3 w-3" />
                            הצליח
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {actions.length >= 200 && (
        <div className="text-center text-xs text-ink-400">
          מוצגות 200 פעולות אחרונות. השתמש במסננים להצגה ממוקדת.
        </div>
      )}

      <div>
        <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-brand-300 hover:text-brand-200">
          <ChevronLeft className="h-4 w-4" />
          חזרה למנויים
        </Link>
      </div>
    </div>
  );
}
