"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Display } from "@/components/ui/Typography";

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh overflow-hidden bg-plp-parchment px-5 py-10 text-plp-maroon sm:px-8">
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center text-center">
        <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.18em] text-plp-maroon/45">
          Error 404
        </p>

        <Display className="max-w-4xl text-[clamp(4rem,12vw,9rem)] leading-[0.82] tracking-[-0.035em] text-plp-maroon">
          Page Not Found
        </Display>

        <p className="mt-7 max-w-xl font-prata text-[14px] leading-6 text-plp-maroon/65 sm:text-[15px] sm:leading-7">
          This page is no longer where we left it. Return back home and keep looking.
        </p>

        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2.5 border-b border-plp-maroon/30 pb-1.5 font-prata text-[11px] font-semibold uppercase tracking-[0.12em] text-plp-maroon transition-colors hover:border-plp-maroon"
        >
          <ArrowLeft
            size={15}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to home
        </Link>
      </div>
    </main>
  );
}
