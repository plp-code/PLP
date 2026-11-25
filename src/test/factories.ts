import type { LocationHours } from "@/types";

export const at = (apiDay: number, h: number, m = 0): Date =>
  new Date(2026, 10, 23 + apiDay, h, m);

export const hour = (
  day_of_week: number,
  open_time: string | null,
  close_time: string | null,
  is_closed = false,
): LocationHours => ({
  id: day_of_week,
  day_of_week,
  open_time,
  close_time,
  is_closed,
});

export const weekdays9to5 = (): LocationHours[] =>
  [0, 1, 2, 3, 4].map((d) => hour(d, "09:00", "17:00"));
