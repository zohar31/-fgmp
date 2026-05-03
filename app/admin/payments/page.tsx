import Link from "next/link";
import { db, schema } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { CreditCard, ChevronLeft, CheckCircle2, XCircle, Clock } from "lucide-react";

export default async function AdminPaymentsPage() {
  const [recentInvoices, allSubs, allSettings] = await Promise.all([
    db
      .select()
      .from(schema.invoices)
      .orderBy(desc(schema.invoices.issuedAt))
      .limit(100),
    db.select().from(schema.subscriptions),
    db.select().from(schema.businessSettings),
  ]);

  const settingsByUser = new Map(allSettings.map((s) => [s.userId, s]));
  const subsByUser = new Map(allSubs.map((s) => [s.userId, s]));

  const paidCount = recentInvoices.filter((i) => i.status === "paid").length;
  const failedCount = recentInvoices.filter((i) => i.status === "failed").length;
  const pendingCount = recentInvoices.filter((i) => i.status === "pending").length;
  const totalRevenue = recentInvoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  // Active subscribers with valid token
  const activeWithCard = allSubs.filter((s) => s.tranzilaToken && s.status === "active").length;
  const tokenButNotActive = allSubs.filter((s) => s.tranzilaToken && s.status !== "active").length;

  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-3">
          <CreditCard className="h-7 w-7 text-brand-300" />
          <h1 className="font-display text-3xl font-extrabold text-white">תשלומים וסליקה</h1>
        </div>
        <p className="mt-2 text-ink-300">
          חיובים שבוצעו, מנויים בתשלום, וסטטוס סליקה דרך Tranzila.
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Stat label="חיובים סה״כ" value={recentInvoices.length} />
        <Stat label="שולמו" value={paidCount} accent="wa" />
        <Stat label="נכשלו" value={failedCount} accent="rose" />
        <Stat label="ממתינים" value={pendingCount} accent="amber" />
        <Stat label="הכנסות (₪)" value={totalRevenue} accent="wa" />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="מנויים פעילים בתשלום" value={activeWithCard} accent="wa" />
        <Stat label="עם token לא פעיל" value={tokenButNotActive} accent="amber" />
      </div>

      {/* Invoices table */}
      <div className="card overflow-hidden">
        <div className="border-b border-white/5 p-4">
          <h2 className="font-display font-bold text-white">100 חיובים אחרונים</h2>
        </div>
        {recentInvoices.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-ink-300">אין חיובים עדיין במערכת.</p>
            <p className="mt-2 text-xs text-ink-500">
              ברגע שמנוי יבצע תשלום (אמיתי או בדיקה), הוא יופיע כאן.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-xs text-ink-400">
                <tr>
                  <th className="p-3 text-right font-medium">זמן</th>
                  <th className="p-3 text-right font-medium">משתמש</th>
                  <th className="p-3 text-right font-medium">סכום</th>
                  <th className="p-3 text-right font-medium">סטטוס</th>
                  <th className="p-3 text-right font-medium">סוג</th>
                  <th className="p-3 text-right font-medium">Tranzila</th>
                  <th className="p-3 text-right font-medium">שגיאה</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentInvoices.map((inv) => {
                  const cfg = settingsByUser.get(inv.userId);
                  return (
                    <tr key={inv.id} className="hover:bg-white/[0.02]">
                      <td className="p-3 align-top text-xs text-ink-400" dir="ltr">
                        {new Date(inv.issuedAt).toLocaleString("he-IL", {
                          timeZone: "Asia/Jerusalem",
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="p-3 align-top">
                        <Link
                          href={`/admin/users/${inv.userId}`}
                          className="block hover:text-brand-300"
                        >
                          <div className="font-semibold text-white">
                            {cfg?.businessName || cfg?.contactName || "—"}
                          </div>
                          <code className="text-[10px] text-ink-500" dir="ltr">
                            {inv.userId.slice(0, 8)}
                          </code>
                        </Link>
                      </td>
                      <td className="p-3 align-top">
                        <span className="font-bold text-white">{inv.amount} ₪</span>
                      </td>
                      <td className="p-3 align-top">
                        <StatusBadge status={inv.status} />
                      </td>
                      <td className="p-3 align-top text-xs">
                        <div className="text-ink-200">
                          {inv.isRecurring ? "חיוב חוזר" : "תשלום ראשון"}
                        </div>
                        {inv.paymentMethod && (
                          <div className="text-[10px] text-ink-400">
                            {inv.paymentMethod === "bit" ? "Bit" : "כרטיס אשראי"}
                          </div>
                        )}
                      </td>
                      <td className="p-3 align-top text-xs" dir="ltr">
                        {inv.tranzilaConfirmationCode && (
                          <div className="text-ink-200">
                            #{inv.tranzilaConfirmationCode}
                          </div>
                        )}
                        {inv.tranzilaIndex && (
                          <div className="text-[10px] text-ink-500">
                            idx: {inv.tranzilaIndex}
                          </div>
                        )}
                      </td>
                      <td className="p-3 align-top text-xs">
                        {inv.tranzilaResponseCode && inv.tranzilaResponseCode !== "000" && (
                          <div className="text-rose-300">
                            <span className="font-mono">{inv.tranzilaResponseCode}</span>
                            {inv.tranzilaResponseMessage && (
                              <div className="text-[10px] text-ink-400">
                                {inv.tranzilaResponseMessage}
                              </div>
                            )}
                          </div>
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

      {/* Active subscribers with cards */}
      <div className="card overflow-hidden">
        <div className="border-b border-white/5 p-4">
          <h2 className="font-display font-bold text-white">מנויים עם כרטיס שמור</h2>
        </div>
        {allSubs.filter((s) => s.tranzilaToken).length === 0 ? (
          <div className="p-8 text-center text-ink-300">אין כרטיסים שמורים עדיין.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-xs text-ink-400">
                <tr>
                  <th className="p-3 text-right font-medium">משתמש</th>
                  <th className="p-3 text-right font-medium">סטטוס</th>
                  <th className="p-3 text-right font-medium">כרטיס</th>
                  <th className="p-3 text-right font-medium">חיוב אחרון</th>
                  <th className="p-3 text-right font-medium">חיוב הבא</th>
                  <th className="p-3 text-right font-medium">כשלונות</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {allSubs
                  .filter((s) => s.tranzilaToken)
                  .map((s) => {
                    const cfg = settingsByUser.get(s.userId);
                    return (
                      <tr key={s.userId} className="hover:bg-white/[0.02]">
                        <td className="p-3 align-top">
                          <Link
                            href={`/admin/users/${s.userId}`}
                            className="block hover:text-brand-300"
                          >
                            <div className="font-semibold text-white">
                              {cfg?.businessName || "—"}
                            </div>
                            <div className="text-xs text-ink-400">{cfg?.leadPhone || "—"}</div>
                          </Link>
                        </td>
                        <td className="p-3 align-top">
                          <SubStatusBadge status={s.status} />
                        </td>
                        <td className="p-3 align-top text-xs" dir="ltr">
                          {s.tranzilaCardBrand || "Card"} •••• {s.tranzilaCardLast4 || "??"}
                          {s.tranzilaTokenExpiry && (
                            <div className="text-[10px] text-ink-400">
                              exp {s.tranzilaTokenExpiry.slice(0, 2)}/{s.tranzilaTokenExpiry.slice(2)}
                            </div>
                          )}
                        </td>
                        <td className="p-3 align-top text-xs text-ink-300">
                          {s.lastPaymentAt
                            ? new Date(s.lastPaymentAt).toLocaleDateString("he-IL")
                            : "—"}
                        </td>
                        <td className="p-3 align-top text-xs text-ink-300">
                          {s.nextChargeAt
                            ? new Date(s.nextChargeAt).toLocaleDateString("he-IL")
                            : "—"}
                        </td>
                        <td className="p-3 align-top">
                          {s.failedChargeCount > 0 ? (
                            <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-xs text-rose-300 ring-1 ring-rose-500/30">
                              {s.failedChargeCount}
                            </span>
                          ) : (
                            <span className="text-xs text-ink-500">0</span>
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

      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-sm text-brand-300 hover:text-brand-200"
        >
          <ChevronLeft className="h-4 w-4" />
          חזרה למנויים
        </Link>
      </div>
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
  accent?: "wa" | "rose" | "amber" | "ink";
}) {
  const colors = {
    wa: "text-wa",
    rose: "text-rose-300",
    amber: "text-amber-300",
    ink: "text-ink-200",
  };
  return (
    <div className="card p-4 text-center">
      <div className="text-xs text-ink-400">{label}</div>
      <div className={`mt-1 font-display text-2xl font-extrabold ${colors[accent]}`}>
        {value.toLocaleString("he-IL")}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<
    string,
    { label: string; cls: string; Icon: typeof CheckCircle2 }
  > = {
    paid: { label: "שולם", cls: "bg-wa/10 text-wa ring-wa/30", Icon: CheckCircle2 },
    failed: { label: "נכשל", cls: "bg-rose-500/10 text-rose-300 ring-rose-500/30", Icon: XCircle },
    pending: { label: "ממתין", cls: "bg-amber-500/10 text-amber-300 ring-amber-500/30", Icon: Clock },
    refunded: { label: "הוחזר", cls: "bg-ink-500/10 text-ink-300 ring-ink-500/30", Icon: XCircle },
  };
  const m = map[status] || { label: status, cls: "bg-white/5 text-ink-300 ring-white/10", Icon: Clock };
  const Icon = m.Icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ring-1 ${m.cls}`}>
      <Icon className="h-3 w-3" />
      {m.label}
    </span>
  );
}

function SubStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-wa/10 text-wa ring-wa/30",
    trial_active: "bg-brand-500/10 text-brand-300 ring-brand-500/30",
    pending_setup: "bg-amber-500/10 text-amber-300 ring-amber-500/30",
    pending_activation: "bg-amber-500/10 text-amber-300 ring-amber-500/30",
    cancelled: "bg-ink-500/10 text-ink-300 ring-ink-500/30",
    expired: "bg-rose-500/10 text-rose-300 ring-rose-500/30",
  };
  const labelMap: Record<string, string> = {
    active: "פעיל",
    trial_active: "ניסיון",
    pending_setup: "טרם מולא",
    pending_activation: "טרם הופעל",
    cancelled: "מבוטל",
    expired: "פג תוקף",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ring-1 ${map[status] || "bg-white/5 text-ink-300 ring-white/10"}`}>
      {labelMap[status] || status}
    </span>
  );
}
