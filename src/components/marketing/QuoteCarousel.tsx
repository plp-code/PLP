"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "../common/Container";

interface CarouselProps {
  quotes?: { [key: string]: string };
}

export default function QuoteCarousel({
  quotes = {
    "Joan Didion": "Style is character.",
    "Phoebe Philo":
      "I don't want to dictate how someone should dress. I want to inspire them to find their own style.",
    "Iris Apfel":
      "Great personal style is an extreme curiosity about yourself.",
    "Miuccia Prada":
      "What you wear is how you present yourself to the world, especially today, when human contacts are so quick. Fashion is instant language.",
    "Audre Lorde":
      "When I dare to be powerful - to use my strength in the service of my vision, then it becomes less and less important whether I am afraid.",
  },
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextQuote = useCallback(() => {
    setIndex((prev) => (prev + 1) % Object.keys(quotes).length);
  }, [quotes]);

  const prevQuote = () => {
    setIndex(
      (prev) =>
        (prev - 1 + Object.keys(quotes).length) % Object.keys(quotes).length,
    );
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextQuote, 3000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextQuote]);

  return (
    <Container
      fullBleed
      className="bg-plp-maroon border-y-2 border-plp-maroon relative overflow-hidden"
    >
      <div
        className="relative pt-20 pb-12 md:pt-26 md:pb-14 group"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* DYNAMIC WRAPPER: 
            - max-w-8xl sets your upper limit.
            - flex items-center allows arrows to sit on the sides.
            - w-fit + mx-auto ensures the whole unit shrinks to the text width.
        */}
        <div className="max-w-8xl mx-auto px-12 relative z-10 flex items-center justify-center w-fit">
          {/* Left Arrow: Relative to the text box */}
          <button
            onClick={prevQuote}
            className="hidden lg:block p-4 opacity-0 group-hover:opacity-100 transition-all hover:-translate-x-1 text-plp-lime/30 hover:text-plp-lime flex-shrink-0"
          >
            <ChevronLeft className="w-10 h-10 stroke-[1px]" />
          </button>

          {/* Quote Content */}
          <div className="grid grid-cols-1 grid-rows-1 w-full text-center text-plp-lime px-4 md:px-8">
            {Object.entries(quotes).map(([author, quote], i) => (
              <div
                key={i}
                className={`col-start-1 row-start-1 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
                  i === index
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                }`}
              >
                <blockquote className="font-abc text-2xl md:text-4xl lg:text-4xl leading-relaxed tracking-tight mb-8 text-balance">
                  “{quote}”
                </blockquote>

                <cite className="flex not-italic flex-col flex-wrap gap-4 justify-center">
                  <span className="font-architect capitalize tracking-[0.05em] text-base md:text-4xl opacity-80">
                    — {author}
                  </span>
                </cite>
              </div>
            ))}
          </div>

          {/* Right Arrow: Relative to the text box */}
          <button
            onClick={nextQuote}
            className="hidden lg:block p-4 opacity-0 group-hover:opacity-100 transition-all hover:translate-x-1 text-plp-lime/30 hover:text-plp-lime flex-shrink-0"
          >
            <ChevronRight className="w-10 h-10 stroke-[1px]" />
          </button>
        </div>

        {/* Indicators (Scroll Wheel) */}
        <div className="flex gap-3 mt-8 justify-center relative z-10">
          {Object.entries(quotes).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="group py-2 focus:outline-none"
              aria-label={`View quote ${i + 1}`}
            >
              <div
                className={`h-1 transition-all duration-500 ease-out rounded-full ${
                  i === index
                    ? "w-12 bg-plp-lime"
                    : "w-3 bg-plp-lime/20 group-hover:bg-plp-lime/40"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Streak backdrop */}
        <div className="absolute top-1/2 left-[-5%] w-[110%] h-40 bg-white/2 mix-blend-overlay -rotate-1 pointer-events-none z-0" />
      </div>
    </Container>
  );
}
