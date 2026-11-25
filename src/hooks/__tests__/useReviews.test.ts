import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError, api } from "@/lib/api";
import { fetchMyReview, reviewErrorMessage } from "@/hooks/useReviews";

const review = {
  id: 7,
  location_id: 3,
  item_purchased: "Blazer",
  experience: "Great",
  price_paid: 45,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
  categories: [],
  is_hidden: false,
};

describe("fetchMyReview", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("returns the review object", async () => {
    vi.spyOn(api, "get").mockResolvedValue(review);
    expect(await fetchMyReview(3)).toEqual(review);
  });
  it("returns null for a bare null body", async () => {
    vi.spyOn(api, "get").mockResolvedValue(null);
    expect(await fetchMyReview(3)).toBeNull();
  });
  it("returns null for the empty-object fallback of an empty body", async () => {
    vi.spyOn(api, "get").mockResolvedValue({});
    expect(await fetchMyReview(3)).toBeNull();
  });
  it("returns null on 404", async () => {
    vi.spyOn(api, "get").mockRejectedValue(new ApiError("x", 404));
    expect(await fetchMyReview(3)).toBeNull();
  });
  it("rethrows other errors (e.g. 401, 403)", async () => {
    vi.spyOn(api, "get").mockRejectedValue(new ApiError("x", 403));
    await expect(fetchMyReview(3)).rejects.toMatchObject({ status: 403 });
  });
});

describe("reviewErrorMessage", () => {
  it("403 explains the buyers-only rule", () => {
    expect(reviewErrorMessage(new ApiError("x", 403)).subtitle).toBe(
      "You can only review locations you've bought.",
    );
  });
  it("404 on post/load says the location is gone", () => {
    expect(reviewErrorMessage(new ApiError("x", 404), "post").subtitle).toBe(
      "This location is no longer available.",
    );
    expect(reviewErrorMessage(new ApiError("x", 404), "load").subtitle).toBe(
      "This location is no longer available.",
    );
  });
  it("404 on delete keeps the no-review copy", () => {
    expect(reviewErrorMessage(new ApiError("x", 404), "delete").title).toBe(
      "No review to delete",
    );
  });
  it("409 says already reviewed", () => {
    expect(reviewErrorMessage(new ApiError("x", 409)).title).toBe(
      "Already reviewed",
    );
  });
  it("429 uses the shared rate-limit copy", () => {
    expect(reviewErrorMessage(new ApiError("x", 429)).subtitle).toMatch(
      /Too many attempts/,
    );
  });
});
