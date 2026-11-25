import { ApiError } from "@/lib/api";

export const RATE_LIMITED_MESSAGE =
  "Too many attempts. Please wait a minute and try again.";
export const NETWORK_MESSAGE = "Can't reach the server. Check your connection.";
export const SERVER_ERROR_MESSAGE =
  "Something went wrong on our end. Please try again.";

export function isNetworkError(err: unknown): boolean {
  return err instanceof TypeError && !(err instanceof ApiError);
}

export function friendlyError(err: unknown, fallback: string): string {
  if (err instanceof ApiError) {
    if (err.status === 429) return RATE_LIMITED_MESSAGE;
    if (err.status >= 500) return SERVER_ERROR_MESSAGE;
    return fallback;
  }
  if (isNetworkError(err)) return NETWORK_MESSAGE;
  return fallback;
}
