import { describe, expect, it } from "vitest";
import { getDistance } from "@/lib/utils";

describe("getDistance", () => {
  it("is zero for identical points", () => {
    expect(getDistance(37.77, -122.42, 37.77, -122.42)).toBe(0);
  });

  it("matches a known distance in miles (SF -> LA ≈ 347 mi)", () => {
    const d = getDistance(37.7749, -122.4194, 34.0522, -118.2437);
    expect(d).toBeGreaterThan(340);
    expect(d).toBeLessThan(355);
  });

  it("is symmetric", () => {
    const a = getDistance(37.77, -122.42, 34.05, -118.24);
    const b = getDistance(34.05, -118.24, 37.77, -122.42);
    expect(a).toBeCloseTo(b, 10);
  });
});
