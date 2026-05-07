import Banner from "@/components/common/Banner";
import Link from "next/link";
import { Label } from "../common/Typography";
import { ArrowRight } from "lucide-react";

export default function EmailCapture() {
  return (
    <Banner className="overflow-hidden relative bg-plp-maroon text-plp-parchment py-12 md:py-20">
      <div className="absolute bottom-2 right-4 text-[20vw] font-seventies opacity-[0.05] leading-none pointer-events-none select-none">
        PLP
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="flex flex-col items-start gap-8">
            <p className="font-bodoni text-xl md:text-3xl leading-[1.15] tracking-tight max-w-lg">
              A community-led platform where <br className="hidden md:block" />
              career development, professional presence,{" "}
              <br className="hidden md:block" />
              and preloved culture intersect.
            </p>

            <div className="flex flex-col gap-2">
              <div className="h-px w-10 bg-plp-lime/50 mb-1" />
              <Label className="tracking-[0.2em] text-sm uppercase opacity-80">
                We&apos;re changing what it means to show-up at work.
              </Label>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <Link
              href="/waitlist"
              className="group flex items-center justify-between gap-10 px-8 py-5 bg-plp-parchment text-plp-maroon hover:bg-plp-lime transition-all duration-500 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <span className="font-seventies text-xl md:text-2xl uppercase tracking-tighter leading-none">
                Join the Waitlist
              </span>
              <ArrowRight
                className="transition-transform duration-500 group-hover:translate-x-2"
                size={20}
              />
            </Link>
          </div>
        </div>
      </div>
    </Banner>
  );
}
