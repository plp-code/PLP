"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  LayoutGrid,
  List,
  Search,
  Map as MapIcon,
  Shield,
  AlertCircle,
  X,
  CheckCircle2,
} from "lucide-react";
import { useMapDirectory } from "@/hooks/useMapDirectory";
import { useMapCheckout } from "@/hooks/useMapCheckout";
import { useAuthUser } from "@/context/AuthContext";
import { MapCardGrid } from "./MapCardGrid";
import { MapListView } from "./MapListView";
import { Snackbar } from "@/components/ui/Snackbar";
import { Spinner } from "@/components/ui/Spinner";

export default function MapDirectory() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showGuestBanner, setShowGuestBanner] = useState(true);
  const hasHandledSuccess = useRef(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isSuccess = searchParams.get("success") === "true";

  const { isAuthenticated, isLoading: authLoading } = useAuthUser();
  const { maps, loading, error } = useMapDirectory();
  const { handleMapAction, checkoutLoadingId } = useMapCheckout();
  const queryClient = useQueryClient();

  const purchasedMapName = searchParams.get("map");

  useEffect(() => {
    if (isSuccess && !hasHandledSuccess.current) {
      hasHandledSuccess.current = true;
      queryClient.invalidateQueries({ queryKey: ["maps"] });
      setShowSuccessMessage(true);
      router.replace(pathname, { scroll: false });

      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, queryClient, router, pathname]);

  const filteredMaps = useMemo(() => {
    if (!maps) return [];
    if (!searchQuery) return maps;

    const lowerQuery = searchQuery.toLowerCase();
    return maps.filter(
      (map) =>
        map.name.toLowerCase().includes(lowerQuery) ||
        map.region?.toLowerCase().includes(lowerQuery) ||
        map.description?.toLowerCase().includes(lowerQuery),
    );
  }, [maps, searchQuery]);

  if (loading) {
    return <Spinner text="Loading maps..." />;
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

  return (
    <div className="w-full max-w-7xl mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      {showSuccessMessage && (
        <Snackbar
          show={showSuccessMessage}
          onClose={() => setShowSuccessMessage(false)}
          icon={CheckCircle2}
          iconColor="text-green-600"
          borderColor="border-green-200"
          bgColor="bg-green-50"
          textColor="text-green-900"
          title="Transaction Successful!"
          subtitle={
            purchasedMapName
              ? `You now have access to ${decodeURIComponent(purchasedMapName)}`
              : undefined
          }
          autoCloseMs={3000}
        />
      )}
      {!authLoading && !isAuthenticated && showGuestBanner && (
        <Snackbar
          show={!authLoading && !isAuthenticated && showGuestBanner}
          onClose={() => setShowGuestBanner(false)}
          icon={Shield}
          iconColor="text-amber-700"
          borderColor="border-amber-200"
          bgColor="bg-amber-50"
          textColor="text-amber-900"
          title="Browsing as Guest"
          subtitle="Log in or create an account to make any purchases."
          autoCloseMs={5000}
        />
      )}

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
              className="block w-full pl-11 pr-10 py-3 sm:py-2.5 bg-white border border-gray-200 rounded-2xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-plp-maroon/10 focus:border-plp-maroon text-base sm:text-sm shadow-sm transition-all duration-300"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="w-fit self-end sm:self-auto hidden sm:flex items-center bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200/50 shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid View"
              className={`p-2.5 sm:p-2 rounded-xl transition-all duration-300 flex items-center justify-center min-w-[44px] sm:min-w-0 ${
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
              className={`p-2.5 sm:p-2 rounded-xl transition-all duration-300 flex items-center justify-center min-w-[44px] sm:min-w-0 ${
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

      <div aria-live="polite" className="w-full">
        {filteredMaps.length === 0 ? (
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
          <div className="animate-in fade-in duration-500">
           P

           
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6"
                  : "grid grid-cols-1 gap-5 sm:hidden"
              }
            >
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

           P

           
            {viewMode === "list" && (
              <div className="hidden sm:block">
                <MapListView
                  maps={filteredMaps}
                  onAction={handleMapAction}
                  loadingId={checkoutLoadingId}
                  isAuthenticated={isAuthenticated}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
