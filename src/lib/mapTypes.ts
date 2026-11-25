// Leaflet-free so it can be imported from any component (incl. SSR'd ones).
export type MapType = "dot" | "trolley";
export const DEFAULT_MAP_TYPE: MapType = "dot";

const MAP_TYPE_BY_SLUG: Record<string, MapType> = {
  "bay-area-ca": "trolley",
};

export function getMapType(slug: string): MapType {
  return MAP_TYPE_BY_SLUG[slug] ?? DEFAULT_MAP_TYPE;
}
