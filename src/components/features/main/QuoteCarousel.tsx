"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "../../ui/Container";

interface CarouselProps {
  quotes?: Record<string, string>;
}

const DEFAULT_QUOTES = {
  "Joan Didion": "Style is character.",
  "Phoebe Philo":
    "I don't want to dictate how someone should dress. I want to inspire them to find their own style.",
  "Iris Apfel": "Great personal style is an extreme curiosity about yourself.",
  "Miuccia Prada":
    "What you wear is how you present yourself to the world, especially today, when human contacts are so quick. Fashion is instant language.",
  "Audre Lorde":
    "When I dare to be powerful - to use my strength in the service of my vision, then it becomes less and less important whether I am afraid.",
};

const SWIPE_THRESHOLD = 45;

export default function QuoteCarousel({
  quotes = DEFAULT_QUOTES,
}: CarouselProps) {
  const entries = useMemo(() => Object.entries(quotes), [quotes]);

  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const nextQuote = useCallback(() => {
    if (!entries.length) return;

    setIndex((prev) => (prev + 1) % entries.length);
  }, [entries.length]);

  const prevQuote = useCallback(() => {
    if (!entries.length) return;

    setIndex((prev) => (prev - 1 + entries.length) % entries.length);
  }, [entries.length]);

  const selectQuote = useCallback((i: number) => {
    setIndex(i);
    setIsAutoPlaying(false);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || entries.length <= 1) return;

    const timer = window.setInterval(nextQuote, 5000);

    return () => window.clearInterval(timer);
  }, [isAutoPlaying, nextQuote, entries.length]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const deltaX = endX - touchStartX.current;
    const deltaY = endY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    // Only treat the gesture as a swipe when it is
    // clearly more horizontal than vertical.
    if (
      Math.abs(deltaX) < SWIPE_THRESHOLD ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return;
    }

    setIsAutoPlaying(false);

    if (deltaX < 0) {
      nextQuote();
    } else {
      prevQuote();
    }
  };

  if (!entries.length) return null;

  return (
    <Container
      fullBleed
      className="relative overflow-hidden border-y border-plp-parchment/10 bg-plp-maroon"
      contentClassName="max-w-6xl px-4 sm:px-6 md:px-10"
    >
      <div
        className="group relative py-9 md:py-12"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="flex items-stretch md:gap-3">
          <button
            type="button"
            onClick={prevQuote}
            aria-label="Previous quote"
            className="group/prev hidden w-16 shrink-0 cursor-pointer items-center justify-center text-plp-lime/55 transition-colors duration-300 hover:text-plp-lime focus-visible:outline-none focus-visible:text-plp-lime md:flex lg:w-20"
          >
            <ChevronLeft className="h-7 w-7 stroke-[1.5px] transition-transform duration-300 group-hover/prev:-translate-x-1" />
          </button>

          <div
            className="grid min-h-[170px] w-full touch-pan-y select-none grid-cols-1 grid-rows-1 text-center sm:min-h-[150px] md:min-h-[160px]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {entries.map(([author, quote], i) => (
              <figure
                key={author}
                aria-hidden={i !== index}
                className={`col-start-1 row-start-1 flex flex-col items-center justify-center px-1 transition-all duration-500 ease-out sm:px-3 ${
                  i === index
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-2 opacity-0"
                }`}
              >
                <blockquote className="mb-2 max-w-4xl text-balance font-handwriting text-lg leading-relaxed tracking-tight text-plp-testz md:text-2xl lg:text-3xl">
                  &ldquo;{quote}&rdquo;
                </blockquote>

                <cite className="not-italic">
                  <span className="font-architect text-xs capitalize tracking-widest text-plp-testz/70 md:text-xl">
                    — {author}
                  </span>
                </cite>
              </figure>
            ))}
          </div>

          <button
            type="button"
            onClick={nextQuote}
            aria-label="Next quote"
            className="group/next hidden w-16 shrink-0 cursor-pointer items-center justify-center text-plp-lime/55 transition-colors duration-300 hover:text-plp-lime focus-visible:outline-none focus-visible:text-plp-lime md:flex lg:w-20"
          >
            <ChevronRight className="h-7 w-7 stroke-[1.5px] transition-transform duration-300 group-hover/next:translate-x-1" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center gap-5 md:hidden">
          <button
            type="button"
            onClick={prevQuote}
            aria-label="Previous quote"
            className="flex min-h-11 min-w-11 items-center justify-center text-plp-lime/55 transition-all active:-translate-x-1 active:text-plp-lime"
          >
            <ChevronLeft className="h-5 w-5 stroke-[1.5px]" />
          </button>

          <span className="font-mono text-[9px] tabular-nums tracking-[0.14em] text-plp-parchment/40">
            {String(index + 1).padStart(2, "0")}
            <span className="mx-1.5 text-plp-parchment/20">/</span>
            {String(entries.length).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={nextQuote}
            aria-label="Next quote"
            className="flex min-h-11 min-w-11 items-center justify-center text-plp-lime/55 transition-all active:translate-x-1 active:text-plp-lime"
          >
            <ChevronRight className="h-5 w-5 stroke-[1.5px]" />
          </button>
        </div>

        <div className="relative z-10 mt-2 flex items-center justify-center gap-2 md:mt-3">
          {entries.map(([author], i) => (
            <button
              key={author}
              type="button"
              onClick={() => selectQuote(i)}
              aria-label={`View quote by ${author}`}
              aria-current={i === index ? "true" : undefined}
              className="group/indicator flex h-6 items-center justify-center px-0.5 focus-visible:outline-none"
            >
              <span
                className={`block h-1 transition-all duration-300 ${
                  i === index
                    ? "w-7 bg-plp-lime"
                    : "w-1.5 bg-plp-lime/35 group-hover/indicator:w-3 group-hover/indicator:bg-plp-lime/70"
                }`}
              />
            </button>
          ))}
        </div>

        <p className="mt-1 text-center font-mono text-[8px] uppercase tracking-[0.14em] text-plp-parchment/25 md:hidden">
          Swipe to browse
        </p>
      </div>
    </Container>
  );
}
