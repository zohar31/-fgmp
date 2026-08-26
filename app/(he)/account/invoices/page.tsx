import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { Receipt, FileText, Download } from "lucide-react";
import { getServerLocale } from "@/lib/i18n-server";

export const metadata: Metadata = { title: "חשבוניות" };

export default async function InvoicesPage() {
  const session = await auth();
  const userId = session!.user.id;
  const en = (await getServerLocale()) === "en";
  const dateLocale = en ? "en-US" : "he-IL";

  const items = await db.query.invoices.findMany({
    where: eq(schema.invoices.userId, userId),
    orderBy: (t, { desc }) => [desc(t.issuedAt)],
  });

  const th = en ? "text-left" : "text-right";

  return (
    <div className="space-y-6" dir={en ? "ltr" : "rtl"}>
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">{en ? "Invoices" : "חשבוניות"}</h1>
        <p className="mt-2 text-ink-300">{en ? "Billing history and invoice copies." : "היסטוריית חיובים והעתקי חשבוניות."}</p>
      </header>

      {items.length === 0 ? (
        <div className="card p-8 text-center">
          <Receipt className="mx-auto mb-4 h-10 w-10 text-ink-500" />
          <h3 className="font-display font-bold text-white">{en ? "No invoices yet" : "אין חשבוניות עדיין"}</h3>
          <p className="mt-2 text-sm text-ink-300">
            {en ? (
              <>
                Your first invoice is created automatically with your first charge.
                <br />
                Cancel within the money-back window and no charge stands.
              </>
            ) : (
              <>
                החשבונית הראשונה שלך תיווצר אוטומטית עם החיוב הראשון.
                <br />
                אם תבטל בתוך חלון ההחזר — לא ייגבה חיוב.
              </>
            )}
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5 text-xs text-ink-400">
              <tr>
                <th className={`p-4 ${th} font-medium`}>{en ? "Date" : "תאריך"}</th>
                <th className={`p-4 ${th} font-medium`}>{en ? "Amount" : "סכום"}</th>
                <th className={`p-4 ${th} font-medium`}>{en ? "Status" : "סטטוס"}</th>
                <th className={`p-4 ${th} font-medium`}>{en ? "Invoice" : "חשבונית"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {items.map((inv) => (
                <tr key={inv.id}>
                  <td className="p-4 text-ink-200">
                    {new Date(inv.issuedAt).toLocaleDateString(dateLocale)}
                  </td>
                  <td className="p-4 font-semibold text-white">
                    {inv.amount} {inv.currency === "ILS" ? "₪" : inv.currency}
                  </td>
                  <td className="p-4">
                    <StatusPill status={inv.status} en={en} />
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
                        {en ? "Download" : "הורדה"}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-ink-500">
                        <FileText className="h-4 w-4" />
                        {en ? "Not yet available" : "טרם זמין"}
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

function StatusPill({ status, en }: { status: string; en: boolean }) {
  const map: Record<string, { label: string; cls: string }> = {
    pending: { label: en ? "Pending" : "ממתין", cls: "bg-amber-500/10 text-amber-300 ring-amber-500/30" },
    paid: { label: en ? "Paid" : "שולם", cls: "bg-wa/10 text-wa ring-wa/30" },
    failed: { label: en ? "Failed" : "נכשל", cls: "bg-rose-500/10 text-rose-300 ring-rose-500/30" },
    refunded: { label: en ? "Refunded" : "הוחזר", cls: "bg-ink-500/10 text-ink-300 ring-ink-500/30" },
  };
  const m = map[status] || { label: status, cls: "bg-white/5 text-ink-300 ring-white/10" };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${m.cls}`}>
      {m.label}
    </span>
  );
}
