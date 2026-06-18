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
import { Navigation } from "lucide-react";

const iconConfig = {
  iconSize: [25, 41] as [number, number],
  iconAnchor: [12, 41] as [number, number],
  popupAnchor: [1, -34] as [number, number],
  shadowSize: [41, 41] as [number, number],
};

const blueIcon = new L.Icon({
  ...iconConfig,
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const redIcon = new L.Icon({
  ...iconConfig,
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const userIcon = new L.Icon({
  ...iconConfig,
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
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
        const gmapsUrl = `https://maps.google.com/?q=${encodeURIComponent(s.store_name + " " + (s.address || ""))}`;

        return (
          <Marker
            key={s.id}
            position={[s.latitude, s.longitude]}
            icon={activeId === s.id ? redIcon : blueIcon}
            eventHandlers={{ click: () => setActiveId(s.id) }}
            ref={(ref) => {
              markerRefs.current[s.id] = ref;
            }}
          >
            <Popup className="custom-modern-popup">
              <div className="flex flex-col min-w-[180px] pt-1">
                <div className="flex justify-between items-start gap-3 mb-1">
                  <h3 className="font-bold text-[15px] text-gray-900 leading-tight m-0 tracking-tight">
                    {s.store_name}
                  </h3>
                </div>

                <p className="text-xs text-gray-500 m-0 leading-tight mb-3">
                  {s.address}
                </p>

                <a
                  href={gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full bg-blue-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors !text-white !no-underline"
                >
                  <Navigation size={12} />
                  Directions
                </a>
              </div>
            </Popup>
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
