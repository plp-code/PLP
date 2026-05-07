"use client";

import Link from "next/link";
import { Label, Display } from "@/components/common/Typography";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-plp-parchment p-6 text-center overflow-hidden">
      <Label className="mb-4 opacity-40 uppercase tracking-[0.4em] text-xs md:text-sm">
        Error 404
      </Label>

      <Display className="mb-6 text-[12vw] md:text-[10vw] lg:text-[8vw] lowercase leading-[0.85] tracking-tighter text-plp-maroon">
        path not found
      </Display>

      <p className="mb-10 max-w-lg text-base md:text-xl uppercase tracking-tight opacity-80 italic leading-tight text-plp-maroon">
        The requested resource does not exist. It may have been moved, deleted,
        or never existed in the archive.
      </p>

      <Link
        href="/"
        className="group flex items-center gap-3 border-b border-plp-maroon/20 pb-1.5 hover:border-plp-lime transition-all duration-500"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform text-plp-maroon" />
        <Label className="text-xs md:text-sm font-bold tracking-[0.2em] text-plp-maroon">
          Return Back Home
        </Label>
      </Link>

      <div className="absolute bottom-6 right-8 opacity-[0.03] font-plp text-[15vw] pointer-events-none select-none">
        PLP
      </div>
    </main>
  );
}
