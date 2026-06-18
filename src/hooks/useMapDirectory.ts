import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { MapItem } from "@/types";

export function useMapDirectory() {
  const [maps, setMaps] = useState<MapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMaps() {
      try {
        setLoading(true);
        const data = await api.get<MapItem[]>("/maps");
        setMaps(data);
      } catch (err: any) {
        setError(err.message || "Failed to load maps");
      } finally {
        setLoading(false);
      }
    }
    fetchMaps();
  }, []);

  return { maps, loading, error };
}