"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const PILLARS = [
  {
    label: "Maps",
    tag: "Store by Store",
    desc: "Guides to thrifting professional clothing in your city. Bay Area map live now.",
    link: "/maps",
    time: "9:14 AM",
  },
  {
    label: "In-Person",
    tag: "Off the Screen",
    desc: "Connections over clothes, swap parties, and group thrift trips.",
    link: "/experiences-and-services",
    time: "9:15 AM",
  },
  {
    label: "One-on-one",
    tag: "by inquiry",
    desc: "A small number of wardrobe projects each season, sourced and built for you.",
    link: "/experiences-and-services",
    time: "9:23 AM",
  },
  {
    label: "For Organizations",
    tag: "we bring it in",
    desc: "What we do inside companies, universities and membership groups.",
    link: "/for-organizations",
    time: "9:28 AM",
  },
];

export default function Email() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMessageExpanded, setIsMessageExpanded] = useState(false);

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
      id="email"
      className="relative w-full overflow-hidden bg-plp-parchment py-20 md:py-28"
    >
      <Container className="relative z-10">
        <div className="w-full bg-[#c0c0c0] p-1 shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] shadow-[0_30px_70px_rgba(0,0,0,0.18)]">
          <div className="border border-[#808080]">
            <div className="flex items-center justify-between bg-plp-maroon px-3 py-1.5 m-1 shadow-[inset_1px_1px_#dfdfdf,inset_-1px_-1px_#0a0a0a]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080]" />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white">
                plp mail — inbox
              </p>
              <button
                aria-label="close"
                className="w-5 h-5 flex items-center justify-center bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#808080] font-mono text-[10px] text-plp-navy"
              >
                x
              </button>
            </div>

            <div className="hidden md:flex items-center gap-6 bg-[#c0c0c0] mx-1 mb-1 px-4 py-2 shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] font-mono text-[11px] uppercase tracking-[0.16em] text-plp-navy/70">
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
                    <span className="w-14 shrink-0 text-plp-navy/35">From:</span>
                    <span className="text-plp-maroon">
                      The Preloved Professional
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-14 shrink-0 text-plp-navy/35">To:</span>
                    <span>you</span>
                  </div>

                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="w-14 shrink-0 text-plp-navy/35">
                      Subject:
                    </span>
                    <span className="text-[12px] normal-case leading-tight tracking-[-0.01em] text-plp-maroon md:text-[19px]">
                      The wardrobe nobody budgeted for.
                    </span>
                  </div>
                </div>

                <article
                  className="px-5 py-5 md:px-8 md:py-8"
                  style={{
                    backgroundImage:
                      "url('https://www.transparenttextures.com/patterns/notebook.png')",
                  }}
                >
                  {/* Always visible */}
                  <div className="space-y-2.5">
                    <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-plp-navy/45">
                      The business
                    </p>

                    <p className="max-w-[68ch] font-prata text-[13px] leading-6 text-plp-maroon/80 md:text-[15px] md:leading-7">
                      The Preloved Professional closes the gap between a woman
                      building a career and the clothes that career asks for. We
                      publish city guides to the stores worth your time, host
                      rooms where women at every stage end up talking to each
                      other, and bring both into companies and universities.
                    </p>
                  </div>

                  {/* Collapsible on mobile */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 md:mt-7 md:grid-rows-[1fr] md:opacity-100 ${
                      isMessageExpanded
                        ? "mt-6 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-6 md:space-y-7">
                        <div className="space-y-2.5">
                          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-plp-navy/45">
                            The problem
                          </p>

                          <div className="max-w-[68ch] space-y-3.5 font-prata text-[13px] leading-6 text-plp-maroon/80 md:space-y-4 md:text-[15px] md:leading-7">
                            <p>
                              A professional wardrobe costs more than an
                              early-career salary supports. Every workaround
                              carries its own cost. Fast fashion doesn&apos;t
                              last. Rental never becomes yours. Credit is debt.
                            </p>

                            <p>
                              You can find endless advice on what to wear to
                              work, but almost none of it accounts for what you
                              can spend, and none of it presents secondhand as
                              an option, let alone a first choice. Even if
                              you&apos;re sold on it, you&apos;re left figuring
                              out where to go and what to look for. All without
                              anyone who&apos;s been in the rooms you&apos;re
                              trying to get into.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2.5">
                          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-plp-navy/45">
                            The position
                          </p>

                          <div className="max-w-[68ch] space-y-3.5 font-prata text-[13px] leading-6 text-plp-maroon/80 md:space-y-4 md:text-[15px] md:leading-7">
                            <p>
                              At the price you can actually pay, secondhand buys
                              better construction than new does. That isn&apos;t
                              a compromise. It&apos;s the correct answer, and
                              almost nobody has told you so.
                            </p>

                            <p>
                              The clothing does a second job, and it&apos;s the
                              more interesting one. Ask a woman what she wore to
                              something that mattered and you get the room she
                              wore it into. What happened there, what she
                              learned, what she would do differently now.
                              That&apos;s true whether she&apos;s been working
                              for thirty years or three.
                            </p>

                            <p className="font-medium text-plp-maroon">
                              The clothes are the medium. The conversation is
                              the point.
                            </p>
                          </div>
                        </div>

                        <div className="h-px w-full bg-plp-navy/10" />

                        <p className="-rotate-2 font-handwriting text-2xl text-plp-navy/60 md:text-4xl">
                          The Preloved Professional
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile only */}
                  <button
                    type="button"
                    onClick={() => setIsMessageExpanded((prev) => !prev)}
                    aria-expanded={isMessageExpanded}
                    className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-plp-maroon md:hidden"
                  >
                    {isMessageExpanded ? "Close message" : "Read full message"}
                    <span
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${
                        isMessageExpanded ? "rotate-90" : ""
                      }`}
                    >
                      →
                    </span>
                  </button>
                </article>
              </div>

              <div
                className="flex flex-col bg-white shadow-[inset_2px_2px_#808080]"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-plp-navy/40 px-5 md:px-6 pt-5 pb-3 border-b border-plp-navy/10 bg-[#c0c0c0]/40">
                  The Offerings - {PILLARS.length} unread
                </p>

                {PILLARS.map((pillar, index) => {
                  const active = activeIndex === index;
                  return (
                    <div
                      key={pillar.label}
                      className={`group relative border-b border-plp-navy/10 transition-colors ${
                        active ? "bg-plp-lime/25" : "hover:bg-[#c0c0c0]/20"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveIndex(index);
                          setIsAutoPlaying(false);
                        }}
                        aria-expanded={active}
                        className="w-full px-5 py-4 text-left md:px-6"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <span
                              className={`mt-1.5 h-2.5 w-2.5 shrink-0 shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] ${
                                active ? "bg-plp-maroon" : "bg-[#c0c0c0]"
                              }`}
                            />

                            <div>
                              <h3 className="font-bodoni text-[17px] font-semibold uppercase leading-tight tracking-[-0.01em] text-plp-maroon md:text-[18px]">
                                {pillar.label}
                              </h3>

                              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-plp-maroon/40">
                                {pillar.tag}
                              </p>
                            </div>
                          </div>

                          <span className="shrink-0 font-mono text-[10px] text-plp-navy/30">
                            {pillar.time}
                          </span>
                        </div>
                      </button>

                      <div
                        className={`grid transition-all duration-500 ease-in-out ${
                          active
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="space-y-3 px-5 pb-4 pl-12 md:px-6 md:pl-[3.375rem]">
                            <p className="font-prata text-[13px] leading-6 text-plp-maroon/70 md:text-[14px]">
                              {pillar.desc}
                            </p>

                            <Link
                              href={pillar.link}
                              className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-plp-maroon underline decoration-plp-maroon/30 underline-offset-4 transition-colors hover:decoration-plp-maroon"
                            >
                              Explore
                              <span aria-hidden="true">→</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="flex-1" />
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-plp-navy/30 px-5 md:px-6 py-3 border-t border-plp-navy/10 bg-[#c0c0c0]/40">
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
