/**
 * Origins allowed to make state-changing requests to /api/v1/*.
 * Committed config on purpose: the Origin check compares against this fixed
 * list, never against the Host header or the request's own URL.
 */
const PRODUCTION_ORIGINS = [
  "https://theprelovedprofessional.com",
  "https://www.theprelovedprofessional.com",
] as const;

type Env = Record<string, string | undefined>;

export function getAllowedOrigins(env: Env = process.env): Set<string> {
  const origins = new Set<string>(PRODUCTION_ORIGINS);

  if (env.NODE_ENV !== "production") {
    origins.add("http://localhost:3000");
  }
  if (env.VERCEL_ENV === "preview" && env.VERCEL_URL) {
    origins.add(`https://${env.VERCEL_URL}`);
  }
  return origins;
}
