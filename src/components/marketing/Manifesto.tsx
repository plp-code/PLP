"use client";

import { Display, Subtitle } from "../common/Typography";
import { ArrowLeft } from "lucide-react";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative w-full py-24 md:py-32 min-h-[140vh] overflow-hidden px-4 md:px-8"
    >
      {/* SVG ROUGH EDGE FILTER */}
      <svg className="hidden">
        <filter id="torn-edge">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="5"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </svg>

      <div className="max-w-7xl mx-auto mb-20 relative z-20">
        <Display className="text-6xl md:text-8xl lg:text-9xl text-plp-maroon tracking-tighter leading-none -rotate-1">
          asdf{" "}
        </Display>
        <div className="h-1 w-32 bg-plp-maroon/20 mt-4" />
      </div>

      {/* STREAKS */}

      <div
        className="absolute top-[8%] left-[-10%] w-[150%] h-24 bg-plp-lime/40 rotate-14 z-0 pointer-events-none mix-blend-multiply"
        style={{ filter: "url(#tear-subtle)" }}
      />

      <div
        className="absolute top-[25%] right-[-20%] w-[160%] h-24 bg-plp-lime/25 -rotate-12 z-0 pointer-events-none mix-blend-multiply"
        style={{ filter: "url(#tear-rough)" }}
      />

      <div
        className="absolute top-[48%] left-[-5%] w-[140%] h-24 bg-plp-lime/15 rotate-3 z-0 pointer-events-none mix-blend-multiply opacity-60"
        style={{ filter: "url(#tear-subtle)" }}
      />

      <div
        className="absolute top-[20%] left-[10%] w-[40%] h-[150%] bg-plp-lime/10 rotate-78 z-0 pointer-events-none mix-blend-multiply"
        style={{ filter: "url(#tear-jagged)" }}
      />

      <div
        className="absolute top-[65%] right-[-15%] w-[150%] h-24 bg-plp-lime/35 -rotate-195 z-0 pointer-events-none mix-blend-multiply"
        style={{ filter: "url(#tear-rough)" }}
      />

      <div
        className="absolute top-[85%] left-[-25%] w-[160%] h-24 bg-plp-lime/50 rotate-6 z-0 pointer-events-none mix-blend-multiply"
        style={{ filter: "url(#tear-subtle)" }}
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-24 relative z-20">
        {/* LEFT SIDE: THE A4 STACK */}
        <div className="relative min-h-[900px]">
          <div className="absolute inset-0 bg-white/30 rotate-8 translate-x-16 translate-y-10 shadow-lg rounded-sm mix-blend-multiply opacity-90" />
          <div className="absolute inset-0 bg-white/50 -rotate-2 translate-x-4 translate-y-3 shadow-md rounded-sm" />

          <div
            className="relative z-30 bg-[#fafafa] shadow-2xl min-h-full flex flex-col -rotate-1"
            style={{
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/felt.png')]",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "multiply",
            }}
          >
            <div className="absolute inset-0 opacity-[0.6] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />

            <div className="relative z-50 p-12 md:p-20 lg:p-24 md:pl-28">
              <header className="mb-16">
                <Subtitle className="text-plp-maroon font-serif text-3xl md:text-5xl leading-tight">
                  [Mock]
                </Subtitle>
              </header>

              <article className="space-y-12">
                <p className="font-text text-xl md:text-2xl leading-relaxed text-plp-maroon/90">
                  [Mock]
                </p>
                <div className="py-6">
                  <p className="font-handwriting text-4xl md:text-6xl text-blue-900/60 leading-snug">
                    [Mock]
                  </p>
                </div>
                <p className="font-text text-xl md:text-2xl leading-relaxed text-plp-maroon/80">
                  [Mock]
                </p>

                <footer className="pt-24 border-t border-plp-maroon/5">
                  <div className="max-w-xs ml-auto text-right">
                    <p className="font-handwriting text-3xl text-plp-maroon/30 italic">
                      [Mock]
                    </p>
                  </div>
                </footer>
              </article>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: THE ANNOTATION WALL (Composed of Ripped Scraps) */}
        <div className="relative lg:pt-32 flex flex-col space-y-24 items-end">
          <div className="relative w-full max-w-sm rotate-2">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/30 backdrop-blur-sm rotate-[-2deg] z-20 border-x border-white/20 shadow-sm" />

            <div
              className="relative bg-white p-4 shadow-2xl"
              style={{ filter: "url(#torn-edge)" }}
            >
              <div className="pt-4 pb-2">
                <p className="font-handwriting text-xl text-plp-maroon/40 text-center italic">
                  fig. 01 — sourcing details
                </p>
              </div>
              <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            </div>
          </div>

          <div className="relative w-full max-w-md -rotate-1 translate-x-4">
            <div className="absolute -top-2 -right-4 w-16 h-8 bg-plp-parchment/20 backdrop-blur-[2px] rotate-[35deg] z-20 shadow-sm" />

            <div
              className="relative bg-[#e6e1d5] p-10 pr-12 shadow-xl"
              style={{
                filter: "url(#torn-edge)",
                backgroundImage:
                  "url('https://www.transparenttextures.com/patterns/linen.png')",
              }}
            >
              <div className="relative pl-12 mix-blend-multiply">
                <div className="absolute -left-6 top-0 bottom-0 flex items-center">
                  <span className="font-serif text-[10rem] leading-none text-blue-900/10 select-none">
                    {"{"}
                  </span>
                </div>
                <div className="relative">
                  <h3 className="font-alike uppercase tracking-[0.2em] text-plp-maroon font-bold text-xl mb-3">
                    [Mock]
                  </h3>
                  <p className="font-text text-base text-plp-maroon/70 leading-relaxed">
                    [Mock description text indicating importance. This is now on
                    its own ripped scrap.]
                  </p>
                  <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-blue-900/20 rotate-[15deg]">
                    <ArrowLeft className="w-12 h-12 stroke-[0.5px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-sm rotate-1 -translate-x-8">
            <div className="absolute -top-3 left-10 w-12 h-6 bg-white/10 backdrop-blur-sm -rotate-12 z-20" />
            <div className="absolute -bottom-2 right-10 w-12 h-6 bg-white/10 backdrop-blur-sm rotate-6 z-20" />

            <div
              className="relative bg-[#fafafa] p-8 shadow-lg"
              style={{
                filter: "url(#torn-edge)",
                backgroundImage:
                  "url('https://www.transparenttextures.com/patterns/handmade-paper.png')",
              }}
            >
              <div className="relative group mix-blend-multiply">
                <div className="absolute -left-16 top-0 text-red-900/20 -rotate-[20deg]">
                  <ArrowLeft className="w-12 h-12 stroke-[1px]" />
                </div>
                <div className="relative">
                  <div className="inline-block bg-plp-lime/20 px-3 py-1 mb-3 -rotate-1 mix-blend-multiply border-l-2 border-plp-lime">
                    <h3 className="font-alike uppercase tracking-[0.2em] text-plp-maroon font-bold text-lg">
                      [Mock]
                    </h3>
                  </div>
                  <p className="font-text text-base text-plp-maroon/70 leading-relaxed">
                    [Mock text on a smaller torn fragment.]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
