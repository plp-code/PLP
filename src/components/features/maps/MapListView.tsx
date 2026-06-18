import { MapPin, Lock, Unlock, ArrowRight, Loader2 } from "lucide-react";
import { MapItem } from "@/types";

interface Props {
  maps: MapItem[];
  onAction: (map: MapItem) => void;
  loadingId: number | null;
}

export function MapListView({ maps, onAction, loadingId }: Props) {
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
              <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-1">
                <h3 className="text-base font-bold text-gray-900 truncate">
                  {map.title}
                </h3>
                {map.has_access ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wide shrink-0">
                    <Unlock size={10} /> Owned
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wide shrink-0">
                    <Lock size={10} /> Locked
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <span className="inline-flex items-center gap-1 font-medium text-gray-600 whitespace-nowrap">
                  <MapPin size={12} className="text-gray-400 shrink-0" />
                  {map.region || "Global"}
                </span>
                <span className="text-gray-300">•</span>
                <span className="truncate">{map.description}</span>
              </div>
            </div>

            {/* Actions (Right Aligned on Desktop, Bottom on Mobile) */}
            <div className="flex items-center gap-4 sm:gap-6 mt-4 sm:mt-0 w-full sm:w-auto shrink-0 justify-between sm:justify-end">
               {!map.has_access && (
                <div className="flex flex-col items-start sm:items-end shrink-0">
                  <span className="text-lg font-black text-gray-900 leading-none">
                    ${map.map_price}
                  </span>
                </div>
              )}
              
              <button
                onClick={() => onAction(map)}
                disabled={loadingId === map.id}
                className={`group/btn cursor-pointer flex items-center justify-center gap-2 px-5 py-2.5 sm:py-2 w-full sm:w-auto rounded-xl sm:rounded-lg text-sm font-bold transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
                  map.has_access
                    ? "bg-plp-maroon text-white hover:bg-red-800"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {loadingId === map.id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    {map.has_access ? "View Tour" : "Buy"}
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