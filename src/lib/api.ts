import type { ApiValidationError } from "@/types/api";

interface FetchOptions extends RequestInit {
  _retry?: boolean;
  skipRefresh?: boolean;
}

const TOKEN_EXPIRY_KEY = "token_expires_at";
const SESSION_HINT_KEY = "had_session";

export function markSession() {
  if (typeof window !== "undefined")
    localStorage.setItem(SESSION_HINT_KEY, "1");
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
let authExpiredHandler: (() => void) | null = null;

export function onAuthExpired(handler: () => void) {
  authExpiredHandler = handler;
  return () => {
    if (authExpiredHandler === handler) authExpiredHandler = null;
  };
}

export function setTokenExpiry(seconds: number) {
  sessionStorage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + seconds * 1000));
}

export function clearTokenExpiry() {
  sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
}

async function refreshSession(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = fetch("/api/v1/auth/refresh", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setTokenExpiry(30 * 60);
          return true;
        } else {
          clearTokenExpiry();
          clearSession();
          authExpiredHandler?.();
          return false;
        }
      })
      .catch(() => {
        clearTokenExpiry();
        clearSession();
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

    // Call refresh ONCE behind the scenes
    const refreshed = await refreshSession();

    // If refresh succeeded, transparently retry the failed request
    if (refreshed) {
      return fetcher<T>(endpoint, options);
    }

    throw new Error("Session expired or unauthorized.");
  }

  if (!response.ok) {
    const err: { detail?: string | ApiValidationError[] } = await response
      .json()
      .catch(() => ({}));

    let message: string;
    if (typeof err.detail === "string") {
      message = err.detail;
    } else if (Array.isArray(err.detail)) {
      message = err.detail
        .map((e) => {
          const field = e.loc?.slice(-1)[0];
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
  get: <T = unknown>(url: string, options?: FetchOptions) =>
    fetcher<T>(url, { ...options, method: "GET" }),

  post: <T = unknown>(url: string, body?: unknown, options?: FetchOptions) =>
    fetcher<T>(url, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T = unknown>(url: string, body?: unknown, options?: FetchOptions) =>
    fetcher<T>(url, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T = unknown>(url: string, options?: FetchOptions) =>
    fetcher<T>(url, { ...options, method: "DELETE" }),
};