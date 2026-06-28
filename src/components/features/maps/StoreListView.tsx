import { ChevronRight, Loader2, Navigation } from "lucide-react";
import { getTodayHours, formatPriceLevel } from "@/lib/utils";

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

export function StoreListView({
  stores,
  onSelect,
  hasMore,
  loadingMore,
  observerRef,
  isSearching,
  activeId,
  userLocation,
  className = "",
}: any) {
  return (
    <div className={`flex-1 overflow-y-auto flex flex-col ${className}`}>
      <div className="p-3 md:px-5 md:py-4 border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between shadow-sm">
        <h2 className="font-bodoni text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.15em] text-gray-400">
          {stores.length} {stores.length === 1 ? "Location" : "Locations"} found
        </h2>
      </div>

      <div className="divide-y divide-gray-100/80 pb-20 md:pb-0">
        {stores.map((store: any) => {
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
              className={`group relative p-4 md:p-5 min-h-[96px] md:min-h-[110px] cursor-pointer transition-all duration-200 flex justify-between items-center ${
                isSelected
                  ? "bg-blue-50/40"
                  : "bg-white hover:bg-gray-50 active:bg-gray-100"
              }`}
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 transition-transform duration-300 origin-left ${
                  isSelected ? "scale-x-100" : "scale-x-0"
                }`}
              />

              <div className="pr-3 md:pr-4 min-w-0 flex flex-col justify-center gap-1.5 flex-1">
                <h3
                  className={`font-bodoni font-bold capitalize text-[17px] md:text-[18px] leading-tight tracking-[-0.01em] transition-colors ${
                    isSelected
                      ? "text-blue-800"
                      : "text-gray-900 group-hover:text-blue-600"
                  }`}
                >
                  {store.name}
                </h3>

                <div className="flex items-center gap-2 text-[13px] md:text-[14px] text-gray-500 overflow-hidden w-full">
                  {distance !== null && (
                    <span className="flex items-center gap-1 font-bodoni font-semibold tracking-wide text-blue-700 bg-blue-100/50 px-2 py-0.5 rounded-md shrink-0">
                      <Navigation
                        size={10}
                        className="fill-blue-200 text-blue-600"
                      />
                      {distance.toFixed(1)} mi
                    </span>
                  )}

                  {priceLevel ? (
                    <span className="flex items-center gap-1 font-bodoni font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full tracking-wide shrink-0">
                      {priceLevel}
                    </span>
                  ) : (
                    <span className="truncate flex-1 text-gray-400 italic">
                      Price unavailable
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end justify-center gap-2 md:gap-2.5 shrink-0 pl-2">
                <div
                  className={`flex items-center font-bodoni gap-1.5 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.15em] px-2 py-1 rounded-full ${
                    !timeData.isOpen
                      ? "text-gray-500 bg-gray-50 border border-gray-200"
                      : timeData.isClosingSoon
                        ? "text-amber-700 bg-amber-50 border border-amber-100"
                        : "text-emerald-700 bg-emerald-50 border border-emerald-100"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      !timeData.isOpen
                        ? "bg-gray-400"
                        : timeData.isClosingSoon
                          ? "bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.5)]"
                          : "bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]"
                    }`}
                  />
                  {!timeData.isOpen
                    ? "Closed"
                    : timeData.isClosingSoon
                      ? "Closing Soon"
                      : "Open"}
                </div>
                <ChevronRight
                  size={18}
                  className={`transition-all duration-200 ${
                    isSelected
                      ? "text-blue-500 translate-x-0.5"
                      : "text-gray-300 group-hover:text-gray-400"
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
