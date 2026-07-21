"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronDown,
  MapPin,
  Navigation,
  CheckCircle2,
  MessageSquarePlus,
} from "lucide-react";
import {
  getTodayHours,
  getWeekHours,
  formatPriceLevel,
  buildDirectionsUrl,
} from "@/lib/utils";
import { useAuthUser } from "@/context/AuthContext";
import { Snackbar } from "@/components/ui/Snackbar";
import { AddReviewModal, NewReview } from "./AddReviewModal";

interface BoughtItem {
  item: string;
  quote: string;
  buyer: string;
  price?: number;
}

const SAMPLE_BOUGHT_EMPTY: BoughtItem[] = []


export function StoreDetailView({
  store,
  onBack,
  distance,
  userLocation,
}: any) {
  const timeData = getTodayHours(store.hours);
  const week = getWeekHours(store.hours);
  const today = week.find((d) => d.isToday);
  const priceLevel = formatPriceLevel(store.price_level);
  const gmapsUrl = buildDirectionsUrl(store, userLocation);

  const { isAuthenticated, isLoading: authLoading, user } = useAuthUser();
  const router = useRouter();
  const pathname = usePathname();

  const [hoursOpen, setHoursOpen] = useState(false);
  const [reviews, setReviews] = useState<BoughtItem[]>(SAMPLE_BOUGHT_EMPTY);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  const handleAddReviewClick = () => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.push(`/login?returnTo=${encodeURIComponent(pathname)}`);
      return;
    }
    setReviewOpen(true);
  };

  const handleReviewSubmit = (review: NewReview) => {
    const buyer = user
      ? `${user.first_name} ${user.last_name?.charAt(0) ?? ""}.`.trim()
      : "You";
    setReviews((prev) => [{ ...review, buyer }, ...prev]);
    setReviewOpen(false);
    setShowReviewSuccess(true);
  };

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
          <div
            className={`flex items-center font-bodoni gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm ${
              !timeData.isOpen
                ? "text-gray-600 bg-white/85"
                : timeData.isClosingSoon
                  ? "text-amber-700 bg-white/90"
                  : "text-emerald-700 bg-white/90"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                !timeData.isOpen
                  ? "bg-gray-400"
                  : timeData.isClosingSoon
                    ? "bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.6)]"
                    : "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.6)]"
              }`}
            />
            {!timeData.isOpen
              ? "Closed"
              : timeData.isClosingSoon
                ? "Closing Soon"
                : "Open"}
          </div>
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

        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <button
            onClick={() => setHoursOpen((o) => !o)}
            className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-baseline gap-3 min-w-0">
              <span className="font-bodoni text-[12px] font-semibold uppercase tracking-[0.15em] text-gray-400 shrink-0">
                Hours
              </span>
              <span
                className={`text-[15px] font-prata truncate ${
                  !timeData.isOpen
                    ? "text-gray-700"
                    : timeData.isClosingSoon
                      ? "text-amber-600"
                      : "text-emerald-700"
                }`}
              >
                {!timeData.isOpen
                  ? today
                    ? today.string
                    : timeData.string
                  : timeData.isClosingSoon
                    ? `Closes soon · ${today ? today.string : timeData.string}`
                    : today
                      ? today.string
                      : timeData.string}
              </span>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-400 shrink-0 transition-transform duration-200 ${
                hoursOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {hoursOpen && (
            <div className="border-t border-gray-100 px-4 py-2">
              {week.map((d) => (
                <div
                  key={d.label}
                  className={`flex items-center font-prata justify-between py-2 text-[14px] tracking-wide ${
                    d.isToday ? "text-gray-900 font-semibold" : "text-gray-500"
                  }`}
                >
                  <span>{d.label}</span>
                  <span className={d.isClosed ? "text-gray-400" : ""}>
                    {d.string}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

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

        <div className="flex flex-col">
          <div className="mb-2.5 flex items-center justify-between gap-3">
            <span className="font-bodoni cursor-pointer text-[12px] font-semibold uppercase tracking-[0.15em] text-gray-400">
              What People Bought
            </span>
            <button
              onClick={handleAddReviewClick}
              disabled={authLoading}
              className="inline-flex cursor-pointer shrink-0 items-center gap-1.5 rounded-full border border-plp-maroon/20 bg-plp-maroon/5 px-3 py-1.5 font-prata text-[12px] font-bold text-plp-maroon transition-colors hover:bg-plp-maroon/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <MessageSquarePlus size={14} />
              {isAuthenticated ? "Add yours" : "Log in to add"}
            </button>
          </div>

          {reviews.length > 0 ? (
            <ul className="flex flex-col divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
              {reviews.map((entry, index) => (
                <li
                  key={`${entry.item}-${index}`}
                  className="flex items-baseline justify-between gap-3 px-3.5 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="font-prata truncate text-[14px] font-semibold text-gray-900">
                      {entry.item}
                    </p>
                    <p className="truncate font-prata text-[12px] italic text-gray-500">
                      &ldquo;{entry.quote}&rdquo; — {entry.buyer}
                    </p>
                  </div>
                  {typeof entry.price === "number" && (
                    <span className="shrink-0 text-[13px] font-black text-emerald-700">
                      ${(entry.price / 100).toFixed(2)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <button
              onClick={handleAddReviewClick}
              className="flex flex-col items-center gap-1 rounded-xl border border-dashed border-gray-200 bg-white px-4 py-6 text-center transition-colors hover:border-plp-maroon/30 hover:bg-plp-maroon/[0.02]"
            >
              <span className="font-prata text-[14px] font-semibold text-gray-700">
                No reviews yet
              </span>
              <span className="font-prata text-[13px] text-gray-400">
                Be the first to share your experience.
              </span>
            </button>
          )}
        </div>
      </div>

      <AddReviewModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onSubmit={handleReviewSubmit}
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