import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export function useMapData(mapSlug: string) {
  const [pins, setPins] = useState<any[]>([]);
  const [detailedStores, setDetailedStores] = useState<any[]>([]);
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // 1. Initial Load: Get all pins + Page 1 of details
  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      try {
        const [pinsData, storesData] = await Promise.all([
          api.get(`/api/maps/${mapSlug}/stores/minimal`),
          api.get(`/api/maps/${mapSlug}/stores?page=1&limit=5`),
        ]);
        setPins(pinsData);
        setDetailedStores(storesData);
        setHasMore(storesData.length === 5); // If it returned 5, there might be more
      } catch (err) {
        console.error("Failed to load map data:", err);
      } finally {
        setLoading(false);
      }
    };
    if (mapSlug) fetchInitial();
  }, [mapSlug]);

  // 2. Load More function for Infinite Scroll
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const moreStores = await api.get(`/api/maps/${mapSlug}/stores?page=${nextPage}&limit=5`);
      
      setDetailedStores((prev) => [...prev, ...moreStores]);
      setPage(nextPage);
      setHasMore(moreStores.length === 5);
    } catch (err) {
      console.error("Failed to load more stores:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [page, hasMore, loadingMore, mapSlug]);

  // 3. Merge data for the UI
  // The map uses pins, the sidebar uses detailed info if it has been loaded
  const combinedStores = pins.map((pin) => {
    const details = detailedStores.find((d) => d.id === pin.id) || {};
    return { ...pin, ...details };
  });

  return { 
    stores: combinedStores, // The unified array
    loading, 
    loadMore, 
    hasMore, 
    loadingMore 
  };
}