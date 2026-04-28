import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { Receipt, FileText, Download } from "lucide-react";

export const metadata: Metadata = { title: "חשבוניות" };

export default async function InvoicesPage() {
  const session = await auth();
  const userId = session!.user.id;

  const items = await db.query.invoices.findMany({
    where: eq(schema.invoices.userId, userId),
    orderBy: (t, { desc }) => [desc(t.issuedAt)],
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">חשבוניות</h1>
        <p className="mt-2 text-ink-300">היסטוריית חיובים והעתקי חשבוניות.</p>
      </header>

      {items.length === 0 ? (
        <div className="card p-8 text-center">
          <Receipt className="mx-auto mb-4 h-10 w-10 text-ink-500" />
          <h3 className="font-display font-bold text-white">אין חשבוניות עדיין</h3>
          <p className="mt-2 text-sm text-ink-300">
            במהלך תקופת הניסיון של 7 הימים — אין חיובים ולכן אין חשבוניות.
            <br />
            החשבונית הראשונה שלך תיווצר אוטומטית עם החיוב הראשון אחרי תום הניסיון.
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5 text-xs text-ink-400">
              <tr>
                <th className="p-4 text-right font-medium">תאריך</th>
                <th className="p-4 text-right font-medium">סכום</th>
                <th className="p-4 text-right font-medium">סטטוס</th>
                <th className="p-4 text-right font-medium">חשבונית</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {items.map((inv) => (
                <tr key={inv.id}>
                  <td className="p-4 text-ink-200">
                    {new Date(inv.issuedAt).toLocaleDateString("he-IL")}
                  </td>
                  <td className="p-4 font-semibold text-white">
                    {inv.amount} {inv.currency === "ILS" ? "₪" : inv.currency}
                  </td>
                  <td className="p-4">
                    <StatusPill status={inv.status} />
                  </td>
                  <td className="p-4">
                    {inv.pdfUrl ? (
                      <a
                        href={inv.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-brand-300 hover:text-brand-200"
                      >
                        <Download className="h-4 w-4" />
                        הורדה
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-ink-500">
                        <FileText className="h-4 w-4" />
                        טרם זמין
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    pending: { label: "ממתין", cls: "bg-amber-500/10 text-amber-300 ring-amber-500/30" },
    paid: { label: "שולם", cls: "bg-wa/10 text-wa ring-wa/30" },
    failed: { label: "נכשל", cls: "bg-rose-500/10 text-rose-300 ring-rose-500/30" },
    refunded: { label: "הוחזר", cls: "bg-ink-500/10 text-ink-300 ring-ink-500/30" },
  };
  const m = map[status] || { label: status, cls: "bg-white/5 text-ink-300 ring-white/10" };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${m.cls}`}>
      {m.label}
    </span>
  );
}
