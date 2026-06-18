interface FetchOptions extends RequestInit {
  _retry?: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function fetcher<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const url = `${BASE_URL}/api/v1${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 401) {
    if (!options._retry) {
      options._retry = true;
      try {
        const refreshResponse = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (refreshResponse.ok) {
          return fetcher<T>(endpoint, options);
        }
      } catch (refreshError) {
        console.error("Silent refresh failed", refreshError);
      }
    }

    if (
      typeof window !== "undefined" &&
      window.location.pathname !== "/login"
    ) {
      window.location.href = "/login";
    }
    throw new Error("Session expired. Please log in again.");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.detail || `Request failed with status ${response.status}`,
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
