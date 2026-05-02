import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ⚠️ TEMPORARY ENDPOINT — מריץ מיגרציה ידנית פעם אחת.
// למחיקה אחרי שהמיגרציה רצה בהצלחה.
// Auth: משתמש ב-EXTENSION_API_TOKEN כי כבר מוגדר.

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function POST(req: Request) {
  const expected = process.env.EXTENSION_API_TOKEN;
  if (!expected) {
    return NextResponse.json({ ok: false, error: "Token not configured" }, { status: 503 });
  }

  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/);
  if (!m || !constantTimeEqual(m[1], expected)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const results: Array<{ statement: string; ok: boolean; error?: string }> = [];

  const statements = [
    `ALTER TABLE "business_settings" ADD COLUMN IF NOT EXISTS "aiFilterEnabled" boolean DEFAULT true NOT NULL`,
    `ALTER TABLE "business_settings" ADD COLUMN IF NOT EXISTS "aiPositiveExamples" text`,
    `ALTER TABLE "business_settings" ADD COLUMN IF NOT EXISTS "aiNegativeExamples" text`,
  ];

  for (const stmt of statements) {
    try {
      await db.execute(sql.raw(stmt));
      results.push({ statement: stmt, ok: true });
    } catch (err) {
      results.push({
        statement: stmt,
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // אימות שהעמודות באמת נוצרו
  let columnsAdded = false;
  try {
    const check = await db.execute(sql`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'business_settings'
        AND column_name IN ('aiFilterEnabled', 'aiPositiveExamples', 'aiNegativeExamples')
    `);
    const rows = (check as unknown as { rows: Array<{ column_name: string }> }).rows ?? [];
    columnsAdded = rows.length === 3;
  } catch {
    // ignore — verification is best-effort
  }

  return NextResponse.json({
    ok: results.every((r) => r.ok),
    columnsAdded,
    results,
  });
}
