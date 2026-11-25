import { describe, expect, it } from "vitest";
import { ApiError } from "@/lib/api";
import {
  friendlyError,
  NETWORK_MESSAGE,
  RATE_LIMITED_MESSAGE,
  SERVER_ERROR_MESSAGE,
} from "@/lib/errors";

describe("friendlyError", () => {
  it("maps 429 to the rate-limit message", () => {
    expect(friendlyError(new ApiError("x", 429), "fb")).toBe(
      RATE_LIMITED_MESSAGE,
    );
  });
  it("maps fetch failures to the network message", () => {
    expect(friendlyError(new TypeError("Failed to fetch"), "fb")).toBe(
      NETWORK_MESSAGE,
    );
  });
  it("maps 5xx to the server message", () => {
    expect(friendlyError(new ApiError("x", 500), "fb")).toBe(
      SERVER_ERROR_MESSAGE,
    );
    expect(friendlyError(new ApiError("x", 503), "fb")).toBe(
      SERVER_ERROR_MESSAGE,
    );
  });
  it("returns the fallback for other API errors", () => {
    expect(friendlyError(new ApiError("x", 400), "fb")).toBe("fb");
    expect(friendlyError(new ApiError("x", 401), "fb")).toBe("fb");
  });
  it("returns the fallback for unknown errors", () => {
    expect(friendlyError(new Error("boom"), "fb")).toBe("fb");
    expect(friendlyError("nope", "fb")).toBe("fb");
  });
});
