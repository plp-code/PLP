import { Label, Display, Subtitle } from "../common/Typography";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative w-full bg-plp-parchment border-t-2 border-plp-maroon pt-8 md:pt-16 overflow-x-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] w-full min-h-[80vh] md:min-h-[90vh] items-stretch gap-4 md:gap-8">
        <div className="relative bg-white border-t-2 border-r-2 border-plp-maroon rounded-tr-[10vw] md:rounded-tr-[120px] p-[8vw] md:p-16 lg:p-24 flex flex-col h-full shadow-[-10px_0_30px_rgba(0,0,0,0.03)]">
          <div className="max-w-2xl ml-auto w-full">
            <Display className="text-[12vw] md:text-[7vw] lg:text-8xl mb-6 text-plp-maroon leading-none">
              Manifesto
            </Display>

            <Subtitle className="text-plp-maroon/60 italic font-medium text-xl md:text-3xl border-b border-plp-lime/50 pb-4 inline-block">
              Professionalism had a uniform. That era is over.
            </Subtitle>

            <div className="mt-12 space-y-8 font-bodoni text-[5.5vw] md:text-3xl lg:text-4xl leading-[1.2] text-plp-maroon tracking-tight">
              <p>
                This is a space for women who think about how they present
                themselves in a world where work, identity, and value are all
                shifting at once.
              </p>

              <div className="pt-8 space-y-4">
                <div className="h-px w-full bg-plp-maroon/20" />
                <div className="h-px w-2/3 bg-plp-maroon/10" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-full flex flex-col bg-white border-t-2 border-l-2 border-plp-maroon rounded-tl-[10vw] md:rounded-tl-[120px] shadow-[20px_0_40px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

          <div className="relative z-10 h-full flex flex-col p-[8vw] md:p-12 lg:p-20">
            {/*           
    <div className="absolute top-12 md:top-24 -right-[10%] w-[130%] h-24 lg:h-32 rotate-[-2.5deg] pointer-events-none">
      <p className="absolute top-1/2 left-[12%] -translate-y-1/2 font-text text-[6vw] md:text-3xl font-black uppercase tracking-tighter text-plp-maroon opacity-10 select-none">
        A NEW PARADIGM
      </p>
      <div className="absolute inset-0 bg-plp-lime/70 mix-blend-multiply border-y border-plp-maroon/20 shadow-lg shadow-plp-lime/20" />
      <div className="absolute inset-0 flex items-center px-[15%]">
        <p className="font-text text-[2.8vw] md:text-[11px] font-black uppercase tracking-[0.4em] text-plp-maroon leading-none">
          Establishing a new paradigm for the professional archive
        </p>
      </div>
    </div>  */}

            <div className="mt-0 space-y-10 max-w-sm">
              <div className="space-y-4">
                <div className="h-1 w-12 bg-plp-maroon" />

                <h2 className="font-seventies text-3xl md:text-4xl lg:text-5xl text-plp-maroon uppercase leading-[0.9] tracking-tighter">
                  The Preloved Professional <br />{" "}
                  <span className="text-plp-maroon/40 italic">
                    is curated for:
                  </span>
                </h2>
              </div>

              <div className="pt-10 border-t-2 border-plp-maroon flex flex-col gap-8">
                {[
                  "Graduates entering the workforce or stepping into new roles.",
                  "Professionals changing paths or leveling up their careers.",
                  "Women who approach style as a strategic part of how they show up.",
                ].map((text, i) => (
                  <div key={i} className="group flex gap-6 items-start">
                    <span className="font-seventies text-plp-maroon/30 text-2xl leading-none group-hover:text-plp-lime transition-colors">
                      0{i + 1}
                    </span>
                    <p className="font-bodoni text-[4.5vw] md:text-xl italic text-plp-maroon leading-snug tracking-tight">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-16 flex items-center justify-between opacity-40">
              <Label className="text-[9px] uppercase tracking-[0.2em]">
                Ref: Archive_01
              </Label>
              <div className="h-px w-12 bg-plp-maroon" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-[58.333%] top-12 bottom-0 w-24 -translate-x-1/2 bg-linear-to-r from-transparent via-black/3 to-transparent pointer-events-none hidden md:block" />
    </section>
  );
}
