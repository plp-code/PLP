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
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-100">
        {maps.map((map) => (
          <div 
            key={map.id} 
            className="group flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-5 hover:bg-gray-50/50 transition-colors"
          >
            {/* Main Info */}
            <div className="flex-1 min-w-0 w-full sm:w-auto sm:pr-6">
              
              {/* Title & Badge */}
              <div className="flex items-start sm:items-center justify-between sm:justify-start gap-3 mb-2 sm:mb-1">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight pr-2 sm:pr-0">
                  {map.title}
                </h3>
                {map.has_access ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 sm:py-0.5 rounded-md sm:rounded uppercase tracking-wide shrink-0">
                    <Unlock size={10} /> Owned
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 sm:py-0.5 rounded-md sm:rounded uppercase tracking-wide shrink-0">
                    <Lock size={10} /> Locked
                  </span>
                )}
              </div>
              
              {/* Location & Description (Stacked on mobile, inline on desktop) */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                <span className="inline-flex items-center gap-1 font-medium text-gray-600 whitespace-nowrap">
                  <MapPin size={12} className="text-gray-400 shrink-0" />
                  {map.region || "Global"}
                </span>
                <span className="hidden sm:inline text-gray-300">•</span>
                <span className="line-clamp-2 sm:line-clamp-1 leading-relaxed sm:leading-normal">
                  {map.description}
                </span>
              </div>
            </div>

            {/* Actions (Bottom Bar on Mobile, Right Aligned on Desktop) */}
            <div className="flex items-center gap-4 sm:gap-6 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-gray-100 sm:border-0 w-full sm:w-auto shrink-0 justify-between sm:justify-end">
               {!map.has_access && (
                <div className="flex flex-col items-start sm:items-end shrink-0">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block sm:hidden mb-0.5">
                    Price
                  </span>
                  <span className="text-xl sm:text-lg font-black text-gray-900 leading-none">
                    ${map.map_price}
                  </span>
                </div>
              )}
              
              <button
                onClick={() => onAction(map)}
                disabled={loadingId === map.id}
                className={`group/btn cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 sm:py-2 rounded-xl sm:rounded-lg text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed ${
                  map.has_access
                    ? "bg-plp-maroon text-white hover:bg-red-800"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {loadingId === map.id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    {map.has_access
                      ? "View Tour"
                      : isAuthenticated
                        ? "Buy Now"
                        : "Log In to Buy"}
                    <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}