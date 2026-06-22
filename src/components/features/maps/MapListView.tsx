import { MapPin, Lock, Unlock, ArrowRight, Loader2 } from "lucide-react";
import { MapItem } from "@/types";

interface Props {
  maps: MapItem[];
  onAction: (map: MapItem) => void;
  loadingId: number | null;
  isAuthenticated: boolean;
}

export function MapListView({ maps, onAction, loadingId, isAuthenticated }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="divide-y divide-gray-100">
        {maps.map((map) => {
          const owned = map.is_purchased;

          return (
            <div
              key={map.id}
              className="group flex items-center gap-3 p-3 transition-colors hover:bg-gray-50/60 sm:gap-4 sm:p-4"
            >
              {/* Leading map tile — always visible, scales up on desktop */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gradient-to-br from-slate-50 to-blue-50/60 sm:h-14 sm:w-14">
                <MapPin className="h-4 w-4 text-plp-maroon sm:h-5 sm:w-5" />
              </div>

              {/* Main info */}
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-center gap-2 sm:mb-1">
                  <h3 className="truncate text-sm font-bold leading-tight text-gray-900 sm:text-lg">
                    {map.name}
                  </h3>
                  {owned ? (
                    <span className="hidden shrink-0 items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 sm:inline-flex">
                      <Unlock size={10} /> Owned
                    </span>
                  ) : (
                    <span className="hidden shrink-0 items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-500 sm:inline-flex">
                      <Lock size={10} /> Locked
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 sm:gap-2 sm:text-sm">
                  <span className="inline-flex shrink-0 items-center gap-1 font-medium text-gray-600">
                    <MapPin size={12} className="shrink-0 text-gray-400" />
                    {map.region || "Global"}
                  </span>
                  {map.description && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="truncate">{map.description}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Price + action */}
              <div className="flex shrink-0 items-center gap-2.5 sm:gap-5">
                {!owned && (
                  <span className="text-sm font-black leading-none text-gray-900 sm:text-lg">
                    ${(map.price / 100).toFixed(2)}
                  </span>
                )}

                <button
                  onClick={() => onAction(map)}
                  disabled={loadingId === map.id}
                  aria-label={
                    owned ? "View tour" : isAuthenticated ? "Buy now" : "Log in to buy"
                  }
                  className={`group/btn flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:gap-2 sm:px-5 sm:text-sm ${
                    owned
                      ? "bg-plp-maroon text-white hover:bg-red-800"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {loadingId === map.id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      {/* Short label on mobile, full label on desktop */}
                      <span className="sm:hidden">
                        {owned ? "View" : isAuthenticated ? "Buy" : "Log In"}
                      </span>
                      <span className="hidden sm:inline">
                        {owned ? "View Tour" : isAuthenticated ? "Buy Now" : "Log In to Buy"}
                      </span>
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover/btn:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
