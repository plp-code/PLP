import Image from "next/image";
import { Display, Label } from "../../ui/Typography";

import heroImage from "@/assets/hero_web_view.png";
import heroImageMobile from "@/assets/hero_mobile_view.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full bg-plp-parchment px-4 pb-6 pt-4 sm:px-5 md:h-[calc(100dvh-94px)] md:py-6"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center">
        <div className="mb-5 flex shrink-0 flex-col items-center text-center md:mb-6">
          <Display className="text-balance text-[clamp(3.75rem,8vw,6.75rem)] leading-[0.9] text-plp-maroon">
            The Preloved Professional
          </Display>

          <Label className="mt-2 text-[clamp(1rem,1.7vw,1.4rem)] tracking-[0.08em] text-plp-maroon">
            Power never goes out of style.
          </Label>
        </div>

        <div className="w-full md:hidden">
          <div className="relative aspect-[4/4.6] w-full overflow-hidden rounded-lg border border-plp-navy bg-white">
            <Image
              src={heroImageMobile}
              alt="Preloved professional clothing"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <ArtworkCredit />
        </div>

        {/* Desktop image */}
        <div className="hidden min-h-0 w-full flex-1 flex-col md:flex">
          <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-plp-navy bg-white">
            <div className="relative h-full min-h-0 w-full bg-stone-100">
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

          <ArtworkCredit />
        </div>
      </div>
    </section>
  );
}

function ArtworkCredit() {
  return (
    <p className="mt-2 text-right font-mono text-[9px] uppercase tracking-[0.12em] text-plp-maroon/45">
      Artwork by{" "}
      <a
        href="https://www.instagram.com/byynancyy/"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto text-plp-maroon/70 underline decoration-plp-maroon/25 underline-offset-2 transition-colors hover:text-plp-maroon hover:decoration-plp-maroon"
      >
        @byynancyy
      </a>
    </p>
  );
}
