"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronDown,
  MapPin,
  Navigation,
  DollarSign,
} from "lucide-react";
import { getTodayHours, getWeekHours, formatPriceLevel } from "@/lib/utils";

export function StoreDetailView({ store, onBack, distance }: any) {
  const timeData = getTodayHours(store.hours);
  const week = getWeekHours(store.hours);
  const today = week.find((d) => d.isToday);
  const priceLevel = formatPriceLevel(store.price_level);

  const [hoursOpen, setHoursOpen] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto flex flex-col bg-gray-50 pb-24 md:pb-0 relative animate-in slide-in-from-right-4 md:duration-300">
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 p-2 md:p-4 transition-all pt-6 md:pt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 md:gap-2 active:text-blue-600 hover:text-blue-700 px-3 py-2 md:py-1.5 rounded-xl active:bg-blue-50 hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={20} className="md:w-5 md:h-5 -ml-1 shrink-0" />
        
        </button>
      </div>

      <div className="relative h-40 md:h-52 w-full shrink-0 overflow-hidden bg-gradient-to-br from-gray-200/60 to-gray-400/60 border-b border-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/30 p-5 rounded-3xl backdrop-blur-md shadow-lg ring-1 ring-white/30">
            <MapPin size={36} className="text-white" />
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <div
            className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm ${
              timeData.isOpen
                ? "text-emerald-700 bg-white/90"
                : "text-gray-600 bg-white/85"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                timeData.isOpen
                  ? "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.6)]"
                  : "bg-gray-400"
              }`}
            />
            {timeData.isOpen ? "Open" : "Closed"}
          </div>
        </div>
      </div>

      <div className="px-5 md:px-6 py-6 flex flex-col gap-6 w-full">
        <div className="flex flex-col">
          <h2 className="font-bodoni capitalize text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
            {store.name}
          </h2>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            {distance !== null && (
              <div className="flex items-center gap-1.5 text-blue-700 font-bold text-[13px] md:text-sm bg-blue-50 px-2.5 py-1 rounded-md">
                <Navigation size={13} className="fill-blue-200" />
                <span>{distance.toFixed(1)} mi away</span>
              </div>
            )}
            {priceLevel && (
              <div className="flex items-center gap-1 text-emerald-700 font-black text-[13px] md:text-sm bg-emerald-50 px-2.5 py-1 rounded-md tracking-wide">
                {priceLevel}
              </div>
            )}
          </div>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-fit flex items-center justify-center gap-2 px-6 py-3.5 md:py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] md:text-base font-bold rounded-xl shadow-md shadow-blue-600/20 active:scale-[0.98] transition-all"
          >
            <Navigation size={18} className="md:w-5 md:h-5" />
            Get Directions
          </a>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <button
            onClick={() => setHoursOpen((o) => !o)}
            className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-baseline gap-3 min-w-0">
              <span className="font-bold text-[13px] uppercase tracking-wider text-gray-400 shrink-0">
                Hours
              </span>
              <span
                className={`text-[15px] font-semibold truncate ${
                  timeData.isOpen ? "text-emerald-700" : "text-gray-700"
                }`}
              >
                {today ? today.string : timeData.string}
              </span>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-400 shrink-0 transition-transform duration-200 ${
                hoursOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {hoursOpen && (
            <div className="border-t border-gray-100 px-4 py-2">
              {week.map((d) => (
                <div
                  key={d.label}
                  className={`flex items-center justify-between py-1.5 text-[14px] ${
                    d.isToday ? "font-bold text-gray-900" : "text-gray-500"
                  }`}
                >
                  <span>{d.label}</span>
                  <span className={d.isClosed ? "text-gray-400" : ""}>
                    {d.string}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {store.description && (
          <div className="flex flex-col">
            <span className="font-bold text-[13px] uppercase tracking-wider text-gray-400 block mb-2">
              About
            </span>
            <p className="text-gray-600 text-[16px] font-bodoni  md:text-base leading-relaxed whitespace-pre-wrap">
              {store.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
