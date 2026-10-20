import { describe, expect, it } from "vitest";
import { analyticsFailure, analyticsScreen } from "./product-analytics.js";

describe("analytics vocabulary", () => {
  it("maps web and native routes to fixed names without exporting identifiers", () => {
    expect(analyticsScreen("/app/private-bot-name")).toBe("chat");
    expect(analyticsScreen("/app/g/private-group-name")).toBe("chat");
    expect(analyticsScreen("/app/artifacts/private-document-name")).toBe("artifacts");
    expect(analyticsScreen("/thread")).toBe("chat");
    expect(analyticsScreen("/models")).toBe("settings");
    expect(analyticsScreen("/mcp/oauth/callback")).toBeUndefined();
    expect(analyticsScreen("/reset-password")).toBeUndefined();
    expect(analyticsScreen("/unknown/private-title")).toBeUndefined();
  });
  it("categorizes errors without returning their contents", () => {
    expect(analyticsFailure("No API key for private@example.test")).toBe("credentials");
    expect(analyticsFailure("Insufficient credit for private account")).toBe("quota");
    expect(analyticsFailure("429 rate limit exceeded")).toBe("rate_limit");
    expect(analyticsFailure("Request timed out")).toBe("timeout");
    expect(analyticsFailure("Response quoted a private document")).toBe("other");
  });
});
