"use client";

import {
  ChevronLeft,
  MapPin,
  Navigation,
  Clock,
  DollarSign,
  Info,
} from "lucide-react";
import { getTodayHours, formatPriceLevel, formatPriceRange } from "@/lib/utils";

export function StoreDetailView({ store, onBack, distance }: any) {
  return (
    <div
      className="flex-1 overflow-y-auto flex flex-col bg-white pb-24 md:pb-0 relative animate-in slide-in-from-right-4 md:duration-300"
    >

      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 p-2 md:p-4 transition-all pt-6 md:pt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 md:gap-2 text-[14px] md:text-sm font-bold text-gray-600 active:text-blue-600 hover:text-blue-700 px-3 py-2 md:py-1.5 rounded-xl active:bg-blue-50 hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={20} className="md:w-5 md:h-5" />
          Back to list
        </button>
      </div>

      <div className="h-44 md:h-56 w-full bg-gradient-to-br from-blue-50 via-gray-100 to-gray-200 relative flex items-center justify-center shrink-0 border-b border-gray-100">
        <div className="bg-white/50 p-4 rounded-full backdrop-blur-sm shadow-sm">
          <MapPin size={32} className="text-gray-400" />
        </div>
      </div>

      <div className="p-5 md:p-8 flex flex-col gap-6 md:gap-8 max-w-3xl mx-auto w-full">
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">
            {store.name}
          </h2>

          {distance !== null && (
            <div className="flex items-center gap-1.5 text-blue-600 font-bold text-[14px] md:text-sm mb-6 bg-blue-50 w-fit px-2.5 py-1 rounded-md">
              <Navigation size={14} className="fill-blue-100" />
              <span>{distance.toFixed(1)} miles away</span>
            </div>
          )}

          {distance === null && <div className="mb-6"></div>}

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 md:py-4 bg-blue-600 hover:bg-blue-700 text-white text-[15px] md:text-base font-bold rounded-xl shadow-md shadow-blue-600/20 active:scale-[0.98] transition-all"
          >
            <Navigation size={18} className="md:w-5 md:h-5" />
            Get Directions
          </a>
        </div>

        <hr className="border-gray-100" />

        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex gap-4 md:gap-5">
            <div className="bg-blue-50/80 p-3 rounded-2xl h-fit shrink-0 border border-blue-100/50">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div className="flex-1 pt-0.5">
              <span className="font-bold text-[15px] md:text-base text-gray-900 block mb-1">
                Hours
              </span>
              <span className="text-gray-600 text-[14px] md:text-[15px]">
                {getTodayHours(store.hours).string}
              </span>
            </div>
          </div>

          {(store.price_level ||
            store.min_price != null ||
            store.max_price != null) && (
            <div className="flex gap-4 md:gap-5">
              <div className="bg-emerald-50/80 p-3 rounded-2xl h-fit shrink-0 border border-emerald-100/50">
                <DollarSign size={20} className="text-emerald-600" />
              </div>
              <div className="flex-1 pt-0.5">
                <span className="font-bold text-[15px] md:text-base text-gray-900 block mb-1">
                  Pricing
                </span>
                <div className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg w-fit mb-2">
                  <span className="text-gray-800 font-semibold text-[14px] md:text-[15px]">
                    Level: {formatPriceLevel(store.price_level) || "N/A"}
                  </span>
                </div>
                {formatPriceRange(store.min_price, store.max_price) && (
                  <span className="text-gray-500 text-[14px] leading-relaxed block">
                    {formatPriceRange(store.min_price, store.max_price)}
                  </span>
                )}
              </div>
            </div>
          )}

          {store.description && (
            <div className="flex gap-4 md:gap-5">
              <div className="bg-gray-50 p-3 rounded-2xl h-fit shrink-0 border border-gray-100">
                <Info size={20} className="text-gray-600" />
              </div>
              <div className="flex-1 pt-0.5">
                <span className="font-bold text-[15px] md:text-base text-gray-900 block mb-1.5">
                  About
                </span>
                <p className="text-gray-600 text-[14px] md:text-[15px] leading-relaxed whitespace-pre-wrap">
                  {store.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
