import Link from "next/link";
import { db, schema } from "@/lib/db";
import { desc, inArray } from "drizzle-orm";
import { RemindButton } from "../RemindButton";
import { ChevronLeft, AlertCircle, Settings, MessageCircle } from "lucide-react";

export default async function AdminRemindersPage() {
  const subs = await db
    .select()
    .from(schema.subscriptions)
    .where(inArray(schema.subscriptions.status, ["pending_setup", "pending_activation"]))
    .orderBy(desc(schema.subscriptions.createdAt));

  if (subs.length === 0) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="font-display text-3xl font-extrabold text-white">תזכורות</h1>
          <p className="mt-2 text-ink-300">
            שלח מייל ללקוחות שלא סיימו את תהליך ההרשמה.
          </p>
        </header>
        <div className="card p-8 text-center text-ink-300">
          🎉 כל הלקוחות סיימו רישום! אין למי לשלוח תזכורת.
        </div>
      </div>
    );
  }

  const userIds = subs.map((s) => s.userId);
  const [users, settings] = await Promise.all([
    db
      .select({
        id: schema.users.id,
        email: schema.users.email,
        name: schema.users.name,
        createdAt: schema.users.createdAt,
      })
      .from(schema.users)
      .where(inArray(schema.users.id, userIds)),
    db
      .select()
      .from(schema.businessSettings)
      .where(inArray(schema.businessSettings.userId, userIds)),
  ]);

  const userById = new Map(users.map((u) => [u.id, u]));
  const settingsByUser = new Map(settings.map((s) => [s.userId, s]));

  const pendingSetup = subs.filter((s) => s.status === "pending_setup");
  const pendingActivation = subs.filter((s) => s.status === "pending_activation");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">תזכורות</h1>
        <p className="mt-2 text-ink-300">
          שלח מייל ללקוחות שלא סיימו את תהליך ההרשמה — עם קישור ישיר להמשך.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <div className="card p-4">
          <div className="text-xs text-ink-400">לא מילאו הגדרות</div>
          <div className="mt-1 font-display text-2xl font-extrabold text-amber-300">
            {pendingSetup.length}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-ink-400">לא הפעילו WhatsApp</div>
          <div className="mt-1 font-display text-2xl font-extrabold text-brand-300">
            {pendingActivation.length}
          </div>
        </div>
      </div>

      {pendingSetup.length > 0 && (
        <Section
          title="לא מילאו הגדרות עסק"
          icon={Settings}
          accent="amber"
          subs={pendingSetup}
          userById={userById}
          settingsByUser={settingsByUser}
        />
      )}

      {pendingActivation.length > 0 && (
        <Section
          title="לא הפעילו WhatsApp"
          icon={MessageCircle}
          accent="brand"
          subs={pendingActivation}
          userById={userById}
          settingsByUser={settingsByUser}
        />
      )}
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  accent,
  subs,
  userById,
  settingsByUser,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "amber" | "brand";
  subs: Array<typeof schema.subscriptions.$inferSelect>;
  userById: Map<string, { id: string; email: string; name: string | null; createdAt: Date }>;
  settingsByUser: Map<string, typeof schema.businessSettings.$inferSelect>;
}) {
  const accentCls =
    accent === "amber"
      ? "text-amber-300 bg-amber-500/10 ring-amber-500/30"
      : "text-brand-300 bg-brand-500/10 ring-brand-500/30";

  return (
    <section className="card overflow-hidden">
      <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.02] p-4">
        <div className={`grid h-9 w-9 place-items-center rounded-xl ring-1 ${accentCls}`}>
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="font-display font-bold text-white">
          {title} <span className="text-ink-400">({subs.length})</span>
        </h2>
      </div>

      <ul className="divide-y divide-white/5">
        {subs.map((sub) => {
          const u = userById.get(sub.userId);
          const cfg = settingsByUser.get(sub.userId);
          if (!u) return null;
          return (
            <li key={sub.userId} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={`/admin/users/${u.id}`}
                className="flex-1 hover:text-brand-300"
              >
                <div className="font-semibold text-white">
                  {cfg?.businessName || u.name || u.email}
                </div>
                <div className="text-xs text-ink-400" dir="ltr">
                  {u.email}
                </div>
                <div className="mt-0.5 text-[10px] text-ink-500">
                  הצטרף לפני {daysAgo(u.createdAt)} ימים
                  {sub.lastReminderAt && (
                    <> · תזכורת אחרונה: לפני {daysAgo(sub.lastReminderAt)} ימים</>
                  )}
                </div>
              </Link>

              <div className="flex items-center gap-2">
                <RemindButton userId={u.id} />
                <Link
                  href={`/admin/users/${u.id}`}
                  className="inline-flex items-center gap-1 rounded-xl bg-white/5 px-3 py-2 text-xs text-ink-200 hover:bg-white/10"
                >
                  פרטים
                  <ChevronLeft className="h-3 w-3" />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function daysAgo(date: Date): number {
  return Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
}
