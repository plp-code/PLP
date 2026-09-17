"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Display } from "@/components/ui/Typography";

interface ComingSoonProps {
  title?: string;
  description?: string;
  backHref?: string;
}

export default function ComingSoon({
  title = "Coming soon.",
  description = "We're getting this part of The Preloved Professional ready. Check back soon.",
  backHref = "/",
}: ComingSoonProps) {
  return (
    <div className="relative flex w-full flex-col items-center overflow-hidden py-16 text-center md:py-20">
      <div className="relative z-10 flex max-w-5xl flex-col items-center">
        <div className="mb-4 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-plp-lime opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-plp-olive" />
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-plp-maroon/45">
            Currently in the works
          </span>
        </div>

        <Display className="text-balance text-[clamp(3.75rem,10vw,8rem)] leading-[0.84] tracking-[-0.04em] text-plp-maroon">
          {title}
        </Display>

        <p className="mt-5 max-w-lg text-balance font-prata text-[14px] leading-6 text-plp-maroon/65 sm:text-[15px] sm:leading-7">
          {description}
        </p>

        <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          <Link
            href={backHref}
            className="group inline-flex items-center gap-2.5 border-b border-plp-maroon/30 pb-1.5 font-prata text-[11px] font-semibold uppercase tracking-[0.12em] text-plp-maroon transition-colors hover:border-plp-maroon"
          >
            <ArrowLeft
              size={15}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back home
          </Link>

          <Link
            href="/#memo"
            className="group inline-flex items-center gap-2.5 border-b border-plp-maroon/30 pb-1.5 font-prata text-[11px] font-semibold uppercase tracking-[0.12em] text-plp-maroon transition-colors hover:border-plp-maroon"
          >
            Read the memo
            <ArrowUpRight
              size={15}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
