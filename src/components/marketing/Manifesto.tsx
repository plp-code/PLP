"use client";

import { Display, Subtitle } from "../common/Typography";
import { ArrowLeft } from "lucide-react";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative w-full bg-[#b8ae9c] py-24 md:py-32 min-h-[130vh] overflow-hidden px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto mb-20 relative z-20">
        <Display className="text-6xl md:text-8xl lg:text-9xl text-plp-maroon tracking-tighter leading-none -rotate-1">
          [Something]
        </Display>
        <div className="h-1 w-32 bg-plp-maroon/20 mt-4" />
      </div>

      <div className="absolute top-[30%] left-[-15%] w-[140%] h-24 bg-plp-lime/30 rotate-[10deg] z-0 pointer-events-none flex items-center overflow-hidden">
        <div className="flex w-max flex-nowrap animate-marquee">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="font-seventies text-plp-maroon/20 text-3xl mx-8 uppercase tracking-[0.2em] whitespace-nowrap"
            >
              asdfsaf{" "}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute top-[38%] left-[-10%] w-[140%] h-20 bg-plp-lime/20 -rotate-[8deg] z-0 pointer-events-none flex items-center overflow-hidden">
        <div className="flex w-max flex-nowrap animate-marquee-reverse">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="font-text font-black text-plp-maroon/10 text-xl mx-12 uppercase tracking-[0.5em] whitespace-nowrap"
            >
              asdfads{" "}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-24 relative z-10">
        <div className="relative min-h-225">
          <div className="absolute inset-0 bg-white/30 rotate-3 translate-x-6 translate-y-4 shadow-sm rounded-sm z-0" />
          <div className="absolute inset-0 bg-white/50 -rotate-2 translate-x-4 translate-y-3 shadow-md rounded-sm z-10" />

          <div className="relative z-30 bg-[#fafafa] shadow-2xl rounded-sm min-h-full flex flex-col -rotate-1">
            <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

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

        {/* RIGHT SIDE: ANNOTATIONS */}
        <div className="relative lg:pt-48 flex flex-col space-y-40">
          <div className="relative pl-12">
            <div className="absolute -left-2 top-0 bottom-0 flex items-center">
              <span className="font-serif text-[12rem] leading-none text-blue-900/10 select-none">
                {"{"}
              </span>
            </div>
            <div className="relative">
              <h3 className="font-alike uppercase tracking-[0.2em] text-plp-maroon font-bold text-xl mb-4">
                [Mock]
              </h3>
              <p className="font-text text-lg text-plp-maroon/70 max-w-sm leading-relaxed mb-6">
                [Mock]
              </p>
              <div className="absolute -left-24 top-1/2 -translate-y-1/2 text-blue-900/20 rotate-[15deg]">
                <ArrowLeft className="w-16 h-16 stroke-[0.5px]" />
              </div>
            </div>
          </div>

          <div className="relative pl-12 group">
            <div className="absolute -left-20 top-0 text-red-900/20 -rotate-[20deg]">
              <ArrowLeft className="w-14 h-14 stroke-[1px]" />
            </div>
            <div className="relative">
              <div className="inline-block bg-plp-lime/10 px-2 py-1 mb-4 -rotate-1">
                <h3 className="font-alike uppercase tracking-[0.2em] text-plp-maroon font-bold text-xl">
                  [Mock]
                </h3>
              </div>
              <p className="font-text text-lg text-plp-maroon/70 max-w-sm leading-relaxed">
                [Mock]
              </p>
            </div>
          </div>

          <div className="relative pl-12">
            <div className="absolute -left-4 top-0 bottom-0 w-4 border-l-2 border-t-2 border-b-2 border-red-900/10 rounded-l-3xl" />
            <div className="relative py-2">
              <h3 className="font-alike uppercase tracking-[0.2em] text-plp-maroon font-bold text-xl mb-4">
                [Mock]
              </h3>
              <p className="font-text text-lg text-plp-maroon/70 max-w-sm leading-relaxed italic">
                [Mock]
              </p>
              <div className="mt-4 font-handwriting text-3xl text-red-900/30">
                (Pointer)
              </div>
              <div className="absolute -left-28 bottom-4 text-red-900/20 rotate-[45deg]">
                <ArrowLeft className="w-10 h-10 stroke-[1px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 left-10 w-40 h-40 border-4 border-double border-red-900/10 rounded-full flex items-center justify-center rotate-[-12deg] pointer-events-none">
        <span className="font-seventies text-[8px] tracking-[0.4em] text-red-900/20 font-black uppercase">
          Archive Verified
        </span>
      </div>
    </section>
  );
}
