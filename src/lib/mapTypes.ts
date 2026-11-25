export type MapType = "dot" | "trolley" | "star";
export const DEFAULT_MAP_TYPE: MapType = "dot";

const MAP_TYPE_BY_SLUG: Record<string, MapType> = {
  "bay-area-ca": "trolley",
  "los-angeles-ca": "star",
};

export function getMapType(slug: string): MapType {
  return MAP_TYPE_BY_SLUG[slug] ?? DEFAULT_MAP_TYPE;
}
