"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";

const DEFAULT_PIN_COLOR = "#2563eb";
const ACTIVE_PIN_COLOR = "#E4002B";

export const TROLLEY_SVG_INNER = `<g><path fill="#434A54" d="M223.996,165.331c-3.125,0-6.219-1.375-8.328-4.008L130.342,54.662c-3.688-4.602-2.938-11.312,1.656-14.992c4.609-3.68,11.312-2.938,15,1.664l85.327,106.662c3.688,4.602,2.938,11.312-1.672,14.992C228.7,164.566,226.34,165.331,223.996,165.331z"/><path fill="#434A54" d="M277.34,165.331c-3.125,0-6.234-1.375-8.344-4.008L183.669,54.662c-3.688-4.602-2.938-11.312,1.672-14.992c4.593-3.68,11.312-2.938,14.984,1.664l85.327,106.662c3.688,4.602,2.938,11.312-1.656,14.992C282.027,164.566,279.668,165.331,277.34,165.331z"/></g><rect x="181.326" y="154.656" fill="#E6E9ED" width="128" height="31.999"/><path fill="#FC6E51" d="M479.992,421.318H32c-17.641,0-32-14.343-32-31.999V207.995c0-17.648,14.359-32,32-32h447.992c17.64,0,31.999,14.352,31.999,32V389.32C511.991,406.975,497.632,421.318,479.992,421.318z"/><path fill="#E6E9ED" d="M0.001,389.319c0,17.656,14.359,31.999,32,31.999h47.921v-42.655H0.001V389.319z"/><path fill="#4FC2E9" d="M511.991,218.659H53.328c-5.891,0-10.656,4.773-10.656,10.664v85.342c0,5.891,4.766,10.656,10.656,10.656h458.663V218.659z"/><g><path fill="#434A54" d="M95.999,367.991c-29.406,0-53.327,23.922-53.327,53.327c0,29.422,23.921,53.343,53.327,53.343s53.327-23.921,53.327-53.343C149.326,391.913,125.405,367.991,95.999,367.991z"/><path fill="#434A54" d="M394.665,367.991c-29.405,0-53.343,23.922-53.343,53.327c0,29.422,23.938,53.343,53.343,53.343s53.327-23.921,53.327-53.343C447.992,391.913,424.07,367.991,394.665,367.991z"/></g><path fill="#F5F7FA" d="M103.546,413.788c4.156,4.155,4.156,10.905,0,15.077c-4.172,4.172-10.922,4.172-15.093,0c-4.156-4.172-4.156-10.922,0-15.077C92.624,409.616,99.374,409.616,103.546,413.788z"/><rect x="181.326" y="325.366" fill="#E6E9ED" width="128" height="95.95"/><path fill="#F5F7FA" d="M402.196,413.788c4.172,4.155,4.172,10.905,0,15.077c-4.156,4.172-10.905,4.172-15.077,0s-4.172-10.922,0-15.077C391.291,409.616,398.04,409.616,402.196,413.788z"/><rect x="239.996" y="218.656" fill="#E6E9ED" width="10.671" height="202.66"/><g><polygon fill="#3BAFDA" points="95.311,325.367 94.968,218.659 116.311,218.596 116.639,325.289"/><polygon fill="#3BAFDA" points="384.166,325.367 383.822,218.659 405.165,218.596 405.493,325.289"/></g><g><polygon fill="#E6E9ED" points="181.326,218.659 309.323,218.659 309.323,421.318 319.994,421.318 319.994,218.659 319.994,207.995 309.323,207.995 181.326,207.995 170.669,207.995 170.669,218.659 170.669,421.318 181.326,421.318"/><path fill="#E6E9ED" d="M511.991,346.664h-31.999c-5.891,0-10.672,4.766-10.672,10.656s4.781,10.671,10.672,10.671h31.999V346.664z"/></g>`;

function buildPinIcon(active: boolean) {
  return L.divIcon({
    className: "plp-marker-wrapper",
    html: `<div style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); transition: transform 0.2s;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.991 511.991" width="${active ? 38 : 32}" height="${active ? 38 : 32}">${TROLLEY_SVG_INNER}</svg>
    </div>`,
    iconSize: [active ? 38 : 32, active ? 38 : 32],
    iconAnchor: [active ? 19 : 16, active ? 38 : 32],
    popupAnchor: [0, active ? -38 : -32],
  });
}

const userIcon = L.divIcon({
  className: "plp-marker-wrapper",
  html: `<div class="plp-user-dot"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -10],
});

function FlyToStore({ store }: { store: any | null }) {
  const map = useMap();
  useEffect(() => {
    if (store?.latitude && store?.longitude) {
      map.flyTo([store.latitude, store.longitude], 15, { duration: 1.5 });
    }
  }, [store, map]);
  return null;
}

function FlyToUser({
  location,
}: {
  location: { lat: number; lng: number } | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 14, { duration: 1.5 });
    }
  }, [location, map]);
  return null;
}

export default function MapComponent({
  stores,
  activeId,
  setActiveId,
  activeStore,
  userLocation,
}: any) {
  const markerRefs = useRef<{ [key: number]: L.Marker | null }>({});

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const validStores = stores.filter(
    (s: any) =>
      typeof s.latitude === "number" && typeof s.longitude === "number",
  );

  useEffect(() => {
    if (activeId && markerRefs.current[activeId]) {
      markerRefs.current[activeId]?.openPopup();
    }
  }, [activeId]);

  return (
    <MapContainer
      center={[37.7749, -122.4194]}
      zoom={11}
      zoomControl={false}
      className="h-full w-full z-0"
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

      {!isMobile && <ZoomControl position="topright" />}

      {validStores.map((s: any) => {
        // const gmapsUrl = buildDirectionsUrl(s, userLocation ?? null);

        return (
          <Marker
            key={s.id ?? `${s.latitude},${s.longitude}`}
            position={[s.latitude, s.longitude]}
            icon={buildPinIcon(activeId === s.id)}
            eventHandlers={{ click: () => setActiveId(s.id) }}
            ref={(ref) => {
              markerRefs.current[s.id] = ref;
            }}
          >
            {/* <Popup className="custom-modern-popup" closeButton={false}>
              <div className="flex flex-col w-[220px]">
                <h3 className="font-bold text-[15px] text-gray-900 leading-tight m-0 tracking-tight">
                  {s.name}
                </h3>

                {s.description && (
                  <p className="text-xs text-gray-500 m-0 leading-tight mt-1 line-clamp-2">
                    {s.description}
                  </p>
                )}

                <div className="h-px bg-gray-100 my-2.5" />

                <div className="flex gap-2">
                  <a
                    href={gmapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 flex-1 bg-blue-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors !text-white !no-underline"
                  >
                    <Navigation size={12} />
                    Directions
                  </a>
                </div>
              </div>
            </Popup> */}
          </Marker>
        );
      })}

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>
            <div className="font-semibold text-sm text-center px-2 py-1 text-gray-800">
              You are here
            </div>
          </Popup>
        </Marker>
      )}

      <FlyToStore store={activeStore} />
      <FlyToUser location={userLocation} />
    </MapContainer>
  );
}
