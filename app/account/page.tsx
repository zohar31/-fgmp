import Link from "next/link";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { Settings, MessageCircle, AlertCircle, CheckCircle2, Clock } from "lucide-react";

export default async function AccountDashboardPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [subscription, settings, recentNotifs] = await Promise.all([
    db.query.subscriptions.findFirst({
      where: eq(schema.subscriptions.userId, userId),
    }),
    db.query.businessSettings.findFirst({
      where: eq(schema.businessSettings.userId, userId),
    }),
    db.query.notifications.findMany({
      where: eq(schema.notifications.userId, userId),
      orderBy: (t, { desc }) => [desc(t.createdAt)],
      limit: 3,
    }),
  ]);

  const trialDaysLeft = subscription?.trialEndsAt
    ? Math.max(
        0,
        Math.ceil(
          (subscription.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )
      )
    : null;

  const setupComplete = !!(
    settings?.businessName &&
    settings?.contactName &&
    settings?.niche &&
    settings?.leadPhone &&
    settings?.keywords
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">
          שלום {session!.user.name?.split(" ")[0] || "👋"}
        </h1>
        <p className="mt-2 text-ink-300">הנה הסטטוס של המנוי שלך כרגע</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatusCard
          label="סטטוס מנוי"
          value={subscriptionStatusLabel(subscription?.status)}
          accent={subscription?.status === "active" ? "wa" : "brand"}
          icon={Clock}
        />
        <StatusCard
          label={trialDaysLeft !== null ? "ימי ניסיון נותרו" : "תוקף"}
          value={trialDaysLeft !== null ? `${trialDaysLeft}/7` : "—"}
          accent="brand"
          icon={Clock}
        />
        <StatusCard
          label="הפעלת WhatsApp"
          value={subscription?.activatedAt ? "פעיל ✓" : "ממתין"}
          accent={subscription?.activatedAt ? "wa" : "warning"}
          icon={MessageCircle}
        />
      </section>

      {!setupComplete && (
        <div className="card border-l-4 border-brand-500 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-brand-300" />
            <div className="flex-1">
              <h3 className="font-display font-bold text-white">
                סיימו את ההגדרה כדי להתחיל לקבל לידים
              </h3>
              <p className="mt-1 text-sm text-ink-300">
                ממלאים את פרטי העסק, מילות המפתח, וקישורי WhatsApp — ואחרי זה לוחצים "שלח למערכת".
              </p>
              <Link
                href="/account/setup"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <Settings className="h-4 w-4" />
                המשך להגדרות
              </Link>
            </div>
          </div>
        </div>
      )}

      {setupComplete && !subscription?.activatedAt && (
        <div className="card border-l-4 border-wa p-5">
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-wa" />
            <div className="flex-1">
              <h3 className="font-display font-bold text-white">
                שלב אחרון — הפעל את WhatsApp
              </h3>
              <p className="mt-1 text-sm text-ink-300">
                שלח את הגדרות העסק ב-WhatsApp מהמספר שיקבל לידים. ברגע שנקבל את ההודעה — נפעיל אותך.
              </p>
              <Link
                href="/account/whatsapp"
                className="btn-wa mt-4 text-sm"
              >
                המשך להפעלה
              </Link>
            </div>
          </div>
        </div>
      )}

      <section className="card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-white">הודעות אחרונות</h2>
          <Link href="/account/notifications" className="text-xs text-brand-300 hover:underline">
            כל ההודעות →
          </Link>
        </div>

        {recentNotifs.length === 0 ? (
          <p className="text-sm text-ink-400">אין הודעות חדשות.</p>
        ) : (
          <ul className="space-y-3">
            {recentNotifs.map((n) => (
              <li
                key={n.id}
                className="flex items-start gap-3 rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/5"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{n.title}</div>
                  {n.body && <div className="mt-1 text-xs text-ink-300">{n.body}</div>}
                  <div className="mt-1 text-[10px] text-ink-500">
                    {new Date(n.createdAt).toLocaleString("he-IL", {
                      timeZone: "Asia/Jerusalem",
                    })}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatusCard({
  label,
  value,
  accent,
  icon: Icon,
}: {
  label: string;
  value: string;
  accent: "brand" | "wa" | "warning";
  icon: React.ComponentType<{ className?: string }>;
}) {
  const accentMap = {
    brand: "text-brand-300 bg-brand-500/10 ring-brand-500/30",
    wa: "text-wa bg-wa/10 ring-wa/30",
    warning: "text-amber-300 bg-amber-500/10 ring-amber-500/30",
  } as const;
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ring-1 ${accentMap[accent]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs text-ink-400">{label}</div>
          <div className="mt-0.5 font-display text-lg font-bold text-white">{value}</div>
        </div>
      </div>
    </div>
  );
}

function subscriptionStatusLabel(status?: string | null): string {
  switch (status) {
    case "pending_setup":
      return "ממתין להגדרות";
    case "pending_activation":
      return "ממתין להפעלה";
    case "trial_active":
      return "ניסיון פעיל";
    case "active":
      return "מנוי פעיל";
    case "cancelled":
      return "מבוטל";
    case "expired":
      return "פג תוקף";
    default:
      return "—";
  }
}
