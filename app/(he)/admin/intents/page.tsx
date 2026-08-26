import { db, schema } from "@/lib/db";
import { desc } from "drizzle-orm";

export default async function AdminIntentsPage() {
  const items = await db
    .select()
    .from(schema.signupIntents)
    .orderBy(desc(schema.signupIntents.createdAt))
    .limit(200);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold text-white">Signup Intents</h1>
        <p className="mt-2 text-ink-300">
          רשומות מטופס ההרשמה הציבורי הישן (לפני המעבר ל-OAuth). שמור היסטורית; הטופס הוסר.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="card p-8 text-center text-ink-300">אין רשומות.</div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-xs text-ink-400">
              <tr>
                <th className="p-3 text-right font-medium">תאריך</th>
                <th className="p-3 text-right font-medium">עסק</th>
                <th className="p-3 text-right font-medium">אימייל</th>
                <th className="p-3 text-right font-medium">וואטסאפ</th>
                <th className="p-3 text-right font-medium">תיאור</th>
                <th className="p-3 text-right font-medium">קושר ל-User?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((it) => (
                <tr key={it.id} className="hover:bg-white/[0.02]">
                  <td className="p-3 align-top text-xs text-ink-400">
                    {new Date(it.createdAt).toLocaleDateString("he-IL")}
                  </td>
                  <td className="p-3 align-top text-white">{it.businessName}</td>
                  <td className="p-3 align-top text-xs text-ink-200" dir="ltr">{it.email}</td>
                  <td className="p-3 align-top text-xs" dir="ltr">{it.whatsapp}</td>
                  <td className="p-3 align-top text-xs text-ink-300 max-w-md">
                    {it.service}
                  </td>
                  <td className="p-3 align-top text-xs">
                    {it.linkedUserId ? (
                      <span className="text-wa">✓</span>
                    ) : (
                      <span className="text-ink-500">—</span>
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
