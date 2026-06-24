"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="plp-btn cursor-pointer uppercase flex items-center gap-1.5 h-10 md:h-9 px-3 sm:px-4 font-bodoni font-bold text-[11px] md:text-[13px] capitalize tracking-tighter disabled:opacity-70 disabled:cursor-wait"
      aria-label="Go back to previous page"
    >
      <ArrowLeft size={14} />
      <span className="hidden sm:inline">Back</span>
    </button>
  );
}