import { describe, it, expect } from "vitest";
import { isLikelyUrl, normalizeInputUrl } from "../src/utils/url";

describe("url utils", () => {
  it("accepts common URL shapes", () => {
    expect(isLikelyUrl("https://example.com")).toBe(true);
    expect(isLikelyUrl("example.com")).toBe(true);
    expect(isLikelyUrl("http://sub.example.co.uk/path?q=1")).toBe(true);
  });

  it("rejects garbage", () => {
    expect(isLikelyUrl("")).toBe(false);
    expect(isLikelyUrl("not a url")).toBe(false);
    expect(isLikelyUrl("ftp://example.com")).toBe(false);
  });

  it("normalizes bare hostnames to https://", () => {
    expect(normalizeInputUrl("example.com")).toBe("https://example.com");
    expect(normalizeInputUrl("http://example.com")).toBe("http://example.com");
  });
});
