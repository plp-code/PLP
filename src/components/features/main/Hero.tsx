"use client";

import { Display, Label } from "../../ui/Typography";
import heroImage from "@/assets/hero_web_view.png";
import heroImageMobile from "@/assets/hero_mobile_view.png";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-fit md:min-h-[calc(100dvh-94px)] w-full flex-col items-center justify-start md:justify-center overflow-visible bg-plp-parchment px-6 pt-6 pb-16 md:pt-0 md:pb-20"
    >
      <div className="relative z-10 flex w-full max-w-[95vw] xl:max-w-7xl flex-col items-center transition-all duration-700">
        <div className="w-full text-center">
          <Display className="inline-block capitalize text-balance whitespace-normal md:whitespace-nowrap text-[15vw] md:text-[8.25vw] xl:text-[105px] leading-[1.05] md:leading-[1] tracking-tighter mb-4 text-plp-maroon">
            the preloved professional
          </Display>
        </div>

        <div className="w-full text-center mb-6">
          <Label className="font-[word-spacing:0.125rem] md:[word-spacing:0.2rem] whitespace-normal md:whitespace-nowrap text-[3.75vw] md:text-[2.0625vw] xl:text-[26.25px] leading-[1.05] md:leading-[1] tracking-wide mb-4 text-plp-maroon">
            Power never goes out of style.
          </Label>
        </div>

        <div className="w-full text-center mb-6">
          <p className="font-cormorant text-[3vw] md:text-[1.65vw] xl:text-[21px] leading-[1.2] tracking-normal opacity-90 text-plp-maroon">
            A women&apos;s networking company. Secondhand is the mechanism.
            Community is the point.
          </p>
        </div>

        <div className="w-full">
          <div className="relative border rounded-lg border-plp-navy bg-white overflow-hidden">
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
