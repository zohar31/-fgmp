import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const url =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  // Build-time placeholder that satisfies Neon's URL parser.
  // Must look valid; queries are never actually issued at build.
  "postgresql://build:placeholder@build.invalid/build";

const sql = neon(url);
export const db = drizzle(sql, { schema });
export { schema };
