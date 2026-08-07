import { useMemo, useState } from "react";
import { Location, LocationPin } from "@/types";
import { getDistance, getTodayHours } from "@/lib/utils";
import type { UserLocation } from "./useGeolocation";

/**
 * Owns the search / price / open-now filter state and derives the filtered
 * store list, the (search-filtered) map pins, and a combined id lookup.
 */
export function useStoreFilters(
  stores: Location[],
  pins: LocationPin[],
  userLocation: UserLocation | null,
) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activePrice, setActivePrice] = useState<string | null>(null);
  const [isOpenNow, setIsOpenNow] = useState(false);

  const filteredStores = useMemo(() => {
    let result = stores;

    const cleanSearch = searchTerm.trim().toLowerCase();
    if (cleanSearch) {
      result = result.filter((s) =>
        (s.name || "").toLowerCase().includes(cleanSearch),
      );
    }

    if (activePrice) {
      result = result.filter((s) => s.price_level === Number(activePrice));
    }

    if (isOpenNow) {
      result = result.filter((s) => getTodayHours(s.hours).isOpen);
    }

    if (userLocation) {
      result = [...result].sort(
        (a, b) =>
          getDistance(
            userLocation.lat,
            userLocation.lng,
            a.latitude,
            a.longitude,
          ) -
          getDistance(
            userLocation.lat,
            userLocation.lng,
            b.latitude,
            b.longitude,
          ),
      );
    }

    return result;
  }, [stores, searchTerm, activePrice, isOpenNow, userLocation]);

  const mapPins = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return pins;
    return pins.filter((p) => (p.name || "").toLowerCase().includes(q));
  }, [pins, searchTerm]);

  const storeById = useMemo(() => {
    const byId = new Map<number, Location | LocationPin>();
    pins.forEach((p) => byId.set(p.id, p));
    stores.forEach((s) => byId.set(s.id, s));
    return byId;
  }, [pins, stores]);

  return {
    searchTerm,
    setSearchTerm,
    activePrice,
    setActivePrice,
    isOpenNow,
    setIsOpenNow,
    filteredStores,
    mapPins,
    storeById,
  };
}
