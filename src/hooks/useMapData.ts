import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Location, LocationPin } from "@/types";

const PAGE_SIZE = 25;
export const MAX_SEARCH_LENGTH = 255;
export const MAX_CATEGORIES = 20;

export interface MapDataFilters {
  search?: string;
  categories?: string[];
}

function buildFilterParams(filters: MapDataFilters): URLSearchParams {
  const params = new URLSearchParams();
  const search = (filters.search ?? "").trim().slice(0, MAX_SEARCH_LENGTH);
  if (search) params.set("search", search);

  for (const slug of (filters.categories ?? []).slice(0, MAX_CATEGORIES)) {
    params.append("categories", slug);
  }
  return params;
}

const isFallback = (headers: Headers) =>
  headers.get("x-category-fallback") === "true";

export function useMapData(mapSlug: string, filters: MapDataFilters = {}) {
  const search = (filters.search ?? "").trim();

  const categories = [...(filters.categories ?? [])].sort();

  const filterParams = buildFilterParams({ search, categories });
  const filterQuery = filterParams.toString();

  const pinsQuery = useQuery({
    queryKey: ["locations", "pins", mapSlug, search, categories],
    queryFn: async ({ signal }) => {
      const { data, headers } = await api.getWithHeaders<LocationPin[]>(
        `/maps/${mapSlug}/locations/pins${filterQuery ? `?${filterQuery}` : ""}`,
        { signal },
      );
      return { pins: data, fallback: isFallback(headers) };
    },
    placeholderData: keepPreviousData,
    enabled: !!mapSlug,
  });

  const locationsQuery = useInfiniteQuery({
    queryKey: ["locations", "list", mapSlug, search, categories],
    queryFn: async ({ pageParam, signal }) => {
      const params = new URLSearchParams(filterParams);
      params.set("page", String(pageParam));
      params.set("limit", String(PAGE_SIZE));
      const { data, headers } = await api.getWithHeaders<Location[]>(
        `/maps/${mapSlug}/locations?${params.toString()}`,
        { signal },
      );
      return { items: data, fallback: isFallback(headers) };
    },
    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) =>
      lastPage.items.length < PAGE_SIZE ? undefined : allPages.length + 1,

    gcTime: 0,
    enabled: !!mapSlug,
  });

  const stores = locationsQuery.data?.pages.flatMap((p) => p.items) ?? [];

  const categoryFallback =
    categories.length > 0 &&
    (locationsQuery.data?.pages[0]?.fallback ??
      pinsQuery.data?.fallback ??
      false);

  return {
    pins: pinsQuery.data?.pins ?? [],
    stores,
    categoryFallback,

    loading: pinsQuery.isLoading,
    listLoading: locationsQuery.isPending,
    loadMore: locationsQuery.fetchNextPage,
    hasMore: locationsQuery.hasNextPage,
    loadingMore: locationsQuery.isFetchingNextPage,
  };
}
