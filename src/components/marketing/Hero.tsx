import { Display, Label } from "../common/Typography";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-plp-parchment px-6 py-20 lg:h-screen"
    >
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center">
        <div className="w-full text-center">
          <Display className="inline-block whitespace-nowrap text-[12vw] md:text-[8.25vw] leading-[0.85] tracking-tighter mb-4 text-plp-maroon">
            the preloved professional
          </Display>
        </div>

        <div className="w-full text-center">
          <Label className="text-sm md:text-[2vw] lg:text-[1.5vw] tracking-[0.3em] font-black opacity-90 uppercase text-plp-maroon">
            Power never goes out of style.
          </Label>
        </div>

        <div className="mt-16 w-full max-w-md lg:max-w-xl">
          <div className="border-2 border-plp-maroon bg-white/50 backdrop-blur-sm shadow-[4px_4px_0px_#3d0b19]">
            <div className="text-center text-plp-maroon text-xs md:text-sm font-bold py-4 uppercase tracking-[0.2em]">
              something here
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <span className="font-plp text-[40vw] rotate-12">PLP</span>
      </div>
    </section>
  );
}
