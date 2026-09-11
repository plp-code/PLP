import { MessageSquarePlus, ShoppingBag } from "lucide-react";
import type { BoughtItem } from "@/hooks/useStoreReviews";

interface StoreReviewsProps {
  reviews: BoughtItem[];
  disabled: boolean;
  onAdd: () => void;
}

export function StoreReviews({ reviews, disabled, onAdd }: StoreReviewsProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="block font-bodoni text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            What People Bought
          </span>

          {reviews.length > 0 && (
            <p className="mt-0.5 font-prata text-[12px] normal-case text-gray-400">
              {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
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
          {reviews.map((entry, index) => (
            <article
              key={`${entry.item}-${index}`}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition-colors hover:border-gray-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                      <ShoppingBag size={14} strokeWidth={1.8} />
                    </div>

                    <p className="truncate font-prata text-[14px] font-semibold text-gray-900">
                      {entry.item}
                    </p>
                  </div>
                </div>

                {typeof entry.price === "number" && (
                  <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-1 font-prata text-[12px] font-semibold text-emerald-700">
                    ${(entry.price / 100).toFixed(2)}
                  </span>
                )}
              </div>

              <p className="mt-2.5 font-prata text-[13px] leading-5 text-gray-600">
                “{entry.quote}”
              </p>

              <div className="mt-2.5 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-gray-300" />

                <span className="font-prata text-[11px] text-gray-400">
                  {entry.buyer}
                </span>
              </div>
            </article>
          ))}
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
            "Be the first to share what you bought here.
          </span>
        </button>
      )}
    </section>
  );
}
