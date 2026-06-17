"use client";

import { useState } from "react";
import {
  LayoutGrid,
  List,
  MapPin,
  Lock,
  Unlock,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useMapDirectory } from "@/hooks/useMapDirectory";
import { useMapCheckout, MapItem } from "@/hooks/useMapCheckout";

export default function MapDirectory() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { maps, loading, error } = useMapDirectory();

  const { handleMapAction, checkoutLoadingId } = useMapCheckout();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-10 h-10 border-4 border-gray-100 border-t-plp-maroon rounded-full animate-spin" />
        <p className="text-sm font-medium text-gray-500 animate-pulse">
          Loading directories...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center">
          <h3 className="text-red-800 font-semibold mb-2">
            Failed to load maps
          </h3>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 mb-8 border-b border-gray-100 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Map Directories
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Explore {maps.length} available locations.
          </p>
        </div>

        <div className="flex items-center bg-gray-100/80 p-1 rounded-lg border border-gray-200/50">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-all duration-200 cursor-pointer ${
              viewMode === "grid"
                ? "bg-white text-plp-maroon shadow-sm ring-1 ring-black/5"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
            title="Grid View"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition-all duration-200 cursor-pointer ${
              viewMode === "list"
                ? "bg-white text-plp-maroon shadow-sm ring-1 ring-black/5"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {maps.map((map: MapItem) => (
            <div
              key={map.id}
              className="group relative bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-plp-maroon to-plp-babyblue opacity-80" />

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 text-xs font-medium text-gray-600 border border-gray-100">
                    <MapPin size={12} className="text-gray-400" />
                    {map.region || "Global"}
                  </span>
                  {map.has_access ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <Unlock size={12} />
                      Owned
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                      <Lock size={12} />
                      Locked
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 leading-tight mb-2">
                  {map.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3 mb-6 flex-1 leading-relaxed">
                  {map.description ||
                    "No description available for this directory."}
                </p>

                <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                  {!map.has_access && (
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                        Price
                      </span>
                      <span className="text-lg font-bold text-gray-900 leading-none mt-0.5">
                        ${map.map_price}
                      </span>
                    </div>
                  )}
                  {/* Grid View Button */}
                  <button
                    onClick={() => handleMapAction(map)}
                    disabled={checkoutLoadingId === map.id}
                    className={`group/btn cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
                      map.has_access
                        ? "bg-plp-babyblue text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-plp-babyblue/30 w-full justify-center"
                        : "bg-gray-900 text-white hover:bg-gray-700 hover:shadow-lg ml-auto"
                    }`}
                  >
                    {checkoutLoadingId === map.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        {map.has_access ? "View Tour" : "Buy Now"}
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover/btn:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {maps.map((map: MapItem) => (
            <div
              key={map.id}
              className="group relative bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-gray-300/80 transition-all duration-300 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-plp-maroon to-plp-babyblue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex-1 min-w-0 sm:pl-2">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 truncate">
                    {map.title}
                  </h3>
                  {map.has_access ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                      <Unlock size={10} /> Owned
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
                      <Lock size={10} /> Locked
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                  <span className="inline-flex items-center gap-1.5 font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                    <MapPin size={14} className="text-gray-400" />
                    {map.region || "Global"}
                  </span>
                  <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gray-300" />
                  <span className="line-clamp-2 sm:line-clamp-1 leading-relaxed max-w-2xl">
                    {map.description}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full sm:w-auto shrink-0 mt-3 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                {!map.has_access && (
                  <div className="flex flex-col items-end hidden sm:flex">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                      Price
                    </span>
                    <span className="text-xl font-bold text-gray-900 leading-none">
                      ${map.map_price}
                    </span>
                  </div>
                )}

                {/* List View Button */}
                <button
                  onClick={() => handleMapAction(map)}
                  disabled={checkoutLoadingId === map.id}
                  className={`group/btn cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
                    map.has_access
                      ? "bg-plp-babyblue text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-plp-babyblue/30"
                      : "bg-gray-900 text-white hover:bg-gray-700 hover:shadow-lg"
                  }`}
                >
                  {checkoutLoadingId === map.id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      {map.has_access ? "View Tour" : "Buy Now"}
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
