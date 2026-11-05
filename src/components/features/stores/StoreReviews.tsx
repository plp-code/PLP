import { MessageSquarePlus, ShoppingBag, Tag, User } from "lucide-react";
import type { ReviewItem } from "@/types";

interface StoreReviewsProps {
  reviews: ReviewItem[];
  disabled?: boolean;
  onAdd: () => void;
}

export function StoreReviews({ reviews, disabled, onAdd }: StoreReviewsProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="block font-bodoni text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
            What People Bought
          </span>

          {reviews.length > 0 && (
            <p className="mt-0.5 font-prata text-[12px] text-gray-400">
              {reviews.length} {reviews.length === 1 ? "find" : "finds"} shared
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onAdd}
          disabled={disabled}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-plp-maroon/15 bg-plp-maroon/[0.04] px-3 py-2 font-prata text-[12px] font-semibold text-plp-maroon transition-all hover:border-plp-maroon/25 hover:bg-plp-maroon/[0.08] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <MessageSquarePlus size={14} strokeWidth={1.8} />
          Share a find
        </button>
      </div>

      {reviews.length > 0 ? (
        <div className="flex flex-col gap-2.5">
          {reviews.map((entry) => {
            const fullName = entry.user
              ? [entry.user.first_name, entry.user.last_name]
                  .filter(Boolean)
                  .join(" ")
                  .trim()
              : "";

            const authorName = fullName || "Shopper";

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
                className="rounded-xl border border-gray-200 bg-white px-4 py-4 transition-colors hover:border-gray-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                      <ShoppingBag size={14} strokeWidth={1.8} />
                    </div>

                    <p className="min-w-0 truncate font-prata text-[14px] font-semibold text-gray-900">
                      {entry.item_purchased}
                    </p>
                  </div>

                  {typeof entry.price_paid === "number" && (
                    <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-1 font-prata text-[12px] font-semibold tabular-nums text-emerald-700">
                      ${entry.price_paid.toFixed(2)}
                    </span>
                  )}
                </div>

                {entry.categories?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {entry.categories.map((cat) => (
                      <span
                        key={cat.id}
                        className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 font-prata text-[10px] font-medium text-gray-500"
                      >
                        <Tag size={9} strokeWidth={1.8} />
                        {cat.name}
                      </span>
                    ))}
                  </div>
                )}

                {entry.experience && (
                  <p className="mt-3 font-prata text-[13px] leading-6 text-gray-600">
                    “{entry.experience}”
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3 font-prata text-[11px] text-gray-400">
                  <span className="inline-flex items-center gap-1 capitalize">
                    <User size={11} strokeWidth={1.8} />
                    {authorName}
                  </span>

                  {formattedDate && (
                    <>
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 rounded-full bg-gray-300"
                      />

                      <time dateTime={entry.created_at}>{formattedDate}</time>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <button
          type="button"
          onClick={onAdd}
          disabled={disabled}
          className="group flex flex-col items-center rounded-xl border border-dashed border-gray-200 bg-white px-5 py-7 text-center transition-all hover:border-plp-maroon/25 hover:bg-plp-maroon/[0.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors group-hover:bg-plp-maroon/[0.07] group-hover:text-plp-maroon">
            <MessageSquarePlus size={18} strokeWidth={1.7} />
          </div>

          <span className="font-prata text-[14px] font-semibold text-gray-800">
            No finds shared yet
          </span>

          <span className="mt-1 max-w-[250px] font-prata text-[12px] leading-5 text-gray-400">
            Be the first to share what you bought here.
          </span>
        </button>
      )}
    </section>
  );
}
