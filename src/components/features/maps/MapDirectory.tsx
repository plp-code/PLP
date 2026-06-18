"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  LayoutGrid,
  List,
  Search,
  Map as MapIcon,
  Shield,
  AlertCircle,
} from "lucide-react";
import { useMapDirectory } from "@/hooks/useMapDirectory";
import { useMapCheckout } from "@/hooks/useMapCheckout";
import { useAuthUser } from "@/context/AuthContext";
import { MapCardGrid } from "./MapCardGrid";
import { MapListView } from "./MapListView";

export default function MapDirectory() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  
  const { isAuthenticated, isLoading: authLoading } = useAuthUser();
  const { maps, loading, error, refetch } = useMapDirectory();
  const { handleMapAction, checkoutLoadingId } = useMapCheckout();

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-plp-maroon rounded-full border-t-transparent animate-spin"></div>
          <MapIcon size={20} className="text-plp-maroon animate-pulse" />
        </div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest animate-pulse">
          Loading Directory
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-md mx-auto mt-20">
        <div className="bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-3xl p-8 text-center shadow-sm flex flex-col items-center">
          <div className="bg-red-100 p-3 rounded-full mb-4">
            <AlertCircle className="text-red-600" size={24} />
          </div>
          <h3 className="text-red-900 font-bold text-lg mb-2">
            Failed to load maps
          </h3>
          <p className="text-sm text-red-600/80 leading-relaxed">{error}</p>
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
    <div className="w-full max-w-7xl mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between pb-6 mb-8 sm:mb-10 border-b border-gray-100 gap-y-6 lg:gap-y-0 gap-x-8">
        <div className="w-full lg:w-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Map Directories
          </h1>
          <p className="text-sm sm:text-base text-gray-500 font-medium">
            Explore{" "}
            <span className="text-gray-900 font-bold">{maps?.length || 0}</span>{" "}
            available locations and routes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-plp-maroon text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, region, or keyword..."
              className="block w-full pl-11 pr-4 py-3 sm:py-2.5 bg-white border border-gray-200 rounded-2xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-plp-maroon/10 focus:border-plp-maroon text-base sm:text-sm shadow-sm transition-all duration-300"
            />
          </div>

          <div className="w-fit self-end sm:self-auto flex items-center bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200/50 shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid View"
              className={`p-2.5 sm:p-2 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center ${
                viewMode === "grid"
                  ? "bg-white text-plp-maroon shadow-sm ring-1 ring-black/5 scale-100"
                  : "text-gray-400 hover:text-gray-900 hover:bg-gray-200/50 scale-95 hover:scale-100"
              }`}
            >
              <LayoutGrid size={18} />
            </button>

            <button
              onClick={() => setViewMode("list")}
              aria-label="List View"
              className={`p-2.5 sm:p-2 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center ${
                viewMode === "list"
                  ? "bg-white text-plp-maroon shadow-sm ring-1 ring-black/5 scale-100"
                  : "text-gray-400 hover:text-gray-900 hover:bg-gray-200/50 scale-95 hover:scale-100"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {!authLoading && !isAuthenticated && (
        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 sm:px-5 sm:py-4 text-amber-900 flex items-start gap-3">
          <Shield size={18} className="mt-0.5 shrink-0 text-amber-700" />
          <p className="text-sm sm:text-base leading-relaxed">
            You are browsing as a guest. You can view directories, but you will
            need to log in when you click buy.
          </p>
        </div>
      )}

      {filteredMaps.length === 0 ? (
        /* Refined Empty State */
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-200 mt-4 transition-all">
          <div className="bg-white p-5 rounded-full shadow-sm border border-gray-100 mb-5">
            <MapIcon size={36} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
            No maps found
          </h3>
          <p className="text-gray-500 max-w-sm text-sm sm:text-base leading-relaxed">
            {searchQuery
              ? `We couldn't find anything matching "${searchQuery}". Try adjusting your search terms.`
              : "No maps are currently available in the directory. Please check back later."}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-6 text-sm font-bold text-plp-maroon hover:text-red-800 transition-colors bg-red-50 hover:bg-red-100 px-5 py-2 rounded-full"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        /* Data Views */
        <div className="animate-in fade-in duration-500">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredMaps.map((map) => (
                <MapCardGrid
                  key={map.id}
                  map={map}
                  onAction={() => handleMapAction(map)}
                  isLoading={checkoutLoadingId === map.id}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>
          ) : (
            <MapListView
              maps={filteredMaps}
              onAction={handleMapAction}
              loadingId={checkoutLoadingId}
              isAuthenticated={isAuthenticated}
            />
          )}
        </div>
      )}
    </div>
  );
}
