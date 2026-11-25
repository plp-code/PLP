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
  /** Case-insensitive substring match on name or neighborhood. */
  search?: string;
  /** clothing_categories.slug values, OR-matched. */
  categories?: string[];
}

function buildFilterParams(filters: MapDataFilters): URLSearchParams {
  const params = new URLSearchParams();
  const search = (filters.search ?? "").trim().slice(0, MAX_SEARCH_LENGTH);
  if (search) params.set("search", search);
  // Repeated params (?categories=a&categories=b), not a comma list.
  for (const slug of (filters.categories ?? []).slice(0, MAX_CATEGORIES)) {
    params.append("categories", slug);
  }
  return params;
}

const isFallback = (headers: Headers) =>
  headers.get("x-category-fallback") === "true";

export function useMapData(mapSlug: string, filters: MapDataFilters = {}) {
  const search = (filters.search ?? "").trim();
  // Sorted so selection order doesn't create distinct cache entries.
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
      lastPage.items.length === PAGE_SIZE ? allPages.length + 1 : undefined,
    placeholderData: keepPreviousData,
    enabled: !!mapSlug,
  });

  const stores = locationsQuery.data?.pages.flatMap((p) => p.items) ?? [];

  // Decided per map by the server, so every page and the pins agree.
  const categoryFallback =
    categories.length > 0 &&
    (locationsQuery.data?.pages[0]?.fallback ??
      pinsQuery.data?.fallback ??
      false);

  return {
    pins: pinsQuery.data?.pins ?? [],
    stores,
    categoryFallback,
    loading: pinsQuery.isLoading || locationsQuery.isLoading,
    loadMore: locationsQuery.fetchNextPage,
    hasMore: locationsQuery.hasNextPage,
    loadingMore: locationsQuery.isFetchingNextPage,
  };
}
