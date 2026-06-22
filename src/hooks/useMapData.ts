import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Location, LocationPin } from "@/types";

const PAGE_SIZE = 5;

export function useMapData(mapSlug: string) {  
  const pinsQuery = useQuery({
    queryKey: ["locations", "pins", mapSlug],
    queryFn: ({ signal }) =>
      api.get<LocationPin[]>(`/maps/${mapSlug}/locations/pins`, { signal }),
    enabled: !!mapSlug,
  });
  
  const locationsQuery = useInfiniteQuery({
    queryKey: ["locations", "list", mapSlug],
    queryFn: ({ pageParam, signal }) =>
      api.get<Location[]>(
        `/maps/${mapSlug}/locations?page=${pageParam}&limit=${PAGE_SIZE}`,
        { signal },
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length + 1 : undefined,
    enabled: !!mapSlug,
  });

  const stores = locationsQuery.data?.pages.flat() ?? [];

  return {
    pins: pinsQuery.data ?? [],
    stores,
    loading: pinsQuery.isLoading || locationsQuery.isLoading,
    loadMore: locationsQuery.fetchNextPage,
    hasMore: locationsQuery.hasNextPage,
    loadingMore: locationsQuery.isFetchingNextPage,
  };
}
