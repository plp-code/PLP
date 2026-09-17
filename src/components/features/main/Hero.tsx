import Image from "next/image";
import { Display, Label } from "../../ui/Typography";

import heroImage from "@/assets/hero_web_view.png";
import heroImageMobile from "@/assets/hero_mobile_view.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-visible bg-plp-parchment px-5 pb-14 pt-6 sm:px-6 md:flex md:min-h-[calc(100dvh-94px)] md:items-center md:py-12"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <div className="mb-7 flex w-full flex-col items-center text-center md:mb-8">
          <Display className="text-balance text-[clamp(3.75rem,8vw,6.75rem)] leading-[0.9] text-plp-maroon">
            The Preloved Professional
          </Display>

          <Label className="mt-5 text-[clamp(0.85rem,1.5vw,1.25rem)] tracking-[0.08em] text-plp-maroon">
            Power never goes out of style.
          </Label>

          <p className="mt-3 max-w-2xl font-prata text-[clamp(0.8rem,1.2vw,1rem)] leading-relaxed text-plp-maroon/70">
            The best professional clothing has already been to work.
          </p>
        </div>

        <div className="w-full overflow-hidden rounded-lg border border-plp-navy bg-white">
          <div className="relative aspect-[4/3] w-full bg-stone-100 md:hidden">
            <Image
              src={heroImageMobile}
              alt="Preloved professional clothing"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="relative hidden aspect-[1920/823] w-full bg-stone-100 md:block">
            <Image
              src={heroImage}
              alt="Preloved professional clothing"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
