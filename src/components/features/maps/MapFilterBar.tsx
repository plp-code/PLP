"use client";

import { useEffect, useRef, useState } from "react";

import {
  Search,
  Loader2,
  Navigation,
  Clock,
  ChevronDown,
  Check,
  X,
} from "lucide-react";

import type { ClothingCategory } from "@/types";

const PRICE_LEVELS = [
  { level: 1, label: "Unpaid Internship", range: "$0–20" },
  { level: 2, label: "Entry-Level", range: "$10–35" },
  { level: 3, label: "Promoted", range: "$15–45" },
  { level: 4, label: "Corner Office", range: "$18–70" },
];

const FILTER_BASE =
  "inline-flex h-9 shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-lg border px-2 font-text text-[12px] font-medium shadow-sm transition-colors active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-plp-maroon/40 disabled:cursor-not-allowed disabled:opacity-50 md:px-2.5";

const FILTER_INACTIVE =
  "border-plp-secondary bg-white/95 text-plp-clay hover:bg-plp-parchment hover:text-plp-maroon";

const FILTER_ACTIVE = "border-plp-maroon bg-plp-maroon text-plp-parchment";

const DROPDOWN_BASE =
  "absolute inset-x-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-plp-secondary bg-white shadow-[0_8px_24px_rgba(61,11,25,0.12)]";

