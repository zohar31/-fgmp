import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { CheckCircle2, Info, AlertTriangle, CreditCard, Settings } from "lucide-react";

export const metadata: Metadata = { title: "הודעות" };

const typeIcon = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  billing: CreditCard,
  system: Settings,
} as const;

const typeColor = {
  info: "text-brand-300 bg-brand-500/10 ring-brand-500/30",
  success: "text-wa bg-wa/10 ring-wa/30",
  warning: "text-amber-300 bg-amber-500/10 ring-amber-500/30",
  billing: "text-violet-300 bg-violet-500/10 ring-violet-500/30",
  system: "text-ink-300 bg-white/5 ring-white/10",
} as const;

export default async function NotificationsPage() {
  const session = await auth();
  const userId = session!.user.id;

  const items = await db.query.notifications.findMany({
    where: eq(schema.notifications.userId, userId),
    orderBy: (t, { desc }) => [desc(t.createdAt)],
    limit: 100,
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">הודעות</h1>
        <p className="mt-2 text-ink-300">היסטוריית הודעות מערכת והתראות.</p>
      </header>

      {items.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-ink-300">אין הודעות עדיין.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((n) => {
            const Icon = typeIcon[n.type] ?? Info;
            const color = typeColor[n.type] ?? typeColor.info;
            return (
              <li key={n.id} className="card p-5">
                <div className="flex items-start gap-3">
                  <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ring-1 ${color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-bold text-white">{n.title}</div>
                    {n.body && (
                      <p className="mt-1 text-sm leading-6 text-ink-200">{n.body}</p>
                    )}
                    <div className="mt-2 text-xs text-ink-500">
                      {new Date(n.createdAt).toLocaleString("he-IL", {
                        timeZone: "Asia/Jerusalem",
                      })}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
