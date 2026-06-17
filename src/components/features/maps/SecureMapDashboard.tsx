"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useMapData } from "@/hooks/useMapData";

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

const isCurrentlyOpen = (hours?: Record<string, string>): boolean => {
  if (!hours) return false;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = days[new Date().getDay()];
  const schedule = hours[today];
  if (!schedule || schedule === "Closed") return false;

  const [open, close] = schedule.split("-").map(Number);
  const now = new Date().getHours();
  return now >= open && now < close;
};

export default function SecureMapDashboard({ mapSlug }: { mapSlug: string }) {
  const { stores, loading }: { stores: Store[]; loading: boolean } = useMapData(mapSlug);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [MapComponent, setMapComponent] = useState<any>(null);

  useEffect(() => {
    import("./MapComponent").then((mod) => setMapComponent(() => mod.default));
  }, []);

  const filteredStores = useMemo(() => 
    stores.filter((s) => 
      s.store_name.toLowerCase().includes(searchTerm.toLowerCase())
    ), 
  [stores, searchTerm]);

  const activeStore = useMemo(() => 
    filteredStores.find((s) => s.id === activeId) || null, 
  [filteredStores, activeId]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex flex-col h-[750px] w-full border border-gray-200 rounded-3xl overflow-hidden bg-white shadow-2xl">
      <header className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Explore Shops</h2>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{filteredStores.length} locations found</p>
        </div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </header>

      <main className="flex flex-1 overflow-hidden">
        <aside className="w-[380px] overflow-y-auto p-4 space-y-3 bg-gray-50/50">
          {filteredStores.map((store) => (
            <div key={store.id} onClick={() => setActiveId(store.id)}
              className={`group p-5 rounded-2xl cursor-pointer border transition-all ${
                activeId === store.id ? "bg-white shadow-lg border-blue-200" : "bg-white border-transparent hover:shadow-md"
              }`}>
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900">{store.store_name}</h3>
                <div className="text-[10px] font-bold px-2 py-1 rounded-lg bg-gray-100 text-gray-600">
                  {store.price_range}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{store.address}</p>
              
              {activeId === store.id && (
                <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-1">
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{store.notes}</p>
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-blue-600">
                    <span>{isCurrentlyOpen(store.hours) ? "● Open Now" : "○ Closed"}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </aside>

        <section className="flex-1 relative">
          {MapComponent ? (
            <MapComponent 
              stores={filteredStores} 
              activeId={activeId} 
              setActiveId={setActiveId} 
              activeStore={activeStore} 
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50 text-gray-400">Map loading...</div>
          )}
        </section>
      </main>
    </div>
  );
}