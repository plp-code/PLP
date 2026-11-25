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
import type { Location, LocationPin } from "@/types";
import type { UserLocation } from "@/hooks/useGeolocation";
import { getPinIcon } from "@/lib/mapIcons";
import { DEFAULT_MAP_TYPE, getMapCenter, type MapType } from "@/lib/mapTypes";

export interface MapComponentProps {
  stores: LocationPin[];
  activeId: number | null;
  setActiveId: (id: number) => void;
  activeStore: Location | LocationPin | null;
  userLocation: UserLocation | null;
  mapType?: MapType;
}

const CARTO_API_KEY = process.env.NEXT_PUBLIC_CARTO_API_KEY;

const userIcon = L.divIcon({
  className: "plp-marker-wrapper",
  html: `<div class="plp-user-dot"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -10],
});

function FlyToStore({ store }: { store: Location | LocationPin | null }) {
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
  mapType = DEFAULT_MAP_TYPE,
}: MapComponentProps) {
  const markerRefs = useRef<{ [key: number]: L.Marker | null }>({});

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const validStores = stores.filter(
    (s) => typeof s.latitude === "number" && typeof s.longitude === "number",
  );

  useEffect(() => {
    if (activeId && markerRefs.current[activeId]) {
      markerRefs.current[activeId]?.openPopup();
    }
  }, [activeId]);

  return (
    <MapContainer
      center={getMapCenter(mapType)}
      zoom={11}
      zoomControl={false}
      className="h-full w-full z-0"
    >
      <TileLayer
        url={`https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>'
      />
      {!isMobile && <ZoomControl position="topright" />}

      {validStores.map((s) => {
        return (
          <Marker
            key={s.id ?? `${s.latitude},${s.longitude}`}
            position={[s.latitude, s.longitude]}
            icon={getPinIcon(mapType, activeId === s.id)}
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
