"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export function ResetPasswordInvalid() {
  const returnTo = useSearchParams().get("returnTo");
  const params = new URLSearchParams({ method: "magic-link" });
  if (returnTo) params.set("returnTo", returnTo);

  return (
    <div className="flex flex-col items-center text-center py-2">
      <AlertTriangle size={36} className="text-plp-maroon mb-3" />
      <p
        role="status"
        className="text-plp-maroon/80 text-[11px] sm:text-xs font-bold leading-relaxed mb-6"
      >
        This link has expired.
      </p>
      <Link
        href={`/login?${params.toString()}`}
        className="plp-btn-primary flex items-center justify-center gap-2 h-10 w-full font-bodoni font-bold text-[13px] capitalize tracking-tighter"
      >
        Send Me a New Link
      </Link>
      <Link
        href="/forgot-password"
        className="mt-3 text-[11px] sm:text-xs font-bold text-plp-maroon/80 hover:text-plp-maroon hover:underline underline-offset-2"
      >
        Reset password instead
      </Link>
    </div>
  );
}
