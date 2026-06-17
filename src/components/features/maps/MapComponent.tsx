"use client";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

const iconSize: [number, number] = [25, 41];
const iconAnchor: [number, number] = [12, 41];

const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize, iconAnchor, popupAnchor: [1, -34], shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize, iconAnchor, popupAnchor: [1, -34], shadowSize: [41, 41],
});

function FlyToStore({ store }: { store: any | null }) {
  const map = useMap();
  useEffect(() => {
    if (store) map.flyTo([store.latitude, store.longitude], 15, { duration: 1.5 });
  }, [store, map]);
  return null;
}

export default function MapComponent({ stores, activeId, setActiveId, activeStore }: any) {
  // Add this safety filter
  const validStores = stores.filter(
    (s: any) => typeof s.latitude === 'number' && typeof s.longitude === 'number'
  );

  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={11} className="h-full w-full">
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
      
      {validStores.map((s: any) => (
        <Marker 
          key={s.id} 
          position={[s.latitude, s.longitude]} 
          icon={activeId === s.id ? redIcon : blueIcon}
          eventHandlers={{ click: () => setActiveId(s.id) }} 
        />
      ))}
      
      <FlyToStore store={activeStore} />
    </MapContainer>
  );
}