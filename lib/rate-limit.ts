import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const hasUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = hasUpstash ? Redis.fromEnv() : null;

const limiters = new Map<string, Ratelimit>();

function getLimiter(prefix: string, limit: number, windowMs: number) {
  if (!redis) return null;
  const key = `${prefix}:${limit}:${windowMs}`;
  let l = limiters.get(key);
  if (!l) {
    const seconds = Math.max(1, Math.ceil(windowMs / 1000));
    l = new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(limit, `${seconds} s`),
      prefix: `rl:${prefix}`,
      analytics: false,
    });
    limiters.set(key, l);
  }
  return l;
}

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function memoryRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetAt: now + windowMs };
  }
  if (b.count >= limit) {
    return { ok: false, remaining: 0, resetAt: b.resetAt };
  }
  b.count += 1;
  return { ok: true, remaining: limit - b.count, resetAt: b.resetAt };
}

export async function rateLimit(key: string, limit: number, windowMs: number) {
  const sep = key.indexOf(":");
  const prefix = sep === -1 ? "default" : key.slice(0, sep);
  const identifier = sep === -1 ? key : key.slice(sep + 1);

  const limiter = getLimiter(prefix, limit, windowMs);
  if (!limiter) return memoryRateLimit(key, limit, windowMs);

  const res = await limiter.limit(identifier);
  return { ok: res.success, remaining: res.remaining, resetAt: res.reset };
}

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || "unknown";
}
