import { LocationHours } from "@/types";

export const getTodayHours = (
  hours?: LocationHours[],
): { isOpen: boolean; isClosingSoon: boolean; string: string } => {
  if (!hours || hours.length === 0) {
    return { isOpen: false, isClosingSoon: false, string: "Hours unavailable" };
  }

  const apiDay = (new Date().getDay() + 6) % 7;
  const today = hours.find((h) => h.day_of_week === apiDay);

  if (!today || today.is_closed || !today.open_time || !today.close_time) {
    return { isOpen: false, isClosingSoon: false, string: "Closed Today" };
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
  const minutesUntilClose = closeMins - currentMins;
  const isClosingSoon =
    isOpen && minutesUntilClose > 0 && minutesUntilClose <= 60;

  const formatTime = (mins: number) => {
    let h = Math.floor(mins / 60);
    const m = mins % 60;
    const ampm = h % 24 >= 12 ? "pm" : "am";
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}${m > 0 ? `:${m.toString().padStart(2, "0")}` : ""}${ampm}`;
  };

  return {
    isOpen,
    isClosingSoon,
    string: `${formatTime(openMins)} - ${formatTime(closeMins)}`,
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
  const parts = timeStr.trim().split(":");
  let h = parseInt(parts[0], 10);
  const m = parts.length > 1 ? parseInt(parts[1], 10) : 0;
  const ampm = h >= 12 ? "pm" : "am";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}${m > 0 ? `:${m.toString().padStart(2, "0")}` : ""}${ampm}`;
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

export function buildDirectionsUrl(
  store: {
    name?: string;
    latitude: number;
    longitude: number;
    google_place_id?: string;
  },
  userLocation: { lat: number; lng: number } | null = null,
) {
  if (!userLocation) {
    if (store.google_place_id) {
      return `https://www.google.com/maps/place/?q=place_id:${store.google_place_id}`;
    }
    if (store.name) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name)}@${store.latitude},${store.longitude}`;
    }
    return `https://www.google.com/maps/@${store.latitude},${store.longitude},17z`;
  }

  if (store.google_place_id) {
    const params = new URLSearchParams({
      api: "1",
      travelmode: "driving",
      origin: `${userLocation.lat},${userLocation.lng}`,
      destination: store.name || `${store.latitude},${store.longitude}`,
      destination_place_id: store.google_place_id,
    });
    return `https://www.google.com/maps/dir/?${params.toString()}`;
  }

  if (store.name) {
    return `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${encodeURIComponent(store.name)}@${store.latitude},${store.longitude}`;
  }

  return `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${store.latitude},${store.longitude}`;
}
