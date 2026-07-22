import { useMemo, useState } from "react";
import { MapItem } from "@/types";
import type { UpcomingLocation } from "@/components/features/maps/ComingSoonCard";

const UPCOMING_LOCATIONS: UpcomingLocation[] = [
  { name: "Los Angeles", region: "California" },
  { name: "Manhattan", region: "New York" },
  { name: "Chicago", region: "Illinois" },
  { name: "Phoenix", region: "Arizona" },
  { name: "Boston", region: "Massachusetts" },
];

/**
 * Owns the directory search box and derives the filtered live maps and the
 * filtered "coming soon" locations from a single query string.
 */
export function useMapSearch(maps: MapItem[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMaps = useMemo(() => {
    if (!searchQuery) return maps;
    const q = searchQuery.toLowerCase();
    return maps.filter((map) => map.name.toLowerCase().includes(q));
  }, [maps, searchQuery]);

  const filteredUpcoming = useMemo(() => {
    if (!searchQuery) return UPCOMING_LOCATIONS;
    const q = searchQuery.toLowerCase();
    return UPCOMING_LOCATIONS.filter(
      (location) =>
        location.name.toLowerCase().includes(q) ||
        location.region.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  return { searchQuery, setSearchQuery, filteredMaps, filteredUpcoming };
}
