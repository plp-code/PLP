"use client";

import { useState } from "react";
import { LayoutGrid, List, Search, Map as MapIcon } from "lucide-react";
import { useMapDirectory } from "@/hooks/useMapDirectory";
import { useMapCheckout } from "@/hooks/useMapCheckout";
import { MapCardGrid } from "./MapCardGrid";
import { MapListView } from "./MapListView";

export default function MapDirectory() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const { maps, loading, error } = useMapDirectory();
  const { handleMapAction, checkoutLoadingId } = useMapCheckout();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
        <div className="w-10 h-10 border-4 border-gray-100 border-t-plp-maroon rounded-full animate-spin" />
        <p className="text-sm font-medium text-gray-500 animate-pulse">
          Loading map directories...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-lg mx-auto mt-12">
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center shadow-sm">
          <h3 className="text-red-800 font-semibold mb-2">
            Failed to load maps
          </h3>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const filteredMaps =
    maps?.filter(
      (map) =>
        map.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        map.region?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        map.description?.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  return (
    <div className="w-full max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-6 mb-6 sm:mb-8 border-b border-gray-200 gap-y-5 lg:gap-y-0 gap-x-6">
        <div className="w-full lg:w-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Map Directories
          </h1>
          <p className="text-sm text-gray-500 mt-1.5">
            Explore {maps?.length || 0} available locations and routes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search maps..."
              className="block w-full pl-10 pr-3 py-2.5 sm:py-2 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-plp-maroon/50 focus:border-plp-maroon text-base sm:text-sm transition-colors duration-200"
            />
          </div>

          <div className="flex items-center justify-center bg-gray-100/80 p-1 rounded-xl border border-gray-200/50 shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid View"
              className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${viewMode === "grid" ? "bg-white text-plp-maroon shadow-sm ring-1 ring-black/5" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-label="List View"
              className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${viewMode === "list" ? "bg-white text-plp-maroon shadow-sm ring-1 ring-black/5" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {filteredMaps.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50/50 rounded-3xl border border-gray-200/50 dashed">
          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
            <MapIcon size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            No maps found
          </h3>
          <p className="text-gray-500 max-w-sm">
            {searchQuery
              ? `We couldn't find any maps matching "${searchQuery}".`
              : "No maps are currently available. Please check back later."}
          </p>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredMaps.map((map) => (
                <MapCardGrid
                  key={map.id}
                  map={map}
                  onAction={() => handleMapAction(map)}
                  isLoading={checkoutLoadingId === map.id}
                />
              ))}
            </div>
          ) : (
            <MapListView
              maps={filteredMaps}
              onAction={handleMapAction}
              loadingId={checkoutLoadingId}
            />
          )}
        </>
      )}
    </div>
  );
}
