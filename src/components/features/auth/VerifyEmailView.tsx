"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, CheckCircle2, LogIn, MailWarning } from "lucide-react";
import { useVerifyEmail } from "@/hooks/useVerifyEmail";
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
        <h1 className="font-bold text-sm capitalize tracking-tight truncate">
          {title}
        </h1>
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
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() || null;
  const { state, retry } = useVerifyEmail(token);
  const { logout } = useAuthUser();

  const verifyParams = new URLSearchParams({ token: token ?? "" });
  const returnTo = searchParams.get("returnTo");
  if (returnTo) verifyParams.set("returnTo", returnTo);
  const verifyPath = `/verify-email?${verifyParams.toString()}`;

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

  if (state === "login_required") {
    return (
      <Card
        title="Log In Required"
        icon={LogIn}
        message="Log in to verify your email."
      >
        <Link href={buildLoginRedirect(verifyPath)} className={BUTTON_CLASS}>
          Log In
        </Link>
      </Card>
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

  return (
    <Card
      title="Link Expired"
      icon={MailWarning}
      message="This link has expired or is invalid."
    />
  );
}
