"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function HeaderSimplified() {
  return (
    <header className="fixed top-0 left-0 w-full z-100 flex flex-col bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] border-b-2 border-black">
      <div className="flex items-center justify-between h-14 bg-plp-maroon p-2 mx-1 my-1 shadow-[inset_1px_1px_#dfdfdf,inset_-1px_-1px_#0a0a0a]">
        <Link
          href="/"
          className="cursor-pointer flex items-center justify-center w-9 h-9 bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#808080] hover:brightness-105 group"
          title="Return to Index"
        >
          <ArrowLeft
            size={16}
            className="text-black group-hover:-translate-x-0.5 transition-transform"
          />
        </Link>

        <div className="flex-1 text-center">
          <Link
            href="/"
            className="font-seventies text-white text-lg md:text-xl tracking-tight uppercase px-4"
          >
            The Preloved Professional
          </Link>
        </div>

        <div className="w-9" />
      </div>
    </header>
  );
}
