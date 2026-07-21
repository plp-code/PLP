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
  Signpost,
} from "lucide-react";
import { useMapDirectory } from "@/hooks/useMapDirectory";
import { useMapCheckout } from "@/hooks/useMapCheckout";
import { useAuthUser } from "@/context/AuthContext";
import { MapCardGrid } from "./MapCardGrid";
import { MapListView } from "./MapListView";
import { ComingSoonCard, UpcomingLocation } from "./ComingSoonCard";
import { Snackbar } from "@/components/ui/Snackbar";
import { Spinner } from "@/components/ui/Spinner";

const upcomingLocations: UpcomingLocation[] = [
  { name: "Los Angeles", region: "California" },
  { name: "Manhattan", region: "New York" },
  { name: "Chicago", region: "Illinois" },
  { name: "Phoenix", region: "Arizona" },
  { name: "Boston", region: "Massachusetts" },
];

export default function MapDirectory() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showGuestBanner, setShowGuestBanner] = useState(true);
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);
  const [showWaitlistSuccess, setShowWaitlistSuccess] = useState(false);
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

  const filteredUpcoming = useMemo(() => {
    if (!searchQuery) return upcomingLocations;

    const lowerQuery = searchQuery.toLowerCase();
    return upcomingLocations.filter(
      (location) =>
        location.name.toLowerCase().includes(lowerQuery) ||
        location.region.toLowerCase().includes(lowerQuery),
    );
  }, [searchQuery]);

  const handleJoinWaitlist = () => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push(`/login?returnTo=${encodeURIComponent(pathname)}`);
      return;
    }

    setJoinedWaitlist(true);
    setShowWaitlistSuccess(true);
  };

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
      <Snackbar
        show={showWaitlistSuccess}
        onClose={() => setShowWaitlistSuccess(false)}
        icon={CheckCircle2}
        iconColor="text-green-600"
        borderColor="border-green-200"
        bgColor="bg-green-50"
        textColor="text-green-900"
        title="You're on the waitlist!"
        subtitle="We'll email you as soon as new maps go live."
        autoCloseMs={4000}
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
        {filteredMaps.length === 0 && filteredUpcoming.length === 0 ? (
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
              {filteredUpcoming.map((location) => (
                <ComingSoonCard
                  key={`coming-soon-${location.name}`}
                  location={location}
                  isAuthenticated={isAuthenticated}
                  joined={joinedWaitlist}
                  disabled={authLoading}
                  onJoin={handleJoinWaitlist}
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
                  upcoming={filteredUpcoming}
                  joinedWaitlist={joinedWaitlist}
                  waitlistDisabled={authLoading}
                  onJoinWaitlist={handleJoinWaitlist}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
