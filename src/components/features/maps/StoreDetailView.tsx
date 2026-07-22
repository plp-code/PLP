"use client";

import { ChevronLeft, MapPin, Navigation, CheckCircle2 } from "lucide-react";
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

export function StoreDetailView({ store, onBack, distance, userLocation }: any) {
  const timeData = getTodayHours(store.hours);
  const week = getWeekHours(store.hours);
  const priceLevel = formatPriceLevel(store.price_level);
  const gmapsUrl = buildDirectionsUrl(store, userLocation);

  const {
    isAuthenticated,
    authLoading,
    reviews,
    reviewOpen,
    setReviewOpen,
    showReviewSuccess,
    setShowReviewSuccess,
    openReview,
    submitReview,
  } = useStoreReviews();

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

      <div className="relative h-40 md:h-52 w-full shrink-0 overflow-hidden bg-gradient-to-br from-gray-200/60 to-gray-400/60 border-b border-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/30 p-5 rounded-3xl backdrop-blur-md shadow-lg ring-1 ring-white/30">
            <MapPin size={36} className="text-white" />
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <StoreStatusBadge
            isOpen={timeData.isOpen}
            isClosingSoon={timeData.isClosingSoon}
          />
        </div>
      </div>

      <div className="px-5 md:px-6 py-6 flex flex-col gap-6 w-full">
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
            <h2 className="font-bodoni capitalize text-[20px] md:text-[24px] font-bold text-gray-900 leading-[1.1] tracking-[-0.01em]">
              {store.name}
            </h2>

            <div className="flex items-center gap-2 shrink-0">
              {distance !== null && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-100">
                  <Navigation size={12} className="fill-blue-200" />
                  {distance.toFixed(1)} mi
                </span>
              )}
              {priceLevel && (
                <span className="inline-flex items-center text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100">
                  {priceLevel}
                </span>
              )}
            </div>
          </div>

          <a
            href={gmapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-fit flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-sm active:scale-[0.98] transition-all"
          >
            <Navigation size={14} />
            {userLocation ? "Get Directions" : "View on Map"}
          </a>
        </div>

        <StoreHours timeData={timeData} week={week} />

        {store.description && (
          <div className="flex flex-col">
            <span className="font-bodoni text-[12px] font-semibold uppercase tracking-[0.15em] text-gray-400 block mb-2.5">
              About
            </span>
            <p className="text-gray-600 font-prata text-[15px] md:text-[16px] leading-[1.8] whitespace-pre-wrap">
              {store.description}
            </p>
          </div>
        )}

        <StoreReviews
          reviews={reviews}
          isAuthenticated={isAuthenticated}
          disabled={authLoading}
          onAdd={openReview}
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
      />
    </div>
  );
}
