import { useMemo, useState } from "react";
import { Location, LocationPin } from "@/types";
import { getDistance, getTodayHours } from "@/lib/utils";
import type { UserLocation } from "./useGeolocation";

export function useStoreFilters(
  stores: Location[],
  pins: LocationPin[],
  userLocation: UserLocation | null,
) {
  const [activePrice, setActivePrice] = useState<string | null>(null);
  const [isOpenNow, setIsOpenNow] = useState(false);

  const filteredStores = useMemo(() => {
    let result = stores;

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
  }, [stores, activePrice, isOpenNow, userLocation]);

  const storeById = useMemo(() => {
    const byId = new Map<number, Location | LocationPin>();
    pins.forEach((p) => byId.set(p.id, p));
    stores.forEach((s) => byId.set(s.id, s));
    return byId;
  }, [pins, stores]);

  return {
    activePrice,
    setActivePrice,
    isOpenNow,
    setIsOpenNow,
    filteredStores,
    storeById,
  };
}
