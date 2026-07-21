"use client";

import { Display, Label } from "../../ui/Typography";
import heroImage from "@/assets/hero_web_view.png";
import heroImageMobile from "@/assets/hero_mobile_view.png";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-fit md:min-h-[calc(100dvh-94px)] w-full flex-col items-center justify-start md:justify-center overflow-hidden bg-plp-parchment px-6 pb-16 md:pb-20"
    >
      <div className="relative z-10 flex w-full max-w-[95vw] xl:max-w-7xl flex-col items-center transition-all duration-700">
        <div className="w-full text-center">
          <Display className="inline-block capitalize text-balance whitespace-normal md:whitespace-nowrap text-[15vw] md:text-[8.25vw] xl:text-[105px] leading-[0.9] md:leading-[0.85] tracking-tighter mb-4 text-plp-maroon">
            the preloved professional
          </Display>
        </div>

        <div className="w-full text-center mb-6">
          <Label className="text-xs md:text-[2vw] lg:text-[1.5vw] xl:text-[19px] tracking-widest font-black opacity-90 uppercase text-plp-maroon">
            Power never goes out of style.
          </Label>
        </div>

        <div className="w-full">
          <div className="relative border-2 border-plp-navy bg-white overflow-hidden">
            <div className="relative w-full aspect-4/3 md:hidden bg-stone-100">
              <Image
                src={heroImageMobile}
                alt="Hero"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>

            <div className="relative hidden w-full aspect-[1920/823] md:block bg-stone-100">
              <Image
                src={heroImage}
                alt="Hero"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
