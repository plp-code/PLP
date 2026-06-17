"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useMapData } from "@/hooks/useMapData";
import { ChevronLeft, ChevronRight, Search, Loader2, Navigation, MapPin, Clock, DollarSign, Info } from "lucide-react";

interface Store {
  id: number;
  store_name: string;
  latitude: number;
  longitude: number;
  price_range: string;
  notes?: string;
  price_notes?: string;
  hours?: Record<string, string>;
  address?: string;
}

const getTodayHours = (hours?: Record<string, string>): { isOpen: boolean, string: string } => {
  if (!hours) return { isOpen: false, string: "Hours unavailable" };
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = days[new Date().getDay()];
  const schedule = hours[today];
  
  if (!schedule || schedule === "Closed") return { isOpen: false, string: "Closed Today" };

  const [open, close] = schedule.split("-").map(Number);
  const now = new Date().getHours();
  const isOpen = now >= open && now < close;
  
  const formatTime = (h: number) => `${h > 12 ? h - 12 : h}${h >= 12 ? 'pm' : 'am'}`;
  
  return { isOpen, string: `${formatTime(open)} - ${formatTime(close)}` };
};

export default function SecureMapDashboard({ mapSlug }: { mapSlug: string }) {
  const { stores, loading, loadMore, hasMore, loadingMore } = useMapData(mapSlug);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [MapComponent, setMapComponent] = useState<any>(null);

  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("./MapComponent").then((mod) => setMapComponent(() => mod.default));
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator && !userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.log("Auto-location denied or failed:", error.message)
      );
    }
  }, [userLocation]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) loadMore();
      },
      { threshold: 1.0 }
    );
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [loadMore, hasMore, loadingMore]);

  const handleLocateMe = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLocating(false);
          setActiveId(null);
        },
        (error) => {
          alert("Could not get your location. Please check browser permissions.");
          setIsLocating(false);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  const filteredStores = useMemo(() => 
    stores.filter((s) => s.store_name?.toLowerCase().includes(searchTerm.toLowerCase())), 
  [stores, searchTerm]);

  const activeStore = useMemo(() => 
    filteredStores.find((s) => s.id === activeId) || null, 
  [filteredStores, activeId]);

  if (loading) return <div className="h-full flex items-center justify-center">Loading Map Experience...</div>;

  return (
    <div className="relative h-full w-full bg-gray-100 font-sans tracking-tight">
      
      <div className="absolute inset-0 z-0">
        {MapComponent && (
          <MapComponent 
            stores={filteredStores} 
            activeId={activeId} 
            setActiveId={setActiveId} 
            activeStore={activeStore} 
            userLocation={userLocation}
          />
        )}
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-md bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 p-2 flex items-center gap-3">
        <div className="bg-gray-100 p-2 rounded-full"><Search size={18} className="text-gray-500"/></div>
        <input
          type="text"
          placeholder="Search locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-sm text-gray-800 placeholder-gray-400 font-medium"
        />
      </div>

      <button
        onClick={handleLocateMe}
        disabled={isLocating}
        className="absolute bottom-6 right-6 z-[1000] bg-white p-3 rounded-full shadow-xl border border-gray-200 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center"
        title="Find My Location"
      >
        {isLocating ? <Loader2 size={24} className="animate-spin" /> : <Navigation size={24} className={userLocation ? "text-blue-600 fill-blue-100" : ""} />}
      </button>

      <aside 
        className={`absolute top-24 bottom-6 left-6 w-[400px] bg-white z-[1000] rounded-2xl shadow-2xl flex flex-col transition-transform duration-300 ease-in-out border border-gray-100 overflow-hidden ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-[120%]"
        }`}
      >
        <div className="flex-1 overflow-y-auto">
          {filteredStores.map((store) => {
            const timeData = getTodayHours(store.hours);
            const isActive = activeId === store.id;
            const gmapsUrl = `https://maps.google.com/?q=${encodeURIComponent(store.store_name + ' ' + (store.address || ''))}`;

            return (
              <div 
                key={store.id} 
                onClick={() => setActiveId(store.id)}
                className={`relative p-5 cursor-pointer border-b border-gray-100 transition-colors ${
                  isActive ? "bg-blue-50/20" : "bg-white hover:bg-gray-50"
                }`}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 rounded-r-full" />}

                <div className="flex justify-between items-start">
                  <div className="pr-4">
                    <h3 className="font-semibold text-gray-900 text-base leading-tight mb-1">{store.store_name}</h3>
                    <p className="text-sm text-gray-500 font-medium">{store.address}</p>
                  </div>
                  
                  <div className={`flex flex-col items-end gap-1 shrink-0`}>
                    <div className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${timeData.isOpen ? "text-emerald-600" : "text-gray-400"}`}>
                      <span className={`w-2 h-2 rounded-full ${timeData.isOpen ? "bg-emerald-500" : "bg-gray-400"}`} />
                      {timeData.isOpen ? "Open" : "Closed"}
                    </div>
                  </div>
                </div>
                
                {isActive && (
                  <div className="mt-5 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 flex flex-col gap-4">
                    
                    {/* Hours & Schedule */}
                    <div className="flex gap-3 text-sm">
                      <Clock size={16} className="text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-900 block">Today's Hours</span>
                        <span className="text-gray-600">{timeData.string}</span>
                      </div>
                    </div>

                    {/* Price Details */}
                    {(store.price_range || store.price_notes) && (
                      <div className="flex gap-3 text-sm">
                        <DollarSign size={16} className="text-gray-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900 block">Pricing</span>
                          <span className="text-gray-600 block">Level: {store.price_range || "N/A"}</span>
                          {store.price_notes && <span className="text-gray-500 text-xs italic">{store.price_notes}</span>}
                        </div>
                      </div>
                    )}

                    {/* General Notes */}
                    {store.notes && (
                      <div className="flex gap-3 text-sm">
                        <Info size={16} className="text-gray-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-900 block">About</span>
                          <span className="text-gray-600 leading-relaxed">{store.notes}</span>
                        </div>
                      </div>
                    )}

                    {/* Redesigned Actions */}
                    <div className="mt-2 flex gap-2">
                      <a 
                        href={gmapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all active:scale-95"
                        onClick={(e) => e.stopPropagation()} 
                      >
                        <MapPin size={16} />
                        Directions
                      </a>
                    </div>

                  </div>
                )}
              </div>
            );
          })}

          <div ref={observerTarget} className="py-6 flex justify-center bg-gray-50/50">
            {loadingMore ? <Loader2 className="animate-spin text-gray-400" /> : !hasMore && <span className="text-sm font-medium text-gray-400">End of locations</span>}
          </div>
        </div>
      </aside>

      <button 
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className={`absolute top-1/2 -translate-y-1/2 z-[1000] bg-white shadow-xl border border-gray-200 p-2 rounded-r-xl transition-all duration-300 hover:bg-gray-50 ${
          isDrawerOpen ? "left-[424px]" : "left-0"
        }`}
      >
        {isDrawerOpen ? <ChevronLeft size={20} className="text-gray-600"/> : <ChevronRight size={20} className="text-gray-600"/>}
      </button>

    </div>
  );
}