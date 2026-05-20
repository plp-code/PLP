"use client";

import { Display, Label } from "../common/Typography";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden bg-plp-parchment px-6 pb-20"
    >
      <div className="relative z-10 flex w-full max-w-[95vw] xl:max-w-7xl flex-col items-center pt-32 md:pt-[12.5vh] transition-all duration-700">
        
        <div className="w-full text-center">
          <Display className="inline-block capitalize whitespace-nowrap text-[12vw] md:text-[8.25vw] xl:text-[105px] leading-[0.85] tracking-tighter mb-4 text-plp-maroon">
            the preloved professional
          </Display>
        </div>

        <div className="w-full text-center mb-6">
          <Label className="text-sm md:text-[2vw] lg:text-[1.5vw] xl:text-[19px] tracking-widest font-black opacity-90 uppercase text-plp-maroon">
            Power never goes out of style.
          </Label>
        </div>

        <div className="w-full">
          <div className="relative border-2 border-plp-maroon bg-white overflow-hidden">
            <div className="relative w-full aspect-4/3 md:aspect-21/9 max-h-[50vh] bg-stone-100">
              something
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}