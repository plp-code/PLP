import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { MapListResponse } from "@/types";
import { useAuthUser } from "@/context/AuthContext";

export function useMapDirectory() {
  const { isAuthenticated } = useAuthUser();

  const query = useQuery({
    queryKey: ["maps", { isAuthenticated }],
    queryFn: async ({ signal }) => {
      const data = await api.get<MapListResponse>("/maps", {
        signal,
        skipRefresh: true,
      });
      return data.maps ?? [];
    },

    enabled: true,
  });

  return {
    maps: query.data ?? [],
    loading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
    refetch: query.refetch,
  };
}
