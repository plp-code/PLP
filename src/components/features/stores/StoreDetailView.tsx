"use client";

import { useState } from "react";
import {
  ChevronLeft,
  Navigation,
  ChevronDown,
  MapPin,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

import {
  getTodayHours,
  getWeekHours,
  formatPriceLevel,
  buildDirectionsUrl,
} from "@/lib/utils";

import { useStoreReviews } from "@/hooks/useStoreReviews";
import { AddReviewModal } from "@/components/features/maps/AddReviewModal";
import { StoreStatusBadge } from "./StoreStatusBadge";
import { StoreHours } from "./StoreHours";
import { StoreReviews } from "./StoreReviews";

import type { Location, LocationPin } from "@/types";
import type { UserLocation } from "@/hooks/useGeolocation";

interface StoreDetailViewProps {
  store: Location | LocationPin;
  onBack: () => void;
  distance: number | null;
  userLocation: UserLocation | null;
}

export function StoreDetailView({
  store,
  onBack,
  distance,
  userLocation,
}: StoreDetailViewProps) {
  const details = "hours" in store ? store : null;

  const timeData = getTodayHours(details?.hours);
  const week = getWeekHours(details?.hours);
  const priceLevel = formatPriceLevel(details?.price_level);
  const gmapsUrl = buildDirectionsUrl(store, userLocation);

  const {
    reviews,
    myReview,
    isLoading,
    isDeleting,
    deleteMyReview,
    isSubmitting,
    reviewOpen,
    setReviewOpen,
    submitReview,
  } = useStoreReviews(store.id);

  const [isExpanded, setIsExpanded] = useState(false);

  const hasHours = !!timeData.string && timeData.string !== "Hours unavailable";

  const description = details?.description?.trim();

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-y-auto bg-plp-parchment pb-[calc(6rem_+_env(safe-area-inset-bottom))] font-text text-plp-ink animate-in slide-in-from-right-4 duration-300 md:pb-0">
      {/* Sticky navigation */}
      <div className="sticky top-0 z-20 shrink-0 border-b border-plp-secondary bg-plp-parchment/95 px-4 py-2 backdrop-blur-xl">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to all locations"
          className="-ml-2 inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-2 text-[13px] font-medium text-plp-maroon transition-colors hover:bg-plp-blush"
        >
          <ChevronLeft size={18} strokeWidth={1.8} />
          All locations
        </button>
      </div>

      {/* Store header */}
      <header className="shrink-0 border-b border-plp-secondary bg-white px-5 py-5 md:px-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-plp-clay">
            Store details
          </span>

          {hasHours && (
            <StoreStatusBadge
              isOpen={timeData.isOpen}
              isClosingSoon={timeData.isClosingSoon}
            />
          )}
        </div>

        <h2 className="break-words font-bodoni text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-plp-maroon md:text-[32px]">
          {store.name}
        </h2>

        {/* Distance and price */}
        {(distance !== null || priceLevel) && (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {distance !== null && (
              <span className="inline-flex items-center gap-1.5 text-[13px] text-plp-clay">
                <MapPin size={14} strokeWidth={1.75} />
                {distance.toFixed(1)} mi away
              </span>
            )}

            {priceLevel && (
              <span className="rounded-md bg-plp-parchment px-2.5 py-1.5 text-[11px] font-medium text-plp-clay">
                {priceLevel}
              </span>
            )}
          </div>
        )}

        {/* Directions */}
        <a
          href={gmapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="plp-btn-blue group mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-text text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plp-navy focus-visible:ring-offset-2"
        >
          <Navigation size={15} strokeWidth={1.8} />

          {userLocation ? "Get directions" : "View on Google Maps"}

          <ArrowUpRight
            size={13}
            strokeWidth={1.8}
            className="opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </header>

      {/* Store content */}
      <div className="flex w-full flex-col gap-6 px-5 py-5 md:px-6">
        <StoreHours timeData={timeData} week={week} />

        {/* About */}
        {description && (
          <section className="flex flex-col gap-2.5">
            <h3 className="font-prata text-[17px] leading-relaxed text-plp-maroon">
              About the store
            </h3>

            <p
              className={`whitespace-pre-wrap break-words font-text text-[14px] leading-[1.8] text-plp-clay ${
                !isExpanded ? "line-clamp-3" : ""
              }`}
            >
              {description}
            </p>

            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              className="inline-flex w-fit cursor-pointer items-center gap-1.5 text-[12px] font-medium text-plp-maroon transition-colors hover:text-plp-clay"
            >
              {isExpanded ? "Read less" : "Read more"}

              <ChevronDown
                size={14}
                strokeWidth={1.75}
                className={`transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </section>
        )}

        <div className="h-px w-full bg-plp-secondary" />

        {/* Reviews */}
        {isLoading ? (
          <section aria-busy="true" className="flex flex-col gap-3">
            <h3 className="font-prata text-[17px] text-plp-maroon">
              What People Bought
            </h3>

            <div
              role="status"
              className="flex items-center justify-center gap-2 rounded-xl border border-plp-secondary bg-white py-8 text-[13px] text-plp-clay"
            >
              <Loader2 size={16} className="animate-spin text-plp-maroon" />
              Loading community finds...
            </div>
          </section>
        ) : (
          <StoreReviews
            reviews={reviews}
            myReview={myReview}
            disabled={isSubmitting}
            isDeleting={isDeleting}
            onAdd={() => setReviewOpen(true)}
            onDelete={deleteMyReview}
          />
        )}
      </div>

      <AddReviewModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onSubmit={submitReview}
        storeName={store.name}
      />
    </div>
  );
}
