import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export function ResetPasswordInvalid() {
  return (
    <div className="flex flex-col items-center text-center py-2">
      <AlertTriangle size={36} className="text-plp-maroon mb-3" />
      <p className="text-plp-maroon/80 text-[11px] sm:text-xs font-bold leading-relaxed mb-6">
        Invalid or missing password reset token. Please request a new reset link.
      </p>
      <Link
        href="/forgot-password"
        className="plp-btn-primary flex items-center justify-center gap-2 h-10 w-full font-bodoni font-bold text-[13px] capitalize tracking-tighter"
      >
        Request Reset Link
      </Link>
    </div>
  );
}