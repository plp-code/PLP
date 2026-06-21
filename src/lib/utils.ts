import { LocationHours } from "@/types";

// Derives today's open/closed status from a location's `hours` array
// (one LocationHoursRead per day_of_week; 0 = Monday ... 6 = Sunday).
export const getTodayHours = (
  hours?: LocationHours[],
): { isOpen: boolean; string: string } => {
  if (!hours || hours.length === 0) {
    return { isOpen: false, string: "Hours unavailable" };
  }

  // JS getDay(): 0 = Sunday ... 6 = Saturday. API: 0 = Monday ... 6 = Sunday.
  const apiDay = (new Date().getDay() + 6) % 7;
  const today = hours.find((h) => h.day_of_week === apiDay);

  if (!today || today.is_closed || !today.open_time || !today.close_time) {
    return { isOpen: false, string: "Closed Today" };
  }

  const parseToMinutes = (timeStr: string) => {
    const parts = timeStr.trim().split(":");
    const h = parseInt(parts[0], 10);
    const m = parts.length > 1 ? parseInt(parts[1], 10) : 0;
    return h * 60 + m;
  };

  const openMins = parseToMinutes(today.open_time);
  let closeMins = parseToMinutes(today.close_time);

  if (closeMins <= openMins) closeMins += 24 * 60;

  const now = new Date();
  const currentMins = now.getHours() * 60 + now.getMinutes();

  const isOpen = currentMins >= openMins && currentMins < closeMins;

  const formatTime = (mins: number) => {
    let h = Math.floor(mins / 60);
    const m = mins % 60;
    const ampm = h % 24 >= 12 ? "pm" : "am";
    h = h % 12;
    if (h === 0) h = 12;

    return `${h}${m > 0 ? `:${m.toString().padStart(2, "0")}` : ""}${ampm}`;
  };

  return { isOpen, string: `${formatTime(openMins)} - ${formatTime(closeMins)}` };
};

// price_level (1-3) -> "$" / "$$" / "$$$"
export const formatPriceLevel = (level?: number | null): string => {
  if (!level || level < 1) return "";
  return "$".repeat(Math.min(level, 4));
};

// min/max prices are stored in cents, like the rest of the API
export const formatPriceRange = (
  min?: number | null,
  max?: number | null,
): string => {
  const fmt = (cents: number) => `$${(cents / 100).toFixed(2)}`;
  if (min != null && max != null) return `${fmt(min)} – ${fmt(max)}`;
  if (min != null) return `From ${fmt(min)}`;
  if (max != null) return `Up to ${fmt(max)}`;
  return "";
};