import { MapPin, Lock, Unlock, ArrowRight, Loader2 } from "lucide-react";
import { MapItem } from "@/types";

interface Props {
  map: MapItem;
  onAction: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function MapCardGrid({ map, onAction, isLoading, isAuthenticated }: Props) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Decorative Header Bar */}
      <div className="h-2 w-full bg-gradient-to-r from-plp-maroon to-plp-babyblue opacity-80" />

      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        {/* Status & Region */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
            <MapPin size={14} className="text-gray-400 shrink-0" />
            <span className="truncate max-w-[120px] sm:max-w-none">{map.region || "Global"}</span>
          </span>
          {map.is_purchased ? (
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-1 rounded-md uppercase tracking-wide shrink-0">
              <Unlock size={12} /> Owned
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-gray-600 bg-gray-100 px-2 sm:px-2.5 py-1 rounded-md uppercase tracking-wide shrink-0">
              <Lock size={12} /> Locked
            </span>
          )}
        </div>

        {/* Content */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mb-1.5 sm:mb-2">
          {map.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 sm:line-clamp-3 mb-5 sm:mb-8 flex-1 leading-relaxed">
          {map.description || "No description available for this directory."}
        </p>

        {/* Footer Actions */}
        <div className="mt-auto pt-4 sm:pt-5 border-t border-gray-100 flex items-center justify-between gap-4">
          {!map.is_purchased && (
            <div className="flex flex-col shrink-0">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Price
              </span>
              <span className="text-lg sm:text-xl font-black text-gray-900 leading-none mt-0.5">
                ${(map.price / 100).toFixed(2)}
              </span>
            </div>
          )}
          
          <button
            onClick={onAction}
            disabled={isLoading}
            className={`group/btn cursor-pointer flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
              map.is_purchased
                ? "bg-plp-maroon text-white hover:bg-red-800 hover:shadow-lg w-full"
                : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg flex-1 sm:flex-none sm:ml-auto"
            }`}
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                {map.is_purchased
                  ? "View Tour"
                  : isAuthenticated
                    ? "Buy Now"
                    : "Log In to Buy"}
                <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1 sm:w-4 sm:h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}