type Dropdown = "price" | "categories" | null;

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
  const [dropdown, setDropdown] = useState<Dropdown>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const priceButtonRef = useRef<HTMLButtonElement>(null);
  const categoryButtonRef = useRef<HTMLButtonElement>(null);

  const selectedPrice = PRICE_LEVELS.find(
    ({ level }) => String(level) === activePrice,
  );

  const categoryCount = activeCategories.length;

  const toggleDropdown = (value: Dropdown) => {
    setDropdown((prev) => (prev === value ? null : value));
  };

  const closeDropdown = () => {
    setDropdown(null);

    if (dropdown === "price") {
      priceButtonRef.current?.focus();
    }

    if (dropdown === "categories") {
      categoryButtonRef.current?.focus();
    }
  };

  useEffect(() => {
    if (!dropdown) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        setDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setDropdown(null);

      if (dropdown === "price") {
        priceButtonRef.current?.focus();
      } else {
        categoryButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdown]);

  return (
    <div
      ref={containerRef}
      className="
        pointer-events-auto relative
        flex w-full min-w-0 flex-col gap-1.5
        font-text
      "
    >
      {/* Search bar */}
      <div
        className="
          flex h-10 w-full items-center gap-2
          rounded-lg border border-plp-secondary
          bg-white/95 px-3 shadow-sm
          backdrop-blur-md
          transition-colors
          focus-within:border-plp-maroon/50
          md:h-11
        "
      >
        <Search
          size={16}
          strokeWidth={1.8}
          className="shrink-0 text-plp-clay"
        />

        <input
          type="search"
          aria-label="Search locations"
          placeholder="Search locations..."
          value={searchTerm}
          onFocus={() => setDropdown(null)}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            h-full min-w-0 flex-1
            appearance-none border-none
            bg-transparent font-text
            text-base text-plp-ink outline-none
            placeholder:text-plp-clay/70
            md:text-[14px]
            [&::-webkit-search-cancel-button]:hidden
          "
        />

        {searchTerm && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onSearchChange("")}
            className="
              flex h-7 w-7 shrink-0 cursor-pointer
              items-center justify-center rounded-md
              text-plp-clay
              hover:bg-plp-parchment
              hover:text-plp-maroon
            "
          >
            <X size={14} strokeWidth={1.8} />
          </button>
        )}
      </div>

      {/* Single-row filter controls */}
      <div
        className="
          flex w-full min-w-0 flex-nowrap
          items-center gap-1 overflow-x-auto
          overscroll-x-contain pb-0.5
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {/* Nearest */}
        <button
          type="button"
          onClick={() => {
            setDropdown(null);
            onLocateToggle();
          }}
          disabled={isLocating}
          aria-label={
            hasLocation ? "Clear your location" : "Find nearest locations"
          }
          aria-pressed={hasLocation}
          title={hasLocation ? "Clear location" : "Nearest locations"}
          className={`
            ${FILTER_BASE}
            w-9 px-0 md:w-auto md:px-2.5
            ${
              hasLocation
                ? "border-plp-navy/25 bg-plp-babyblue text-plp-navy"
                : FILTER_INACTIVE
            }
          `}
        >
          {isLocating ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Navigation size={14} strokeWidth={1.8} />
          )}

          <span className="hidden md:inline">
            {isLocating ? "Locating..." : "Nearest"}
          </span>
        </button>

        {/* Open now */}
        <button
          type="button"
          onClick={() => {
            setDropdown(null);
            onToggleOpenNow();
          }}
          aria-pressed={isOpenNow}
          aria-label="Open now"
          className={`
            ${FILTER_BASE}
            ${
              isOpenNow
                ? "border-plp-olive/25 bg-plp-lime text-plp-olive"
                : FILTER_INACTIVE
            }
          `}
        >
          <Clock size={13} strokeWidth={1.8} />

          <span className="md:hidden">Open</span>
          <span className="hidden md:inline">Open now</span>
        </button>

        {/* Price */}
        <button
          ref={priceButtonRef}
          type="button"
          onClick={() => toggleDropdown("price")}
          aria-expanded={dropdown === "price"}
          aria-controls="price-filter-panel"
          aria-label={
            selectedPrice ? `Price: ${selectedPrice.label}` : "Filter by price"
          }
          className={`
            ${FILTER_BASE}
            ${activePrice ? FILTER_ACTIVE : FILTER_INACTIVE}
          `}
        >
          <span className="md:hidden">
            {selectedPrice ? `Level ${selectedPrice.level}` : "Price"}
          </span>

          <span className="hidden md:inline">
            {selectedPrice ? `Level ${selectedPrice.level}` : "Level & Pay"}
          </span>

          <ChevronDown
            size={12}
            strokeWidth={1.8}
            className={`
              shrink-0 transition-transform duration-200
              ${dropdown === "price" ? "rotate-180" : ""}
            `}
          />
        </button>

        {/* Categories */}
        <button
          ref={categoryButtonRef}
          type="button"
          disabled={categories.length === 0}
          onClick={() => toggleDropdown("categories")}
          aria-expanded={dropdown === "categories"}
          aria-controls="category-filter-panel"
          aria-label={`Clothing categories, ${categoryCount} selected`}
          className={`
            ${FILTER_BASE}
            ${categoryCount > 0 ? FILTER_ACTIVE : FILTER_INACTIVE}
          `}
        >
          <span>Categories</span>

          {categoryCount > 0 && (
            <span
              className="
                rounded bg-plp-parchment/15
                px-1 text-[10px] tabular-nums
              "
            >
              {categoryCount}
            </span>
          )}

          <ChevronDown
            size={12}
            strokeWidth={1.8}
            className={`
              shrink-0 transition-transform duration-200
              ${dropdown === "categories" ? "rotate-180" : ""}
            `}
          />
        </button>
      </div>

      {/* Price dropdown */}
      {dropdown === "price" && (
        <div
          id="price-filter-panel"
          className={`
            ${DROPDOWN_BASE}
            md:right-auto md:w-[300px]
          `}
        >
          {/* Dropdown heading */}
          <div
            className="
              flex items-center justify-between
              border-b border-plp-secondary/70
              bg-plp-parchment px-3 py-2.5
            "
          >
            <h3 className="font-prata text-[14px] text-plp-maroon">
              Level &amp; Pay
            </h3>

            <button
              type="button"
              aria-label="Close price filter"
              onClick={closeDropdown}
              className="
                flex h-7 w-7 cursor-pointer
                items-center justify-center rounded-md
                text-plp-clay hover:bg-plp-secondary/50
              "
            >
              <X size={15} />
            </button>
          </div>

          <div
            role="group"
            aria-label="Price level"
            className="
              max-h-[45dvh] overflow-y-auto
              overscroll-contain p-1.5
            "
          >
            {/* Clear price */}
            <button
              type="button"
              aria-pressed={!activePrice}
              onClick={() => {
                onPriceSelect("");
                closeDropdown();
              }}
              className={`
                flex min-h-10 w-full cursor-pointer
                items-center justify-between
                rounded-md px-3 py-2.5
                text-left text-[13px] font-medium
                transition-colors
                ${
                  !activePrice
                    ? "bg-plp-blush/60 text-plp-maroon"
                    : "text-plp-clay hover:bg-plp-parchment"
                }
              `}
            >
              Any price
              {!activePrice && <Check size={14} strokeWidth={2} />}
            </button>

            <div className="my-1 h-px bg-plp-secondary/50" />

            {PRICE_LEVELS.map(({ level, label, range }) => {
              const value = String(level);
              const active = activePrice === value;

              return (
                <button
                  key={level}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    onPriceSelect(value);
                    closeDropdown();
                  }}
                  className={`
                    flex min-h-11 w-full cursor-pointer
                    items-center gap-2 rounded-md
                    px-3 py-2.5 text-left
                    transition-colors
                    ${
                      active
                        ? "bg-plp-blush/60 text-plp-maroon"
                        : "text-plp-ink hover:bg-plp-parchment"
                    }
                  `}
                >
                  <span className="min-w-0 flex-1 text-[13px] font-medium">
                    {label}
                  </span>

                  <span className="shrink-0 text-[12px] tabular-nums text-plp-clay">
                    {range}
                  </span>

                  <span className="flex w-4 shrink-0 justify-center">
                    {active && (
                      <Check
                        size={14}
                        strokeWidth={2}
                        className="text-plp-maroon"
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Categories dropdown */}
      {dropdown === "categories" && (
        <div
          id="category-filter-panel"
          className={`
            ${DROPDOWN_BASE}
            md:left-auto md:w-[320px]
          `}
        >
          {/* Dropdown heading */}
          <div
            className="
              flex items-center justify-between gap-2
              border-b border-plp-secondary/70
              bg-plp-parchment px-3 py-2.5
            "
          >
            <h3 className="font-prata text-[14px] text-plp-maroon">
              Clothing categories
            </h3>

            <button
              type="button"
              aria-label="Close category filter"
              onClick={closeDropdown}
              className="
                flex h-7 w-7 shrink-0 cursor-pointer
                items-center justify-center rounded-md
                text-plp-clay hover:bg-plp-secondary/50
              "
            >
              <X size={15} />
            </button>
          </div>

          {/* Category options */}
          <div
            role="group"
            aria-label="Clothing categories"
            className="
              grid max-h-[40dvh] grid-cols-2
              gap-1 overflow-y-auto
              overscroll-contain p-1.5
            "
          >
            {categories.map((cat) => {
              const active = activeCategories.includes(cat.slug);

              return (
                <label
                  key={cat.id}
                  className={`
                    flex min-h-11 cursor-pointer
                    items-center gap-2 rounded-md
                    px-2 py-2 transition-colors
                    ${
                      active
                        ? "bg-plp-blush/60 text-plp-maroon"
                        : "text-plp-clay hover:bg-plp-parchment"
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => onCategorySelect(cat.slug)}
                    className="peer sr-only"
                  />

                  <span
                    aria-hidden="true"
                    className={`
                      flex h-4 w-4 shrink-0
                      items-center justify-center
                      rounded border
                      peer-focus-visible:ring-2
                      peer-focus-visible:ring-plp-maroon/40
                      ${
                        active
                          ? "border-plp-maroon bg-plp-maroon text-plp-parchment"
                          : "border-plp-secondary-dark bg-white"
                      }
                    `}
                  >
                    {active && <Check size={11} strokeWidth={2.5} />}
                  </span>

                  <span className="min-w-0 break-words text-[12px] font-medium">
                    {cat.name}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Category footer */}
          <div
            className="
              flex items-center justify-between gap-2
              border-t border-plp-secondary
              bg-plp-parchment px-3 py-2
            "
          >
            <span aria-live="polite" className="text-[12px] text-plp-clay">
              {categoryCount} selected
            </span>

            <div className="flex items-center gap-3">
              {categoryCount > 0 && (
                <button
                  type="button"
                  onClick={onClearCategories}
                  className="
                    cursor-pointer text-[12px]
                    font-medium text-plp-clay
                    underline underline-offset-2
                    hover:text-plp-maroon
                  "
                >
                  Clear
                </button>
              )}

              <button
                type="button"
                onClick={closeDropdown}
                className="
                  plp-btn-primary h-9 cursor-pointer
                  rounded-md px-4 font-text
                  text-[12px] font-medium
                "
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
