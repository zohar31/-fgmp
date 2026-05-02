-- Extension pushes table — admin "send to extension" queue
-- Idempotent: uses IF NOT EXISTS

DO $$ BEGIN
  CREATE TYPE "extension_push_status" AS ENUM ('pending', 'delivered', 'failed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "extension_pushes" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" text NOT NULL,
  "pushedByAdminId" text,
  "pushedAt" timestamp NOT NULL DEFAULT now(),
  "ackAt" timestamp,
  "status" "extension_push_status" NOT NULL DEFAULT 'pending',
  "errorMessage" text
);
--> statement-breakpoint

DO $$ BEGIN
  ALTER TABLE "extension_pushes" ADD CONSTRAINT "extension_pushes_userId_fk"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
--> statement-breakpoint

DO $$ BEGIN
  ALTER TABLE "extension_pushes" ADD CONSTRAINT "extension_pushes_pushedByAdminId_fk"
    FOREIGN KEY ("pushedByAdminId") REFERENCES "users"("id") ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "extension_pushes_status_idx"
  ON "extension_pushes" ("status", "pushedAt");
--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "extension_pushes_user_idx"
  ON "extension_pushes" ("userId", "pushedAt");
