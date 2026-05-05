import Link from "next/link";
import { db, schema } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import { ChevronLeft, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { ProcessCancellationButtons } from "./ProcessCancellationButtons";
import { isWithinRefundWindow, refundDaysLeft, SITE } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function AdminCancellationsPage() {
  const session = await auth();
  if (!isAdmin(session)) redirect("/account");

  const requests = await db
    .select()
    .from(schema.cancellationRequests)
    .orderBy(desc(schema.cancellationRequests.requestedAt))
    .limit(100);

  // Hydrate user info & subscription state for context
  const userIds = [...new Set(requests.map((r) => r.userId))];
  const [allSettings, allSubs, allUsers] = await Promise.all([
    db.select().from(schema.businessSettings),
    db.select().from(schema.subscriptions),
    db.select().from(schema.users),
  ]);
  const settingsByUser = new Map(allSettings.map((s) => [s.userId, s]));
  const subsByUser = new Map(allSubs.map((s) => [s.userId, s]));
  const usersById = new Map(allUsers.map((u) => [u.id, u]));

  const pending = requests.filter((r) => r.status === "pending");
  const processed = requests.filter((r) => r.status !== "pending");

  void userIds;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">
          בקשות ביטול
        </h1>
        <p className="mt-2 text-ink-300">
          לקוחות שביקשו לבטל מנוי. ערבות החזר מלא תוך {SITE.pricing.refundDays} ימים מהתשלום הראשון.
        </p>
      </header>

      <section className="card overflow-hidden">
        <div className="border-b border-white/5 bg-amber-500/5 p-4">
          <h2 className="flex items-center gap-2 font-display font-bold text-white">
            <AlertCircle className="h-5 w-5 text-amber-300" />
            בקשות בהמתנה לטיפול ({pending.length})
          </h2>
        </div>

        {pending.length === 0 ? (
          <div className="p-8 text-center text-ink-300">
            אין בקשות ביטול ממתינות 🎉
          </div>
        ) : (
          <ul className="divide-y divide-white/5">
            {pending.map((r) => {
              const cfg = settingsByUser.get(r.userId);
              const sub = subsByUser.get(r.userId);
              const u = usersById.get(r.userId);
              const refundEligible = isWithinRefundWindow(sub?.firstPaymentAt);
              const daysLeft = refundDaysLeft(sub?.firstPaymentAt);
              return (
                <li key={r.id} className="p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <Link
                        href={`/admin/users/${r.userId}`}
                        className="font-display text-lg font-bold text-white hover:text-brand-300"
                      >
                        {cfg?.businessName || cfg?.contactName || u?.email || "—"}
                      </Link>
                      <div className="mt-1 grid gap-1 text-sm text-ink-300 sm:grid-cols-2">
                        <div>📧 {u?.email}</div>
                        <div>📱 <span dir="ltr">{cfg?.leadPhone || "—"}</span></div>
                        <div>
                          זמן בקשה:{" "}
                          {new Date(r.requestedAt).toLocaleString("he-IL", {
                            timeZone: "Asia/Jerusalem",
                          })}
                        </div>
                        <div>
                          {refundEligible ? (
                            <span className="text-wa">
                              ✓ זכאי להחזר מלא ({daysLeft} ימים נותרו)
                            </span>
                          ) : (
                            <span className="text-ink-400">
                              ✗ מחוץ לחלון 7 הימים
                            </span>
                          )}
                        </div>
                      </div>
                      {r.reason && (
                        <div className="mt-3 rounded-xl bg-white/[0.03] p-3 text-sm text-ink-200 ring-1 ring-white/5">
                          <span className="text-xs text-ink-500">סיבת ביטול:</span>
                          <div className="mt-1">{r.reason}</div>
                        </div>
                      )}
                    </div>

                    <ProcessCancellationButtons
                      requestId={r.id}
                      refundEligible={refundEligible}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="card overflow-hidden">
        <div className="border-b border-white/5 p-4">
          <h2 className="font-display font-bold text-white">
            היסטוריה ({processed.length})
          </h2>
        </div>
        {processed.length === 0 ? (
          <div className="p-8 text-center text-ink-300">אין בקשות שטופלו עדיין.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-xs text-ink-400">
                <tr>
                  <th className="p-3 text-right font-medium">לקוח</th>
                  <th className="p-3 text-right font-medium">בוקש</th>
                  <th className="p-3 text-right font-medium">טופל</th>
                  <th className="p-3 text-right font-medium">תוצאה</th>
                  <th className="p-3 text-right font-medium">הערות</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {processed.map((r) => {
                  const cfg = settingsByUser.get(r.userId);
                  return (
                    <tr key={r.id}>
                      <td className="p-3 align-top">
                        <Link
                          href={`/admin/users/${r.userId}`}
                          className="font-semibold text-white hover:text-brand-300"
                        >
                          {cfg?.businessName || cfg?.contactName || "—"}
                        </Link>
                      </td>
                      <td className="p-3 align-top text-xs text-ink-400">
                        {new Date(r.requestedAt).toLocaleDateString("he-IL")}
                      </td>
                      <td className="p-3 align-top text-xs text-ink-400">
                        {r.processedAt
                          ? new Date(r.processedAt).toLocaleDateString("he-IL")
                          : "—"}
                      </td>
                      <td className="p-3 align-top">
                        <ResultBadge status={r.status} />
                      </td>
                      <td className="p-3 align-top text-xs text-ink-300">
                        {r.adminNotes || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-sm text-brand-300 hover:text-brand-200"
      >
        <ChevronLeft className="h-4 w-4" />
        חזרה לדשבורד
      </Link>
    </div>
  );
}

function ResultBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; Icon: typeof CheckCircle2 }> = {
    cancelled_and_refunded: {
      label: "בוטל + הוחזר",
      cls: "bg-wa/10 text-wa ring-wa/30",
      Icon: CheckCircle2,
    },
    cancelled_only: {
      label: "בוטל",
      cls: "bg-amber-500/10 text-amber-300 ring-amber-500/30",
      Icon: CheckCircle2,
    },
    rejected: {
      label: "נדחה",
      cls: "bg-rose-500/10 text-rose-300 ring-rose-500/30",
      Icon: XCircle,
    },
    pending: {
      label: "בהמתנה",
      cls: "bg-ink-500/10 text-ink-300 ring-ink-500/30",
      Icon: AlertCircle,
    },
  };
  const m = map[status] || map.pending;
  const Icon = m.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ring-1 ${m.cls}`}
    >
      <Icon className="h-3 w-3" />
      {m.label}
    </span>
  );
}
