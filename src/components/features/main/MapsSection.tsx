"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Display, Subtitle, Label } from "@/components/ui/Typography";
import { MapPin, Compass, ArrowUpRight, Plus } from "lucide-react";

const STEPS = [
  {
    label: "01",
    title: "Every store, in person",
    desc: "We visit each one ourselves. No directories, no aggregated reviews, no guessing from a website.",
    pin: { top: "26%", left: "32%" },
    coord: { lat: "[lat 01]", long: "[long 01]" },
  },
  {
    label: "02",
    title: "Tagged by what it costs",
    desc: "Every store carries a price range, so you can plan a trip against your budget instead of hoping.",
    pin: { top: "44%", left: "62%" },
    coord: { lat: "[lat 02]", long: "[long 02]" },
  },
  {
    label: "03",
    title: "It gets better as people use it",
    desc: "Members log what they find. When ten women pull blouses from the same store, the map says so. Stores change, and the map moves with them.",
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
      className="relative w-full overflow-hidden bg-plp-parchment text-plp-maroon py-14 md:py-20"
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
        <header className="mb-9 max-w-3xl md:mb-12">
          <div className="flex items-center gap-3 md:gap-4">
            <Display className="text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.9] text-plp-maroon">
              PLP Thrift Maps
            </Display>
          </div>

          <Subtitle className="mt-4 max-w-2xl font-bodoni text-[18px] italic leading-snug text-plp-clay md:mt-5 md:text-[26px]">
            A searchable guide to the secondhand stores in your city that carry
            professional clothing.
          </Subtitle>
        </header>

        <div
          className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-12 items-start"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div>
            <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-plp-navy/45">
              [the purpose]
            </p>

            <div className="mb-7 border-l-2 border-plp-maroon pl-4 md:mb-8 md:pl-6">
              <div className="max-w-[58ch] space-y-3 font-prata text-[13px] leading-6 text-plp-maroon/80 md:space-y-4 md:text-[15px] md:leading-7">
                <p>
                  Many thrift stores are a waste of an afternoon. Some
                  aren&apos;t, and the difference isn&apos;t obvious from the
                  door. The reason most working women don&apos;t thrift
                  isn&apos;t money, it&apos;s time.
                </p>

                <p>
                  Hunting is the expensive part. The map is how you spend an
                  hour instead of a Saturday.
                </p>

                <p>
                  PLP thrift maps are hand-picked lists of stores worth a visit
                  for professional clothing. You&apos;ll know what you can
                  expect to spend, what you might find, and how to get there.
                </p>
              </div>
            </div>

            <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-plp-navy/45 md:mb-5">
              [how it works]
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
                      className={`flex items-center gap-3 py-3.5 transition-all duration-300 md:gap-4 md:py-4 ${
                        isActive
                          ? "bg-plp-lime/10 pl-3 md:pl-4"
                          : "pl-0 opacity-50 hover:pl-2 hover:opacity-100"
                      }`}
                    >
                      <Label
                        className={`text-[10px] tabular-nums transition-colors ${
                          isActive ? "text-plp-maroon" : "text-plp-maroon/50"
                        }`}
                      >
                        {step.label}
                      </Label>
                      <h3 className="font-bodoni text-[16px] font-semibold normal-case leading-tight tracking-[-0.01em] text-plp-maroon md:text-[18px]">
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
                        <p className="pb-5 pl-3 pr-2 font-prata text-[13px] leading-6 text-plp-maroon/70 md:pb-6 md:pl-10 md:text-[14px]">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="relative bg-plp-parchment border border-plp-maroon/25 p-2 md:p-2.5 shadow-[0_30px_70px_rgba(0,0,0,0.16)]">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-plp-maroon/30 bg-plp-parchment md:aspect-[16/11]">
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

                <div className="absolute -top-1/4 -right-1/4 h-2/3 w-2/3 rounded-full bg-plp-lime/10 blur-3xl" />
                <div className="absolute -bottom-1/4 -left-1/4 h-2/3 w-2/3 rounded-full bg-plp-olive/10 blur-3xl" />

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

                <div className="absolute top-3 left-3 flex items-center gap-2 bg-plp-parchment/80 backdrop-blur-sm border border-plp-maroon/20 px-2.5 py-1.5">
                  <Compass
                    className="w-3.5 h-3.5 text-plp-olive"
                    strokeWidth={1.5}
                  />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-plp-maroon/70">
                    [the map]
                  </span>
                </div>
                <span className="absolute bottom-3 right-3 hidden font-mono text-[9px] tracking-[0.14em] text-plp-maroon/50 transition-opacity duration-500 sm:block md:text-[10px]">
                  {active.coord.lat} · {active.coord.long}
                </span>
              </div>
            </div>

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

        <div className="mt-9 flex flex-col items-start justify-between gap-5 border-t border-plp-maroon/20 pt-6 md:mt-14 md:flex-row md:items-center md:gap-6 md:pt-8">
          <p className="max-w-xl font-bodoni text-[18px] italic leading-snug text-plp-maroon/80 md:text-[24px]">
            Bay Area now. Los Angeles next. After that, the waitlist decides.
          </p>

          <Link
            href="/maps"
            className="group inline-flex items-center gap-2.5 border border-plp-maroon px-5 py-3 font-prata text-[11px] font-semibold uppercase tracking-[0.12em] text-plp-maroon transition-colors hover:bg-plp-lime"
          >
            Explore the map
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
