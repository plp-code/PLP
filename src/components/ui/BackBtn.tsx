"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // This only runs once React has hydrated. Before that, the click falls
    // through to the anchor's href below and navigates home natively — so the
    // very first click always does something instead of being swallowed while
    // the header is painted but not yet interactive.
    e.preventDefault();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <a
      href="/"
      onClick={handleBack}
      aria-label="Go back"
      className="cursor-pointer flex items-center justify-center w-9 h-9 bg-[#c0c0c0] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080] active:shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#808080] text-plp-navy"
    >
      <ChevronLeft size={18} />
    </a>
  );
}
