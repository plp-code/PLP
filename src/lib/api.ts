interface FetchOptions extends RequestInit {
  _retry?: boolean;
  skipRefresh?: boolean;
}

const ACCESS_TOKEN_LIFETIME = 30 * 60;
const REFRESH_BUFFER = 2 * 60;
const TOKEN_EXPIRY_KEY = "token_expires_at";
const SESSION_HINT_KEY = "had_session";

// Cross-tab hint that this browser holds (possibly refreshable) credentials.
// Unlike TOKEN_EXPIRY_KEY (sessionStorage, per-tab), this survives new tabs and
// restarts, so a returning user with an expired access token still attempts a
// refresh, while a true guest skips it.
export function markSession() {
  if (typeof window !== "undefined") localStorage.setItem(SESSION_HINT_KEY, "1");
}

export function clearSession() {
  if (typeof window !== "undefined") localStorage.removeItem(SESSION_HINT_KEY);
}

export function hadSession(): boolean {
  return (
    typeof window !== "undefined" &&
    localStorage.getItem(SESSION_HINT_KEY) === "1"
  );
}

let refreshPromise: Promise<boolean> | null = null;
let refreshTimer: ReturnType<typeof setTimeout> | null = null;
let authExpiredHandler: (() => void) | null = null;

export function onAuthExpired(handler: () => void) {
  authExpiredHandler = handler;
  return () => {
    if (authExpiredHandler === handler) authExpiredHandler = null;
  };
}

export function setTokenExpiry(seconds: number) {
  sessionStorage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + seconds * 1000));
  scheduleRefresh(seconds);
}

export function clearTokenExpiry() {
  sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
  if (refreshTimer) clearTimeout(refreshTimer);
}

function isTokenExpiringSoon(): boolean {
  const exp = sessionStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!exp) return false;
  return Date.now() > parseInt(exp) - REFRESH_BUFFER * 1000;
}

function scheduleRefresh(expiresInSeconds: number) {
  if (refreshTimer) clearTimeout(refreshTimer);

  const refreshIn = (expiresInSeconds - REFRESH_BUFFER) * 1000;
  if (refreshIn <= 0) {
    refreshSession();
    return;
  }

  refreshTimer = setTimeout(() => refreshSession(), refreshIn);
}

async function refreshSession(force = false): Promise<boolean> {
  if (!force && !sessionStorage.getItem(TOKEN_EXPIRY_KEY)) {
    return false;
  }

  if (!refreshPromise) {
    refreshPromise = fetch("/api/v1/auth/refresh", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setTokenExpiry(ACCESS_TOKEN_LIFETIME);
        } else {
          clearTokenExpiry();
          authExpiredHandler?.();
        }
        return res.ok;
      })
      .catch(() => {
        clearTokenExpiry();
        authExpiredHandler?.();
        return false;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}
async function fetcher<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const cleanEndpoint = endpoint.replace(/^\//, "");
  const url = `/api/v1/${cleanEndpoint}`;

  if (!options.skipRefresh && isTokenExpiringSoon() && !options._retry) {
    await refreshSession();
  }

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 401 && !options._retry && !options.skipRefresh) {
    options._retry = true;
    const refreshed = await refreshSession(true);
    if (refreshed) return fetcher<T>(endpoint, options);
    throw new Error("Session expired or unauthorized.");
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));

    let message: string;
    if (typeof err.detail === "string") {
      message = err.detail;
    } else if (Array.isArray(err.detail)) {
      message = err.detail
        .map((e: any) => {
          const field = e.loc?.slice(-1)[0]; // "password"
          return field ? `${field}: ${e.msg}` : e.msg;
        })
        .join(". ");
    } else {
      message = `Request failed with status ${response.status}`;
    }

    throw new Error(message);
  }

  const text = await response.text();
  if (!text) return {} as T;
  return JSON.parse(text) as T;
}

export const api = {
  get: <T = any>(url: string, options?: FetchOptions) =>
    fetcher<T>(url, { ...options, method: "GET" }),

  post: <T = any>(url: string, body?: any, options?: FetchOptions) =>
    fetcher<T>(url, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T = any>(url: string, body?: any, options?: FetchOptions) =>
    fetcher<T>(url, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T = any>(url: string, options?: FetchOptions) =>
    fetcher<T>(url, { ...options, method: "DELETE" }),
};
