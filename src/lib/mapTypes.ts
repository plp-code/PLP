export type MapType = "dot" | "trolley" | "star";
export const DEFAULT_MAP_TYPE: MapType = "dot";

const MAP_TYPE_BY_SLUG: Record<string, MapType> = {
  "bay-area-ca": "trolley",
  "los-angeles-ca": "star",
};

const SF_CENTER: [number, number] = [37.7749, -122.4194];
const LA_CENTER: [number, number] = [34.0522, -118.2437];

export function getMapCenter(mapType: MapType): [number, number] {
  return mapType === "star" ? LA_CENTER : SF_CENTER;
}

export function getMapType(slug: string): MapType {
  return MAP_TYPE_BY_SLUG[slug] ?? DEFAULT_MAP_TYPE;
}
