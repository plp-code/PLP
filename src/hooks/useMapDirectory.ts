import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { MapItem, MapListResponse } from "@/types";
import { useAuthUser } from "@/context/AuthContext";

export function useMapDirectory() {
  const [maps, setMaps] = useState<MapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated } = useAuthUser();

  const refetch = async () => {
    try {
      const data = await api.get<MapListResponse>("/maps");
      setMaps(data.maps ?? []);
    } catch (err: any) {
      setError(err.message || "Failed to load maps");
    }
  };

  useEffect(() => {
    if (isAuthenticated === undefined) return;

    let cancelled = false;
    setLoading(true);

    refetch().finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => { cancelled = true; };
  }, [isAuthenticated]);

  return { maps, loading, error, refetch };
}