"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin, Tag, X } from "lucide-react";

const EVENT = {
  title: "The Preloved Professional Thrift Pop-Up",
  date: "Sunday, November 15",
  time: "12:00 - 3:00 PM",
  location: "8151 W 3rd St, Los Angeles, CA",
  href: "https://partiful.com/e/dbFF7gSfKLyQZRXPH2IP",
  endsAt: new Date("2026-11-15T15:00:00-08:00"),
  priceRange: "Everything sold will be under $35",
  description:
    "Curated workwear from extra small sizes to plus sizes. Find your perfect blazer and your future business partner.",
} as const;

const SESSION_KEY = "plp-popup-nov-15-2026";

function hasBeenDismissed() {
  try {
    return sessionStorage.getItem(SESSION_KEY) !== null;
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    sessionStorage.setItem(SESSION_KEY, "true");
  } catch {}
}

export default function EventAnnouncementModal() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    markDismissed();
    setOpen(false);
  }, []);

  useEffect(() => {
    if (new Date() < EVENT.endsAt && !hasBeenDismissed()) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-plp-navy/65 p-3 backdrop-blur-[3px] sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-popup-title"
        className="relative flex max-h-[min(90dvh,760px)] w-full max-w-[850px] flex-col overflow-y-auto overflow-x-hidden bg-plp-parchment shadow-2xl md:flex-row"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close announcement"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center border border-plp-maroon/15 bg-plp-parchment/95 text-plp-maroon transition-colors hover:bg-plp-lime"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        <div className="flex flex-1 flex-col px-6 pb-7 pt-6 sm:px-9 sm:pb-9 sm:pt-8 md:justify-center md:px-10 md:py-12">
          <h2
            id="event-popup-title"
            className="text-balance pr-10 font-bodoni text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1] tracking-[-0.025em] text-plp-maroon mb-4"
          >
            {EVENT.title}
          </h2>

          <p className="font-prata text-[13px] leading-6 text-plp-maroon/75">
            {EVENT.description}
          </p>

          <div className="mt-6 space-y-3 border-y border-plp-maroon/20 py-5">
            <div className="flex items-start gap-3">
              <CalendarDays
                size={17}
                strokeWidth={1.5}
                className="mt-0.5 shrink-0 text-plp-maroon"
                aria-hidden="true"
              />
              <div>
                <p className="font-prata text-[13px] font-semibold text-plp-maroon">
                  {EVENT.date}
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-plp-maroon/60">
                  {EVENT.time}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin
                size={17}
                strokeWidth={1.5}
                className="mt-0.5 shrink-0 text-plp-maroon"
                aria-hidden="true"
              />
              <p className="font-prata text-[13px] text-plp-maroon">
                {EVENT.location}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Tag
                size={17}
                strokeWidth={1.5}
                className="mt-0.5 shrink-0 text-plp-maroon"
                aria-hidden="true"
              />
              <p className="font-prata text-[13px] text-plp-maroon">
                {EVENT.priceRange}
              </p>
            </div>
          </div>

          <a
            href={EVENT.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="group mt-4 flex min-h-12 items-center justify-center gap-3 bg-plp-maroon px-5 py-3 font-prata text-[11px] font-semibold uppercase tracking-[0.12em] text-plp-parchment transition-colors hover:bg-plp-navy"
          >
            RSVP
            <ArrowUpRight
              size={17}
              strokeWidth={1.5}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

          <button
            type="button"
            onClick={close}
            className="mt-4 self-center font-mono text-[10px] uppercase tracking-[0.1em] text-plp-maroon/45 underline-offset-4 transition-colors hover:text-plp-maroon hover:underline"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
