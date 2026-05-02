-- Add AI filter columns to business_settings
-- Idempotent: uses IF NOT EXISTS so safe to re-run

ALTER TABLE "business_settings"
  ADD COLUMN IF NOT EXISTS "aiFilterEnabled" boolean DEFAULT true NOT NULL;
--> statement-breakpoint
ALTER TABLE "business_settings"
  ADD COLUMN IF NOT EXISTS "aiPositiveExamples" text;
--> statement-breakpoint
ALTER TABLE "business_settings"
  ADD COLUMN IF NOT EXISTS "aiNegativeExamples" text;
