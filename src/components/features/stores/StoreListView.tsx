"use client";

import { ChevronRight, Loader2, MapPin, SearchX } from "lucide-react";

import { getTodayHours, formatPriceLevel, getDistance } from "@/lib/utils";

import type { Location } from "@/types";
import type { UserLocation } from "@/hooks/useGeolocation";
import { StoreStatusBadge } from "./StoreStatusBadge";

interface StoreListViewProps {
  stores: Location[];
  totalCount: number;
  onSelect: (id: number) => void;
  hasMore: boolean;
  loadingMore: boolean;
  observerRef: (node: HTMLDivElement | null) => void;
  categoryFallback?: boolean;
  activeId: number | null;
  userLocation: UserLocation | null;
  className?: string;
}

export function StoreListView({
  stores,
  totalCount,
  onSelect,
  hasMore,
  loadingMore,
  observerRef,
  categoryFallback = false,
  activeId,
  userLocation,
  className = "",
}: StoreListViewProps) {
  return (
    <div
      className={`flex min-h-0 flex-1 flex-col overflow-y-auto bg-plp-parchment font-text text-plp-ink ${className}`}
    >
      <header className="sticky top-0 z-10 shrink-0 border-b border-plp-secondary bg-plp-parchment/95 px-4 py-3.5 backdrop-blur-xl md:px-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-prata text-[17px] leading-relaxed text-plp-maroon">
            Explore locations
          </h2>

          <span className="shrink-0 text-[12px] tabular-nums text-plp-clay">
            {stores.length < totalCount
              ? `${stores.length} of ${totalCount}`
              : totalCount}{" "}
            {totalCount === 1 ? "location" : "locations"}
          </span>
        </div>

        {categoryFallback && (
          <p role="status" className="mt-1 text-[11px] text-plp-clay">
            No locations match those categories yet.
          </p>
        )}

        {userLocation && (
          <p className="mt-1 text-[11px] text-plp-clay">
            Distances are approximate
          </p>
        )}
      </header>

      <div className="flex flex-1 flex-col pb-[calc(5rem_+_env(safe-area-inset-bottom))] md:pb-0">
        <div className="divide-y divide-plp-secondary/60">
          {stores.map((store, index) => {
            const timeData = getTodayHours(store.hours);
            const isSelected = store.id === activeId;
            const priceLevel = formatPriceLevel(store.price_level);

            const hasHours =
              !!timeData.string && timeData.string !== "Hours unavailable";

            const distance = userLocation
              ? getDistance(
                  userLocation.lat,
                  userLocation.lng,
                  store.latitude,
                  store.longitude,
                )
              : null;

            return (
              <button
                key={store.id}
                type="button"
                onClick={() => onSelect(store.id)}
                aria-current={isSelected ? "true" : undefined}
                className={`group relative flex w-full cursor-pointer items-center gap-3 px-4 py-4 text-left transition-colors duration-200 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-plp-maroon/50 md:px-5 ${
                  isSelected
                    ? "bg-plp-blush/50"
                    : "bg-white hover:bg-plp-parchment/50 active:bg-plp-blush/30"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 w-[3px] bg-plp-maroon transition-opacity ${
                    isSelected ? "opacity-100" : "opacity-0"
                  }`}
                />

                <span
                  className={`w-5 shrink-0 self-start pt-1 text-center font-bodoni text-[13px] font-medium tabular-nums ${
                    isSelected ? "text-plp-maroon" : "text-plp-secondary-dark"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 break-words font-bodoni text-[19px] font-bold leading-[1.2] tracking-[-0.01em] text-plp-maroon md:text-[20px]">
                    {store.name}
                  </h3>

                  {(distance !== null || priceLevel) && (
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      {distance !== null && (
                        <span className="inline-flex items-center gap-1 text-[12px] tabular-nums text-plp-clay">
                          <MapPin
                            size={12}
                            strokeWidth={1.75}
                            className="shrink-0"
                          />
                          {distance.toFixed(1)} mi
                        </span>
                      )}

                      {priceLevel && (
                        <span className="rounded-md bg-plp-parchment px-2 py-1 text-[11px] font-medium leading-tight text-plp-clay">
                          {priceLevel}
                        </span>
                      )}
                    </div>
                  )}

                  {hasHours && (
                    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <StoreStatusBadge
                        isOpen={timeData.isOpen}
                        isClosingSoon={timeData.isClosingSoon}
                        compact
                      />

                      <span
                        aria-hidden="true"
                        className="h-0.5 w-0.5 rounded-full bg-plp-secondary-dark"
                      />

                      <span className="text-[11px] leading-relaxed text-plp-clay">
                        {timeData.string}
                      </span>
                    </div>
                  )}
                </div>

                <ChevronRight
                  size={18}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className={`shrink-0 transition-all duration-200 ${
                    isSelected
                      ? "translate-x-0.5 text-plp-maroon"
                      : "text-plp-secondary-dark group-hover:translate-x-0.5 group-hover:text-plp-maroon"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {stores.length === 0 && !loadingMore && (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-plp-blush text-plp-maroon">
              <SearchX size={22} strokeWidth={1.4} />
            </div>

            <h3 className="font-prata text-[17px] text-plp-maroon">
              No locations found
            </h3>

            <p className="mt-2 max-w-[250px] text-[13px] leading-relaxed text-plp-clay">
              Try adjusting your search or filters to discover more secondhand
              stores.
            </p>
          </div>
        )}

        <div
          ref={observerRef}
          className="flex flex-col items-center justify-center px-4 py-7"
        >
          {loadingMore ? (
            <div
              role="status"
              className="flex items-center gap-2 text-[12px] text-plp-clay"
            >
              <Loader2 size={16} className="animate-spin text-plp-maroon" />
              Finding more locations...
            </div>
          ) : (
            !hasMore &&
            stores.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-plp-secondary" />

                <span className="text-[11px] text-plp-clay">
                  You&apos;ve reached the end
                </span>

                <span className="h-px w-6 bg-plp-secondary" />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
