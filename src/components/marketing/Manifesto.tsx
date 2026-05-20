"use client";

import { Display, Subtitle } from "../common/Typography";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative w-full min-h-screen overflow-hidden bg-plp-parchment px-6 py-16 md:px-12"
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
        <div className="absolute top-[18%] -left-[10%] w-[120%] h-12 bg-[#e8e1a8]/40 mix-blend-multiply rotate-[2deg] blur-[2px]" />
        <div className="absolute top-[45%] -left-[10%] w-[120%] h-16 bg-[#e8e1a8]/45 mix-blend-multiply -rotate-[12deg] blur-[2px]" />
        <div className="absolute bottom-[18%] -left-[10%] w-[120%] h-10 bg-[#e8e1a8]/35 mix-blend-multiply rotate-[24deg] blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
        <div className="relative w-full max-w-2xl xl:max-w-3xl mx-auto h-180">
          <div className="absolute inset-0 translate-y-4.5 translate-x-3.5 bg-[#bfc2c7] border border-black/5 shadow-[0_18px_40px_rgba(0,0,0,0.10)]" />
          <div className="absolute inset-0 translate-y-3 translate-x-2.25 bg-[#d6d1c7] border border-black/5 shadow-[0_14px_32px_rgba(0,0,0,0.08)]" />
          <div className="absolute inset-0 translate-y-1.5 translate-x-1 bg-[#e5dfd3] border border-black/4 shadow-[0_10px_24px_rgba(0,0,0,0.06)]" />

          <div
            className="relative h-full bg-plp-parchment border border-black/6 overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.18)]"
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

            <div className="absolute left-5 top-24 flex flex-col gap-40 z-30">
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

            <div className="relative z-40 pl-24 pr-14 pt-16 pb-14">
              <div className="mb-8">
                <p className="font-mono uppercase tracking-[0.3em] text-xs text-plp-navy/45 mb-4">
                  asdfasdf
                </p>
                <Display className="text-5xl md:text-7xl lowercase text-plp-burgundy tracking-tight leading-none">
                  some title
                </Display>
              </div>

              <article className="space-y-7 max-w-xl">
                <Subtitle className="font-serif italic text-2xl md:text-3xl text-plp-burgundy/90 leading-snug">
                  asdfasdfasdf
                </Subtitle>
                <div className="space-y-5">
                  <p className="text-plp-burgundy/80 leading-relaxed text-lg font-light">
                    asdfasdfsadf
                  </p>
                  <p className="text-plp-burgundy/80 leading-relaxed text-lg font-light">
                    asdfasdfasdfas
                  </p>
                  <p className="text-plp-burgundy/80 leading-relaxed text-lg font-light">
                    asdfasdfdasf
                  </p>
                </div>
                <div className="w-full h-px bg-plp-burgundy/10 my-8" />
                <div className="space-y-2">
                  <p className="font-mono uppercase text-xs tracking-[0.25em] text-plp-navy/35">
                    asdfasdfasdf
                  </p>
                  <p className="font-[cursive] text-4xl md:text-5xl text-plp-navy/55 -rotate-2">
                    asdfasdfas
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center lg:items-start gap-8 pl-24">
          
          <div className="relative w-80 rotate-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-[#eae3d2]/70 rotate-[-3deg] backdrop-blur-sm shadow-sm z-20" />
            <div className="relative bg-[#f2e8c4] min-h-55 px-8 py-10 shadow-[0_15px_35px_rgba(0,0,0,0.12)]">
              <p className="font-[cursive] text-3xl text-plp-navy/80 leading-snug">
                asdfasdf
              </p>
            </div>
          </div>

          <div className="relative w-72 -rotate-2 -translate-x-6">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#eae3d2]/70 rotate-[4deg] backdrop-blur-sm shadow-sm z-20" />
            <div className="relative bg-[#e3c8b7] min-h-55 px-8 py-10 shadow-[0_15px_35px_rgba(0,0,0,0.14)]">
              <p className="font-[cursive] text-2xl text-[#3a2a22]/85 leading-tight">
                asdfasdf
              </p>
            </div>
          </div>

          <div className="relative w-80 rotate-1 translate-x-3">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#eae3d2]/70 -rotate-2 backdrop-blur-sm shadow-sm z-20" />
            <div className="relative bg-[#c2cdbd] min-h-45 px-8 py-10 shadow-[0_15px_35px_rgba(0,0,0,0.12)]">
              <p className="font-[cursive] text-2xl text-[#2c3629]/80 leading-snug">
                asdf
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}