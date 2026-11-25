import { describe, expect, it } from "vitest";
import { getAllowedOrigins } from "@/lib/siteConfig";

describe("getAllowedOrigins", () => {
  it("always includes the apex and www production origins", () => {
    const o = getAllowedOrigins({ NODE_ENV: "production" });
    expect([...o].sort()).toEqual([
      "https://theprelovedprofessional.com",
      "https://www.theprelovedprofessional.com",
    ]);
  });
  it("adds localhost only when not production", () => {
    expect(getAllowedOrigins({ NODE_ENV: "development" })).toContain(
      "http://localhost:3000",
    );
    expect(getAllowedOrigins({ NODE_ENV: "production" })).not.toContain(
      "http://localhost:3000",
    );
  });
  it("adds the preview URL only for VERCEL_ENV=preview", () => {
    const env = { NODE_ENV: "production", VERCEL_URL: "plp-abc.vercel.app" };
    expect(getAllowedOrigins({ ...env, VERCEL_ENV: "preview" })).toContain(
      "https://plp-abc.vercel.app",
    );
    expect(
      getAllowedOrigins({ ...env, VERCEL_ENV: "production" }),
    ).not.toContain("https://plp-abc.vercel.app");
    expect(getAllowedOrigins(env)).not.toContain("https://plp-abc.vercel.app");
  });
});
