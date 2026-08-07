import { MessageSquarePlus } from "lucide-react";
import type { BoughtItem } from "@/hooks/useStoreReviews";

interface StoreReviewsProps {
  reviews: BoughtItem[];
  isAuthenticated: boolean;
  disabled: boolean;
  onAdd: () => void;
}

export function StoreReviews({
  reviews,
  isAuthenticated,
  disabled,
  onAdd,
}: StoreReviewsProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <span className="font-bodoni cursor-pointer text-[12px] font-semibold uppercase tracking-[0.15em] text-gray-400">
          What People Bought
        </span>
        <button
          onClick={onAdd}
          disabled={disabled}
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
          onClick={onAdd}
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
  );
}
