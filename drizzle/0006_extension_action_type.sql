-- Extension push action type — tells the extension whether to activate,
-- suspend, or reactivate a subscriber. Default 'activate' keeps existing
-- pushes (admin "send to extension" flow) working unchanged.

DO $$ BEGIN
  CREATE TYPE "extension_push_action" AS ENUM ('activate', 'suspend', 'reactivate');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "extension_pushes"
  ADD COLUMN IF NOT EXISTS "actionType" "extension_push_action" NOT NULL DEFAULT 'activate';
