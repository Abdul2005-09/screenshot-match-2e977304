import { describe, expect, it } from "vitest";
import { getRemaining } from "@/components/wedding/Sections";

describe("muhurtham countdown", () => {
  it("targets 22 Nov 2026 10:00 IST", () => {
    const r = getRemaining(Date.parse("2026-11-21T10:00:00+05:30"));
    expect(r).toMatchObject({ days: 1, hours: 0, minutes: 0, seconds: 0, done: false });
  });
  it("never goes negative after the event", () => {
    const r = getRemaining(Date.parse("2026-11-23T00:00:00+05:30"));
    expect(r).toMatchObject({ days: 0, hours: 0, done: true });
  });
});
