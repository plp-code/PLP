"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export function ResetPasswordSuccess() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center text-center py-2">
      <CheckCircle2 size={36} className="text-plp-maroon mb-3" />
      <h3 className="text-plp-maroon font-bold text-sm sm:text-base capitalize tracking-tight mb-2">
        Password Reset Complete
      </h3>
      <p className="text-plp-maroon/80 text-[11px] sm:text-xs leading-relaxed mb-6">
        Your password has been updated successfully. All other active sessions
        have been revoked.
      </p>
      <button
        onClick={() => router.push("/login")}
        className="plp-btn-primary cursor-pointer flex items-center justify-center gap-2 h-10 w-full font-bodoni font-bold text-[13px] capitalize tracking-tighter"
      >
        Login With New Password
      </button>
    </div>
  );
}