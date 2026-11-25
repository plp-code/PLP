"use client";

import { useCallback, useState } from "react";
import { KeyRound } from "lucide-react";
import { useAuthUser } from "@/context/AuthContext";
import { SNACKBAR_PRESETS } from "@/context/SnackbarContext";
import { Snackbar } from "@/components/ui/Snackbar";

const DISMISS_KEY = "guestPasswordBannerDismissed";

function readDismissed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function GuestPasswordBanner() {
  const { user, emailVerificationBlocked } = useAuthUser();
  const [dismissed, setDismissed] = useState(readDismissed);

  const dismiss = useCallback(() => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  }, []);

  if (!user || user.has_password !== false || dismissed) return null;
  if (emailVerificationBlocked && user.is_verified === false) return null;

  const preset = SNACKBAR_PRESETS.info;

  return (
    <Snackbar
      show
      onClose={dismiss}
      icon={KeyRound}
      iconColor={preset.iconColor}
      borderColor={preset.borderColor}
      bgColor={preset.bgColor}
      textColor={preset.textColor}
      role={preset.role}
      autoCloseMs={preset.autoCloseMs}
      position="bottom-right"
      title="Set a password so you can get back to your maps."
      action={{ label: "Set password", href: "/forgot-password" }}
    />
  );
}
