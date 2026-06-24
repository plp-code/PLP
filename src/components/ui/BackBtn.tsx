"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="cursor-pointer uppercase flex items-center gap-1.5 h-10 md:h-9 px-3 sm:px-4 bg-[#c0c0c0] text-black font-bold text-[11px] md:text-[13px] capitalize tracking-tighter shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] hover:brightness-105 active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#808080] disabled:opacity-70 disabled:cursor-wait transition-all"
      aria-label="Go back to previous page"
    >
      <ArrowLeft size={14} />
      <span className="hidden sm:inline">Back</span>
    </button>
  );
}