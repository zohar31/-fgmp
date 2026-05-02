import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ⚠️ TEMPORARY ENDPOINT — apply the agent_tools migration once.
// Delete after running successfully.

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

  const statements = [
    `CREATE TABLE IF NOT EXISTS "phone_verifications" (
       "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
       "phone" text NOT NULL,
       "codeHash" text NOT NULL,
       "expiresAt" timestamp NOT NULL,
       "attempts" integer NOT NULL DEFAULT 0,
       "verifiedAt" timestamp,
       "blockedUntil" timestamp,
       "createdAt" timestamp NOT NULL DEFAULT now()
     )`,
    `CREATE INDEX IF NOT EXISTS "phone_verifications_phone_idx"
       ON "phone_verifications" ("phone", "createdAt")`,
    `CREATE TABLE IF NOT EXISTS "agent_sessions" (
       "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
       "userId" text NOT NULL,
       "phone" text NOT NULL,
       "expiresAt" timestamp NOT NULL,
       "lastUsedAt" timestamp NOT NULL DEFAULT now(),
       "createdAt" timestamp NOT NULL DEFAULT now()
     )`,
    `DO $$ BEGIN
       ALTER TABLE "agent_sessions" ADD CONSTRAINT "agent_sessions_userId_fk"
         FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;
     EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
    `CREATE INDEX IF NOT EXISTS "agent_sessions_user_idx"
       ON "agent_sessions" ("userId", "expiresAt")`,
    `CREATE TABLE IF NOT EXISTS "agent_actions" (
       "id" serial PRIMARY KEY,
       "sessionId" uuid,
       "userId" text,
       "toolName" text NOT NULL,
       "args" text,
       "result" text,
       "error" text,
       "createdAt" timestamp NOT NULL DEFAULT now()
     )`,
    `CREATE INDEX IF NOT EXISTS "agent_actions_user_idx"
       ON "agent_actions" ("userId", "createdAt")`,
    `CREATE INDEX IF NOT EXISTS "agent_actions_tool_idx"
       ON "agent_actions" ("toolName", "createdAt")`,
  ];

  const results: Array<{ statement: string; ok: boolean; error?: string }> = [];
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

  let tablesExist = 0;
  try {
    const check = await db.execute(sql`
      SELECT count(*) AS n FROM information_schema.tables
      WHERE table_name IN ('phone_verifications', 'agent_sessions', 'agent_actions')
    `);
    const rows = (check as unknown as { rows: Array<{ n: number | string }> }).rows ?? [];
    tablesExist = Number(rows[0]?.n ?? 0);
  } catch {}

  return NextResponse.json({
    ok: results.every((r) => r.ok),
    tablesExist,
    results,
  });
}
