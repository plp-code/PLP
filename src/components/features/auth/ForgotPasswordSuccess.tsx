import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";

interface Props {
  email: string;
}

export function ForgotPasswordSuccess({ email }: Props) {
  return (
    <div className="flex flex-col items-center text-center py-2">
      <CheckCircle2 size={36} className="text-plp-maroon mb-3" />
      <h3 className="text-plp-maroon font-bold text-sm sm:text-base capitalize tracking-tight mb-2">
        Check Your Inbox
      </h3>
      <p className="text-plp-maroon/80 text-[11px] sm:text-xs leading-relaxed mb-6">
        If an account with <span className="font-bold">{email}</span> exists, a
        password reset link has been sent. The link expires in 15 minutes.
      </p>
      <Link
        href="/login"
        className="plp-btn-primary flex items-center justify-center gap-2 h-10 w-full font-bodoni font-bold text-[13px] capitalize tracking-tighter"
      >
        <ArrowLeft size={14} />
        Return to Login
      </Link>
    </div>
  );
}