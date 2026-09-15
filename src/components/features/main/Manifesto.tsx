"use client";

import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Display } from "@/components/ui/Typography";

const PILLARS = [
  {
    label: "Professional Identity",
    tag: "STRATEGY, NOT COMPROMISE",
    desc: "Preloved clothing as professional strategy, not compromise. How you present yourself is part of what you're building.",
    time: "9:14 AM",
  },
  {
    label: "Access & Opportunity",
    tag: "ROOMS YOU CAN'T GOOGLE",
    desc: "Access to people, places, and information that don't show up at a career fair.",
    time: "9:15 AM",
  },
  {
    label: "Cultural & IRL Experiences",
    tag: "OFF THE SCREEN",
    desc: "Events, city resources, and community that happens in the same room.",
    time: "9:15 AM",
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
      <Container className="relative z-10">
      

     
        <div className="w-full bg-[#c0c0c0] p-1 shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] shadow-[0_30px_70px_rgba(0,0,0,0.18)]">
          <div className="border border-[#808080]">
         
            <div className="flex items-center justify-between bg-plp-maroon px-3 py-1.5 m-1 shadow-[inset_1px_1px_#dfdfdf,inset_-1px_-1px_#0a0a0a]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080]" />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white">
                plp mail — inbox
              </p>
              <button
                aria-label="close"
                className="w-5 h-5 flex items-center justify-center bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#808080] font-mono text-[10px] text-plp-navy"
              >
                ×
              </button>
            </div>

         
            <div className="hidden md:flex items-center gap-6 bg-[#c0c0c0] mx-1 mb-1 px-4 py-2 shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] font-mono text-[11px] uppercase tracking-[0.2em] text-plp-navy/70">
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
              <span>Message</span>
              <div className="flex-1" />
              <span className="text-plp-maroon font-semibold">Reply</span>
              <span>Reply All</span>
              <span>Forward</span>
              <span>Archive</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-1 mx-1 mb-1">
           
              <div className="bg-white shadow-[inset_2px_2px_#808080]">
                <div
                  className="font-mono text-xs md:text-[13px] text-plp-navy/60 px-6 md:px-8 pt-6 md:pt-8 pb-5 space-y-1.5 border-b border-plp-navy/10"
                  style={{
                    backgroundImage:
                      "url('https://www.transparenttextures.com/patterns/notebook.png')",
                  }}
                >
                  <div className="flex gap-3">
                    <span className="text-plp-navy/35 w-16 shrink-0">From</span>
                    <span className="text-plp-maroon">The Preloved Professional</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-plp-navy/35 w-16 shrink-0">To</span>
                    <span>you</span>
                  </div>
                  <div className="flex gap-3 items-baseline">
                    <span className="text-plp-navy/35 w-16 shrink-0">Subject</span>
                    <span className="text-plp-maroon font-semibold text-sm md:text-base tracking-normal normal-case">
                      (TBD)
                    </span>
                  </div>
                </div>

                <article
                  className="px-6 md:px-8 py-6 md:py-8 space-y-6 md:space-y-7"
                  style={{
                    backgroundImage:
                      "url('https://www.transparenttextures.com/patterns/notebook.png')",
                  }}
                >
                  <div className="space-y-2">
                    <p className="font-mono uppercase text-[11px] tracking-[0.25em] text-plp-navy/40">
                      The business
                    </p>
                    <p className="text-plp-maroon/80 leading-relaxed text-base md:text-lg font-light">
                      The Preloved Professional is a women's networking company at the
                      intersection of work culture and the secondhand fashion market.
                      Women have always found connection through clothing. At PLP,
                      it's about the transfer of power from generation to generation
                      through thrifted professional attire.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-mono uppercase text-[11px] tracking-[0.25em] text-plp-navy/40">
                      The problem
                    </p>
                    <p className="text-plp-maroon/80 leading-relaxed text-base md:text-lg font-light">
                      Building a professional presence takes tools women rarely have
                      access to. First jobs. Career pivots. Mid-career reinventions.
                      The pattern is the same. Professional wardrobes are priced for
                      people who already have careers, not people building them.
                      Generic advice produces generic results. And secondhand is still
                      widely treated as the budget fallback rather than what it often
                      is: the smarter, more original, higher-quality option.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-mono uppercase text-[11px] tracking-[0.25em] text-plp-navy/40">
                      The position
                    </p>
                    <p className="text-plp-maroon/80 leading-relaxed text-base md:text-lg font-light">
                      PLP treats secondhand professional clothing as a power move
                      rather than a compromise, and uses it as the mechanism for
                      something harder to build: real connection between women at
                      different stages of their careers.
                    </p>
                  </div>

                  <div className="w-full h-px bg-plp-navy/10" />

                  <p className="font-handwriting text-2xl md:text-4xl text-plp-navy/60 -rotate-2">
                    The Preloved Professional
                  </p>
                </article>
              </div>

           
              <div
                className="flex flex-col bg-white shadow-[inset_2px_2px_#808080]"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <p className="font-mono uppercase tracking-[0.3em] text-[11px] text-plp-navy/40 px-5 md:px-6 pt-5 pb-3 border-b border-plp-navy/10 bg-[#c0c0c0]/40">
                  what we're building — 3 unread
                </p>

                {PILLARS.map((pillar, index) => {
                  const active = activeIndex === index;
                  return (
                    <button
                      key={pillar.label}
                      onClick={() => {
                        setActiveIndex(index);
                        setIsAutoPlaying(false);
                      }}
                      className={`group relative text-left border-b border-plp-navy/10 px-5 md:px-6 py-4 transition-colors ${
                        active ? "bg-plp-lime/25" : "hover:bg-[#c0c0c0]/20"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <span
                            className={`mt-1.5 w-2.5 h-2.5 shrink-0 shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] ${
                              active ? "bg-plp-maroon" : "bg-[#c0c0c0]"
                            }`}
                          />
                          <div>
                            <h3 className="font-prata not-italic text-base md:text-lg text-plp-maroon leading-snug">
                              {pillar.label}
                            </h3>
                            <p className="font-mono text-[10px] tracking-[0.15em] text-plp-navy/35 mt-1">
                              PLP
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] text-plp-navy/30 shrink-0">
                          {pillar.time}
                        </span>
                      </div>

                      <div
                        className={`grid transition-all duration-500 ease-in-out ${
                          active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="pt-3 pl-5 space-y-2">
                            <p className="font-mono uppercase tracking-[0.2em] text-[10px] text-plp-maroon/40">
                              {pillar.tag}
                            </p>
                            <p className="text-sm md:text-base leading-relaxed text-plp-maroon/75 font-light">
                              {pillar.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}

                <div className="flex-1" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-plp-navy/30 px-5 md:px-6 py-3 border-t border-plp-navy/10 bg-[#c0c0c0]/40">
                  synced just now
                </p>
              </div>
            </div>

         
            <div className="flex items-center justify-between bg-[#c0c0c0] mx-1 mb-1 px-4 py-1.5 shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] font-mono text-[10px] uppercase tracking-[0.2em] text-plp-navy/60">
              <span>4 items</span>
              <span>connected</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}