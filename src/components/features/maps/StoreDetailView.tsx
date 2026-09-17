"use client";

import {
  ChevronLeft,
  MapPin,
  Navigation,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import {
  getTodayHours,
  getWeekHours,
  formatPriceLevel,
  buildDirectionsUrl,
} from "@/lib/utils";
import { useStoreReviews } from "@/hooks/useStoreReviews";
import { Snackbar } from "@/components/ui/Snackbar";
import { AddReviewModal } from "./AddReviewModal";
import { StoreStatusBadge } from "./StoreStatusBadge";
import { StoreHours } from "./StoreHours";
import { StoreReviews } from "./StoreReviews";
import type { Location, LocationPin } from "@/types";
import type { UserLocation } from "@/hooks/useGeolocation";
import { useState } from "react";

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
    isLoading,
    isSubmitting,
    reviewOpen,
    setReviewOpen,
    showReviewSuccess,
    setShowReviewSuccess,
    submitReview,
  } = useStoreReviews(store.id);


  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-gray-50 pb-[calc(6rem_+_env(safe-area-inset-bottom))] md:pb-0 relative animate-in slide-in-from-right-4 md:duration-300">
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-3 py-2">
        <button
          onClick={onBack}
          aria-label="Back to list"
          className="flex items-center gap-1 -ml-1 p-2 text-sm font-medium font-prata text-gray-500 hover:text-gray-900 active:text-blue-600 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <div className="px-5 md:px-6 py-6 flex flex-col gap-6 w-full">
        <div className="flex flex-col">
          <div className="mb-5 flex items-start justify-between gap-4">
            <h2 className="min-w-0 flex-1 font-bodoni text-[20px] font-bold capitalize leading-[1.15] tracking-[-0.01em] text-gray-900 md:text-[24px]">
              {store.name}
            </h2>

            <StoreStatusBadge
              isOpen={timeData.isOpen}
              isClosingSoon={timeData.isClosingSoon}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {distance !== null && (
                <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700">
                  <Navigation
                    size={12}
                    strokeWidth={2}
                    className="text-slate-500"
                  />
                  {distance.toFixed(1)} mi away
                </span>
              )}

              {/* {priceLevel && (
                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700">
                  {priceLevel}
                </span>
              )} */}
            </div>

            <a
              href={gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className=" inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              <Navigation size={14} strokeWidth={2.25} />
              {userLocation ? "Directions" : "View Map"}
            </a>
          </div>
        </div>
      </div>

      <div className="px-3.5 md:px-4 py-4 flex flex-col gap-6 w-full">
        <StoreHours timeData={timeData} week={week} />
        {details?.description && (
          <section>
            <span className="mb-2 block font-bodoni text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
              About
            </span>

            <p
              className={`whitespace-pre-wrap font-prata text-[15px] leading-7 text-gray-600 md:text-[16px] ${
                !isOpen ? "line-clamp-3" : ""
              }`}
            >
              {details.description}
            </p>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              className="cursor-pointer w-full mt-2 flex items-center gap-1.5 font-prata text-[13px] text-gray-500 transition-colors hover:text-gray-900"
            >
              <span>{isOpen ? "Show less" : "Show more"}</span>

              <ChevronDown
                size={14}
                strokeWidth={1.75}
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </section>
        )}

        <StoreReviews
          reviews={reviews}
          disabled={isLoading || isSubmitting}
          onAdd={() => setReviewOpen(true)}
        />
      </div>

      <AddReviewModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onSubmit={submitReview}
        storeName={store.name}
      />

      <Snackbar
        show={showReviewSuccess}
        onClose={() => setShowReviewSuccess(false)}
        icon={CheckCircle2}
        iconColor="text-green-600"
        borderColor="border-green-200"
        bgColor="bg-green-50"
        textColor="text-green-900"
        title="Thanks for sharing!"
        subtitle="Your experience has been added."
        autoCloseMs={3000}
        position="bottom-right"
      />
    </div>
  );
}
