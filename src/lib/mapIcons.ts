import L from "leaflet";
import { TROLLEY_SVG_INNER, HOLLYWOOD_SVG_INNER } from "./svgs";
import type { MapType } from "./mapTypes";

export interface PinIconConfig {
  svgInner: string;
  viewBox: string;
  size: number;
  activeSize: number;
  anchor?: "bottom" | "center";
  color?: string;
  activeColor?: string;
}

export const DEFAULT_PIN_COLOR = "#2563eb";
export const ACTIVE_PIN_COLOR = "#E4002B";

export const PIN_ICONS = {
  dot: {
    svgInner: `<circle cx="12" cy="12" r="8" fill="currentColor" stroke="#fff" stroke-width="3"/>`,
    viewBox: "0 0 24 24",
    size: 18,
    activeSize: 24,
    anchor: "center",
    color: DEFAULT_PIN_COLOR,
    activeColor: ACTIVE_PIN_COLOR,
  },
  trolley: {
    svgInner: TROLLEY_SVG_INNER,
    viewBox: "0 0 511.991 511.991",
    size: 32,
    activeSize: 38,
    anchor: "bottom",
  },
  star: {
    svgInner: HOLLYWOOD_SVG_INNER,
    viewBox: "0 0 511.991 511.991",
    size: 32,
    activeSize: 38,
    anchor: "bottom",
  },
} satisfies Record<MapType, PinIconConfig>;

const cache = new Map<string, L.DivIcon>();

export function getPinIcon(type: MapType, active: boolean): L.DivIcon {
  const key = `${type}:${active}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const cfg: PinIconConfig = PIN_ICONS[type];
  const size = active ? cfg.activeSize : cfg.size;
  const anchorY = cfg.anchor === "center" ? size / 2 : size;
  const color = (active ? cfg.activeColor : cfg.color) ?? "inherit";

  const icon = L.divIcon({
    className: "plp-marker-wrapper",
    html: `<div style="color: ${color}; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); transition: transform 0.2s;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="${cfg.viewBox}" width="${size}" height="${size}">${cfg.svgInner}</svg>
  </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, anchorY],
    popupAnchor: [0, -anchorY],
  });

  cache.set(key, icon);
  return icon;
}
