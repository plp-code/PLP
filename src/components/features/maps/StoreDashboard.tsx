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
  ChevronDown,
  Clock,
} from "lucide-react";
import { getTodayHours } from "@/lib/utils";
import { StoreListView } from "./StoreListView";
import { StoreDetailView } from "./StoreDetailView";
import { Spinner } from "@/components/ui/Spinner";

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function StoreDashboard({ mapSlug }: { mapSlug: string }) {
  const { pins, stores, loading, loadMore, hasMore, loadingMore } =
    useMapData(mapSlug);

  const [activePrice, setActivePrice] = useState<string | null>(null);
  const [isOpenNow, setIsOpenNow] = useState(false);
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
    let result = stores;

    const cleanSearch = searchTerm.trim().toLowerCase();
    if (cleanSearch) {
      result = result.filter((s) => {
        const name = (s.name || "").toLowerCase();
        const description = (s.description || "").toLowerCase();
        return name.includes(cleanSearch) || description.includes(cleanSearch);
      });
    }

    if (activePrice) {
      result = result.filter((s) => s.price_level === Number(activePrice));
    }

    if (isOpenNow) {
      result = result.filter((s) => getTodayHours(s.hours).isOpen);
    }

    if (userLocation) {
      result = [...result].sort((a, b) => {
        const distA = getDistance(
          userLocation.lat,
          userLocation.lng,
          a.latitude,
          a.longitude,
        );
        const distB = getDistance(
          userLocation.lat,
          userLocation.lng,
          b.latitude,
          b.longitude,
        );
        return distA - distB;
      });
    }

    return result;
  }, [stores, searchTerm, activePrice, isOpenNow, userLocation]);

  const mapPins = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return pins;
    return pins.filter((p) => (p.name || "").toLowerCase().includes(q));
  }, [pins, searchTerm]);

  const storeById = useMemo(() => {
    const byId = new Map<number, any>();
    pins.forEach((p) => byId.set(p.id, p));
    stores.forEach((s) => byId.set(s.id, s));
    return byId;
  }, [pins, stores]);

  const activeStore = useMemo(
    () => (activeId != null ? (storeById.get(activeId) ?? null) : null),
    [storeById, activeId],
  );

  if (loading) {
    return <Spinner text="Loading Stores" />;
  }

  return (
    <div className="relative h-full w-full bg-gray-100 font-sans tracking-tight overflow-hidden">
      <div className="absolute inset-0 z-0">
        {MapComponent && (
          <MapComponent
            stores={mapPins}
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

      <div className="absolute top-0 inset-x-0 p-4 md:p-6 z-[1000] flex flex-col gap-3 pointer-events-none">
        <div className="w-full max-w-md mx-auto pointer-events-auto bg-white/95 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200/50 p-2 flex items-center gap-3 transition-shadow focus-within:shadow-[0_4px_25px_rgba(0,0,0,0.12)]">
          <div className="bg-gray-100 p-2 rounded-full">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 text-sm text-gray-900 placeholder-gray-400 font-medium"
          />
        </div>

        <div className="w-full max-w-md mx-auto pointer-events-auto flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setIsOpenNow(!isOpenNow)}
            className={`flex items-center gap-1.5 px-4 py-2 md:py-1.5 rounded-full text-xs font-bold border whitespace-nowrap transition-all shadow-sm active:scale-95 ${
              isOpenNow
                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                : "bg-white/95 backdrop-blur-md text-gray-600 border-gray-200/50 hover:bg-gray-50"
            }`}
          >
            <Clock size={12} className={isOpenNow ? "text-emerald-600" : ""} />
            Open Now
          </button>

          <div className="relative flex items-center shadow-sm rounded-full">
            <select
              value={activePrice || ""}
              onChange={(e) => setActivePrice(e.target.value || null)}
              className={`appearance-none pl-4 pr-8 py-2 md:py-1.5 rounded-full text-xs font-bold border transition-all outline-none cursor-pointer ${
                activePrice
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white/95 backdrop-blur-md text-gray-600 border-gray-200/50 hover:bg-gray-50"
              }`}
            >
              <option value="">Price: All</option>
              <option value="1">$ (Cheap)</option>
              <option value="2">$$ (Moderate)</option>
              <option value="3">$$$ (Expensive)</option>
            </select>
            <ChevronDown
              size={12}
              className={`absolute right-3 pointer-events-none ${activePrice ? "text-white" : "text-gray-500"}`}
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleLocateMe}
        disabled={isLocating}
        className={`absolute right-4 md:right-6 z-[1000] pointer-events-auto bg-white/95 backdrop-blur-md p-3.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-200/50 text-gray-700 hover:text-blue-600 transition-all duration-300 active:scale-95 disabled:opacity-70 flex items-center justify-center
          ${isDrawerOpen ? "bottom-[calc(65vh+1.5rem)]" : "bottom-24"}
          md:top-auto md:bottom-6
        `}
        title="Find My Location"
      >
        {isLocating ? (
          <Loader2 size={22} className="animate-spin" />
        ) : (
          <Navigation
            size={22}
            className={userLocation ? "text-blue-600 fill-blue-100" : ""}
          />
        )}
      </button>

      <aside
        className={`absolute bg-white z-[1000] flex flex-col shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out overflow-hidden border-t border-gray-200/50
          inset-x-0 bottom-0 h-[65vh] rounded-t-3xl
          ${isDrawerOpen ? "translate-y-0" : "translate-y-full"}
          md:top-24 md:bottom-6 md:left-6 md:h-auto md:w-[400px] md:rounded-2xl md:border
          ${isDrawerOpen ? "md:translate-x-0 md:translate-y-0" : "md:-translate-x-[120%] md:translate-y-0"}
        `}
      >
       

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
          userLocation={userLocation}
          className={view === "detail" ? "hidden" : "flex"}
        />

        {view === "detail" && activeStore && (
          <StoreDetailView
            store={activeStore}
            onBack={() => setView("list")}
            distance={
              userLocation
                ? getDistance(
                    userLocation.lat,
                    userLocation.lng,
                    activeStore.latitude,
                    activeStore.longitude,
                  )
                : null
            }
          />
        )}
      </aside>

      <div className="md:hidden absolute bottom-6 inset-x-0 flex justify-center z-[1010] pointer-events-none">
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="pointer-events-auto bg-gray-900/95 backdrop-blur-md text-white px-6 py-3.5 rounded-full font-bold shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex items-center gap-2.5 text-sm active:scale-95 transition-all"
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
      </div>

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
