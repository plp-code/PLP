"use client";

import { useState } from "react";
import { Search, Loader2, Navigation, Clock, ChevronDown, Check } from "lucide-react";
import type { ClothingCategory } from "@/types";

const PRICE_LEVELS = [
  { level: 1, label: "Unpaid Internship", range: "$0-20" },
  { level: 2, label: "Entry-Level", range: "$10-35" },
  { level: 3, label: "Promoted", range: "$15-45" },
  { level: 4, label: "Corner Office", range: "$18-70" },
];

interface MapFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isOpenNow: boolean;
  onToggleOpenNow: () => void;
  activePrice: string | null;
  onPriceSelect: (value: string) => void;
  activeCategories: string[];
  onCategorySelect: (value: string) => void;
  onClearCategories: () => void;
  hasLocation: boolean;
  isLocating: boolean;
  onLocateToggle: () => void;
  categories: ClothingCategory[];
}

export function MapFilterBar({
  searchTerm,
  onSearchChange,
  isOpenNow,
  onToggleOpenNow,
  activePrice,
  onPriceSelect,
  activeCategories,
  onCategorySelect,
  onClearCategories,
  hasLocation,
  isLocating,
  onLocateToggle,
  categories = [],
}: MapFilterBarProps) {
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const selectedPrice = PRICE_LEVELS.find(
    ({ level }) => String(level) === activePrice,
  );

  const selectedCategoryLabels = activeCategories
    .map(
      (slug) => categories.find((cat) => cat.slug === slug)?.name ?? slug,
    )
    .filter(Boolean);

  const categoryLabel =
    activeCategories.length === 0
      ? "Categories"
      : activeCategories.length === 1
        ? selectedCategoryLabels[0]
        : `${activeCategories.length} categories`;

  return (
    <div className="w-full md:w-[550px] flex flex-col gap-2.5 pointer-events-auto">
      <div
        className="
          w-full
          bg-white/95 backdrop-blur-md
          rounded-full
          shadow-[0_4px_20px_rgba(0,0,0,0.08)]
          border border-gray-200/50
          p-2
          flex items-center gap-3
          transition-shadow
          focus-within:shadow-[0_4px_25px_rgba(0,0,0,0.12)]
        "
      >
        <div className="shrink-0 bg-gray-100 p-2 rounded-full">
          <Search size={18} className="text-gray-500" />
        </div>

        <input
          type="text"
          placeholder="Search locations..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          disabled={isLocating}
          className="
            min-w-0 flex-1
            bg-transparent border-none outline-none
            font-prata tracking-wide
            text-sm sm:text-base
            text-gray-900 placeholder-gray-400
            font-medium
          "
        />
      </div>

      <div className="w-full flex items-center gap-2 flex-nowrap overflow-x-auto no-scrollbar pb-3 md:flex-wrap md:overflow-visible md:pb-0">
        <button
          onClick={onLocateToggle}
          disabled={isLocating}
          className={`shrink-0 flex font-prata items-center gap-1.5 px-3.5 py-2 md:py-1.5 md:px-4 rounded-full text-xs font-bold border whitespace-nowrap transition-all shadow-sm active:scale-95 ${
            hasLocation
              ? "bg-blue-100 text-blue-800 border-blue-200"
              : "bg-white/95 backdrop-blur-md text-gray-600 border-gray-200/50 hover:bg-gray-50"
          }`}
        >
          {isLocating ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Navigation
              size={12}
              className={hasLocation ? "text-blue-600" : ""}
            />
          )}
          Nearest
        </button>

        <button
          onClick={onToggleOpenNow}
          className={`shrink-0 flex font-prata items-center gap-1.5 px-3.5 py-2 md:py-1.5 md:px-4 rounded-full text-xs font-bold border whitespace-nowrap shrink-0 transition-all shadow-sm active:scale-95 ${
            isOpenNow
              ? "bg-emerald-100 text-emerald-800 border-emerald-200"
              : "bg-white/95 backdrop-blur-md text-gray-600 border-gray-200/50 hover:bg-gray-50"
          }`}
        >
          <Clock size={12} className={isOpenNow ? "text-emerald-600" : ""} />
          Open Now
        </button>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => {
              setIsPriceOpen((prev) => !prev);
              setIsCategoryOpen(false);
            }}
            aria-expanded={isPriceOpen}
            aria-haspopup="menu"
            className={`w-[145px] sm:w-[160px] flex items-center justify-between gap-2 px-3.5 py-2 md:py-1.5 md:px-4 rounded-full font-prata text-xs font-bold border whitespace-nowrap shadow-sm active:scale-95 transition-all
            ${
              activePrice
                ? "bg-plp-navy text-white border-gray-900"
                : "bg-white/95 backdrop-blur-md text-gray-600 border-gray-200/50 hover:bg-gray-50"
            }
          `}
          >
            <span className="truncate">
              {selectedPrice?.label ?? "Level & Pay"}
            </span>

            <ChevronDown
              size={13}
              className={`
                shrink-0 transition-transform
                ${isPriceOpen ? "rotate-180" : ""}
              `}
            />
          </button>

          {isPriceOpen && (
            <div className="fixed left-4 right-4 top-[180px] max-h-[55dvh] overflow-y-auto rounded-2xl border border-gray-200/70 bg-white/98 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.14)] p-2 z-[1100] md:absolute md:left-0 md:right-auto md:top-full md:mt-2 md:w-[300px] md:max-h-none md:overflow-visible">
              {PRICE_LEVELS.map(({ level, label, range }) => {
                const value = String(level);
                const active = activePrice === value;

                return (
                  <button
                    key={level}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      onPriceSelect(value);
                      setIsPriceOpen(false);
                    }}
                    className={`
                      w-full
                      flex items-center justify-between gap-4
                      px-3.5 py-3
                      rounded-xl
                      text-left
                      font-prata text-xs
                      transition-colors
                      ${
                        active
                          ? "bg-plp-navy text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    <span className="font-bold">{label}</span>

                    <span
                      className={`
                        shrink-0 text-xs tracking-wide font-semibold
                        ${active ? "text-white/70" : "text-gray-400"}
                      `}
                    >
                      {range}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            disabled
            onClick={() => {
              setIsCategoryOpen((prev) => !prev);
              setIsPriceOpen(false);
            }}
            aria-expanded={isCategoryOpen}
            className={`flex w-[145px] items-center justify-between gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 font-prata text-xs font-bold shadow-sm transition-all active:scale-95 md:w-[160px] md:px-4 md:py-1.5 ${
              activeCategories.length > 0
                ? "border-gray-900 bg-plp-navy text-white"
                : "border-gray-200/50 bg-white/95 text-gray-600 backdrop-blur-md hover:bg-gray-50"
            }`}
          >
            <span className="truncate">{categoryLabel}</span>

            <ChevronDown
              size={13}
              className={`shrink-0 transition-transform ${
                isCategoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isCategoryOpen && (
            <div className="fixed left-4 right-4 top-[140px] z-[1100] overflow-hidden rounded-2xl border border-gray-200/70 bg-white/98 shadow-[0_12px_30px_rgba(0,0,0,0.14)] backdrop-blur-md md:absolute md:left-0 md:right-auto md:top-full md:mt-2 md:w-[320px]">
              <div className="max-h-[55dvh] overflow-y-auto p-2 md:max-h-[400px]">
                {categories.map((cat) => {
                  const active = activeCategories.includes(cat.slug);

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      disabled 
                      onClick={() => onCategorySelect(cat.slug)}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left font-prata text-xs transition-colors ${
                        active
                          ? "bg-plp-navy/[0.07] text-gray-900"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                            active
                              ? "border-plp-navy bg-plp-navy text-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {active && <Check size={11} strokeWidth={3} />}
                        </span>

                        <span className="truncate font-bold">{cat.name}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {activeCategories.length > 0 && (
                <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/80 px-4 py-2.5">
                  <span className="font-prata text-[11px] text-gray-400">
                    {activeCategories.length} selected
                  </span>

                  <button
                    type="button"
                    onClick={onClearCategories}
                    className="font-prata text-[11px] font-semibold text-gray-500 transition-colors hover:text-gray-900"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}