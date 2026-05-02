import Link from "next/link";
import { notFound } from "next/navigation";
import { db, schema } from "@/lib/db";
import { eq, desc } from "drizzle-orm";
import { ChevronRight, Mail, Phone, Building, User, Hash, MapPin, Search, Clock, FileText, MessageCircle, Bell, AlertCircle, CheckCircle2 } from "lucide-react";
import { ActivateButton } from "../../ActivateButton";
import { RemindButton } from "../../RemindButton";
import { DeleteUserButton } from "./DeleteUserButton";
import { SuspendButton } from "./SuspendButton";
import { PushToExtensionButton } from "./PushToExtensionButton";
import { auth } from "@/lib/auth";
import { SITE } from "@/lib/config";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const session = await auth();
  const isSelf = session?.user?.id === userId;

  const user = await db.query.users.findFirst({
    where: eq(schema.users.id, userId),
  });

  if (!user) notFound();

  const [subscription, settings, notifications, intent] = await Promise.all([
    db.query.subscriptions.findFirst({
      where: eq(schema.subscriptions.userId, userId),
    }),
    db.query.businessSettings.findFirst({
      where: eq(schema.businessSettings.userId, userId),
    }),
    db.query.notifications.findMany({
      where: eq(schema.notifications.userId, userId),
      orderBy: [desc(schema.notifications.createdAt)],
      limit: 20,
    }),
    db.query.signupIntents.findFirst({
      where: eq(schema.signupIntents.linkedUserId, userId),
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

  const activationMessage = subscription && settings ? buildActivationMessage({
    token: subscription.activationToken,
    businessName: settings.businessName ?? "",
    contactName: settings.contactName ?? "",
    niche: settings.niche ?? "",
    serviceAreas: settings.serviceAreas ?? "",
    keywords: settings.keywords ?? "",
    leadPhone: settings.leadPhone ?? "",
    description: settings.description ?? "",
  }) : null;

  return (
    <div className="space-y-6">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-sm text-ink-300 hover:text-white"
      >
        <ChevronRight className="h-4 w-4" />
        חזרה לרשימה
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name || ""}
              className="h-14 w-14 rounded-full ring-2 ring-white/10"
            />
          ) : (
            <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-500 text-xl font-bold text-white">
              {(user.name || user.email)[0].toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="font-display text-2xl font-extrabold text-white">
              {user.name || user.email}
            </h1>
            <div className="text-sm text-ink-300" dir="ltr">{user.email}</div>
            <div className="mt-1 text-xs text-ink-500">
              נרשם: {new Date(user.createdAt).toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          {subscription && subscription.status === "pending_activation" && !subscription.activatedAt && (
            <ActivateButton userId={userId} defaultPhone={settings?.leadPhone || ""} />
          )}
          {subscription && (subscription.status === "pending_setup" || subscription.status === "pending_activation") && (
            <RemindButton userId={userId} />
          )}
          {subscription && (
            <PushToExtensionButton
              userId={userId}
              disabled={
                !subscription.activatedAt ||
                !["trial_active", "active"].includes(subscription.status)
              }
              disabledReason={
                !subscription.activatedAt
                  ? "המשתמש לא הפעיל את WhatsApp עדיין"
                  : `מנוי לא פעיל (${subscription.status})`
              }
            />
          )}
          {subscription && subscription.status !== "cancelled" && !isSelf && (
            <SuspendButton userId={userId} isSuspended={!!subscription.suspendedAt} />
          )}
          {!isSelf && (
            <DeleteUserButton
              userId={userId}
              userLabel={settings?.businessName || user.name || user.email}
            />
          )}
        </div>
      </header>

      {subscription?.suspendedAt && (
        <div className="card border-l-4 border-amber-500 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
            <div>
              <h3 className="font-display font-bold text-white">המנוי מושעה</h3>
              <p className="mt-1 text-sm text-ink-300">
                הושעה ב-{new Date(subscription.suspendedAt).toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })}.
              </p>
              {subscription.suspendedReason && (
                <p className="mt-1 text-sm text-ink-300">סיבה: {subscription.suspendedReason}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Subscription card */}
      <section className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <Clock className="h-5 w-5 text-brand-300" />
          סטטוס מנוי
        </h2>
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DataItem label="סטטוס">
            <SubStatus status={subscription?.status} />
          </DataItem>
          <DataItem label="ימי ניסיון נותרו">
            {trialDaysLeft !== null ? `${trialDaysLeft} / 7` : "—"}
          </DataItem>
          <DataItem label="טוקן הפעלה">
            {subscription?.activationToken ? (
              <code dir="ltr" className="rounded bg-white/5 px-2 py-1 text-xs text-brand-300">
                {subscription.activationToken}
              </code>
            ) : "—"}
          </DataItem>
          <DataItem label="תחילת ניסיון">
            {subscription?.trialStartedAt
              ? new Date(subscription.trialStartedAt).toLocaleDateString("he-IL")
              : "—"}
          </DataItem>
          <DataItem label="סוף ניסיון">
            {subscription?.trialEndsAt
              ? new Date(subscription.trialEndsAt).toLocaleDateString("he-IL")
              : "—"}
          </DataItem>
          <DataItem label="הופעל בתאריך">
            {subscription?.activatedAt
              ? new Date(subscription.activatedAt).toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })
              : "—"}
          </DataItem>
          <DataItem label="הופעל ממספר">
            <span dir="ltr">{subscription?.activatedFromPhone || "—"}</span>
          </DataItem>
          {subscription?.cancelledAt && (
            <>
              <DataItem label="בוטל ב">
                {new Date(subscription.cancelledAt).toLocaleDateString("he-IL")}
              </DataItem>
              <DataItem label="סיבת ביטול">
                {subscription.cancellationReason || "לא צוין"}
              </DataItem>
            </>
          )}
        </dl>
      </section>

      {/* Business settings card */}
      <section className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <Building className="h-5 w-5 text-brand-300" />
          פרטי העסק
        </h2>
        {!settings ? (
          <div className="flex items-center gap-2 text-sm text-amber-300">
            <AlertCircle className="h-4 w-4" />
            הלקוח עדיין לא מילא את ההגדרות.
          </div>
        ) : (
          <dl className="grid gap-4 sm:grid-cols-2">
            <DataItem label="שם העסק" icon={Building}>
              {settings.businessName || "—"}
            </DataItem>
            <DataItem label="איש קשר" icon={User}>
              {settings.contactName || "—"}
            </DataItem>
            <DataItem label="ח.פ. / עוסק מורשה" icon={Hash}>
              <span dir="ltr">{settings.vatId || "—"}</span>
            </DataItem>
            <DataItem label="אימייל ליצירת קשר" icon={Mail}>
              <span dir="ltr">{settings.contactEmail || "—"}</span>
            </DataItem>
            <DataItem label="טלפון לקבלת לידים" icon={Phone}>
              <span dir="ltr">{settings.leadPhone || "—"}</span>
            </DataItem>
            <DataItem label="טלגרם (אופציונלי)" icon={MessageCircle}>
              <span dir="ltr">{settings.telegramUsername ? `@${settings.telegramUsername}` : "—"}</span>
            </DataItem>
            <DataItem label="תחום עיסוק">{settings.niche || "—"}</DataItem>
            <DataItem label="איזורי שירות" icon={MapPin}>
              {settings.serviceAreas || "—"}
            </DataItem>
            <DataItem label="מילות מפתח" icon={Search} fullWidth>
              {settings.keywords || "—"}
            </DataItem>
            <DataItem label="תיאור חופשי" icon={FileText} fullWidth>
              <p className="whitespace-pre-wrap leading-6">{settings.description || "—"}</p>
            </DataItem>
            <DataItem label="עודכן לאחרונה" fullWidth>
              <span className="text-xs text-ink-400">
                {new Date(settings.updatedAt).toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })}
              </span>
            </DataItem>
          </dl>
        )}
      </section>

      {/* Activation message preview */}
      {activationMessage && (
        <section className="card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
            <MessageCircle className="h-5 w-5 text-wa" />
            תצוגה מקדימה — הודעת ההפעלה
          </h2>
          <p className="mb-3 text-xs text-ink-400">
            זו ההודעה שהלקוח שולח כשלוחץ על "פתח WhatsApp" באזור האישי.
            יישלחה ל-{SITE.whatsapp}.
          </p>
          <pre
            className="whitespace-pre-wrap rounded-xl bg-[#0b141a] p-4 text-xs leading-6 text-emerald-100 ring-1 ring-white/10"
            dir="rtl"
          >
            {activationMessage}
          </pre>
        </section>
      )}

      {/* Signup intent card (if user came from old form) */}
      {intent && (
        <section className="card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
            <FileText className="h-5 w-5 text-ink-300" />
            פרטים מטופס ההרשמה הציבורי הישן
          </h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            <DataItem label="שם עסק (טופס)">{intent.businessName}</DataItem>
            <DataItem label="WhatsApp (טופס)">
              <span dir="ltr">{intent.whatsapp}</span>
            </DataItem>
            <DataItem label="תיאור שירות" fullWidth>
              {intent.service}
            </DataItem>
            <DataItem label="IP">
              <span dir="ltr" className="text-xs">{intent.ip || "—"}</span>
            </DataItem>
            <DataItem label="תאריך הגשה">
              {new Date(intent.createdAt).toLocaleString("he-IL")}
            </DataItem>
          </dl>
        </section>
      )}

      {/* Notifications */}
      <section className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
          <Bell className="h-5 w-5 text-brand-300" />
          הודעות שנשלחו ללקוח ({notifications.length})
        </h2>
        {notifications.length === 0 ? (
          <p className="text-sm text-ink-400">אין הודעות.</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/5"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">{n.title}</div>
                    {n.body && <div className="mt-1 text-xs text-ink-300">{n.body}</div>}
                    <div className="mt-1 text-[10px] text-ink-500">
                      {new Date(n.createdAt).toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })}
                      {" · "}
                      <span className="capitalize">{n.type}</span>
                      {n.read && " · נקראה"}
                    </div>
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

function DataItem({
  label,
  children,
  icon: Icon,
  fullWidth,
}: {
  label: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "sm:col-span-2 lg:col-span-3" : ""}>
      <dt className="flex items-center gap-1.5 text-xs font-medium text-ink-400">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </dt>
      <dd className="mt-1 text-sm text-white">{children}</dd>
    </div>
  );
}

function SubStatus({ status }: { status?: string | null }) {
  const map: Record<string, { label: string; cls: string }> = {
    pending_setup: { label: "ממתין להגדרות", cls: "bg-amber-500/10 text-amber-300 ring-amber-500/30" },
    pending_activation: { label: "ממתין להפעלה", cls: "bg-brand-500/10 text-brand-300 ring-brand-500/30" },
    trial_active: { label: "ניסיון פעיל", cls: "bg-wa/10 text-wa ring-wa/30" },
    active: { label: "מנוי פעיל", cls: "bg-wa/10 text-wa ring-wa/30" },
    cancelled: { label: "מבוטל", cls: "bg-ink-500/10 text-ink-300 ring-ink-500/30" },
    expired: { label: "פג תוקף", cls: "bg-ink-500/10 text-ink-300 ring-ink-500/30" },
  };
  const m = map[status || ""] || { label: status || "—", cls: "bg-white/5 text-ink-300 ring-white/10" };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs ring-1 ${m.cls}`}>
      {m.label}
    </span>
  );
}

function buildActivationMessage(p: {
  token: string;
  businessName: string;
  contactName: string;
  niche: string;
  serviceAreas: string;
  keywords: string;
  leadPhone: string;
  description: string;
}): string {
  return [
    p.token,
    "",
    `שם: ${p.businessName}`,
    `איש קשר: ${p.contactName}`,
    `תחום: ${p.niche}`,
    `איזורי שירות: ${p.serviceAreas}`,
    `מילות מפתח: ${p.keywords}`,
    `טלפון לידים: ${p.leadPhone}`,
    "",
    "תיאור:",
    p.description,
  ].join("\n");
}
