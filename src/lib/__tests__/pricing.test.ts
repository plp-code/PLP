import { describe, expect, it } from "vitest";
import { formatPriceLevel, formatPriceRange } from "@/lib/utils";

describe("price formatting", () => {
  it("formats price levels", () => {
    expect(formatPriceLevel(2)).toBe("$$");
    expect(formatPriceLevel(9)).toBe("$$$$");
    expect(formatPriceLevel(0)).toBe("");
    expect(formatPriceLevel(null)).toBe("");
  });

  it("formats cent ranges", () => {
    expect(formatPriceRange(1000, 3500)).toBe("$10.00 – $35.00");
    expect(formatPriceRange(1000, null)).toBe("From $10.00");
    expect(formatPriceRange(null, 3500)).toBe("Up to $35.00");
    expect(formatPriceRange()).toBe("");
  });
});
