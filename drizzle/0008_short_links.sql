-- Short links — self-hosted URL shortener resolver for fgmp.net/p/<code>
-- Mirrors the grouppostv2 short_links table (same column names) so existing
-- codes can be migrated 1:1 from the VPS-local Postgres into Neon.
-- Idempotent: uses IF NOT EXISTS.

CREATE TABLE IF NOT EXISTS "short_links" (
  "code" text PRIMARY KEY,
  "target_url" text NOT NULL,
  "click_count" integer NOT NULL DEFAULT 0,
  "last_click_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT now()
);
