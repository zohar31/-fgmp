-- Agent tools — phone verification, sessions, audit log
-- Idempotent

CREATE TABLE IF NOT EXISTS "phone_verifications" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "phone" text NOT NULL,
  "codeHash" text NOT NULL,
  "expiresAt" timestamp NOT NULL,
  "attempts" integer NOT NULL DEFAULT 0,
  "verifiedAt" timestamp,
  "blockedUntil" timestamp,
  "createdAt" timestamp NOT NULL DEFAULT now()
);
--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "phone_verifications_phone_idx"
  ON "phone_verifications" ("phone", "createdAt");
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "agent_sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" text NOT NULL,
  "phone" text NOT NULL,
  "expiresAt" timestamp NOT NULL,
  "lastUsedAt" timestamp NOT NULL DEFAULT now(),
  "createdAt" timestamp NOT NULL DEFAULT now()
);
--> statement-breakpoint

DO $$ BEGIN
  ALTER TABLE "agent_sessions" ADD CONSTRAINT "agent_sessions_userId_fk"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "agent_sessions_user_idx"
  ON "agent_sessions" ("userId", "expiresAt");
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "agent_actions" (
  "id" serial PRIMARY KEY,
  "sessionId" uuid,
  "userId" text,
  "toolName" text NOT NULL,
  "args" text,
  "result" text,
  "error" text,
  "createdAt" timestamp NOT NULL DEFAULT now()
);
--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "agent_actions_user_idx"
  ON "agent_actions" ("userId", "createdAt");
--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "agent_actions_tool_idx"
  ON "agent_actions" ("toolName", "createdAt");
