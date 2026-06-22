import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { MapListResponse } from "@/types";
import { useAuthUser } from "@/context/AuthContext";

export function useMapDirectory() {
  const { isAuthenticated, isLoading: authLoading } = useAuthUser();

  const query = useQuery({
    queryKey: ["maps", { isAuthenticated }],
    queryFn: async ({ signal }) => {
      const data = await api.get<MapListResponse>("/maps", { signal });
      return data.maps ?? [];
    },
    enabled: !authLoading,
  });

  return {
    maps: query.data ?? [],
    loading: authLoading || query.isLoading,
    error: query.error ? (query.error as Error).message : null,
    refetch: query.refetch,
  };
}
