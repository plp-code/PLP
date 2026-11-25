"use client";

import { useState } from "react";
import { MailWarning, X } from "lucide-react";
import { useAuthUser } from "@/context/AuthContext";

const DISMISS_KEY = "emailVerifyBannerDismissed";

function readDismissed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function usePassiveDismissal() {
  const [dismissed, setDismissed] = useState(readDismissed);

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

  if (!user || user.is_verified !== false) return null;
  if (!emailVerificationBlocked && dismissedPassive) return null;

  const handleDismiss = () => {
    if (emailVerificationBlocked) setEmailVerificationBlocked(false);
    else dismissPassive();
  };

  const message =
    "Verify your email to protect your account and secure your purchases. Use the link in your original verification email.";

  return (
    <div
      role="region"
      aria-label="Email verification"
      className="pointer-events-none fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-[4000] sm:right-auto sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:left-6 sm:max-w-sm"
    >
      <div className="plp-window pointer-events-auto p-1">
        <div className="flex items-start gap-3 px-3 py-3">
          <MailWarning size={20} className="mt-0.5 shrink-0 text-plp-maroon" />

          <div className="min-w-0 flex-1">
            <p
              role="status"
              className="text-plp-maroon text-xs font-bold leading-relaxed"
            >
              {message}
            </p>
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
