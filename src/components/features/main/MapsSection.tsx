"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Display, Subtitle, Label } from "@/components/ui/Typography";
import { MapPin, Compass, ArrowUpRight, Plus } from "lucide-react";

const STEPS = [
  {
    label: "01",
    title: "[step one]",
    desc: "[some text — how we source and verify what goes on the map]",
    pin: { top: "26%", left: "32%" },
    coord: { lat: "[lat 01]", long: "[long 01]" },
  },
  {
    label: "02",
    title: "[step two]",
    desc: "[some text — how the community shapes and adds to it]",
    pin: { top: "44%", left: "62%" },
    coord: { lat: "[lat 02]", long: "[long 02]" },
  },
  {
    label: "03",
    title: "[step three]",
    desc: "[some text — how it stays alive, current, and in-person]",
    pin: { top: "70%", left: "44%" },
    coord: { lat: "[lat 03]", long: "[long 03]" },
  },
];

const DECOR_PINS = [
  { top: "34%", left: "78%" },
  { top: "72%", left: "74%" },
];

const EDGE_TICKS = Array.from({ length: 11 });

export default function MapsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextStep = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % STEPS.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextStep, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextStep]);

  const active = STEPS[activeIndex];

  return (
    <section
      id="maps"
      className="relative w-full overflow-hidden bg-plp-parchment text-plp-maroon py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.07))] pointer-events-none z-0" />
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-plp-maroon) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-plp-maroon) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      <Container className="relative z-10">
        <header className="max-w-3xl mb-14 md:mb-20">
          <div className="flex items-center gap-3 md:gap-4 mb-6">
            <Compass
              className="w-6 h-6 md:w-10 md:h-10 shrink-0 text-plp-olive"
              strokeWidth={1.5}
            />
            <Display className="text-4xl md:text-7xl lowercase text-plp-maroon tracking-tight leading-none">
              [what the map is]
            </Display>
          </div>

          <Subtitle className="font-bodoni italic text-lg md:text-3xl text-plp-clay leading-snug mt-6 md:mt-8">
            [a single line on the purpose of the map]
          </Subtitle>
        </header>

        <div
          className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-16 items-start"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div>
            <div className="border-l-2 border-plp-maroon pl-5 md:pl-6 mb-8 md:mb-10">
              <p className="font-mono uppercase tracking-[0.3em] text-xs text-plp-navy/50 mb-4">
                [the purpose]
              </p>
              <p className="text-plp-maroon/80 leading-relaxed text-base md:text-lg font-light max-w-md">
                [some text — why the map exists and who it serves]
              </p>
            </div>

            <p className="font-prata not-italic text-sm md:text-base text-plp-olive tracking-wide uppercase mb-6 md:mb-8">
              [how we build it]
            </p>

            <div className="flex flex-col border-t border-plp-maroon/20">
              {STEPS.map((step, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={step.label}
                    onClick={() => {
                      setActiveIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className="group relative text-left border-b border-plp-maroon/20"
                  >
                    <span
                      className={`absolute left-0 top-0 h-full w-[3px] bg-plp-maroon origin-top transition-transform duration-500 ${
                        isActive ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                    <div
                      className={`flex items-center gap-3 md:gap-4 py-5 transition-all duration-300 ${
                        isActive
                          ? "pl-4 bg-plp-lime/10"
                          : "pl-0 opacity-45 hover:opacity-100 hover:pl-2"
                      }`}
                    >
                      <Label
                        className={`text-[10px] tabular-nums transition-colors ${
                          isActive ? "text-plp-maroon" : "text-plp-maroon/50"
                        }`}
                      >
                        {step.label}
                      </Label>
                      <h3 className="font-prata not-italic text-lg md:text-xl uppercase tracking-tight text-plp-maroon">
                        {step.title}
                      </h3>
                      <div className="h-px flex-1 bg-plp-maroon/20" />
                      <Plus
                        size={18}
                        strokeWidth={1.5}
                        className={`flex-shrink-0 transition-transform duration-500 ${
                          isActive
                            ? "rotate-45 text-plp-maroon"
                            : "rotate-0 text-plp-maroon/30"
                        }`}
                      />
                    </div>

                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 pl-4 md:pl-10 pr-2 text-base md:text-lg leading-relaxed text-plp-maroon/70 font-light">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-2">
              {STEPS.map((step, index) => (
                <span
                  key={step.label}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    activeIndex === index
                      ? "w-8 bg-plp-maroon"
                      : "w-2 bg-plp-maroon/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            {/* Framed cartographic "print" */}
            <div className="relative bg-plp-parchment border border-plp-maroon/25 p-2 md:p-2.5 shadow-[0_30px_70px_rgba(0,0,0,0.16)]">
              <div className="relative aspect-[16/11] w-full border border-plp-maroon/30 bg-plp-parchment overflow-hidden">
                {/* fine grid */}
                <div
                  className="absolute inset-0 opacity-[0.16]"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, var(--color-plp-maroon) 1px, transparent 1px),
                      linear-gradient(to bottom, var(--color-plp-maroon) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* subtle terrain wash */}
                <div className="absolute -top-1/4 -right-1/4 h-2/3 w-2/3 rounded-full bg-plp-lime/10 blur-3xl" />
                <div className="absolute -bottom-1/4 -left-1/4 h-2/3 w-2/3 rounded-full bg-plp-olive/10 blur-3xl" />

                {/* edge ticks */}
                <div className="absolute inset-x-6 top-1.5 flex justify-between">
                  {EDGE_TICKS.map((_, i) => (
                    <span
                      key={`t-${i}`}
                      className="w-px h-1.5 bg-plp-maroon/25"
                    />
                  ))}
                </div>
                <div className="absolute inset-x-6 bottom-1.5 flex justify-between">
                  {EDGE_TICKS.map((_, i) => (
                    <span
                      key={`b-${i}`}
                      className="w-px h-1.5 bg-plp-maroon/25"
                    />
                  ))}
                </div>

                {/* route connecting the steps */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 68.75"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M32 17.9 L62 30.25 L44 48.1"
                    fill="none"
                    stroke="var(--color-plp-olive)"
                    strokeWidth="0.4"
                    strokeDasharray="1.5 1.5"
                    opacity="0.6"
                  />
                </svg>

                {DECOR_PINS.map((pin, i) => (
                  <div
                    key={`decor-${i}`}
                    className="absolute -translate-x-1/2 -translate-y-full"
                    style={{ top: pin.top, left: pin.left }}
                  >
                    <MapPin
                      className="w-5 h-5 text-plp-maroon/25"
                      strokeWidth={1.5}
                    />
                  </div>
                ))}

                {STEPS.map((step, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <div
                      key={step.label}
                      className="absolute -translate-x-1/2 -translate-y-full transition-all duration-500"
                      style={{
                        top: step.pin.top,
                        left: step.pin.left,
                        zIndex: isActive ? 20 : 10,
                      }}
                    >
                      {isActive && (
                        <span className="absolute left-1/2 -top-8 -translate-x-1/2 whitespace-nowrap bg-plp-maroon text-plp-parchment px-2 py-0.5 font-mono text-[10px] tracking-widest shadow-sm">
                          {step.label} · {step.title}
                        </span>
                      )}
                      {isActive && (
                        <span className="absolute left-1/2 top-full -translate-x-1/2 mt-1 h-3 w-3 rounded-full bg-plp-lime/40 animate-ping" />
                      )}
                      <MapPin
                        className={`transition-all duration-500 ${
                          isActive
                            ? "w-8 h-8 text-plp-olive drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
                            : "w-6 h-6 text-plp-maroon/50"
                        }`}
                        strokeWidth={1.5}
                        fill={
                          isActive ? "var(--color-plp-lime)" : "transparent"
                        }
                      />
                    </div>
                  );
                })}

                {/* title plate */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-plp-parchment/80 backdrop-blur-sm border border-plp-maroon/20 px-2.5 py-1.5">
                  <Compass
                    className="w-3.5 h-3.5 text-plp-olive"
                    strokeWidth={1.5}
                  />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-plp-maroon/70">
                    [the map]
                  </span>
                </div>

                {/* live coordinate readout */}
                <span className="absolute bottom-3 right-3 font-mono text-[10px] tracking-widest text-plp-maroon/50 transition-opacity duration-500">
                  {active.coord.lat} · {active.coord.long}
                </span>
              </div>
            </div>

            {/* legend caption */}
            <div className="mt-3 flex items-center justify-between gap-4 px-1">
              <div className="flex items-center gap-2">
                <MapPin
                  className="w-3.5 h-3.5 text-plp-olive"
                  strokeWidth={1.5}
                  fill="var(--color-plp-lime)"
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-plp-maroon/50">
                  [verified location]
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-plp-maroon/40">
                fig. 0{activeIndex + 1} / 0{STEPS.length}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-plp-maroon/20 pt-10">
          <p className="text-plp-maroon/80 leading-relaxed text-lg md:text-2xl font-light max-w-xl font-bodoni italic">
            [a closing line inviting people onto the map]
          </p>
          <Link
            href="/maps"
            className="group inline-flex items-center gap-3 border border-plp-maroon px-6 py-3 text-plp-maroon uppercase tracking-widest text-sm font-prata transition-colors hover:bg-plp-lime hover:text-plp-black"
          >
            [explore the map]
            <ArrowUpRight
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
