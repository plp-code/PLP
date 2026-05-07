"use client";

import { Display, Subtitle } from "../common/Typography";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative w-full h-screen min-h-200 bg-[#f2ede4] overflow-hidden px-6 md:px-12 flex items-center justify-center"
    >
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

      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div
          className="absolute top-[15%] left-[-5%] w-[120%] h-16 bg-plp-lime/40 rotate-12 mix-blend-multiply"
          style={{ filter: "url(#tear-mild)" }}
        />
        <div
          className="absolute bottom-[20%] right-[-10%] w-[110%] h-16 bg-plp-lime/30 -rotate-[5deg] mix-blend-multiply"
          style={{ filter: "url(#tear-mild)" }}
        />
        <div
          className="absolute top-[48%] right-[-15%] w-[120%] h-16 bg-plp-lime/30 -rotate-11 mix-blend-multiply"
          style={{ filter: "url(#tear-mild)" }}
        />
        <div
          className="absolute top-[10%] left-[45%] w-[12%] h-[120%] bg-plp-lime/15 rotate-82 mix-blend-multiply"
          style={{ filter: "url(#tear-high)" }}
        />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 relative z-20 items-center">
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
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.4"
            >
              <line x1="510" y1="200" x2="650" y2="185" strokeDasharray="4 4" />
              <path d="M 640,178 L 652,185 L 638,195" fill="none" />
              <line x1="530" y1="450" x2="680" y2="500" />
              <path d="M 668,505 L 682,502 L 675,488" fill="none" />
              <line x1="510" y1="700" x2="630" y2="685" strokeDasharray="2 6" />
              <path d="M 620,678 L 632,685 L 618,695" fill="none" />
            </g>
          </svg>
        </div>

        <div className="relative h-[80vh] max-h-175 w-full max-w-2xl">
          <div
            className="absolute inset-0 bg-[#d1d1d1] -rotate-[4deg] -translate-x-1.5 translate-y-6 shadow-sm"
            style={{
              filter: "url(#tear-mild)",
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/pinstripe.png')",
            }}
          />
          <div
            className="absolute inset-0 bg-[#e6e1d5] rotate-3 translate-x-6 -translate-y-3 shadow-md"
            style={{
              filter: "url(#tear-mild)",
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/linen.png')",
            }}
          />
          <div
            className="absolute inset-0 bg-[#f9f9f9] -rotate-2 translate-x-3 translate-y-3 shadow-lg"
            style={{
              filter: "url(#tear-mild)",
              backgroundImage:
                "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          <div
            className="relative z-30 bg-[#fafafa] shadow-2xl h-full flex flex-col rotate-0 overflow-hidden"
            style={{
              filter: "url(#tear-mild)",
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 27px, #94a3b8 27px, #94a3b8 28px)",
              backgroundSize: "100% 28px",
            }}
          >
            <div className="absolute left-12 top-0 bottom-0 w-px bg-red-400/30" />
            <div className="absolute left-4 top-0 bottom-0 flex flex-col items-center py-10 gap-8 opacity-25">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-[#f2ede4] shadow-inner"
                />
              ))}
            </div>

            <div className="relative z-50 p-10 lg:pl-28 lg:pt-14">
              <Display className="text-5xl md:text-7xl text-plp-maroon tracking-tighter mb-6 lowercase leading-none">
                title
              </Display>
              <article className="space-y-6">
                <Subtitle className="text-2xl md:text-3xl text-plp-maroon font-serif leading-tight italic">
                  something
                </Subtitle>
                <p className="font-text text-base leading-relaxed text-plp-maroon/90 max-w-md">
                  text text text text text text text
                </p>
                <div className="pt-6 border-t border-plp-maroon/10">
                  <p className="font-handwriting text-2xl md:text-4xl text-blue-800/40 leading-tight">
                    TESTING
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-end space-y-8">
          <div className="relative w-72 min-h-45 rotate-2 translate-x-4">
            <div
              className="absolute inset-0 bg-[#fdf9c4] shadow-xl"
              style={{ filter: "url(#tear-high)" }}
            />
            <div className="relative z-10 p-8">
              <p className="font-handwriting text-xl md:text-2xl text-blue-900/70 leading-snug">
                something cool
              </p>
            </div>
          </div>

          <div className="relative w-72 min-h-45 -rotate-4 -translate-x-8 translate-y-2">
            <div
              className="absolute inset-0 bg-[#ffb7b2] shadow-xl"
              style={{ filter: "url(#tear-extreme)" }}
            />
            <div className="relative z-10 p-8">
              <p className="font-handwriting text-xl md:text-2xl text-maroon-900/60 leading-tight">
                asdfasdf asdf asdfasdf asdf
              </p>
            </div>
          </div>

          <div className="relative w-72 min-h-37.5 rotate-2 translate-x-6 -translate-y-2">
            <div
              className="absolute inset-0 bg-[#b2f2bb] shadow-xl"
              style={{ filter: "url(#tear-high)" }}
            />
            <div className="relative z-10 p-8">
              <p className="font-handwriting text-xl md:text-2xl text-green-900/60">
                asdfasdfasdfa asdasdf
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
