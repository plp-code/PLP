export const DEFAULT_RETURN_PATH = "/maps";

export function getSafeReturnPath(path?: string | null): string {
  if (!path) return DEFAULT_RETURN_PATH;
  try {
    const url = new URL(path, window.location.origin);
    if (url.origin !== window.location.origin) return DEFAULT_RETURN_PATH;
    return url.pathname + url.search;
  } catch {
    return DEFAULT_RETURN_PATH;
  }
}

export function buildLoginRedirect(
  returnTo: string,
  reason?: "expired",
): string {
  const params = new URLSearchParams({ returnTo });
  if (reason) params.set("reason", reason);
  return `/login?${params.toString()}`;
}
