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
  const upcomingMaps = maps.filter(
    (map) => map.status === "waitlist" || map.status === "next",
  );

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + maps.length;

  if (error) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-5 py-16 text-center">
        <AlertCircle
          size={26}
          strokeWidth={1.5}
          className="text-plp-maroon/45"
        />

        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-plp-maroon/40">
          Something went wrong
        </p>

        <h3 className="mt-2 font-bodoni text-2xl tracking-[-0.02em] text-plp-maroon">
          We couldn't load the maps.
        </h3>

        <p className="mt-3 max-w-sm font-prata text-[13px] leading-6 text-plp-maroon/55">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 md:py-8 lg:px-8">
      {" "}
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
        position="bottom-right"
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
        position="bottom-right"
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
          position="bottom-right"
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
      <div className="h-px bg-plp-maroon/10" />{" "}
      <div aria-live="polite" className="mt-4 sm:mt-6">
        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-4">
            <Spinner text="Finding maps..." />
          </div>
        ) : total === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center md:py-20">
            <MapIcon
              size={28}
              strokeWidth={1.25}
              className="mb-5 text-plp-maroon/30"
            />

            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-plp-maroon/35">
              No results
            </p>

            <h3 className="mt-2 font-bodoni text-2xl tracking-[-0.02em] text-plp-maroon">
              No maps found.
            </h3>

            <p className="mt-3 max-w-sm font-prata text-[13px] leading-6 text-plp-maroon/55">
              {searchQuery
                ? `Nothing matched “${searchQuery}.” Try another city or clear your search.`
                : "There aren't any maps available under this filter yet."}
            </p>

            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="mt-6 border-b border-plp-maroon/30 pb-1 font-prata text-[10px] font-semibold uppercase tracking-[0.12em] text-plp-maroon transition-colors hover:border-plp-maroon"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div
            className={`transition-opacity duration-200 ${
              isFetching ? "pointer-events-none opacity-70" : "opacity-100"
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
                <div className="flex flex-1 items-center justify-between sm:hidden">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="group inline-flex items-center gap-1.5 font-prata text-[10px] font-semibold uppercase tracking-[0.1em] text-plp-maroon transition-opacity disabled:cursor-not-allowed disabled:opacity-25"
                  >
                    <ChevronLeft
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform group-hover:-translate-x-0.5"
                    />
                    Previous
                  </button>

                  <span className="font-mono text-[9px] tracking-[0.14em] text-plp-maroon/40">
                    {String(currentPage).padStart(2, "0")}
                    <span className="mx-1.5 text-plp-maroon/20">/</span>
                    {String(totalPages).padStart(2, "0")}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="group inline-flex items-center gap-1.5 font-prata text-[10px] font-semibold uppercase tracking-[0.1em] text-plp-maroon transition-opacity disabled:cursor-not-allowed disabled:opacity-25"
                  >
                    Next
                    <ChevronRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </button>
                </div>

                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-plp-maroon/40">
                    Showing {startIndex + 1}-{endIndex} of {total}
                  </p>

                  <nav
                    className="flex items-center gap-1"
                    aria-label="Pagination"
                  >
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                      className="group flex h-9 w-9 items-center justify-center text-plp-maroon/45 transition-colors hover:text-plp-maroon disabled:cursor-not-allowed disabled:opacity-20"
                    >
                      <ChevronLeft
                        className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                        strokeWidth={1.5}
                      />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => setCurrentPage(pageNum)}
                          aria-current={
                            currentPage === pageNum ? "page" : undefined
                          }
                          className={`flex h-9 min-w-9 items-center justify-center px-2 font-mono text-[10px] transition-colors ${
                            currentPage === pageNum
                              ? "text-plp-maroon underline decoration-plp-maroon underline-offset-4"
                              : "text-plp-maroon/35 hover:text-plp-maroon"
                          }`}
                        >
                          {String(pageNum).padStart(2, "0")}
                        </button>
                      ),
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                      className="group flex h-9 w-9 items-center justify-center text-plp-maroon/45 transition-colors hover:text-plp-maroon disabled:cursor-not-allowed disabled:opacity-20"
                    >
                      <ChevronRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={1.5}
                      />
                    </button>
                  </nav>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
