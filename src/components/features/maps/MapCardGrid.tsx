import { MapPin, Lock, Unlock, ArrowRight, Loader2 } from "lucide-react";
import { MapItem } from "@/types";
import { useState } from "react";

interface Props {
  map: MapItem;
  onAction: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function MapCardGrid({
  map,
  onAction,
  isLoading,
  isAuthenticated,
}: Props) {
  const owned = map.is_purchased;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-xl">
      <div className="h-1.5 w-full bg-gradient-to-r from-plp-maroon to-plp-babyblue opacity-80" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="inline-flex min-w-0 items-center gap-1.5 text-xs font-medium text-gray-500">
            <MapPin size={14} className="shrink-0 text-gray-400" />
            <span className="truncate">{map.region || "Global"}</span>
          </span>
          {owned ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
              <Unlock size={12} /> Owned
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-500">
              <Lock size={12} /> Locked
            </span>
          )}
        </div>

        <h3 className="mb-2 text-lg font-bold leading-tight text-gray-900 sm:text-xl">
          {map.name}
        </h3>

        <div className="mb-6 flex-1">
          <p className="text-sm leading-relaxed text-gray-600">
            {map.description || "No description available for this directory."}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-gray-100 pt-4 sm:pt-5">
          {!owned && (
            <div className="flex flex-col shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Price
              </span>
              <span className="mt-0.5 text-xl font-black leading-none text-gray-900">
                ${(map.price / 100).toFixed(2)}
              </span>
            </div>
          )}

          <button
            onClick={onAction}
            disabled={isLoading}
            className={`group/btn font-prata flex cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 ${
              owned
                ? "w-full bg-plp-maroon text-white hover:bg-red-800 hover:shadow-lg"
                : "flex-1 bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg sm:flex-none"
            }`}
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                {owned
                  ? "View Map"
                  : isAuthenticated
                    ? "Buy Now"
                    : "Log In to Buy"}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover/btn:translate-x-0.5"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
