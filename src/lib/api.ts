import type { ApiValidationError } from "@/types/api";

interface FetchOptions extends RequestInit {
  _retry?: boolean;
  skipRefresh?: boolean;
}

export class ApiError extends Error {
  status: number;
  detail: unknown;
  code?: string;

  constructor(message: string, status: number, detail?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
    if (detail && typeof detail === "object" && !Array.isArray(detail)) {
      const code = (detail as { code?: unknown }).code;
      if (typeof code === "string") this.code = code;
    }
  }
}

export function isEmailNotVerified(err: unknown): boolean {
  return (
    err instanceof ApiError &&
    err.status === 403 &&
    err.code === "email_not_verified"
  );
}

const TOKEN_EXPIRY_KEY = "token_expires_at";
const SESSION_HINT_KEY = "had_session";

const ACCESS_TOKEN_SECONDS = 15 * 60;

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
let emailNotVerifiedHandler: (() => void) | null = null;

export function onAuthExpired(handler: () => void) {
  authExpiredHandler = handler;
  return () => {
    if (authExpiredHandler === handler) authExpiredHandler = null;
  };
}

export function onEmailNotVerified(handler: () => void) {
  emailNotVerifiedHandler = handler;
  return () => {
    if (emailNotVerifiedHandler === handler) emailNotVerifiedHandler = null;
  };
}

export function setTokenExpiry(seconds: number = ACCESS_TOKEN_SECONDS) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      TOKEN_EXPIRY_KEY,
      String(Date.now() + seconds * 1000),
    );
  } catch {}
}

export function clearTokenExpiry() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
  } catch {}
}

function handleRefreshFailure(): false {
  clearTokenExpiry();
  clearSession();
  authExpiredHandler?.();
  return false;
}

async function refreshSession(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = fetch("/api/v1/auth/refresh", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setTokenExpiry(ACCESS_TOKEN_SECONDS);
          return true;
        }
        return handleRefreshFailure();
      })
      .catch(handleRefreshFailure)
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
    ...(options.body !== undefined && options.body !== null
      ? { "Content-Type": "application/json" }
      : {}),
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

    if (refreshed) {
      return fetcher<T>(endpoint, options);
    }

    throw new ApiError("Session expired or unauthorized.", 401);
  }

  if (!response.ok) {
    const err: {
      detail?:
        string | ApiValidationError[] | { code?: string; message?: string };
    } = await response.json().catch(() => ({}));

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
    } else if (err.detail && typeof err.detail.message === "string") {
      message = err.detail.message;
    } else {
      message = `Request failed with status ${response.status}`;
    }

    const apiError = new ApiError(message, response.status, err.detail);
    if (isEmailNotVerified(apiError)) emailNotVerifiedHandler?.();
    throw apiError;
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
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  put: <T = unknown>(url: string, body?: unknown, options?: FetchOptions) =>
    fetcher<T>(url, {
      ...options,
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  delete: <T = unknown>(url: string, options?: FetchOptions) =>
    fetcher<T>(url, { ...options, method: "DELETE" }),
};
