import Banner from "@/components/common/Banner";
import Link from "next/link";
import { Label } from "../common/Typography";
import { ArrowRight } from "lucide-react";

export default function EmailCapture() {
  return (
    <Banner className="overflow-hidden relative bg-plp-maroon text-plp-parchment py-16 md:py-28">
      <div className="absolute bottom-4 right-4 text-[27vw] font-seventies opacity-[0.06] leading-none pointer-events-none select-none">
        PLP
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-16">
          <div className="flex flex-col items-start gap-10">
            <p className="font-bodoni text-2xl md:text-4xl leading-[1.1] tracking-tight max-w-xl">
              A community-led platform where <br />
              career development, professional presence, <br /> and preloved
              culture intersect.
            </p>

            <div className="flex flex-col gap-2">
              <div className="h-px w-12 bg-plp-lime/50 mb-2" />
              <Label className=" tracking-widetext-lg uppercase">
                We&apos;re changing what it means to show-up at work.
              </Label>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <Link
              href="/waitlist"
              className="group flex items-center justify-between gap-16 px-10 py-8 bg-plp-parchment text-plp-maroon hover:bg-plp-lime transition-all duration-500 rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              {/* the PLP and the button stacking needs improvement */}
              <span className="font-seventies text-3xl uppercase tracking-tighter">
                Join the Waitlist
              </span>
              <ArrowRight
                className="transition-transform duration-500 group-hover:translate-x-2"
                size={28}
              />
            </Link>
          </div>
        </div>
      </div>
    </Banner>
  );
}
