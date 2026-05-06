"use client";

import Link from "next/link";
import { Label, Display } from "@/components/common/Typography";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-plp-parchment p-8 text-center overflow-hidden">
      <Label className="mb-6 opacity-40 uppercase tracking-[0.6em] text-sm md:text-base">
        Error 404
      </Label>

      <Display className="mb-10 text-[15vw] md:text-[12vw] lg:text-[10vw] lowercase leading-[0.8] tracking-tighter text-plp-maroon">
        path not found
      </Display>

      <p className="mb-16 max-w-2xl text-lg md:text-2xl uppercase tracking-tight opacity-80 italic leading-tight text-plp-maroon">
        The requested resource does not exist. It may have been moved, deleted,
        or never existed.
      </p>

      <Link
        href="/"
        className="group flex items-center gap-4 border-b-2 border-plp-maroon/20 pb-2 hover:border-plp-lime transition-all duration-500"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform text-plp-maroon" />
        <Label className="text-sm md:text-base font-bold tracking-[0.3em] text-plp-maroon">
          Return Back Home
        </Label>
      </Link>

      <div className="absolute bottom-10 right-10 opacity-[0.03] font-plp text-[20vw] pointer-events-none select-none">
        PLP
      </div>
    </main>
  );
}
