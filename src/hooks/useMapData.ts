import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export function useMapData(mapSlug: string) {
  const [pins, setPins] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMapDetails = async () => {
      try {
        setLoading(true);

        const [pinsData, storesData] = await Promise.all([
          api.get(`/api/maps/${mapSlug}/stores/minimal`),
          api.get(`/api/maps/${mapSlug}/stores?page=1&limit=5`),
        ]);

        setPins(pinsData as any);
        setStores(storesData as any);
      } catch (err: any) {
        console.error("Failed to load map data:", err);
        setError(err.message || "Failed to load map data");
      } finally {
        setLoading(false);
      }
    };

    if (mapSlug) {
      fetchMapDetails();
    }
  }, [mapSlug]);

  return { pins, stores, loading, error };
}
