import { describe, expect, it } from "vitest";
import { buildDirectionsUrl } from "@/lib/utils";

describe("buildDirectionsUrl", () => {
  const store = { name: "Thrift & Co", latitude: 37.7, longitude: -122.4 };

  it("builds a search URL without a user location", () => {
    const url = new URL(buildDirectionsUrl(store));
    expect(url.pathname).toBe("/maps/search/");
    expect(url.searchParams.get("query")).toBe("Thrift & Co");
    expect(url.searchParams.has("query_place_id")).toBe(false);
  });

  it("includes the place id when available", () => {
    const url = new URL(
      buildDirectionsUrl({ ...store, google_place_id: "abc" }),
    );
    expect(url.searchParams.get("query_place_id")).toBe("abc");
  });

  it("builds a directions URL with a user location", () => {
    const url = new URL(
      buildDirectionsUrl(
        { ...store, google_place_id: "abc" },
        { lat: 1, lng: 2 },
      ),
    );
    expect(url.pathname).toBe("/maps/dir/");
    expect(url.searchParams.get("origin")).toBe("1,2");
    expect(url.searchParams.get("destination")).toBe("Thrift & Co");
    expect(url.searchParams.get("destination_place_id")).toBe("abc");
  });

  it("falls back to coordinates when there is no name", () => {
    const url = new URL(
      buildDirectionsUrl({ latitude: 37.7, longitude: -122.4 }),
    );
    expect(url.searchParams.get("query")).toBe("37.7,-122.4");
  });
});
