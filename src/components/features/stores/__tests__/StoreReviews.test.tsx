import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { StoreReviews } from "@/components/features/stores/StoreReviews";
import type { ReviewItem } from "@/types";

const base: ReviewItem = {
  id: 1,
  location_id: 3,
  item_purchased: "Blazer",
  experience: "Great find",
  price_paid: 45,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
  categories: [],
  user: { first_name: "Sam", last_initial: "M" },
};

const render = (props: Partial<Parameters<typeof StoreReviews>[0]>) =>
  renderToStaticMarkup(
    <StoreReviews reviews={[]} onAdd={() => {}} {...props} />,
  );

describe("StoreReviews", () => {
  it("shows the moderation notice on the author's hidden review", () => {
    const mine = { ...base, is_hidden: true };
    const html = render({ myReview: mine, reviews: [] });
    expect(html).toContain("under moderation");
    expect(html).toContain("Your find");
  });
  it("does not show the notice for a visible own review", () => {
    const html = render({ myReview: { ...base, is_hidden: false } });
    expect(html).not.toContain("under moderation");
  });
  it("hides Add review and offers delete when the user has a review", () => {
    const html = render({ myReview: base, onDelete: () => {} });
    expect(html).toContain("Delete your review");
    expect(html).not.toContain("Add review");
  });
  it("renders whole-dollar prices and a single-period initial", () => {
    const html = render({ reviews: [base] });
    expect(html).toContain("$45");
    expect(html).not.toContain("45.00");
    expect(html).toContain("Sam M.");
    expect(html).not.toContain("M..");
  });
});
