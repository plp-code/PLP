"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Lock, AlertTriangle } from "lucide-react";
import { useResetPassword } from "@/hooks/useResetPassword";
import { ResetPasswordSuccess } from "./ResetPasswordSuccess";
import { ResetPasswordInvalid } from "./ResetPasswordInvalid";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const { executePasswordReset, isLoading, isSuccess, error: apiError } = useResetPassword();

  if (!token) {
    return <ResetPasswordInvalid />;
  }

  if (isSuccess) {
    return <ResetPasswordSuccess />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (newPassword !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setValidationError("Password must be at least 8 characters long.");
      return;
    }

    await executePasswordReset(token, newPassword);
  };

  const displayError = validationError || apiError;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {displayError && (
        <div className="flex items-center gap-2 bg-plp-maroon/10 border border-plp-maroon/40 text-plp-maroon text-[11px] sm:text-xs font-bold p-2.5">
          <AlertTriangle size={14} className="shrink-0" />
          <span>{displayError}</span>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-plp-maroon font-bold text-[11px] sm:text-xs capitalize tracking-tighter">
          New Password
        </label>
        <div className="relative">
          <Lock
            size={15}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-plp-maroon/40 pointer-events-none"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={isLoading}
            placeholder="••••••••"
            className="plp-input h-10 md:h-9 w-full pl-8 pr-2 text-sm md:text-base"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-plp-maroon font-bold text-[11px] sm:text-xs capitalize tracking-tighter">
          Confirm New Password
        </label>
        <div className="relative">
          <Lock
            size={15}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-plp-maroon/40 pointer-events-none"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            placeholder="••••••••"
            className="plp-input h-10 md:h-9 w-full pl-8 pr-2 text-sm md:text-base"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="plp-btn-primary cursor-pointer mt-2 flex items-center justify-center h-12 md:h-10 px-4 font-bodoni font-bold text-[13px] md:text-sm capitalize tracking-tighter disabled:opacity-70 disabled:cursor-wait"
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          "Update Password"
        )}
      </button>
    </form>
  );
}