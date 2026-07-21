"use client";

import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Display, Subtitle, Label } from "@/components/ui/Typography";
import { Plus } from "lucide-react";

const PILLARS = [
  {
    label: "01",
    title: "[pillar one]",
    secret: "[TAG_ONE]",
    desc: "[some text]",
  },
  {
    label: "02",
    title: "[pillar two]",
    secret: "[TAG_TWO]",
    desc: "[some text]",
  },
  {
    label: "03",
    title: "[pillar three]",
    secret: "[TAG_THREE]",
    desc: "[some text]",
  },
];

export default function Manifesto() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextPillar = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % PILLARS.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextPillar, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextPillar]);

  return (
    <section
      id="manifesto"
      className="relative w-full overflow-hidden bg-plp-parchment py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.08))] pointer-events-none z-0" />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
        }}
      />
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[12%] -left-[10%] w-[120%] h-12 bg-plp-lime/40 mix-blend-multiply rotate-[20deg] blur-[2px]" />
        <div className="absolute top-[48%] -left-[10%] w-[120%] h-16 bg-plp-lime/45 mix-blend-multiply -rotate-[12deg] blur-[2px]" />
        <div className="absolute bottom-[14%] -left-[10%] w-[120%] h-10 bg-plp-lime/35 mix-blend-multiply rotate-[24deg] blur-[2px]" />
      </div>

      <Container className="relative z-10">
        <header className="max-w-3xl mb-14 md:mb-20">
          <Display className="text-5xl md:text-8xl lowercase tracking-tight leading-[0.85] text-plp-maroon">
            <span className="relative inline-block">
              [who we are]
              <span className="absolute -bottom-1 left-0 h-3 md:h-4 w-full bg-plp-lime/50 mix-blend-multiply -rotate-1 -z-10" />
            </span>
          </Display>
          <Subtitle className="font-bodoni italic text-xl md:text-3xl text-plp-clay leading-snug mt-6 md:mt-8 max-w-2xl">
            [some text]
          </Subtitle>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-start">
          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-0 translate-y-4.5 translate-x-3.5 bg-[#bfc2c7] border border-black/5 shadow-[0_18px_40px_rgba(0,0,0,0.10)]" />
            <div className="absolute inset-0 translate-y-3 translate-x-2.25 bg-[#d6d1c7] border border-black/5 shadow-[0_14px_32px_rgba(0,0,0,0.08)]" />
            <div className="absolute inset-0 translate-y-1.5 translate-x-1 bg-[#e5dfd3] border border-black/4 shadow-[0_10px_24px_rgba(0,0,0,0.06)]" />

            <div
              className="relative bg-plp-parchment border border-black/6 overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.18)]"
              style={{
                backgroundImage: `
                  radial-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(0,0,0,0.03))
                `,
                backgroundSize: "4px 4px, 100% 100%",
              }}
            >
              <div className="absolute left-0 top-0 h-full w-2 bg-black/2.5" />
              <div className="absolute bottom-0 left-0 w-full h-2.5 bg-black/2" />

              <div className="absolute left-3 md:left-5 top-20 md:top-24 flex flex-col gap-24 md:gap-36 z-30">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full bg-[#d8d3ca] border border-black/10 shadow-inner"
                  />
                ))}
              </div>

              <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
                <div
                  className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-black/20 to-transparent"
                  style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                />
              </div>

              <div className="relative z-40 pl-14 pr-6 pt-12 pb-12 md:pl-24 md:pr-14 md:pt-16 md:pb-14">
                <p className="font-mono uppercase tracking-[0.3em] text-xs text-plp-navy/45 mb-6 md:mb-8">
                  [a note]
                </p>

                <article className="space-y-6 md:space-y-7 max-w-xl">
                  <Subtitle className="font-bodoni italic text-xl md:text-3xl text-plp-maroon leading-snug">
                    [some text]
                  </Subtitle>

                  <div className="space-y-4 md:space-y-5 text-plp-maroon/80 leading-relaxed text-base md:text-lg font-light">
                    <p>[some text]</p>
                    <p>[some text]</p>
                    <p>[some text]</p>
                  </div>

                  <div className="w-full h-px bg-plp-maroon/10 my-6 md:my-8" />

                  <div className="space-y-2">
                    <p className="font-mono uppercase text-xs tracking-[0.25em] text-plp-navy/35">
                      [signed]
                    </p>
                    <p className="font-handwriting text-2xl md:text-4xl text-plp-navy/60 -rotate-2">
                      [signature]
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div
            className="lg:pt-4"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="border-l-2 border-plp-maroon pl-5 md:pl-6 mb-8 md:mb-10">
              <p className="font-mono uppercase tracking-[0.3em] text-xs text-plp-navy/50 mb-4">
                [what we&apos;re building]
              </p>
              <Display className="text-3xl md:text-5xl lowercase leading-none text-plp-maroon">
                [some text]
              </Display>
            </div>

            <div className="flex flex-col border-t border-plp-maroon/20">
              {PILLARS.map((pillar, index) => {
                const active = activeIndex === index;
                return (
                  <button
                    key={pillar.label}
                    onClick={() => {
                      setActiveIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className="group relative text-left border-b border-plp-maroon/20"
                  >
                    <span
                      className={`absolute left-0 top-0 h-full w-[3px] bg-plp-maroon origin-top transition-transform duration-500 ${
                        active ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                    <div
                      className={`flex items-center justify-between gap-4 py-5 transition-all duration-300 ${
                        active
                          ? "pl-4 bg-plp-lime/10"
                          : "pl-0 opacity-45 hover:opacity-100 hover:pl-2"
                      }`}
                    >
                      <div className="flex items-baseline gap-3 md:gap-4">
                        <Label
                          className={`text-[10px] tabular-nums transition-colors ${
                            active ? "text-plp-maroon" : "text-plp-maroon/50"
                          }`}
                        >
                          {pillar.label}
                        </Label>
                        <h3 className="font-prata not-italic text-lg md:text-2xl uppercase tracking-tight text-plp-maroon">
                          {pillar.title}
                        </h3>
                      </div>
                      <Plus
                        size={18}
                        strokeWidth={1.5}
                        className={`flex-shrink-0 text-plp-maroon transition-transform duration-500 ${
                          active ? "rotate-45" : "rotate-0 text-plp-maroon/30"
                        }`}
                      />
                    </div>

                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        active
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6 pl-4 pr-2 md:pl-11 space-y-3">
                          <p className="font-mono uppercase tracking-[0.2em] text-[11px] text-plp-maroon/40">
                            {pillar.secret}
                          </p>
                          <p className="text-base md:text-lg leading-relaxed text-plp-maroon/80 font-light">
                            {pillar.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-2">
              {PILLARS.map((pillar, index) => (
                <span
                  key={pillar.label}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    activeIndex === index
                      ? "w-8 bg-plp-maroon"
                      : "w-2 bg-plp-maroon/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
