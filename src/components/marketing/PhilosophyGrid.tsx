"use client";

import { useState } from "react";
import { Container } from "../common/Container";
import { Label, Display } from "../common/Typography";
import { ChevronRight } from "lucide-react";

const FEATURES = [
  {
    label: "01",

    title: "Professional Identity",

    desc: "We treat preloved fashion as a professional strategy, not a compromise. Members build presence and signal discernment.",
  },

  {
    label: "02",

    title: "Access & Opportunity",

    desc: "We create access to people, places, and opportunities not visible through traditional career channels.",
  },

  {
    label: "03",

    title: "Community Led",

    desc: "Moving ideas off-screen through city-based resources, events, and shared physical experiences.",
  },
];

export default function FeatureDossierStack() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-plp-parchment py-12 md:py-20" id="philosophy">
      <Container>
        <div className="mb-16 border-l-2 border-plp-maroon pl-6 max-w-2xl">
          <Display className="text-4xl md:text-5xl capitalize mb-3 leading-none text-plp-maroon">
            How We Serve
          </Display>
          <p className="font-prata not-italic text-sm md:text-base text-plp-maroon/70 tracking-wide uppercase">
            Supporting growth through community and culture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
          <div className="flex flex-col border-t border-plp-maroon/20">
            {FEATURES.map((feature, index) => (
              <button
                key={feature.label}
                onClick={() => setActiveIndex(index)}
                className={`
                  group flex items-center justify-between py-6 border-b border-plp-maroon/20 transition-all text-left
                  ${activeIndex === index ? "pl-4" : "pl-0 opacity-40 hover:opacity-100"}
                `}
              >
                <div className="flex items-center gap-4">
                  <Label className="text-[10px] text-plp-maroon">
                    {feature.label}
                  </Label>
                  <h3 className="font-prata not-italic text-xl uppercase tracking-tight text-plp-maroon">
                    {feature.title}
                  </h3>
                </div>
                <ChevronRight
                  size={18}
                  className={`transition-transform duration-500 ${activeIndex === index ? "rotate-0 text-plp-maroon" : "-rotate-90 text-plp-maroon/20"}`}
                />
              </button>
            ))}
          </div>

          {/* ACTIVE FILE PAGE */}
          <div className="relative min-h-100">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.label}
                className={`
                  absolute inset-0 bg-white border border-plp-maroon p-8 md:p-12 shadow-xl transition-all duration-700 ease-in-out
                  ${
                    activeIndex === index
                      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                      : "opacity-0 translate-y-8 scale-95 pointer-events-none"
                  }
                `}
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="space-y-8">
                    <h4 className="font-prata not-italic text-3xl md:text-5xl text-plp-maroon leading-[0.9] uppercase tracking-tighter">
                      {feature.title}
                    </h4>

                    <p className="font-text text-base md:text-lg text-plp-maroon/80 leading-relaxed max-w-lg">
                      {feature.desc}
                    </p>
                  </div>

                  <div className="pt-8 mt-12 border-t border-plp-maroon/10 flex items-center justify-between">
                    <div className="h-2 w-2 rounded-full bg-plp-lime animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
