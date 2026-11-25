import { LocationHours } from "@/types";

const MINUTES_PER_DAY = 24 * 60;

const parseToMinutes = (timeStr?: string | null): number | null => {
  if (!timeStr) return null;
  const parts = timeStr.trim().split(":");
  const h = parseInt(parts[0], 10);
  const m = parts.length > 1 ? parseInt(parts[1], 10) : 0;
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
};

const formatMinutes = (mins: number): string => {
  const h24 = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const ampm = h24 >= 12 ? "pm" : "am";
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}${m > 0 ? `:${m.toString().padStart(2, "0")}` : ""}${ampm}`;
};

const getSpan = (
  entry?: LocationHours,
): { open: number; close: number; overnight: boolean } | null => {
  if (!entry || entry.is_closed) return null;
  const open = parseToMinutes(entry.open_time);
  const close = parseToMinutes(entry.close_time);
  if (open === null || close === null) return null;
  return close <= open
    ? { open, close: close + MINUTES_PER_DAY, overnight: true }
    : { open, close, overnight: false };
};

export const getTodayHours = (
  hours?: LocationHours[],
  now: Date = new Date(),
): { isOpen: boolean; isClosingSoon: boolean; string: string } => {
  if (!hours || hours.length === 0) {
    return { isOpen: false, isClosingSoon: false, string: "Hours unavailable" };
  }

  const apiDay = (now.getDay() + 6) % 7;
  const currentMins = now.getHours() * 60 + now.getMinutes();

  const today = getSpan(hours.find((h) => h.day_of_week === apiDay));

  const yesterday = getSpan(
    hours.find((h) => h.day_of_week === (apiDay + 6) % 7),
  );
  const spillCloseMins =
    yesterday?.overnight && currentMins < yesterday.close - MINUTES_PER_DAY
      ? yesterday.close - MINUTES_PER_DAY
      : null;

  const closingSoon = (minutesUntilClose: number) =>
    minutesUntilClose > 0 && minutesUntilClose <= 60;

  if (!today) {
    if (yesterday && spillCloseMins !== null) {
      return {
        isOpen: true,
        isClosingSoon: closingSoon(spillCloseMins - currentMins),
        string: `${formatMinutes(yesterday.open)} - ${formatMinutes(yesterday.close)}`,
      };
    }
    return { isOpen: false, isClosingSoon: false, string: "Closed Today" };
  }

  const string = `${formatMinutes(today.open)} - ${formatMinutes(today.close)}`;

  if (spillCloseMins !== null && currentMins < today.open) {
    return {
      isOpen: true,
      isClosingSoon: closingSoon(spillCloseMins - currentMins),
      string,
    };
  }

  const isOpen = currentMins >= today.open && currentMins < today.close;
  return {
    isOpen,
    isClosingSoon: isOpen && closingSoon(today.close - currentMins),
    string,
  };
};

export const DAY_LABELS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const getCurrentApiDay = (): number => (new Date().getDay() + 6) % 7;

const formatClock = (timeStr: string): string => {
  const mins = parseToMinutes(timeStr);
  return mins === null ? "" : formatMinutes(mins);
};

export const formatDayHours = (hour?: LocationHours): string => {
  if (!hour || hour.is_closed || !hour.open_time || !hour.close_time) {
    return "Closed";
  }
  return `${formatClock(hour.open_time)} - ${formatClock(hour.close_time)}`;
};

export const getWeekHours = (
  hours?: LocationHours[],
): { label: string; string: string; isToday: boolean; isClosed: boolean }[] => {
  const today = getCurrentApiDay();
  return DAY_LABELS.map((label, day) => {
    const entry = hours?.find((h) => h.day_of_week === day);
    return {
      label,
      string: formatDayHours(entry),
      isToday: day === today,
      isClosed: !entry || entry.is_closed || !entry.open_time,
    };
  });
};

export const formatPriceLevel = (level?: number | null): string => {
  if (!level || level < 1) return "";
  return "$".repeat(Math.min(level, 4));
};

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

export function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 3958.8;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function buildDirectionsUrl(
  store: {
    name?: string;
    latitude: number;
    longitude: number;
    google_place_id?: string | null;
  },
  userLocation: { lat: number; lng: number } | null = null,
) {
  const destinationQuery = store.name || `${store.latitude},${store.longitude}`;

  if (!userLocation) {
    const params = new URLSearchParams({
      api: "1",
      query: destinationQuery,
    });

    if (store.google_place_id) {
      params.set("query_place_id", store.google_place_id);
    }

    return `https://www.google.com/maps/search/?${params.toString()}`;
  }

  const params = new URLSearchParams({
    api: "1",
    origin: `${userLocation.lat},${userLocation.lng}`,
    destination: destinationQuery,
    travelmode: "driving",
  });

  if (store.google_place_id) {
    params.set("destination_place_id", store.google_place_id);
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
