"use client";

import type { ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, CheckCircle2, MailWarning } from "lucide-react";
import { useVerifyEmail } from "@/hooks/useVerifyEmail";
import { useResendVerification } from "@/hooks/useResendVerification";
import { useAuthUser } from "@/context/AuthContext";
import { buildLoginRedirect } from "@/lib/returnTo";
import { Spinner } from "@/components/ui/Spinner";

const BUTTON_CLASS =
  "plp-btn-primary cursor-pointer flex items-center justify-center min-h-11 px-4 w-full font-bodoni font-bold text-sm capitalize tracking-tighter disabled:opacity-70 disabled:cursor-wait";

function Card({
  title,
  icon: Icon,
  message,
  children,
}: {
  title: string;
  icon: typeof AlertTriangle;
  message: string;
  children?: ReactNode;
}) {
  return (
    <div className="plp-window p-1 w-full">
      <div className="plp-titlebar h-10 md:h-8 flex items-center px-3 md:px-2">
        <h2 className="font-bold text-sm capitalize tracking-tight truncate">
          {title}
        </h2>
      </div>
      <div className="px-4 sm:px-6 py-6 flex flex-col items-center text-center gap-4">
        <Icon size={40} className="text-plp-maroon" aria-hidden />
        <p
          role="status"
          className="text-plp-maroon/80 text-xs sm:text-sm leading-relaxed text-balance break-words"
        >
          {message}
        </p>
        {children}
      </div>
    </div>
  );
}

export function VerifyEmailView() {
  const router = useRouter();
  const token = useSearchParams().get("token")?.trim() || null;
  const { state, retry } = useVerifyEmail(token);
  const { user, isLoading: authLoading, logout } = useAuthUser();
  const { state: resendState, resend } = useResendVerification();

  const verifyPath = `/verify-email?token=${encodeURIComponent(token ?? "")}`;

  const handleResend = () => {
    if (!user) {
      router.push(buildLoginRedirect(verifyPath));
      return;
    }
    resend();
  };

  const handleLogout = async () => {
    await logout();
    router.replace(buildLoginRedirect(verifyPath));
  };

  if (state === "checking") return <Spinner text="Verifying your email" />;

  if (state === "success") {
    return (
      <Card
        title="Email Verified"
        icon={CheckCircle2}
        message="Your email is verified. Taking you back now..."
      />
    );
  }

  if (state === "mismatch") {
    return (
      <Card
        title="Wrong Account"
        icon={AlertTriangle}
        message="This link is for a different account. Log out and try again."
      >
        <button type="button" onClick={handleLogout} className={BUTTON_CLASS}>
          Log Out
        </button>
      </Card>
    );
  }

  if (state === "error") {
    return (
      <Card
        title="Something Went Wrong"
        icon={AlertTriangle}
        message="We couldn't verify your email right now. Please try again."
      >
        <button type="button" onClick={retry} className={BUTTON_CLASS}>
          Try Again
        </button>
      </Card>
    );
  }

  const resendMessage =
    resendState === "sent"
      ? "We've sent a new verification email."
      : resendState === "rate_limited"
        ? "Too many requests, try again in a minute."
        : resendState === "error"
          ? "Something went wrong. Please try again."
          : null;

  return (
    <Card
      title="Link Expired"
      icon={MailWarning}
      message="This link has expired or is invalid."
    >
      {resendMessage && (
        <p role="status" className="text-plp-maroon text-xs font-bold">
          {resendMessage}
        </p>
      )}
      {resendState !== "sent" && (
        <button
          type="button"
          onClick={handleResend}
          disabled={authLoading || resendState === "sending"}
          className={BUTTON_CLASS}
        >
          {resendState === "sending" ? "Sending..." : "Resend Email"}
        </button>
      )}
    </Card>
  );
}
