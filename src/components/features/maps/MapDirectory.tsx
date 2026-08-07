"use client";

import { useState } from "react";
import {
  Map as MapIcon,
  Shield,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMapDirectory } from "@/hooks/useMapDirectory";
import { useMapCheckout } from "@/hooks/useMapCheckout";
import { useCheckoutSuccessToast } from "@/hooks/useCheckoutSuccessToast";
import { useAuthUser } from "@/context/AuthContext";
import { MapCardGrid } from "./MapCardGrid";
import { MapListView } from "./MapListView";
import { ComingSoonCard } from "./ComingSoonCard";
import { DirectoryToolbar } from "./DirectoryToolbar";
import { Snackbar } from "@/components/ui/Snackbar";
import { Spinner } from "@/components/ui/Spinner";
import { useJoinWaitlist } from "@/hooks/useJoinWaitlist";
import { MapStatus } from "@/types";

export default function MapDirectory() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [showGuestBanner, setShowGuestBanner] = useState(true);
  const [statusFilter, setStatusFilter] = useState<MapStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const limit = viewMode === "grid" ? 6 : 5;

  const { isAuthenticated, isLoading: authLoading } = useAuthUser();

  const { maps, total, totalPages, loading, isFetching, error } =
    useMapDirectory({
      page: currentPage,
      limit,
      search: searchQuery,
      status: statusFilter,
    });

  const { handleMapAction, checkoutLoadingId } = useMapCheckout();
  const {
    joinWaitlist,
    loadingSlug,
    showWaitlistSuccess,
    setShowWaitlistSuccess,
  } = useJoinWaitlist();

  const { showSuccessMessage, setShowSuccessMessage, purchasedMapName } =
    useCheckoutSuccessToast();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter: MapStatus | "all") => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    setCurrentPage(1);
  };

  const liveMaps = maps.filter((m) => m.status === "live");
  const upcomingMaps = maps.filter((m) => m.status === "waitlist");

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + maps.length;

  if (error) {
    return (
      <div className="p-4 sm:p-8 max-w-md mx-auto mt-10 sm:mt-20">
        <div className="bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-3xl p-6 sm:p-8 text-center shadow-sm flex flex-col items-center">
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
        totalCount={total}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        statusFilter={statusFilter}
        onFilterChange={handleFilterChange}
        isFetching={isFetching}
      />

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div aria-live="polite" className="mt-4 sm:mt-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <Spinner text="Fetching maps..." />
          </div>
        ) : total === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 text-center">
            <div className="bg-plp-secondary-light border border-plp-secondary-dark p-5 rounded-2xl mb-5">
              <MapIcon size={32} className="text-plp-maroon" />
            </div>
            <h3 className="text-lg capitalize font-bold text-gray-900 mb-1.5 tracking-tight">
              No maps found
            </h3>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              {searchQuery
                ? `Nothing matching "${searchQuery}". Try searching for something else.`
                : "No maps available for this filter."}
            </p>
            {searchQuery && (
              <button
                onClick={() => handleSearchChange("")}
                className="plp-btn mt-5 text-sm font-bold font-prata cursor-pointer text-plp-maroon px-5 py-2 rounded-full"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          /* Render maps when loaded. Fade them out slightly if updating in the background */
          <div
            className={`animate-in fade-in duration-500 transition-opacity ${
              isFetching ? "opacity-50 pointer-events-none" : "opacity-100"
            }`}
          >
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5"
                  : "grid grid-cols-1 gap-4 sm:hidden"
              }
            >
              {liveMaps.map((map) => (
                <MapCardGrid
                  key={map.id}
                  map={map}
                  onAction={() => handleMapAction(map)}
                  isLoading={checkoutLoadingId === map.id}
                  isAuthenticated={isAuthenticated}
                />
              ))}

              {upcomingMaps.map((map) => (
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
                  maps={liveMaps}
                  onAction={handleMapAction}
                  loadingId={checkoutLoadingId}
                  upcoming={upcomingMaps}
                  waitlistDisabled={authLoading}
                  waitlistLoadingSlug={loadingSlug}
                  onJoinWaitlist={joinWaitlist}
                />
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-gray-100 sm:border-gray-200 pt-6 sm:px-6 mt-8 sm:mt-10">
                <div className="flex flex-1 justify-between sm:hidden gap-3">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex-1 font-bodoni relative inline-flex justify-center items-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="flex-1 font-bodoni relative inline-flex justify-center items-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
                  >
                    Next
                  </button>
                </div>

                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Showing{" "}
                      <span className="font-bold text-gray-900">
                        {startIndex + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-bold text-gray-900">
                        {endIndex}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-gray-900">{total}</span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-lg shadow-sm"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-lg px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (pageNum) => (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-bold transition-colors ${
                              currentPage === pageNum
                                ? "z-10 bg-plp-maroon text-white ring-1 ring-inset ring-plp-maroon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                : "text-gray-700 ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        ),
                      )}
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center rounded-r-lg px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
