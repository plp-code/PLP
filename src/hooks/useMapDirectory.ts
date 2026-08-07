import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { MapListResponse, MapStatus } from "@/types";
import { useAuthUser } from "@/context/AuthContext";

interface DirectoryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: MapStatus | "all";
}

export function useMapDirectory({
  page = 1,
  limit = 5,
  search = "",
  status = "all",
}: DirectoryParams = {}) {
  const { isAuthenticated, isLoading: authLoading } = useAuthUser();

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const query = useQuery({
    queryKey: [
      "maps",
      { page, limit, search: debouncedSearch, status, isAuthenticated },
    ],
    queryFn: async ({ signal }) => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (debouncedSearch.trim())
        params.append("search", debouncedSearch.trim());
      if (status !== "all") params.append("status", status);

      const data = await api.get<MapListResponse>(
        `/maps?${params.toString()}`,
        {
          signal,
          skipRefresh: !isAuthenticated,
        },
      );

      return data;
    },
    enabled: !authLoading,
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });

  return {
    maps: query.data?.maps ?? [],
    total: query.data?.total ?? 0,
    totalPages: query.data ? Math.ceil(query.data.total / limit) : 0,
    hasMore: query.data?.has_more ?? false,
    loading: authLoading || query.isLoading,
    isFetching: query.isFetching,
    error: query.error ? (query.error as Error).message : null,
    refetch: query.refetch,
  };
}
