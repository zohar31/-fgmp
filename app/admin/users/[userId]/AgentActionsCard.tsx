import Link from "next/link";
import { db, schema } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { Bot, ChevronLeft, AlertCircle, CheckCircle2 } from "lucide-react";

const TOOL_LABELS: Record<string, string> = {
  send_verification_code: "📤 שליחת קוד",
  verify_code: "🔐 אימות",
  get_my_status: "👀 צפייה בסטטוס",
  get_my_settings: "👀 צפייה בהגדרות",
  get_my_keywords: "👀 צפייה במילות מפתח",
  add_keywords: "➕ הוספת מילים",
  remove_keywords: "➖ הסרת מילים",
  escalate_to_admin: "🚨 העברה לאדמין",
};

export async function AgentActionsCard({ userId }: { userId: string }) {
  const actions = await db
    .select()
    .from(schema.agentActions)
    .where(eq(schema.agentActions.userId, userId))
    .orderBy(desc(schema.agentActions.createdAt))
    .limit(10);

  if (actions.length === 0) {
    return (
      <div className="card p-5">
        <div className="mb-3 flex items-center gap-2">
          <Bot className="h-5 w-5 text-brand-300" />
          <h3 className="font-display font-bold text-white">פעולות סוכן AI</h3>
        </div>
        <p className="text-sm text-ink-400">המנוי לא ביצע פעולות עם הסוכן עדיין.</p>
      </div>
    );
  }

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-brand-300" />
          <h3 className="font-display font-bold text-white">10 פעולות סוכן אחרונות</h3>
        </div>
        <Link
          href={`/admin/agent-log?userId=${userId}`}
          className="inline-flex items-center gap-1 text-xs text-brand-300 hover:text-brand-200"
        >
          כל ההיסטוריה
          <ChevronLeft className="h-3 w-3" />
        </Link>
      </div>

      <ul className="space-y-2">
        {actions.map((a) => {
          const isError = !!a.error;
          // נסיון לחלץ result.message מ-JSON אם קיים
          let message = "";
          try {
            const parsed = a.result ? JSON.parse(a.result) : null;
            if (parsed?.message) message = String(parsed.message);
            else if (parsed?.error) message = String(parsed.error);
          } catch {}
          if (a.error && !message) message = a.error;

          return (
            <li
              key={a.id}
              className={`rounded-xl px-3 py-2.5 ring-1 ${
                isError ? "bg-rose-500/5 ring-rose-500/20" : "bg-white/[0.02] ring-white/5"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {TOOL_LABELS[a.toolName] || a.toolName}
                    </span>
                    {isError ? (
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
                  </div>
                  {message && (
                    <p className="mt-1 line-clamp-2 text-xs text-ink-300">{message}</p>
                  )}
                </div>
                <time
                  dir="ltr"
                  className="shrink-0 text-[10px] text-ink-500"
                  title={new Date(a.createdAt).toLocaleString("he-IL")}
                >
                  {new Date(a.createdAt).toLocaleString("he-IL", {
                    timeZone: "Asia/Jerusalem",
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
