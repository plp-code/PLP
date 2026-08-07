import { useMemo, useState } from "react";
import { MapItem } from "@/types";


/**
 * Owns the directory search box and derives the filtered live maps and the
 * filtered "coming soon" locations from a single query string.
 */
export function useMapSearch(maps: MapItem[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const { filteredMaps, filteredUpcoming } = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    const searchedMaps = q
      ? maps.filter((map) =>
          map.name.toLowerCase().includes(q) ||
          (map.region && map.region.toLowerCase().includes(q))
        )
      : maps;

    const live = searchedMaps.filter((map) => map.status === 'live');
    const upcoming = searchedMaps.filter((map) => map.status === 'waitlist');

    return {
      filteredMaps: live,
      filteredUpcoming: upcoming,
    };
  }, [maps, searchQuery]);

  return { 
    searchQuery, 
    setSearchQuery, 
    filteredMaps, 
    filteredUpcoming 
  };
}