"use client";

import { useEffect, useState } from "react";

import { Map as MapIcon, AlertCircle, Info, X, Loader2 } from "lucide-react";

import { useMapDirectory } from "@/hooks/useMapDirectory";
import { useMapCheckout } from "@/hooks/useMapCheckout";
import { useAuthUser } from "@/context/AuthContext";
import { useJoinWaitlist } from "@/hooks/useJoinWaitlist";

import { MapCardGrid } from "./MapCardGrid";
import { MapListView } from "./MapListView";
import { ComingSoonCard } from "./ComingSoonCard";
import { DirectoryToolbar } from "./DirectoryToolbar";

import type { WaitlistControls } from "./WaitlistInlineForm";
import type { MapStatus } from "@/types";

import { Spinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";

const PAGE_SIZE = 6;
const SEARCH_DELAY = 300;

type ViewMode = "grid" | "list";
type StatusFilter = MapStatus | "all";

export default function MapDirectory() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [guestNoticeDismissed, setGuestNoticeDismissed] = useState(false);

  const { isAuthenticated, isLoading: authLoading } = useAuthUser();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
      setCurrentPage(1);
    }, SEARCH_DELAY);

    return () => window.clearTimeout(timeout);
  }, [searchQuery]);

  const isSearchPending = searchQuery.trim() !== debouncedSearch;

  const { maps, total, totalPages, loading, isFetching, error } =
    useMapDirectory({
      page: currentPage,
      limit: PAGE_SIZE,
      search: debouncedSearch,
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

  const liveMaps = maps.filter((map) => map.status === "live");

  const upcomingMaps = maps.filter(
    (map) => map.status === "waitlist" || map.status === "next",
  );

  const showGuestNotice =
    !authLoading && !isAuthenticated && !guestNoticeDismissed;

  const isUpdating = isFetching || isSearchPending;

  const hasFilters = searchQuery.trim().length > 0 || statusFilter !== "all";

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: StatusFilter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
    collapseForm();
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    collapseForm();
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setStatusFilter("all");
    setCurrentPage(1);
    collapseForm();
  };

  return (
    <section
      aria-labelledby="maps-directory-heading"
      className="
        mx-auto w-full max-w-7xl
        px-4 py-5
        font-text text-plp-ink
        sm:px-6 sm:py-6
        lg:px-8 lg:py-8
      "
    >
      <h2 id="maps-directory-heading" className="sr-only">
        Explore secondhand shopping maps
      </h2>

      {showGuestNotice && (
        <div
          className="
            mb-4 flex items-start gap-2.5
            rounded-lg border border-plp-maroon/10
            bg-plp-blush/50
            px-3 py-2.5
            sm:mb-5 sm:items-center sm:px-4
          "
        >
          <Info
            size={15}
            strokeWidth={1.8}
            className="mt-0.5 shrink-0 text-plp-clay sm:mt-0"
          />

          <p className="min-w-0 flex-1 text-[12px] leading-relaxed text-plp-clay">
            <span className="font-semibold text-plp-maroon">
              Browsing as a guest.
            </span>{" "}
            Log in or create an account to purchase maps.
          </p>

          <button
            type="button"
            aria-label="Dismiss guest notice"
            onClick={() => setGuestNoticeDismissed(true)}
            className="
              flex h-7 w-7 shrink-0
              cursor-pointer items-center justify-center
              rounded-md text-plp-clay
              transition-colors
              hover:bg-plp-maroon/5
              hover:text-plp-maroon
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-plp-maroon/30
            "
          >
            <X size={14} strokeWidth={1.8} />
          </button>
        </div>
      )}

      <DirectoryToolbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        statusFilter={statusFilter}
        onFilterChange={handleFilterChange}
        isFetching={isUpdating}
      />

      <div
        className="
          mt-3 flex min-h-10
          items-center justify-between gap-3
          border-y border-plp-maroon/10
          py-2.5 sm:mt-4
        "
      >
        <div
          role="status"
          className="
            flex min-w-0 items-center gap-2
            text-[12px] text-plp-clay
            sm:text-[13px]
          "
        >
          {isUpdating && (
            <Loader2
              size={13}
              className="shrink-0 animate-spin text-plp-maroon"
            />
          )}

          {loading || isUpdating ? (
            <span>Finding maps...</span>
          ) : error ? (
            <span>Unable to load maps</span>
          ) : (
            <span>
              <strong className="font-semibold text-plp-maroon">{total}</strong>{" "}
              {total === 1 ? "map" : "maps"} found
            </span>
          )}
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="
              shrink-0 cursor-pointer
              text-[12px] font-medium
              text-plp-clay
              underline underline-offset-4
              transition-colors
              hover:text-plp-maroon
            "
          >
            Clear filters
          </button>
        )}
      </div>

      <div aria-busy={loading || isUpdating} className="mt-4 min-h-64 sm:mt-6">
        {loading ? (
          <div
            className="
              flex min-h-64 flex-col
              items-center justify-center px-4
            "
          >
            <Spinner text="Finding maps..." />
          </div>
        ) : error ? (
          <div
            role="alert"
            className="
              mx-auto flex max-w-md flex-col
              items-center px-5 py-12 text-center
              sm:py-16
            "
          >
            <div
              className="
                flex h-12 w-12 items-center
                justify-center rounded-full
                bg-plp-blush text-plp-maroon
              "
            >
              <AlertCircle size={23} strokeWidth={1.5} />
            </div>

            <h3
              className="
                mt-4 font-bodoni text-2xl font-semibold
                tracking-[-0.02em] text-plp-maroon
              "
            >
              We couldn&apos;t load the maps.
            </h3>

            <p
              className="
                mt-2 max-w-xs font-text
                text-[13px] leading-relaxed text-plp-clay
              "
            >
              Something went wrong while loading the directory. Please try
              again.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="
                plp-btn-primary mt-5
                inline-flex h-10 cursor-pointer
                items-center justify-center
                rounded-lg px-5
                font-text text-[13px] font-medium
              "
            >
              Try again
            </button>
          </div>
        ) : total === 0 ? (
          <div className="py-4 sm:py-8">
            <EmptyState
              align="center"
              icon={<MapIcon size={28} strokeWidth={1.25} />}
              eyebrow="No results"
              message="No maps found."
              description={
                debouncedSearch
                  ? `Nothing matched “${debouncedSearch}.” Try another city or clear your search.`
                  : "There aren't any maps available under this filter yet."
              }
            />

            {hasFilters && (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="
                    plp-btn-primary
                    inline-flex h-10 cursor-pointer
                    items-center justify-center
                    rounded-lg px-5
                    font-text text-[13px] font-medium
                  "
                >
                  View all maps
                </button>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`
              transition-opacity duration-200
              motion-reduce:transition-none
              ${isUpdating ? "opacity-65" : "opacity-100"}
            `}
          >
            <div
              className={
                viewMode === "grid"
                  ? "flex flex-col gap-7 sm:gap-9"
                  : "flex flex-col gap-7 sm:hidden"
              }
            >
              {liveMaps.length > 0 && (
                <section aria-labelledby="live-maps-heading">
                  <div
                    className="
                      mb-3 flex items-center
                      justify-between gap-3
                      sm:mb-4
                    "
                  >
                    <h3
                      id="live-maps-heading"
                      className="
                        font-bodoni text-xl font-semibold
                        leading-tight text-plp-maroon
                        sm:text-2xl
                      "
                    >
                      Available maps
                    </h3>

                    <span
                      className="
                        shrink-0 font-text text-[12px]
                        tabular-nums text-plp-clay
                      "
                    >
                      {liveMaps.length}{" "}
                      {liveMaps.length === 1 ? "destination" : "destinations"}
                    </span>
                  </div>

                  <div
                    className="
                      grid grid-cols-1 gap-3
                      sm:gap-4 md:grid-cols-2
                      xl:grid-cols-3
                    "
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
                  </div>
                </section>
              )}

              {upcomingMaps.length > 0 && (
                <section
                  aria-labelledby="upcoming-maps-heading"
                  className={
                    liveMaps.length > 0
                      ? "border-t border-plp-maroon/10 pt-6 sm:pt-8"
                      : ""
                  }
                >
                  <div className="mb-4">
                    <h3
                      id="upcoming-maps-heading"
                      className="
                        font-bodoni text-xl font-semibold
                        leading-tight text-plp-maroon
                        sm:text-2xl
                      "
                    >
                      Coming soon
                    </h3>

                    <p
                      className="
                        mt-1 font-text text-[12px]
                        leading-relaxed text-plp-clay
                        sm:text-[13px]
                      "
                    >
                      Be the first to know when our next maps launch.
                    </p>
                  </div>

                  <div
                    className="
                      grid grid-cols-1 gap-3
                      sm:gap-4 md:grid-cols-2
                      xl:grid-cols-3
                    "
                  >
                    {upcomingMaps.map((map) => (
                      <ComingSoonCard
                        key={map.slug}
                        map={map}
                        waitlist={waitlistControls}
                      />
                    ))}
                  </div>
                </section>
              )}
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

            {totalPages > 1 && (
              <div
                className="
                  mt-6 border-t border-plp-maroon/10
                  pt-4 sm:mt-8 sm:pt-5
                "
              >
                <Pagination
                  page={currentPage}
                  totalPages={totalPages}
                  total={total}
                  pageSize={PAGE_SIZE}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
