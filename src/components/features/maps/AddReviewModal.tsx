"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Star, Loader2 } from "lucide-react";

export interface NewReview {
  item: string;
  quote: string;
  price?: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (review: NewReview) => void;
  storeName?: string;
}

export function AddReviewModal({ open, onClose, onSubmit, storeName }: Props) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState("");
  const [quote, setQuote] = useState("");
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => setMounted(true), []);

  // Drive the enter/exit transition and reset the form each time it opens.
  useEffect(() => {
    if (open) {
      setItem("");
      setQuote("");
      setPrice("");
      setSubmitting(false);
      const id = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(id);
    }
    setVisible(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const canSubmit = item.trim().length > 0 && quote.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);

    const parsedPrice = parseFloat(price);
    onSubmit({
      item: item.trim(),
      quote: quote.trim(),
      price:
        Number.isFinite(parsedPrice) && parsedPrice > 0
          ? Math.round(parsedPrice * 100)
          : undefined,
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-[3000] flex items-end justify-center sm:items-center">
      <div
        aria-hidden
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Share your experience"
        className={`relative flex max-h-[90dvh] w-full flex-col overflow-hidden bg-white shadow-2xl rounded-t-3xl sm:max-w-md sm:rounded-3xl transition-all duration-300 ease-out ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 sm:translate-y-4"
        }`}
      >
        <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-gray-200 sm:hidden" />

        <div className="flex shrink-0 items-start justify-between gap-3 px-5 pt-4 sm:pt-5">
          <div className="min-w-0">
            <h3 className="font-bodoni text-[18px] font-bold text-gray-900 leading-tight">
              Share your experience
            </h3>
            {storeName && (
              <p className="mt-0.5 truncate font-prata text-[13px] text-gray-400">
                {storeName}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-4 overflow-y-auto p-5 pb-[calc(1.25rem_+_env(safe-area-inset-bottom))]"
        >
          <label className="flex flex-col gap-1.5">
            <span className="font-bodoni text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
              What did you buy?
            </span>
            <input
              type="text"
              autoFocus
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="e.g. Vintage denim jacket"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 font-prata text-[16px] text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-plp-maroon/30 focus:bg-white focus:ring-2 focus:ring-plp-maroon/15"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-bodoni text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
              Your experience
            </span>
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              rows={3}
              maxLength={280}
              placeholder="Tell others what made this find special…"
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 font-prata text-[16px] leading-relaxed text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-plp-maroon/30 focus:bg-white focus:ring-2 focus:ring-plp-maroon/15"
            />
            <span className="self-end text-[11px] font-medium text-gray-300">
              {quote.length}/280
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-bodoni text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">
              Price paid <span className="normal-case text-gray-300">(optional)</span>
            </span>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[16px] font-medium text-gray-400">
                $
              </span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-7 pr-3.5 font-prata text-[16px] text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-plp-maroon/30 focus:bg-white focus:ring-2 focus:ring-plp-maroon/15"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-plp-maroon px-6 py-3 font-prata text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-red-800 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <Star size={15} className="fill-white/20" />
                Post Review
              </>
            )}
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}
