"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  ChevronLeft,
  ChevronRight,
  List as ListIcon,
  Map as MapIcon,
} from "lucide-react";
import { getDistance } from "@/lib/utils";
import { Location, LocationPin } from "@/types";
import { useMapData } from "@/hooks/useMapData";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useStoreFilters } from "@/hooks/useStoreFilters";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { StoreListView } from "./StoreListView";
import { StoreDetailView } from "./StoreDetailView";
import { MapFilterBar } from "./MapFilterBar";
import { Spinner } from "@/components/ui/Spinner";
import type { MapComponentProps } from "./MapComponent";

type MapStore = Location | LocationPin;

export default function StoreDashboard({ mapSlug }: { mapSlug: string }) {
  const { pins, stores, loading, loadMore, hasMore, loadingMore } =
    useMapData(mapSlug);

  const { userLocation, isLocating, locate, clearLocation } = useGeolocation();

  const {
    searchTerm,
    setSearchTerm,
    activePrice,
    setActivePrice,
    isOpenNow,
    setIsOpenNow,
    filteredStores,
    mapPins,
    storeById,
  } = useStoreFilters(stores, pins, userLocation);

  const [activeId, setActiveId] = useState<number | null>(null);
  const [view, setView] = useState<"list" | "detail">("list");
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [MapComponent, setMapComponent] =
    useState<ComponentType<MapComponentProps> | null>(null);

  useEffect(() => {
    import("./MapComponent").then((mod) =>
      setMapComponent(() => mod.default as ComponentType<MapComponentProps>),
    );
  }, []);

  const lastElementRef = useInfiniteScroll(loadMore, {
    hasMore,
    loading: loadingMore,
    disabled: searchTerm.trim().length > 0,
  });

  const activeStore = useMemo<MapStore | null>(
    () => (activeId != null ? (storeById.get(activeId) ?? null) : null),
    [storeById, activeId],
  );

  const resetToList = () => {
    setView("list");
    setActiveId(null);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (view === "detail") resetToList();
  };

  const handleToggleOpenNow = () => {
    setIsOpenNow(!isOpenNow);
    setIsDrawerOpen(true);
    if (view === "detail") resetToList();
  };

  const handlePriceSelect = (value: string) => {
    setActivePrice(activePrice === value ? null : value);
    setIsDrawerOpen(true);
    if (view === "detail") resetToList();
  };

  const handleLocateToggle = () => {
    if (userLocation) clearLocation();
    else locate();
    setIsDrawerOpen(true);
    if (view === "detail") resetToList();
  };

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
        <MapFilterBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          isOpenNow={isOpenNow}
          onToggleOpenNow={handleToggleOpenNow}
          activePrice={activePrice}
          onPriceSelect={handlePriceSelect}
          hasLocation={!!userLocation}
          isLocating={isLocating}
          onLocateToggle={handleLocateToggle}
        />
      </div>

      <aside
        className={`absolute bg-white z-[1000] flex flex-col shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out overflow-hidden border-t border-gray-200/50
          inset-x-0 bottom-0 h-[65dvh] rounded-t-3xl
          ${isDrawerOpen ? "translate-y-0" : "translate-y-full"}
          md:top-36 md:bottom-6 md:left-6 md:h-auto md:w-[440px] lg:w-[500px] md:rounded-2xl md:border
          ${isDrawerOpen ? "md:translate-x-0 md:translate-y-0" : "md:-translate-x-[120%] md:translate-y-0"}
        `}
      >
        <StoreListView
          stores={filteredStores}
          totalCount={pins.length}
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
            userLocation={userLocation}
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

      <div className="md:hidden absolute bottom-[calc(1.5rem_+_env(safe-area-inset-bottom))] inset-x-0 flex justify-center z-[1010] pointer-events-none">
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
          isDrawerOpen ? "left-[464px] lg:left-[524px]" : "left-0"
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
