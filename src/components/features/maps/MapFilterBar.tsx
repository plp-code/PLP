"use client";

import { Search, Loader2, Navigation, Clock, ChevronDown } from "lucide-react";
import { useState } from "react";

const PRICE_LEVELS = [
  { level: 1, label: "Unpaid Internship", range: "$0-20" },
  { level: 2, label: "Entry-Level", range: "$10-35" },
  { level: 3, label: "Promoted", range: "$15-45" },
  { level: 4, label: "Corner Office", range: "$18-70" },
];

const CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: "blazer", label: "Blazer" },
  { value: "boots", label: "Boots" },
  { value: "button-down", label: "Button-down" },
  { value: "capris", label: "Capris" },
  { value: "cardigan", label: "Cardigan" },
  { value: "coat", label: "Coat" },
  { value: "dress", label: "Dress" },
  { value: "heels", label: "Heels" },
  { value: "jacket", label: "Jacket" },
  { value: "loafers", label: "Loafers" },
  { value: "pants", label: "Pants" },
  { value: "short-sleeve-top", label: "Short Sleeve Top" },
  { value: "skirt", label: "Skirt" },
  { value: "sleeveless-top", label: "Sleeveless Top" },
  { value: "suit-set", label: "Suit Set/Two-Piece" },
];

interface MapFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isOpenNow: boolean;
  onToggleOpenNow: () => void;
  activePrice: string | null;
  onPriceSelect: (value: string) => void;
  activeCategory: string | null;
  onCategorySelect: (value: string) => void;
  hasLocation: boolean;
  isLocating: boolean;
  onLocateToggle: () => void;
}

export function MapFilterBar({
  searchTerm,
  onSearchChange,
  isOpenNow,
  onToggleOpenNow,
  activePrice,
  onPriceSelect,
  activeCategory,
  onCategorySelect,
  hasLocation,
  isLocating,
  onLocateToggle,
}: MapFilterBarProps) {
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const selectedPrice = PRICE_LEVELS.find(
    ({ level }) => String(level) === activePrice,
  );

  console.log(selectedPrice);

  const selectedCategory = CATEGORY_OPTIONS.find(
    ({ value }) => value === activeCategory,
  );

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

      <div className="w-full flex items-center gap-2 flex-nowrap overflow-x-auto no-scrollbar pb-1 md:flex-wrap md:overflow-visible md:pb-0">
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
            <div className="fixed left-4 right-4 top-[140px] max-h-[55dvh] overflow-y-auto rounded-2xl border border-gray-200/70 bg-white/98 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.14)] p-2 z-[1100] md:absolute md:left-0 md:right-auto md:top-full md:mt-2 md:w-[300px] md:max-h-none md:overflow-visible">
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
                      curosr-pointer
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
            onClick={() => {
              setIsCategoryOpen((prev) => !prev);
              setIsPriceOpen(false);
            }}
            aria-expanded={isCategoryOpen}
            className={`w-[145px] md:w-[160px] flex font-prata justify-between items-center gap-2 px-3.5 py-2 md:py-1.5 md:px-4 rounded-full text-xs font-bold border whitespace-nowrap transition-all shadow-sm active:scale-95
              ${
                activeCategory
                  ? "bg-plp-navy text-white border-gray-900"
                  : "bg-white/95 backdrop-blur-md text-gray-600 border-gray-200/50 hover:bg-gray-50"
              }
            `}
          >
            <span className="truncate">
              {selectedCategory?.label ?? "Categories"}
            </span>

            <ChevronDown
              size={13}
              className={`shrink-0 transition-transform ${
                isCategoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isCategoryOpen && (
            <div className="fixed left-4 right-4 top-[140px] max-h-[55dvh] overflow-y-auto rounded-2xl border border-gray-200/70 bg-white/98 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.14)] p-2 z-[1100] md:absolute md:left-0 md:right-auto md:top-full md:mt-2 md:w-[300px] md:max-h-[400px]">
              {CATEGORY_OPTIONS.map(({ value, label }) => {
                const active = activeCategory === value;

                return (
                  <button
                    key={value}
                    onClick={() => {
                      onCategorySelect(value);
                      setIsCategoryOpen(false);
                    }}
                    className={`
                      w-full
                      cursor-pointer
                      flex items-center justify-between
                      gap-4
                      px-3.5 py-3
                      rounded-xl
                      text-left
                      font-prata text-xs
                      transition-colors
                      ${
                        active
                          ? "bg-gray-900 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    <span className="font-bold">{label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
