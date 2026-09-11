"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, X, ChevronDown, Check } from "lucide-react";
import { CATEGORY_OPTIONS } from "@/lib/utils";

export interface NewReview {
  categories: string[];
  item: string;
  quote: string;
  price?: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (review: NewReview) => void | Promise<void>;
  storeName?: string;
}

export function AddReviewModal({ open, onClose, onSubmit, storeName }: Props) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const [item, setItem] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [quote, setQuote] = useState("");
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setCategories([]);
      setIsCategoryOpen(false);
      setItem("");
      setQuote("");
      setPrice("");
      setSubmitting(false);

      const id = window.setTimeout(() => {
        setVisible(true);
      }, 10);

      return () => window.clearTimeout(id);
    }

    setVisible(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submitting) {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, submitting]);

  if (!mounted || !open) return null;

  const toggleCategory = (value: string) => {
    setCategories((prev) =>
      prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value],
    );
  };

  const canSubmit =
    item.trim().length > 0 && quote.trim().length > 0 && !submitting;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!canSubmit) return;

    setSubmitting(true);

    const parsedPrice = Number.parseFloat(price);

    try {
      await onSubmit({
        categories: categories.map((c) => c.trim()),
        item: item.trim(),
        quote: quote.trim(),
        price:
          Number.isFinite(parsedPrice) && parsedPrice > 0
            ? Math.round(parsedPrice * 100)
            : undefined,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[3000] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close review modal"
        onClick={() => {
          if (!submitting) onClose();
        }}
        className={`absolute inset-0 cursor-default bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
        className={`relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl transition-all duration-300 ease-out sm:max-w-[460px] sm:rounded-3xl ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 sm:translate-y-4"
        }`}
      >
        <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-gray-200 sm:hidden" />

        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-gray-100 px-5 pb-4 pt-4 sm:px-6 sm:pt-6">
          <div className="min-w-0">
            <span className="mb-1 block font-bodoni text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
              Review
            </span>

            <h2
              id="review-modal-title"
              className="font-bodoni text-[21px] font-bold leading-tight text-gray-900"
            >
              {storeName ? storeName : "Share your experience"}
            </h2>

            <p className="mt-1 font-prata text-[13px] leading-5 text-gray-400">
              Tell others what you found.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close"
            className="-mr-1 shrink-0 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:pointer-events-none"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-y-auto px-5 pb-[calc(1.25rem_+_env(safe-area-inset-bottom))] pt-5 sm:px-6"
        >
          <div className="flex flex-col gap-5">
            <label className="flex flex-col gap-1.5">
              <span className="font-bodoni text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                What did you buy?
              </span>

              <input
                type="text"
                autoFocus
                value={item}
                maxLength={80}
                onChange={(event) => setItem(event.target.value)}
                placeholder="e.g. Black Blazer"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 font-prata text-[15px] text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-plp-maroon/30 focus:bg-white focus:ring-2 focus:ring-plp-maroon/10"
              />
            </label>

            <label className="relative flex flex-col gap-1.5">
              <span className="font-bodoni text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                Categories
              </span>

              <button
                type="button"
                onClick={() => setIsCategoryOpen((prev) => !prev)}
                aria-expanded={isCategoryOpen}
                className={`flex min-h-[48px] w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-all ${
                  isCategoryOpen
                    ? "border-plp-maroon/30 bg-white ring-2 ring-plp-maroon/10"
                    : "border-gray-200 bg-gray-50 hover:bg-white"
                }`}
              >
                <div className="min-w-0 flex-1">
                  {categories.length === 0 ? (
                    <span className="font-prata text-[15px] text-gray-400">
                      Select categories
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {categories.slice(0, 3).map((value) => {
                        const label =
                          CATEGORY_OPTIONS.find(
                            (option) => option.value === value,
                          )?.label ?? value;

                        return (
                          <span
                            key={value}
                            className="inline-flex items-center rounded-full bg-plp-maroon/[0.07] px-2.5 py-1 font-prata text-[11px] font-medium text-plp-maroon"
                          >
                            {label}
                          </span>
                        );
                      })}

                      {categories.length > 3 && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 font-prata text-[11px] text-gray-500">
                          +{categories.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <ChevronDown
                  size={15}
                  className={`shrink-0 text-gray-400 transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                  <div className="max-h-64 overflow-y-auto p-1.5">
                    {CATEGORY_OPTIONS.map(({ value, label }) => {
                      const checked = categories.includes(value);

                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => toggleCategory(value)}
                          className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                            checked
                              ? "bg-plp-maroon/[0.06]"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <span className="flex min-w-0 items-center gap-3">
                            <span
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                                checked
                                  ? "border-plp-maroon bg-plp-maroon text-white"
                                  : "border-gray-300 bg-white"
                              }`}
                            >
                              {checked && <Check size={11} strokeWidth={3} />}
                            </span>

                            <span
                              className={`truncate font-prata text-[14px] ${
                                checked
                                  ? "font-medium text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              {label}
                            </span>
                          </span>

                          {checked && (
                            <span className="font-prata text-[10px] uppercase tracking-wide text-plp-maroon/70">
                              Selected
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {categories.length > 0 && (
                    <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/70 px-3 py-2">
                      <span className="font-prata text-[11px] text-gray-400">
                        {categories.length} selected
                      </span>

                      <button
                        type="button"
                        onClick={() => setCategories([])}
                        className="font-prata text-[11px] font-medium text-gray-500 transition-colors hover:text-gray-900"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>
              )}

              {categories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {categories.map((value) => {
                    const label =
                      CATEGORY_OPTIONS.find((option) => option.value === value)
                        ?.label ?? value;

                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => toggleCategory(value)}
                        className="group inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1.5 font-prata text-[11px] text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {label}

                        <X
                          size={11}
                          className="text-gray-400 transition-colors group-hover:text-gray-700"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </label>

            <label className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bodoni text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                  Price paid
                </span>

                <span className="font-prata text-[11px] text-gray-300">
                  Optional
                </span>
              </div>

              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 font-prata text-[15px] text-gray-400">
                  $
                </span>

                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-7 pr-3.5 font-prata text-[15px] text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-plp-maroon/30 focus:bg-white focus:ring-2 focus:ring-plp-maroon/10"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-bodoni text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                Tell other shoppers
              </span>

              <textarea
                value={quote}
                onChange={(event) => setQuote(event.target.value)}
                rows={4}
                maxLength={280}
                placeholder="How was the selection, pricing, and overall experience?"
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 font-prata text-[15px] leading-6 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-plp-maroon/30 focus:bg-white focus:ring-2 focus:ring-plp-maroon/10"
              />

              <span className="self-end font-prata text-[11px] text-gray-300">
                {quote.length}/280
              </span>
            </label>
          </div>

          <div className="mt-5 border-t border-gray-100 pt-5">
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-plp-maroon px-6 py-3.5 font-prata text-[14px] font-semibold text-white shadow-sm transition-all hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Review"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
