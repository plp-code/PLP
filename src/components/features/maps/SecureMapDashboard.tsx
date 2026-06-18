"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useMapData } from "@/hooks/useMapData";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Loader2,
  Navigation,
  List as ListIcon,
  Map as MapIcon,
} from "lucide-react";

import { StoreListView } from "./StoreListView";
import { StoreDetailView } from "./StoreDetailView";

export default function SecureMapDashboard({ mapSlug }: { mapSlug: string }) {
  const { stores, loading, loadMore, hasMore, loadingMore } =
    useMapData(mapSlug);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [view, setView] = useState<"list" | "detail">("list");

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [MapComponent, setMapComponent] = useState<any>(null);

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    import("./MapComponent").then((mod) => setMapComponent(() => mod.default));
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator && !userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        (error) => console.log("Auto-location failed:", error.message),
      );
    }
  }, [userLocation]);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !searchTerm) {
            loadMore();
          }
        },
        { threshold: 1.0 },
      );

      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore, searchTerm, loadMore],
  );

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
          setView("list");
        },
        () => {
          alert(
            "Could not get your location. Please check browser permissions.",
          );
          setIsLocating(false);
        },
        { enableHighAccuracy: true },
      );
    }
  };

  const filteredStores = useMemo(() => {
    const cleanSearch = searchTerm.trim().toLowerCase();
    if (!cleanSearch) return stores;
    return stores.filter((s) => {
      const name = (s.store_name || "").toLowerCase();
      const address = (s.address || "").toLowerCase();
      return name.includes(cleanSearch) || address.includes(cleanSearch);
    });
  }, [stores, searchTerm]);

  const activeStore = useMemo(
    () => filteredStores.find((s) => s.id === activeId) || null,
    [filteredStores, activeId],
  );

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center font-medium text-gray-500">
        Loading Map...
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-gray-100 font-sans tracking-tight overflow-hidden">
      <div className="absolute inset-0 z-0">
        {MapComponent && (
          <MapComponent
            stores={filteredStores}
            activeId={activeId}
            setActiveId={(id: number) => {
              setActiveId(id);
              setView("detail");
              setIsDrawerOpen(true);
            }}
            activeStore={activeStore}
            userLocation={userLocation}
          />
        )}
      </div>

      <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 z-[1000] w-[92%] md:w-[90%] max-w-md bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 p-2 flex items-center gap-3">
        <div className="bg-gray-100 p-2 rounded-full">
          <Search size={18} className="text-gray-500" />
        </div>
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
        className="absolute top-20 right-4 md:top-auto md:bottom-6 md:right-6 z-[1000] bg-white p-3 rounded-full shadow-xl border border-gray-200 text-gray-700 hover:text-blue-600 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center"
        title="Find My Location"
      >
        {isLocating ? (
          <Loader2 size={24} className="animate-spin" />
        ) : (
          <Navigation
            size={24}
            className={userLocation ? "text-blue-600 fill-blue-100" : ""}
          />
        )}
      </button>

<aside
        className={`absolute bg-white z-[1000] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out overflow-hidden border border-gray-200/50
          inset-x-0 bottom-0 h-[65vh] rounded-t-3xl
          ${isDrawerOpen ? "translate-y-0" : "translate-y-full"}
          md:top-24 md:bottom-6 md:left-6 md:h-auto md:w-[400px] md:rounded-2xl
          ${isDrawerOpen ? "md:translate-x-0 md:translate-y-0" : "md:-translate-x-[120%] md:translate-y-0"}
        `}
      >
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </div>

        <StoreListView
          stores={filteredStores}
          activeId={activeId}
          onSelect={(id: number) => {
            setActiveId(id);
            setView("detail");
          }}
          hasMore={hasMore}
          loadingMore={loadingMore}
          observerRef={lastElementRef}
          isSearching={searchTerm.trim().length > 0}
          className={view === "detail" ? "hidden" : "flex"}
        />

        {view === "detail" && activeStore && (
          <StoreDetailView store={activeStore} onBack={() => setView("list")} />
        )}
      </aside>

      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-[1010] bg-gray-900 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 text-sm active:scale-95 transition-all"
      >
        {isDrawerOpen ? (
          <>
            <MapIcon size={16} /> Show Map
          </>
        ) : (
          <>
            <ListIcon size={16} /> Show List
          </>
        )}
      </button>

      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className={`hidden md:flex absolute top-1/2 -translate-y-1/2 z-[1000] bg-white shadow-xl border border-gray-200 p-2 rounded-r-xl transition-all duration-300 hover:bg-gray-50 ${
          isDrawerOpen ? "left-[424px]" : "left-0"
        }`}
      >
        {isDrawerOpen ? (
          <ChevronLeft size={20} className="text-gray-600" />
        ) : (
          <ChevronRight size={20} className="text-gray-600" />
        )}
      </button>
    </div>
  );
}
