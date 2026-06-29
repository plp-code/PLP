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
  MapPin,
  Clock,
  Signpost,
} from "lucide-react";
import { useMapDirectory } from "@/hooks/useMapDirectory";
import { useMapCheckout } from "@/hooks/useMapCheckout";
import { useAuthUser } from "@/context/AuthContext";
import { MapCardGrid } from "./MapCardGrid";
import { MapListView } from "./MapListView";
import { Snackbar } from "@/components/ui/Snackbar";
import { Spinner } from "@/components/ui/Spinner";

const upcomingLocations: { name: string; region: string }[] = [
  { name: "Los Angeles, CA", region: "California" },
  { name: "New York City, NY", region: "New York" },
  { name: "Chicago, IL", region: "Illinois" },
  { name: "Phoenix, AZ", region: "Arizona" },
  { name: "Boston, MA", region: "Massachusetts" },
  { name: "And more to come!", region: "Stay tuned" },
];

export default function MapDirectory() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
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
    }
  }, [isSuccess, queryClient, router, pathname]);

  const filteredMaps = useMemo(() => {
    if (!maps) return [];
    if (!searchQuery) return maps;

    const lowerQuery = searchQuery.toLowerCase();
    return maps.filter((map) => map.name.toLowerCase().includes(lowerQuery));
  }, [maps, searchQuery]);

  if (loading) return <Spinner text="Loading maps..." />;

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
    <div className="w-full max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
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
      {!authLoading && !isAuthenticated && (
        <Snackbar
          show={showGuestBanner}
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

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl bg-plp-maroon/10">
            <Signpost size={18} className="text-plp-maroon" />
          </div>
          <p className="text-sm sm:text-base text-gray-500 font-medium">
            Explore{" "}
            <span className="text-gray-900 font-bold">{maps?.length || 0}</span>{" "}
            curated location and route
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 sm:w-72 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-plp-maroon text-gray-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search maps..."
              className="block w-full pl-9 pr-9 py-2 sm:py-2 font-bodoni tracking-wide bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-plp-maroon/15 focus:border-plp-maroon/30 focus:bg-white shadow-sm transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 cursor-pointer right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="hidden sm:flex items-center bg-gray-50 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setViewMode("list")}
              aria-label="List View"
              className={`p-1.5 rounded-lg transition-all duration-200 flex items-center justify-center ${
                viewMode === "list"
                  ? "bg-white text-plp-maroon shadow-sm ring-1 ring-gray-200"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid View"
              className={`p-1.5 rounded-lg transition-all duration-200 flex items-center justify-center ${
                viewMode === "grid"
                  ? "bg-white text-plp-maroon shadow-sm ring-1 ring-gray-200"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div aria-live="polite" className="mt-6">
        {filteredMaps.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="bg-plp-secondary-light border border-plp-secondary-dark p-5 rounded-2xl mb-5">
              <MapIcon size={32} className="text-plp-maroon" />
            </div>

            <h3 className="text-lg capitalize font-bold text-gray-900 mb-1.5 tracking-tight">
              No maps found
            </h3>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              {searchQuery
                ? `Nothing matching "${searchQuery}". Try searching for something else.`
                : "No maps available yet. Check back soon."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="plp-btn mt-5 text-sm font-bold font-prata cursor-pointer text-plp-maroon px-5 py-2 rounded-full"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5"
                  : "grid grid-cols-1 gap-4 sm:hidden"
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

      <section className="relative mt-12 sm:mt-20 overflow-hidden rounded-2xl sm:rounded-[2rem] border border-plp-maroon/10 bg-gradient-to-br from-plp-maroon/[0.03] via-white to-amber-50/40 p-5 sm:p-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-plp-maroon/5 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-amber-200/20 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-plp-maroon/10 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide text-plp-maroon">
            More on the way
          </div>

          <h2 className="mt-3 sm:mt-4 text-xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            New maps are coming soon
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-500 font-medium">
            We&apos;re constantly charting new locations and routes. Here&apos;s
            a preview of what we&apos;re working on next — check back regularly
            to see them go live.
          </p>

          <ul className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
            {upcomingLocations.map((location, index) => (
              <li
                key={location.name}
                className={`group items-center gap-3 rounded-xl sm:rounded-2xl border border-gray-200/70 bg-white/80 backdrop-blur-sm p-3 sm:p-4 shadow-sm transition-all duration-300 hover:border-plp-maroon/20 hover:shadow-md sm:flex ${
                  index >= 3 ? "hidden sm:flex" : "flex"
                }`}
              >
                {location.region === "Stay tuned" ? (
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-plp-maroon/10 text-plp-maroon transition-colors group-hover:bg-plp-maroon group-hover:text-white">
                    <AlertCircle size={18} />
                  </div>
                ) : (
                  <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-plp-maroon/10 text-plp-maroon transition-colors group-hover:bg-plp-maroon group-hover:text-white">
                    <MapPin size={18} />
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-gray-900">
                    {location.name}
                  </p>
                  <p className="truncate text-xs font-medium text-gray-400">
                    {location.region}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {upcomingLocations.length > 3 && (
            <p className="mt-4 text-center text-sm font-semibold text-plp-maroon sm:hidden">
              More to come!
            </p>
          )}

          <p className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-400">
            <Clock size={14} className="text-plp-maroon/60 shrink-0" />
            Locations and release dates are subject to change.
          </p>
        </div>
      </section>
    </div>
  );
}
