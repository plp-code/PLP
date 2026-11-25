import { describe, expect, it } from "vitest";
import { at, hour, weekdays9to5 as makeWeekdays } from "@/test/factories";
import { formatDayHours, getTodayHours, getWeekHours } from "@/lib/utils";

const weekdays9to5 = makeWeekdays();

describe("getTodayHours", () => {
  it("reports unavailable when there are no hours", () => {
    expect(getTodayHours(undefined).string).toBe("Hours unavailable");
    expect(getTodayHours([]).string).toBe("Hours unavailable");
  });

  it("is open during the day and formats the range", () => {
    const r = getTodayHours(weekdays9to5, at(0, 12));
    expect(r).toEqual({
      isOpen: true,
      isClosingSoon: false,
      string: "9am - 5pm",
    });
  });

  it("is closed before open and after close", () => {
    expect(getTodayHours(weekdays9to5, at(0, 8, 59)).isOpen).toBe(false);
    expect(getTodayHours(weekdays9to5, at(0, 17)).isOpen).toBe(false);
  });

  it("flags closing soon within the last hour only", () => {
    expect(getTodayHours(weekdays9to5, at(0, 16, 0)).isClosingSoon).toBe(true);
    expect(getTodayHours(weekdays9to5, at(0, 15, 59)).isClosingSoon).toBe(
      false,
    );
  });

  it("says Closed Today for missing or closed days", () => {
    expect(getTodayHours(weekdays9to5, at(5, 12)).string).toBe("Closed Today");
    const closed = [hour(0, null, null, true)];
    expect(getTodayHours(closed, at(0, 12))).toEqual({
      isOpen: false,
      isClosingSoon: false,
      string: "Closed Today",
    });
  });

  it("treats unparseable times as closed instead of NaN", () => {
    const bad = [hour(0, "abc", "17:00")];
    expect(getTodayHours(bad, at(0, 12)).string).toBe("Closed Today");
  });

  it("handles overnight hours before midnight", () => {
    const bar = [hour(0, "18:00", "02:00")];
    const r = getTodayHours(bar, at(0, 23));
    expect(r.isOpen).toBe(true);
    expect(r.string).toBe("6pm - 2am");
  });

  it("stays open after midnight from the previous day's overnight hours", () => {
    const bar = [hour(0, "18:00", "02:00")];
    const r = getTodayHours(bar, at(1, 1));
    expect(r.isOpen).toBe(true);
    expect(r.string).toBe("6pm - 2am");
    expect(getTodayHours(bar, at(1, 1, 30)).isClosingSoon).toBe(true);
    expect(getTodayHours(bar, at(1, 2)).isOpen).toBe(false);
  });

  it("stays open after midnight even if the current day has its own hours", () => {
    const week = [hour(0, "18:00", "02:00"), hour(1, "10:00", "20:00")];
    const r = getTodayHours(week, at(1, 1));
    expect(r.isOpen).toBe(true);
    expect(r.string).toBe("10am - 8pm");
    expect(getTodayHours(week, at(1, 3)).isOpen).toBe(false);
    expect(getTodayHours(week, at(1, 10)).isOpen).toBe(true);
  });

  it("wraps Sunday's overnight hours into Monday", () => {
    const bar = [hour(6, "20:00", "01:00")];
    expect(getTodayHours(bar, at(7, 0, 30)).isOpen).toBe(true);
  });
});

describe("formatDayHours / getWeekHours", () => {
  it("formats and handles closed days", () => {
    expect(formatDayHours(hour(0, "09:30", "17:00"))).toBe("9:30am - 5pm");
    expect(formatDayHours(hour(0, "00:00", "12:00"))).toBe("12am - 12pm");
    expect(formatDayHours(undefined)).toBe("Closed");
    expect(formatDayHours(hour(0, null, null, true))).toBe("Closed");
  });

  it("returns seven labelled days", () => {
    const week = getWeekHours(weekdays9to5);
    expect(week).toHaveLength(7);
    expect(week[0].label).toBe("Monday");
    expect(week[6].isClosed).toBe(true);
  });
});
