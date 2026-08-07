"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Map as MapIcon,
  Shield,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useMapDirectory } from "@/hooks/useMapDirectory";
import { useMapCheckout } from "@/hooks/useMapCheckout";
import { useMapSearch } from "@/hooks/useMapSearch";
import { useCheckoutSuccessToast } from "@/hooks/useCheckoutSuccessToast";
import { useAuthUser } from "@/context/AuthContext";
import { MapCardGrid } from "./MapCardGrid";
import { MapListView } from "./MapListView";
import { ComingSoonCard } from "./ComingSoonCard";
import { DirectoryToolbar } from "./DirectoryToolbar";
import { Snackbar } from "@/components/ui/Snackbar";
import { Spinner } from "@/components/ui/Spinner";
import { useJoinWaitlist } from "@/hooks/useJoinWaitlist";

export default function MapDirectory() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [showGuestBanner, setShowGuestBanner] = useState(true);

  const { isAuthenticated, isLoading: authLoading } = useAuthUser();
  const { maps, loading, error } = useMapDirectory();
  const { handleMapAction, checkoutLoadingId } = useMapCheckout();
  const { joinWaitlist, loadingSlug, showWaitlistSuccess, setShowWaitlistSuccess, error: waitlistError } = useJoinWaitlist();
  const { searchQuery, setSearchQuery, filteredMaps, filteredUpcoming } =
    useMapSearch(maps);
  const { showSuccessMessage, setShowSuccessMessage, purchasedMapName } =
    useCheckoutSuccessToast();

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

      <DirectoryToolbar
        totalCount={maps.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

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

              {filteredUpcoming.map((map) => (
                <ComingSoonCard
                  key={`coming-soon-${map.slug}`}
                  map={map}
                  disabled={authLoading}
                  isLoading={loadingSlug === map.slug}
                  onJoin={joinWaitlist}
                />
              ))}
            </div>

            {viewMode === "list" && (
              <div className="hidden sm:block">
                <MapListView
                  maps={filteredMaps}
                  onAction={handleMapAction}
                  loadingId={checkoutLoadingId}
                  upcoming={filteredUpcoming}
                  waitlistDisabled={authLoading} 
                  waitlistLoadingSlug={loadingSlug} 
                  onJoinWaitlist={joinWaitlist}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
