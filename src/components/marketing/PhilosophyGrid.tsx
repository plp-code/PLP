"use client";

import Link from "next/link";
import { Container } from "../common/Container";
import { Label, Display } from "../common/Typography";
import { useState } from "react";

const FEATURES = [
  {
    label: "01",
    title: "Professional Identity",
    desc: "We treat preloved fashion as a professional strategy, not a compromise. Members build presence and signal discernment.",
    theme: "light",
  },
  {
    label: "02",
    title: "Access & Opportunity",
    desc: "We create access to people, places, and opportunities not visible through traditional career channels.",
    theme: "dark",
  },
  {
    label: "03",
    title: "Community Led",
    desc: "Moving ideas off-screen through city-based resources, events, and shared physical experiences.",
    theme: "light",
  },
];

export default function FeatureFloatingGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <section className="bg-plp-parchment" id="philosophy">
      <Container className="pb-24 pt-16">
        <div className="mb-20 border-l-4 border-plp-maroon pl-8 max-w-4xl">
          <Display className="text-5xl lg:text-7xl capitalize mb-6 leading-[0.85]">
            How We Serve
          </Display>
          <p className="font-prata text-xl md:text-2xl text-plp-maroon/80 leading-relaxed">
            The Preloved Professional supports growth through community and
            culture.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch">
          {FEATURES.map((feature, index) => {
            const isDark = feature.theme === "dark";
            const isHovered = hoveredIndex === index;

            return (
              <Link
                key={feature.label}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                href="/waitlist"
                className={`
                  group relative flex-1 p-10 rounded-2xl
                  min-h-100 w-full
                  transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                  border-2 border-plp-maroon
                  flex flex-col 
                  ${isHovered ? "z-20 -translate-y-4 shadow-[20px_20px_0px_0px_rgba(61,11,25,0.1)]" : "z-10 translate-y-0 shadow-none"}
                  ${isDark ? "bg-plp-maroon text-plp-parchment" : "bg-white text-plp-maroon hover:bg-plp-lime"}
                `}
              >
                <div className="flex justify-between items-start mb-12">
                  <Label className="text-sm font-bold tracking-widest opacity-60">
                    [{feature.label}]
                  </Label>
                  <div
                    className={`h-2 w-2 rounded-full animate-pulse ${isDark ? "bg-plp-lime" : "bg-plp-maroon"}`}
                  />
                </div>

                <div className="relative grow flex flex-col justify-end">
                  <h3
                    className={`
                      absolute bottom-0 left-0 w-full
                      font-prata text-5xl lg:text-4xl uppercase leading-[0.9] tracking-tighter
                      transition-all duration-500
                      ${isHovered ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"}
                    `}
                  >
                    {feature.title}
                  </h3>

                  <div
                    className={`
                      transition-all duration-500 space-y-8
                      ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"}
                    `}
                  >
                    <p className="font-bodoni text-2xl leading-tight font-medium">
                      {feature.desc}
                    </p>

                    <div className="pt-6 border-t border-current flex items-center justify-between">
                      <Label className="text-[10px] tracking-[0.2em] font-black uppercase">
                        Request Access
                      </Label>
                      <span className="text-2xl transition-transform group-hover:translate-x-2">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
