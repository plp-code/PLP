"use client";

import { Display, Subtitle } from "../common/Typography";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative w-full h-screen min-h-[950px] bg-[#f2ede4] overflow-hidden px-6 md:px-12 flex items-center justify-center"
    >
      {/* 1. SVG FILTER LIBRARY */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="tear-mild">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="4"
              seed="5"
            />
            <feDisplacementMap in="SourceGraphic" scale="3" />
          </filter>
          <filter id="tear-high">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.07"
              numOctaves="5"
              seed="12"
            />
            <feDisplacementMap in="SourceGraphic" scale="12" />
          </filter>
          <filter id="tear-extreme">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.1"
              numOctaves="3"
              seed="88"
            />
            <feDisplacementMap in="SourceGraphic" scale="18" />
          </filter>
        </defs>
      </svg>

      {/* 2. HIGHLIGHTER STREAKS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[15%] left-[-5%] w-[120%] h-24 bg-plp-lime/40 rotate-12 mix-blend-multiply"
          style={{ filter: "url(#tear-mild)" }}
        />
        <div
          className="absolute bottom-[20%] right-[-10%] w-[110%] h-24 bg-plp-lime/30 -rotate-[5deg] mix-blend-multiply"
          style={{ filter: "url(#tear-mild)" }}
        />
        <div
          className="absolute top-[48%] right-[-15%] w-[120%] h-24 bg-plp-lime/30 -rotate-11 mix-blend-multiply"
          style={{ filter: "url(#tear-mild)" }}
        />
        <div
          className="absolute top-[10%] left-[45%] w-[15%] h-[150%] bg-plp-lime/15 rotate-82 mix-blend-multiply"
          style={{ filter: "url(#tear-high)" }}
        />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-20 relative z-20 items-center">
        {/* 3. ANNOTATION ARROWS */}
        <div className="absolute inset-0 pointer-events-none z-40 hidden lg:block">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              stroke="#17263f"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.5"
            >
              <line x1="530" y1="200" x2="680" y2="180" strokeDasharray="4 4" />
              <path d="M 670,170 L 685,180 L 668,192" fill="none" />
              <line x1="560" y1="450" x2="710" y2="520" />
              <path d="M 695,525 L 715,522 L 705,505" fill="none" />
              <line x1="540" y1="700" x2="650" y2="680" strokeDasharray="2 6" />
              <path d="M 640,670 L 655,680 L 638,692" fill="none" />
            </g>
          </svg>
        </div>

        <div className="relative h-[90vh] max-h-212.5 w-full max-w-3xl">
          <div
            className="absolute inset-0 bg-[#d1d1d1] -rotate-[4deg] -translate-x-2 translate-y-8 shadow-sm"
            style={{
              filter: "url(#tear-mild)",
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/pinstripe.png')",
            }}
          />
          <div
            className="absolute inset-0 bg-[#e6e1d5] rotate-3 translate-x-8 -translate-y-4 shadow-md"
            style={{
              filter: "url(#tear-mild)",
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/linen.png')",
            }}
          />
          <div
            className="absolute inset-0 bg-[#f9f9f9] -rotate-2 translate-x-6 translate-y-4 shadow-lg"
            style={{
              filter: "url(#tear-mild)",
              backgroundImage:
                "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div
            className="relative z-30 bg-[#fafafa] shadow-2xl h-full flex flex-col rotate-0 overflow-hidden"
            style={{
              filter: "url(#tear-mild)",
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 31px, #94a3b8 31px, #94a3b8 32px)",
              backgroundSize: "100% 32px",
            }}
          >
            <div className="absolute left-16 top-0 bottom-0 w-[1.5px] bg-red-400/40" />
            <div className="absolute left-6 top-0 bottom-0 flex flex-col items-center py-12 gap-10 opacity-30">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full bg-[#f2ede4] shadow-inner"
                />
              ))}
            </div>

            <div className="relative z-50 p-12 lg:pl-32 lg:pt-16">
              <Display className="text-6xl md:text-8xl text-plp-maroon tracking-tighter mb-8 lowercase leading-none">
                title
              </Display>
              <article className="space-y-8">
                <Subtitle className="text-plp-maroon font-serif text-3xl md:text-4xl leading-tight italic">
                  something
                </Subtitle>
                <p className="font-text text-lg leading-relaxed text-plp-maroon/90 max-w-lg">
                  text text text text text text text
                </p>
                <div className="pt-8 border-t border-plp-maroon/10">
                  <p className="font-handwriting text-3xl md:text-5xl text-blue-800/40 leading-tight">
                    TESTING{" "}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-end space-y-12">
          <div className="relative w-80 min-h-55 rotate-3 translate-x-6">
            <div
              className="absolute inset-0 bg-[#fdf9c4] shadow-xl"
              style={{ filter: "url(#tear-high)" }}
            />
            <div className="relative z-10 p-10">
              <p className="font-handwriting text-2xl md:text-3xl text-blue-900/70 leading-snug">
                asdfasdf as
              </p>
            </div>
          </div>

          <div className="relative w-80 min-h-55-rotate-6 -translate-x-12 translate-y-4">
            <div
              className="absolute inset-0 bg-[#ffb7b2] shadow-xl"
              style={{ filter: "url(#tear-extreme)" }}
            />
            <div className="relative z-10 p-10">
              <p className="font-handwriting text-2xl md:text-3xl text-maroon-900/60 leading-tight">
                asdfasdf asdf asdfasdf asdf
              </p>
            </div>
          </div>

          <div className="relative w-80 min-h-45 rotate-2 translate-x-8 -translate-y-2">
            <div
              className="absolute inset-0 bg-[#b2f2bb] shadow-xl"
              style={{ filter: "url(#tear-high)" }}
            />
            <div className="relative z-10 p-10">
              <p className="font-handwriting text-2xl md:text-3xl text-green-900/60">
                asdfasdfasdfa asdasdf
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
