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
      <Container className="pb-12 pt-16" borderBottom={true}>
        <div className="mb-20 border-l-4 border-plp-maroon pl-8">
          <Display className="text-4xl lg:text-7xl capitalize mb-4 leading-none">
            How We Serve
          </Display>
          <p className="font-prata text-[10px] md:text-2xl text-plp-maroon/60 tracking-widest font-bold max-w-6xl leading-relaxed">
            The Preloved Professional supports growth through community and
            culture.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 justify-center pb-16">
          {FEATURES.map((feature, index) => {
            const isDark = feature.theme === "dark";
            const isHovered = hoveredIndex === index;
            // later need to change for mobile (on click, not hover) and accessibility (focus state)
            return (
              <Link
                key={feature.label}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                href="/signup"
                className={`
                group relative flex-1 p-8 rounded-xl
                min-h-100 max-w-md w-full
                transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                border-2 border-plp-maroon
                flex flex-col justify-between overflow-hidden
                ${isHovered ? "z-20 scale-105 shadow-2xl" : "z-10 scale-100 opacity-90 lg:opacity-100"}
                ${isDark ? "bg-plp-maroon text-plp-parchment" : "bg-white text-plp-maroon hover:bg-plp-lime"}
              `}
              >
                <Label className="text-[14px] mb-4 opacity-60">
                  {feature.label}
                </Label>

                <div className="relative h-full flex flex-col justify-center">
                  <h3
                    className={`
                  absolute inset-0 flex items-center
                  font-prata text-5xl font-normal uppercase leading-[0.9] tracking-tighter
                  transition-all duration-500
                  ${isHovered ? "opacity-0 -translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"}
                `}
                  >
                    {feature.title}
                  </h3>

                  <div
                    className={`
                  transition-all duration-500 space-y-6
                  ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}
                `}
                  >
                    <p className="font-prata text-[22px] leading-snug font-bold">
                      {feature.desc}
                    </p>

                    <div className="pt-4 border-t border-current w-fit">
                      <Label className="text-[10px] tracking-widest flex items-center gap-2">
                        REQUEST ARCHIVE ACCESS{" "}
                        <span className="text-lg">→</span>
                      </Label>
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
