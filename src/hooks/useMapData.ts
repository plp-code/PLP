import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export function useMapData(mapSlug: string) {
  const [pins, setPins] = useState<any[]>([]);
  const [detailedStores, setDetailedStores] = useState<any[]>([]);

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
          api.get(`/maps/${mapSlug}/stores/minimal`, {
            signal: controller.signal,
          }),
          api.get(`/maps/${mapSlug}/stores?page=1&limit=5`, {
            signal: controller.signal,
          }),
        ]);

        setPins(pinsData);
        setDetailedStores(storesData);
        setHasMore(storesData.length === 5);
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

      const moreStores = await api.get(
        `/maps/${mapSlug}/stores?page=${nextPage}&limit=5`,
      );

      setDetailedStores((prev) => [...prev, ...moreStores]);
      setPage(nextPage);
      setHasMore(moreStores.length === 5);
    } catch (err) {
      console.error("Failed to load more stores:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [page, hasMore, loadingMore, mapSlug]);

  const sidebarStores = detailedStores.map((store) => {
    const pinData = pins.find((p) => p.id === store.id) || {};
    return { ...pinData, ...store };
  });

  return {
    pins,
    stores: sidebarStores,
    loading,
    loadMore,
    hasMore,
    loadingMore,
  };
}
