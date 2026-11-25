"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";

import { ChevronLeft, List as ListIcon, Map as MapIcon } from "lucide-react";

import { getDistance } from "@/lib/utils";
import { getMapType } from "@/lib/mapTypes";
import type { Location, LocationPin } from "@/types";

import { useMapData } from "@/hooks/useMapData";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useStoreFilters } from "@/hooks/useStoreFilters";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useGetClothingCategories } from "@/hooks/useClothingCategory";

import { StoreListView } from "./StoreListView";
import { StoreDetailView } from "./StoreDetailView";
import { MapFilterBar } from "@/components/features/maps/MapFilterBar";
import { Spinner } from "@/components/ui/Spinner";

import type { MapComponentProps } from "@/components/features/maps/MapComponent";

type MapStore = Location | LocationPin;

export default function StoreDashboard({ mapSlug }: { mapSlug: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const debouncedSearch = useDebouncedValue(searchTerm, 250);

  const {
    pins: mapPins,
    stores,
    categoryFallback,
    loading,
    listLoading,
    loadMore,
    hasMore,
    loadingMore,
  } = useMapData(mapSlug, {
    search: debouncedSearch,
    categories: activeCategories,
  });

  const mapTitle = mapSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const { userLocation, isLocating, locate, clearLocation } = useGeolocation();

  const {
    activePrice,
    setActivePrice,
    isOpenNow,
    setIsOpenNow,
    filteredStores,
    storeById,
  } = useStoreFilters(stores, mapPins, userLocation);

  const { data: categories = [], isLoading } = useGetClothingCategories();

  const mapType = useMemo(() => getMapType(mapSlug), [mapSlug]);

  const [activeId, setActiveId] = useState<number | null>(null);
  const [view, setView] = useState<"list" | "detail">("list");
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const [MapComponent, setMapComponent] =
    useState<ComponentType<MapComponentProps> | null>(null);

  useEffect(() => {
    let cancelled = false;

    import("@/components/features/maps/MapComponent").then((mod) => {
      if (!cancelled) {
        setMapComponent(() => mod.default as ComponentType<MapComponentProps>);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const activeStore = useMemo<MapStore | null>(
    () => (activeId !== null ? (storeById.get(activeId) ?? null) : null),
    [storeById, activeId],
  );

  const showDetail = view === "detail" && activeStore !== null;

  const lastElementRef = useInfiniteScroll(loadMore, {
    hasMore,
    loading: loadingMore,
    disabled: !isDrawerOpen || showDetail,
  });

  const activeDistance = useMemo(() => {
    if (!userLocation || !activeStore) return null;

    return getDistance(
      userLocation.lat,
      userLocation.lng,
      activeStore.latitude,
      activeStore.longitude,
    );
  }, [userLocation, activeStore]);

  const resetToList = () => {
    setView("list");
    setActiveId(null);
  };

  const openList = () => {
    setIsDrawerOpen(true);
    resetToList();
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleStoreSelect = (id: number) => {
    setActiveId(id);
    setView("detail");
    setIsDrawerOpen(true);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    openList();
  };

  const handleToggleOpenNow = () => {
    setIsOpenNow(!isOpenNow);
    openList();
  };

  const handlePriceSelect = (value: string) => {
    setActivePrice(!value || activePrice === value ? null : value);

    openList();
  };

  const handleCategoriesApply = (next: string[]) => {
    setActiveCategories(next);
    openList();
  };

  const handleLocateToggle = () => {
    if (userLocation) {
      clearLocation();
    } else {
      locate();
    }

    openList();
  };

  if (loading || isLoading) {
    return <Spinner text="Loading Stores" />;
  }

  return (
    <div
      className="
        relative h-full min-h-0 w-full overflow-hidden
        bg-plp-parchment font-text text-plp-ink

        [--drawer-width:440px]
        [--drawer-offset:0px]

        md:[--drawer-offset:1rem]

        lg:[--drawer-width:500px]
        lg:[--drawer-offset:1.5rem]
      "
    >
      <h1 className="sr-only">{mapTitle} thrift map</h1>

      <div className="absolute inset-0 z-0">
        {MapComponent && (
          <MapComponent
            stores={mapPins}
            activeId={activeId}
            mapType={mapType}
            setActiveId={handleStoreSelect}
            activeStore={activeStore}
            userLocation={userLocation}
          />
        )}
      </div>

      <div
        className="
          pointer-events-none absolute inset-0 z-[1000]
          flex min-h-0 flex-col gap-2

          md:inset-y-4
          md:left-[var(--drawer-offset)]
          md:right-auto
          md:w-[var(--drawer-width)]
          md:gap-3

          lg:inset-y-6
        "
      >
        <div
          className="
            pointer-events-auto relative z-30 shrink-0
            px-3 pt-3
            md:px-0 md:pt-0
          "
        >
          <MapFilterBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            isOpenNow={isOpenNow}
            onToggleOpenNow={handleToggleOpenNow}
            activePrice={activePrice}
            onPriceSelect={handlePriceSelect}
            activeCategories={activeCategories}
            onCategoriesApply={handleCategoriesApply}
            hasLocation={!!userLocation}
            isLocating={isLocating}
            onLocateToggle={handleLocateToggle}
            categories={categories}
          />
        </div>

        <div
          className="
            relative flex min-h-0 flex-1
            flex-col justify-end
          "
        >
          <div
            className={`
              pointer-events-none relative
              flex h-[58dvh] max-h-full min-h-0
              w-full flex-col

              transition-transform duration-300
              ease-[cubic-bezier(0.22,1,0.36,1)]
              motion-reduce:transition-none

              md:h-full md:flex-1

              ${
                isDrawerOpen
                  ? "transform-[translate(0,0)]"
                  : `
                    transform-[translateY(100%)]
                    md:transform-[translateX(calc(-100%_-_var(--drawer-offset)))]
                  `
              }
            `}
          >
            <aside
              id="store-drawer"
              aria-hidden={!isDrawerOpen}
              inert={!isDrawerOpen}
              className={`
                relative flex min-h-0 w-full flex-1
                flex-col overflow-hidden

                rounded-t-2xl
                border border-plp-secondary
                bg-plp-parchment

                shadow-[0_8px_30px_rgba(61,11,25,0.12)]

                md:rounded-xl

                ${isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"}
              `}
            >
              <div
                aria-hidden="true"
                className="
                  flex shrink-0 justify-center
                  bg-plp-parchment pb-1 pt-2
                  md:hidden
                "
              >
                <div
                  className="
                    h-1 w-9 rounded-full
                    bg-plp-secondary-dark/60
                  "
                />
              </div>

              <div
                className={`
                  min-h-0 flex-1 flex-col
                  ${showDetail ? "hidden" : "flex"}
                `}
              >
                <StoreListView
                  stores={filteredStores}
                  totalCount={mapPins.length}
                  activeId={activeId}
                  onSelect={handleStoreSelect}
                  hasMore={hasMore}
                  loadingMore={loadingMore || listLoading}
                  observerRef={lastElementRef}
                  categoryFallback={categoryFallback}
                  userLocation={userLocation}
                  className="min-h-0"
                />
              </div>

              {showDetail && activeStore && (
                <StoreDetailView
                  store={activeStore}
                  onBack={() => setView("list")}
                  userLocation={userLocation}
                  distance={activeDistance}
                />
              )}
            </aside>

            <button
              type="button"
              onClick={toggleDrawer}
              aria-label={
                isDrawerOpen ? "Hide store drawer" : "Show store drawer"
              }
              aria-expanded={isDrawerOpen}
              aria-controls="store-drawer"
              title={isDrawerOpen ? "Hide store drawer" : "Show store drawer"}
              className="
                pointer-events-auto absolute
                left-full top-1/2 z-20

                hidden h-12 w-7 -translate-y-1/2
                cursor-pointer items-center justify-center

                rounded-r-lg border border-l-0
                border-plp-secondary

                bg-plp-parchment text-plp-maroon
                shadow-[3px_0_8px_rgba(61,11,25,0.08)]

                transition-colors duration-150
                hover:bg-plp-secondary-light
                active:bg-plp-secondary

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-inset
                focus-visible:ring-plp-maroon/40

                md:flex
              "
            >
              <ChevronLeft
                size={17}
                strokeWidth={1.8}
                className={`
                  transition-transform duration-300
                  motion-reduce:transition-none

                  ${
                    isDrawerOpen
                      ? "transform-[rotate(0deg)]"
                      : "transform-[rotate(180deg)]"
                  }
                `}
              />
            </button>
          </div>
        </div>
      </div>

      <div
        className="
          pointer-events-none absolute inset-x-0
          bottom-[calc(0.75rem_+_env(safe-area-inset-bottom))]
          z-[1010] flex justify-center
          md:hidden
        "
      >
        <button
          type="button"
          onClick={toggleDrawer}
          aria-expanded={isDrawerOpen}
          aria-controls="store-drawer"
          className="
            plp-btn-primary pointer-events-auto

            flex h-11 cursor-pointer
            items-center justify-center gap-2

            rounded-full px-5
            font-text text-[13px] font-medium

            shadow-[0_4px_16px_rgba(61,11,25,0.2)]

            transition-all duration-200
            active:scale-95

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-plp-maroon/40

            motion-reduce:transition-none
          "
        >
          {isDrawerOpen ? (
            <>
              <MapIcon size={16} strokeWidth={1.8} />
              <span>Show map</span>
            </>
          ) : (
            <>
              <ListIcon size={16} strokeWidth={1.8} />
              <span>Show list</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
