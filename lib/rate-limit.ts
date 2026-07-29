type RateEntry = { count: number; resetAt: number };

const hits = new Map<string, RateEntry>();

/** Simple in-memory rate limit (per server instance). */
export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 15 * 60 * 1000,
): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (entry.count >= limit) {
    return {
      ok: false,
      retryAfterSec: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  hits.set(key, entry);
  return { ok: true };
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}
