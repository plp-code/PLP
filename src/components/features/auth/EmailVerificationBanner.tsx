"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, MailWarning, X } from "lucide-react";
import { useAuthUser } from "@/context/AuthContext";
import { useResendVerification } from "@/hooks/useResendVerification";

const DISMISS_KEY = "emailVerifyBannerDismissed";

// Starts "dismissed" so nothing renders before the stored value is read.
function usePassiveDismissal() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    // Read after mount so server and client markup match on first render.
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  };

  return { dismissed, dismiss };
}

export function EmailVerificationBanner() {
  const { user, emailVerificationBlocked, setEmailVerificationBlocked } =
    useAuthUser();
  const { dismissed: dismissedPassive, dismiss: dismissPassive } =
    usePassiveDismissal();
  const { state, resend } = useResendVerification();

  if (!user || user.is_verified !== false) return null;
  if (!emailVerificationBlocked && dismissedPassive) return null;

  // Dismissing a 403 prompt must not set or clear the persistent dismissal.
  const handleDismiss = () => {
    if (emailVerificationBlocked) setEmailVerificationBlocked(false);
    else dismissPassive();
  };

  const message =
    state === "sent"
      ? "Verification email sent. Check your inbox."
      : state === "rate_limited"
        ? "Too many requests, try again in a minute."
        : state === "error"
          ? "Something went wrong. Please try again."
          : emailVerificationBlocked
            ? "Verify your email to do that. We can send you a new link."
            : "Verify your email to protect your account and secure your purchases.";

  return (
    <div
      role="region"
      aria-label="Email verification"
      className="pointer-events-none fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-[4000] sm:right-auto sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:left-6 sm:max-w-sm"
    >
      <div className="plp-window pointer-events-auto p-1">
        <div className="flex items-start gap-3 px-3 py-3">
          {state === "sent" ? (
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-plp-maroon" />
          ) : (
            <MailWarning size={20} className="mt-0.5 shrink-0 text-plp-maroon" />
          )}

          <div className="min-w-0 flex-1">
            <p role="status" className="text-plp-maroon text-xs font-bold leading-relaxed">
              {message}
            </p>
            {state !== "sent" && (
              <button
                type="button"
                onClick={resend}
                disabled={state === "sending"}
                className="plp-btn-primary cursor-pointer mt-2 flex h-8 items-center justify-center gap-2 px-3 font-bodoni text-xs font-bold capitalize tracking-tighter disabled:cursor-wait disabled:opacity-70"
              >
                {state === "sending" && (
                  <Loader2 size={14} className="animate-spin" />
                )}
                Resend email
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="cursor-pointer shrink-0 text-plp-maroon/60 hover:text-plp-maroon"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
