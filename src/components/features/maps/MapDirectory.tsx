"use client";

import { useEffect, useRef, useState } from "react";
import { Map as MapIcon, AlertCircle } from "lucide-react";
import { useMapDirectory } from "@/hooks/useMapDirectory";
import { useMapCheckout } from "@/hooks/useMapCheckout";
import { useAuthUser } from "@/context/AuthContext";
import { MapCardGrid } from "./MapCardGrid";
import { MapListView } from "./MapListView";
import { ComingSoonCard } from "./ComingSoonCard";
import { DirectoryToolbar } from "./DirectoryToolbar";
import type { WaitlistControls } from "./WaitlistInlineForm";
import { useSnackbar } from "@/context/SnackbarContext";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { useJoinWaitlist } from "@/hooks/useJoinWaitlist";
import { MapStatus } from "@/types";

export default function MapDirectory() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [statusFilter, setStatusFilter] = useState<MapStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const limit = viewMode === "grid" ? 6 : 5;

  const { isAuthenticated, isLoading: authLoading } = useAuthUser();
  const snackbar = useSnackbar();

  const guestNoticeShown = useRef(false);
  useEffect(() => {
    if (authLoading || isAuthenticated || guestNoticeShown.current) return;
    guestNoticeShown.current = true;
    snackbar.info(
      "Browsing as Guest",
      "Log in or create an account to make any purchases.",
    );
  }, [authLoading, isAuthenticated, snackbar]);

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
    submitGuestEmail,
    loadingSlug,
    expandedSlug,
    collapseForm,
  } = useJoinWaitlist();

  const waitlistControls: WaitlistControls = {
    disabled: authLoading,
    loadingSlug,
    expandedSlug,
    onJoin: joinWaitlist,
    onCollapse: collapseForm,
    onSubmitEmail: submitGuestEmail,
  };

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

        <h2 className="mt-2 font-bodoni text-2xl tracking-[-0.02em] text-plp-maroon">
          We couldn't load the maps.
        </h2>

        <p className="mt-3 max-w-sm font-prata text-[13px] leading-6 text-plp-maroon/55">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 md:py-8 lg:px-8">
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
      <h2 id="maps-directory-heading" className="sr-only">
        Available maps
      </h2>
      <div aria-live="polite" className="mt-4 sm:mt-6">
        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-4">
            <Spinner text="Finding maps..." />
          </div>
        ) : total === 0 ? (
          <EmptyState
            align="center"
            icon={<MapIcon size={28} strokeWidth={1.25} />}
            eyebrow="No results"
            message="No maps found."
            description={
              searchQuery
                ? `Nothing matched “${searchQuery}.” Try another city or clear your search.`
                : "There aren't any maps available under this filter yet."
            }
          />
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
                  waitlist={waitlistControls}
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
                  waitlist={waitlistControls}
                />
              </div>
            )}

            <Pagination
              page={currentPage}
              totalPages={totalPages}
              total={total}
              pageSize={limit}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
