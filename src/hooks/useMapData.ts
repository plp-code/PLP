import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { Location, LocationPin } from "@/types";

const PAGE_SIZE = 5;

export function useMapData(mapSlug: string) {
  // `pins` = every location on the map (lightweight: id/name/lat/lng) for the
  // map markers. `stores` = the detailed, paginated set that backs the list and
  // the detail panel.
  const [pins, setPins] = useState<LocationPin[]>([]);
  const [stores, setStores] = useState<Location[]>([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchInitial = async () => {
      setLoading(true);
      try {
        const [pinsData, storesData] = await Promise.all([
          api.get<LocationPin[]>(`/maps/${mapSlug}/locations/pins`, {
            signal: controller.signal,
          }),
          api.get<Location[]>(
            `/maps/${mapSlug}/locations?page=1&limit=${PAGE_SIZE}`,
            { signal: controller.signal },
          ),
        ]);

        setPins(pinsData);
        setStores(storesData);
        setPage(1);
        setHasMore(storesData.length === PAGE_SIZE);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error("Failed to load map data:", err);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    if (mapSlug) fetchInitial();

    return () => controller.abort();
  }, [mapSlug]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;

      const moreStores = await api.get<Location[]>(
        `/maps/${mapSlug}/locations?page=${nextPage}&limit=${PAGE_SIZE}`,
      );

      setStores((prev) => [...prev, ...moreStores]);
      setPage(nextPage);
      setHasMore(moreStores.length === PAGE_SIZE);
    } catch (err) {
      console.error("Failed to load more locations:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [page, hasMore, loadingMore, mapSlug]);

  return {
    pins,
    stores,
    loading,
    loadMore,
    hasMore,
    loadingMore,
  };
}
