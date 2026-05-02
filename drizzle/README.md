# Migrations

Migrations live in this directory. Apply them manually via the Vercel Postgres SQL editor or `psql`.

## Apply pending migration

For each `.sql` file in this folder that hasn't been applied yet, run its contents against the production DB.

### Vercel Postgres dashboard

1. https://vercel.com/shaloms-projects-0ac56f98/fgmp-5p4t → Storage → click the Postgres DB
2. Click **Query** (or **Data** → **Browse**)
3. Paste the contents of the migration `.sql` file
4. Run

All migrations in this project use `IF NOT EXISTS` so they're idempotent and safe to re-run.

## Pending

- `0001_ai_filter_columns.sql` — adds `aiFilterEnabled`, `aiPositiveExamples`, `aiNegativeExamples` to `business_settings`
