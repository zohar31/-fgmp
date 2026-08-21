import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { Settings, MessageCircle, AlertCircle, CheckCircle2, Clock, Play, CreditCard } from "lucide-react";
import { ReactivateButton } from "@/components/ReactivateButton";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";
import { getServerLocale } from "@/lib/i18n-server";

export default async function AccountDashboardPage() {
  const session = await auth();
  if (isAdmin(session)) redirect("/admin");
  const userId = session!.user.id;
  const locale = await getServerLocale();
  const en = locale === "en";
  const R = SITE.pricing.refundDays;
  const priceLabel = en ? `$${SITE_EN.pricing.monthlyUSD}/month` : `${SITE.pricing.monthlyILS}₪/חודש`;
  const dateLocale = en ? "en-US" : "he-IL";
  const tt = en
    ? {
        hello: "Hi", statusNow: "Here's your subscription status right now.",
        subStatus: "Subscription status", trialLeft: "Trial days left", refundLeft: "Refund days left", validity: "Validity",
        waActivation: "WhatsApp activation", active: "Active ✓", waiting: "Pending",
        cancelledTitle: "Your subscription is cancelled", cancelledText: "Your data is saved. Reactivate in one click and the system resumes.",
        suspendedTitle: "Your subscription is temporarily suspended", suspendReason: (r: string) => `Reason: ${r}.`, suspendNo: "Leads aren't being sent right now.", suspendContact: " To reactivate, contact WhatsApp +972585222227.",
        step1Title: "Step 1 — Business details", step1Text: "The flow: business details → payment → WhatsApp activation. Start with your business details (trade, keywords, areas) — 5 minutes.", step1Cta: "Continue to settings",
        step2Title: "Step 2 — Payment", step2Text: `Business details ✓ done. Now pay ${priceLabel}. Full ${R}-day money-back guarantee — not happy, get all your money back.`, step2Note: "WhatsApp activation unlocks after payment.", step2Cta: "Continue to payment",
        step3Title: "Step 3 — Activate WhatsApp", step3Text: "Business details ✓ · Payment ✓ · Last step. Send the activation message on WhatsApp from the number that will receive leads — we'll activate you the moment we get it.", step3Cta: "Continue to activation",
        recent: "Recent notifications", allNotifs: "All notifications →", noNotifs: "No new notifications.",
      }
    : {
        hello: "שלום", statusNow: "הנה הסטטוס של המנוי שלך כרגע",
        subStatus: "סטטוס מנוי", trialLeft: "ימי ניסיון נותרו", refundLeft: "ימי החזר נותרו", validity: "תוקף",
        waActivation: "הפעלת WhatsApp", active: "פעיל ✓", waiting: "ממתין",
        cancelledTitle: "המנוי שלך מבוטל", cancelledText: "הנתונים שלך נשמרו. ניתן להפעיל מחדש בלחיצה אחת והמערכת תחזור לפעילות.",
        suspendedTitle: "המנוי שלך מושעה זמנית", suspendReason: (r: string) => `סיבה: ${r}.`, suspendNo: "המערכת אינה שולחת לידים כרגע.", suspendContact: " ליצירת קשר ולחידוש המנוי — וואטסאפ 058-5222227.",
        step1Title: "שלב 1 — מילוי פרטי העסק", step1Text: "התהליך: פרטי עסק → תשלום → הפעלת WhatsApp. נתחיל בפרטי העסק (תחום, מילות מפתח, אזורים) — 5 דקות.", step1Cta: "המשך להגדרות",
        step2Title: "שלב 2 — תשלום", step2Text: `פרטי עסק ✓ הושלמו. עכשיו תשלום של ${SITE.pricing.monthlyILS}₪/חודש (כולל מע"מ). ערבות החזר מלא תוך ${R} ימים — אם לא תהיה מרוצה, מקבל את כל הכסף בחזרה.`, step2Note: "ה-WhatsApp ייפתח להפעלה אחרי התשלום.", step2Cta: "המשך לתשלום",
        step3Title: "שלב 3 — הפעלת WhatsApp", step3Text: "פרטי עסק ✓ · תשלום ✓ · עכשיו השלב האחרון. שלח את הודעת ההפעלה ב-WhatsApp מהמספר שיקבל לידים — ברגע שנקבל אותה נפעיל אותך.", step3Cta: "המשך להפעלה",
        recent: "הודעות אחרונות", allNotifs: "כל ההודעות →", noNotifs: "אין הודעות חדשות.",
      };

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
  // Show "trial days" status card only for legacy users who actually have a trial.
  // New signups (post-2026-05-05 money-back model) have no trial — instead the
  // card shows refund-window status when relevant.
  const refundDaysLeft = subscription?.firstPaymentAt
    ? Math.max(
        0,
        Math.ceil(
          (subscription.firstPaymentAt.getTime() + SITE.pricing.refundDays * 24 * 60 * 60 * 1000 - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : null;
  const showTrialCard = trialDaysLeft !== null && trialDaysLeft > 0;
  const showRefundCard =
    !showTrialCard && refundDaysLeft !== null && refundDaysLeft > 0;

  const setupComplete = !!(
    settings?.businessName &&
    settings?.contactName &&
    settings?.niche &&
    settings?.leadPhone &&
    settings?.keywords
  );

  return (
    <div className="space-y-6" dir={en ? "ltr" : "rtl"}>
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">
          {tt.hello} {session!.user.name?.split(" ")[0] || "👋"}
        </h1>
        <p className="mt-2 text-ink-300">{tt.statusNow}</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatusCard
          label={tt.subStatus}
          value={subscriptionStatusLabel(subscription?.status, en)}
          accent={subscription?.status === "active" ? "wa" : "brand"}
          icon={Clock}
        />
        <StatusCard
          label={showTrialCard ? tt.trialLeft : showRefundCard ? tt.refundLeft : tt.validity}
          value={
            showTrialCard
              ? `${trialDaysLeft}/${SITE.pricing.refundDays}`
              : showRefundCard
                ? `${refundDaysLeft}/${SITE.pricing.refundDays}`
                : "—"
          }
          accent="brand"
          icon={Clock}
        />
        <StatusCard
          label={tt.waActivation}
          value={subscription?.activatedAt ? tt.active : tt.waiting}
          accent={subscription?.activatedAt ? "wa" : "warning"}
          icon={MessageCircle}
        />
      </section>

      {subscription?.status === "cancelled" && (
        <div className="card border-l-4 border-wa p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <Play className="mt-1 h-5 w-5 shrink-0 text-wa" />
              <div>
                <h3 className="font-display font-bold text-white">{tt.cancelledTitle}</h3>
                <p className="mt-1 text-sm text-ink-300">{tt.cancelledText}</p>
              </div>
            </div>
            <ReactivateButton en={en} />
          </div>
        </div>
      )}

      {subscription?.suspendedAt && (
        <div className="card border-l-4 border-amber-500 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
            <div className="flex-1">
              <h3 className="font-display font-bold text-white">{tt.suspendedTitle}</h3>
              <p className="mt-1 text-sm text-ink-300">
                {subscription.suspendedReason ? tt.suspendReason(subscription.suspendedReason) : tt.suspendNo}
                {tt.suspendContact}
              </p>
            </div>
          </div>
        </div>
      )}

      {!setupComplete && (
        <div className="card border-l-4 border-brand-500 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-1 h-5 w-5 shrink-0 text-brand-300" />
            <div className="flex-1">
              <h3 className="font-display font-bold text-white">{tt.step1Title}</h3>
              <p className="mt-1 text-sm text-ink-300">{tt.step1Text}</p>
              <Link
                href="/account/setup"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-600"
              >
                <Settings className="h-4 w-4" />
                {tt.step1Cta}
              </Link>
            </div>
          </div>
        </div>
      )}

      {setupComplete && !subscription?.firstPaymentAt && (
        <div className="card border-l-4 border-amber-500 p-5">
          <div className="flex items-start gap-3">
            <CreditCard className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
            <div className="flex-1">
              <h3 className="font-display font-bold text-white">{tt.step2Title}</h3>
              <p className="mt-1 text-sm text-ink-300">
                {tt.step2Text}
                <strong className="block mt-1 text-amber-200">{tt.step2Note}</strong>
              </p>
              <Link
                href="/account/billing"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-amber-600"
              >
                <CreditCard className="h-4 w-4" />
                {tt.step2Cta}
              </Link>
            </div>
          </div>
        </div>
      )}

      {setupComplete && subscription?.firstPaymentAt && !subscription?.activatedAt && (
        <div className="card border-l-4 border-wa p-5">
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-wa" />
            <div className="flex-1">
              <h3 className="font-display font-bold text-white">{tt.step3Title}</h3>
              <p className="mt-1 text-sm text-ink-300">{tt.step3Text}</p>
              <Link href="/account/whatsapp" className="btn-wa mt-4 text-sm">
                {tt.step3Cta}
              </Link>
            </div>
          </div>
        </div>
      )}

      <section className="card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-white">{tt.recent}</h2>
          <Link href="/account/notifications" className="text-xs text-brand-300 hover:underline">
            {tt.allNotifs}
          </Link>
        </div>

        {recentNotifs.length === 0 ? (
          <p className="text-sm text-ink-400">{tt.noNotifs}</p>
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
                    {new Date(n.createdAt).toLocaleString(dateLocale, {
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

function subscriptionStatusLabel(status: string | null | undefined, en: boolean): string {
  const map: Record<string, [string, string]> = {
    pending_setup: ["ממתין להגדרות", "Pending setup"],
    pending_activation: ["ממתין לתשלום", "Pending payment"],
    trial_active: ["ניסיון פעיל", "Trial active"],
    active: ["מנוי פעיל", "Active"],
    cancelled: ["מבוטל", "Cancelled"],
    expired: ["פג תוקף", "Expired"],
  };
  const pair = status ? map[status] : undefined;
  return pair ? (en ? pair[1] : pair[0]) : "—";
}
