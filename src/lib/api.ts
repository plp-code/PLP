const TOKEN_EXPIRY_KEY = "token_expires_at";
const ACCESS_TOKEN_LIFETIME = 30 * 60;
const REFRESH_BUFFER = 1 * 60;

interface FetchOptions extends RequestInit {
  _retry?: boolean;
  skipRefresh?: boolean;
}

let refreshTimer: ReturnType<typeof setTimeout> | null = null;
let refreshPromise: Promise<boolean> | null = null;

type AuthExpiredHandler = () => void;
let authExpiredHandler: AuthExpiredHandler | null = null;

function onAuthExpired(handler: AuthExpiredHandler) {
  authExpiredHandler = handler;
  return () => {
    if (authExpiredHandler === handler) authExpiredHandler = null;
  };
}

function setTokenExpiry(seconds: number = ACCESS_TOKEN_LIFETIME) {
  sessionStorage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + seconds * 1000));
  scheduleRefresh(seconds);
}

function clearTokenExpiry() {
  sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
  if (refreshTimer) clearTimeout(refreshTimer);
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

async function refreshSession() {
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
    const refreshed = await refreshSession();
    if (refreshed) return fetcher<T>(endpoint, options);
    throw new Error("Session expired or unauthorized.");
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      err.detail || `Request failed with status ${response.status}`,
    );
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

export { setTokenExpiry, clearTokenExpiry, onAuthExpired };
