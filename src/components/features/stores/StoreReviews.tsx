"use client";

import { useState } from "react";
import { Loader2, Plus, ShoppingBag, Trash2, Clock3 } from "lucide-react";

import type { ReviewItem } from "@/types";

interface StoreReviewsProps {
  reviews: ReviewItem[];
  myReview?: ReviewItem | null;
  disabled?: boolean;
  isDeleting?: boolean;
  onAdd: () => void;
  onDelete?: () => Promise<void> | void;
}

export function StoreReviews({
  reviews,
  myReview,
  disabled,
  isDeleting,
  onAdd,
  onDelete,
}: StoreReviewsProps) {
  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    await onDelete?.();
    setConfirming(false);
  };

  const visibleReviews = myReview
    ? [myReview, ...reviews.filter((entry) => entry.id !== myReview.id)]
    : reviews;

  return (
    <section className="flex flex-col gap-4 font-text text-plp-ink">
      {/* Section header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-prata text-[17px] leading-relaxed text-plp-maroon">
            What People Bought
          </h3>

          {reviews.length > 0 && (
            <p className="mt-1 text-[12px] text-plp-clay">
              {reviews.length} {reviews.length === 1 ? "find" : "finds"} shared
            </p>
          )}
        </div>

        {!myReview && visibleReviews.length > 0 && (
          <button
            type="button"
            onClick={onAdd}
            disabled={disabled}
            className="plp-btn-primary inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2.5 font-text text-[12px] font-medium disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={15} strokeWidth={1.8} />
            Share a find
          </button>
        )}
      </div>

      {visibleReviews.length > 0 ? (
        <div className="flex flex-col gap-3">
          {visibleReviews.map((entry) => {
            const isOwnReview = myReview?.id === entry.id;

            const lastInitial = (
              entry.user?.last_initial ||
              entry.user?.last_name?.trim().charAt(0) ||
              ""
            )
              .charAt(0)
              .toUpperCase();

            const authorName =
              [
                entry.user?.first_name?.trim(),
                lastInitial ? `${lastInitial}.` : "",
              ]
                .filter(Boolean)
                .join(" ") || "Shopper";

            const createdAt = entry.created_at
              ? new Date(entry.created_at)
              : null;

            const formattedDate =
              createdAt && !Number.isNaN(createdAt.getTime())
                ? createdAt.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : null;

            return (
              <article
                key={entry.id}
                className={`rounded-xl border bg-white p-4 transition-colors ${
                  isOwnReview
                    ? "border-plp-maroon/30"
                    : "border-plp-secondary hover:border-plp-clay/40"
                }`}
              >
                {/* Own review */}
                {isOwnReview && (
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-md bg-plp-blush px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-plp-maroon">
                      Your find
                    </span>

                    {onDelete && !confirming && (
                      <button
                        type="button"
                        aria-label="Delete your review"
                        title="Delete your review"
                        onClick={() => setConfirming(true)}
                        disabled={disabled || isDeleting}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-plp-clay transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={15} strokeWidth={1.7} />
                      </button>
                    )}
                  </div>
                )}

                {/* Item and price */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="break-words font-prata text-[15px] leading-relaxed text-plp-maroon">
                      {entry.item_purchased}
                    </h4>

                    {!!entry.categories?.length && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {entry.categories.map((cat) => (
                          <span
                            key={cat.id}
                            className="rounded-md bg-plp-parchment px-2 py-1 text-[11px] font-medium leading-tight text-plp-clay"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {typeof entry.price_paid === "number" && (
                    <div className="flex shrink-0 flex-col items-end">
                      <span className="font-bodoni text-[23px] font-semibold leading-tight tabular-nums text-plp-maroon">
                        ${(entry.price_paid / 100).toFixed(2)}
                      </span>

                      <span className="mt-1 text-[10px] text-plp-clay">
                        Price paid
                      </span>
                    </div>
                  )}
                </div>

                {/* Experience */}
                {entry.experience && (
                  <p className="mt-3.5 whitespace-pre-wrap break-words font-text text-[13px] leading-[1.8] text-plp-clay">
                    &ldquo;{entry.experience}&rdquo;
                  </p>
                )}

                {/* Author and date */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-plp-blush text-[11px] font-medium text-plp-maroon">
                      {isOwnReview ? "Y" : authorName.charAt(0).toUpperCase()}
                    </div>

                    <span className="truncate text-[12px] font-medium text-plp-clay">
                      {isOwnReview ? "You" : authorName}
                    </span>
                  </div>

                  {formattedDate && (
                    <time
                      dateTime={entry.created_at}
                      className="shrink-0 text-[11px] text-plp-clay"
                    >
                      {formattedDate}
                    </time>
                  )}
                </div>

                {/* Moderation */}
                {isOwnReview && entry.is_hidden && (
                  <div
                    role="status"
                    className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-[11px] leading-relaxed text-amber-800"
                  >
                    <Clock3 size={13} className="mt-0.5 shrink-0" />
                    <span>
                      Your find is under moderation and isn&apos;t visible to
                      others yet.
                    </span>
                  </div>
                )}

                {/* Delete confirmation */}
                {isOwnReview && confirming && (
                  <div className="mt-4 rounded-lg border border-red-200 bg-red-50/50 p-3">
                    <p className="text-[13px] font-semibold text-plp-ink">
                      Delete this find?
                    </p>

                    <p className="mt-1 text-[12px] leading-relaxed text-plp-clay">
                      Your find will be removed from this location.
                    </p>

                    <div className="mt-3 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setConfirming(false)}
                        disabled={isDeleting}
                        className="plp-btn cursor-pointer rounded-md px-3 py-2 text-[12px] font-medium disabled:opacity-50"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-red-700 px-3 py-2 text-[12px] font-medium text-white transition-colors hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isDeleting && (
                          <Loader2 size={13} className="animate-spin" />
                        )}
                        Delete find
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center rounded-xl border border-dashed border-plp-secondary-dark bg-white/50 px-5 py-8 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-plp-blush text-plp-maroon">
            <ShoppingBag size={21} strokeWidth={1.4} />
          </div>

          <h4 className="font-prata text-[16px] text-plp-maroon">
            Good finds are worth sharing.
          </h4>

          <p className="mt-2 max-w-[260px] text-[13px] leading-relaxed text-plp-clay">
            Found something you love? Help other professionals discover what
            they can find here.
          </p>

          <button
            type="button"
            onClick={onAdd}
            disabled={disabled}
            className="plp-btn-primary mt-5 inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2.5 font-text text-[12px] font-medium disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={14} />
            Share the first find
          </button>
        </div>
      )}
    </section>
  );
}
