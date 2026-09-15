import { ChevronRight, Loader2, Navigation, Clock } from "lucide-react";
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
  isSearching: boolean;
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
  isSearching,
  activeId,
  userLocation,
  className = "",
}: StoreListViewProps) {
  return (
    <div className={`flex-1 overflow-y-auto flex flex-col ${className}`}>
      <div className="p-3 md:px-5 md:py-4 border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between shadow-sm">
        <h2 className="font-bodoni text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.15em] text-gray-400">
          {stores.length} of {totalCount}{" "}
          {totalCount === 1 ? "Location" : "Locations"}
        </h2>
      </div>

      <div className="divide-y divide-gray-100/80 pb-[calc(5rem_+_env(safe-area-inset-bottom))] md:pb-0">
        {stores.map((store, index) => {
          const timeData = getTodayHours(store.hours);
          const isSelected = store.id === activeId;
          const priceLevel = formatPriceLevel(store.price_level);

          const distance = userLocation
            ? getDistance(
                userLocation.lat,
                userLocation.lng,
                store.latitude,
                store.longitude,
              )
            : null;

          return (
            <div
              key={store.id}
              onClick={() => onSelect(store.id)}
              className={`group relative flex min-h-[100px] cursor-pointer items-center px-4 py-4 transition-colors duration-200 md:min-h-[108px] md:px-5 ${
                isSelected
                  ? "bg-blue-50/50"
                  : "bg-white hover:bg-gray-50 active:bg-gray-100"
              }`}
            >
              {/* Selected indicator */}
              <div
                className={`absolute bottom-0 left-0 top-0 w-1 origin-left bg-blue-600 transition-transform duration-200 ${
                  isSelected ? "scale-x-100" : "scale-x-0"
                }`}
              />

              {/* Number */}
              <span
                className={`mr-3 w-5 shrink-0 text-center font-bodoni text-[12px] font-semibold tabular-nums transition-colors md:mr-4 md:text-[13px] ${
                  isSelected
                    ? "text-blue-600"
                    : "text-gray-300 group-hover:text-gray-500"
                }`}
              >
                {index + 1}
              </span>

              {/* Main content */}
              <div className="min-w-0 flex-1">
                <h3
                  className={`line-clamp-2 font-bodoni text-[17px] font-bold capitalize leading-[1.2] tracking-[-0.01em] transition-colors md:text-[18px] ${
                    isSelected
                      ? "text-blue-800"
                      : "text-gray-900 group-hover:text-blue-700"
                  }`}
                >
                  {store.name}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
                  {distance !== null && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 font-prata text-[11px] font-medium text-blue-700">
                      <Navigation
                        size={10}
                        strokeWidth={2}
                        className="text-blue-500"
                      />
                      {distance.toFixed(1)} mi
                    </span>
                  )}

                  {priceLevel && (
                    <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 font-prata text-[11px] font-semibold text-emerald-700">
                      {priceLevel}
                    </span>
                  )}

                  {timeData.string && (
                    <span className="inline-flex items-center gap-1 font-prata text-[11px] text-gray-400">
                      <Clock size={11} strokeWidth={1.8} />
                      {timeData.string}
                    </span>
                  )}
                </div>
              </div>

              {/* Right side */}
              <div className="ml-3 flex shrink-0 flex-col items-end gap-2">
                <StoreStatusBadge
                  isOpen={timeData.isOpen}
                  isClosingSoon={timeData.isClosingSoon}
                  compact
                />

                <ChevronRight
                  size={17}
                  strokeWidth={1.8}
                  className={`transition-all duration-200 ${
                    isSelected
                      ? "translate-x-0.5 text-blue-500"
                      : "text-gray-300 group-hover:translate-x-0.5 group-hover:text-gray-500"
                  }`}
                />
              </div>
            </div>
          );
        })}

        {!isSearching && (
          <div
            ref={observerRef}
            className="py-10 flex flex-col items-center justify-center gap-2"
          >
            {loadingMore ? (
              <Loader2 className="animate-spin text-blue-500 w-6 h-6" />
            ) : (
              !hasMore && (
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-8 h-px bg-gray-200" />
                  <span className="font-bodoni text-[12px] font-semibold uppercase tracking-[0.2em]">
                    End of results
                  </span>
                  <div className="w-8 h-px bg-gray-200" />
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
