import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ⚠️ TEMPORARY ENDPOINT — מריץ מיגרציה ידנית פעם אחת.
// למחיקה אחרי שהמיגרציה רצה בהצלחה.

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

  // 0002_extension_pushes — שחזור ידני, idempotent
  const statements = [
    `DO $$ BEGIN CREATE TYPE "extension_push_status" AS ENUM ('pending', 'delivered', 'failed'); EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
    `CREATE TABLE IF NOT EXISTS "extension_pushes" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "userId" text NOT NULL,
      "pushedByAdminId" text,
      "pushedAt" timestamp NOT NULL DEFAULT now(),
      "ackAt" timestamp,
      "status" "extension_push_status" NOT NULL DEFAULT 'pending',
      "errorMessage" text
    )`,
    `DO $$ BEGIN ALTER TABLE "extension_pushes" ADD CONSTRAINT "extension_pushes_userId_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
    `DO $$ BEGIN ALTER TABLE "extension_pushes" ADD CONSTRAINT "extension_pushes_pushedByAdminId_fk" FOREIGN KEY ("pushedByAdminId") REFERENCES "users"("id") ON DELETE SET NULL; EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
    `CREATE INDEX IF NOT EXISTS "extension_pushes_status_idx" ON "extension_pushes" ("status", "pushedAt")`,
    `CREATE INDEX IF NOT EXISTS "extension_pushes_user_idx" ON "extension_pushes" ("userId", "pushedAt")`,
  ];

  for (const stmt of statements) {
    try {
      await db.execute(sql.raw(stmt));
      results.push({ statement: stmt.slice(0, 80), ok: true });
    } catch (err) {
      results.push({
        statement: stmt.slice(0, 80),
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // אימות
  let tableExists = false;
  try {
    const check = await db.execute(sql`
      SELECT 1 FROM information_schema.tables WHERE table_name = 'extension_pushes' LIMIT 1
    `);
    const rows = (check as unknown as { rows: unknown[] }).rows ?? [];
    tableExists = rows.length > 0;
  } catch {}

  return NextResponse.json({
    ok: results.every((r) => r.ok),
    tableExists,
    results,
  });
}
