"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Mail, AlertTriangle } from "lucide-react";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { ForgotPasswordSuccess } from "./ForgotPasswordSuccess";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const { requestPasswordReset, isLoading, isSubmitted, error } = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await requestPasswordReset(email);
  };

  if (isSubmitted) {
    return <ForgotPasswordSuccess email={email} />;
  }

  return (
    <>
      <p className="text-plp-maroon/70 text-[11px] sm:text-xs font-bold leading-normal mb-4">
        Enter your registered email address and we'll send you a link to reset
        your password.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="flex items-center gap-2 bg-plp-maroon/10 border border-plp-maroon/40 text-plp-maroon text-[11px] sm:text-xs font-bold p-2.5">
            <AlertTriangle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-plp-maroon font-bold text-[11px] sm:text-xs capitalize tracking-tighter">
            Email Address
          </label>
          <div className="relative">
            <Mail
              size={15}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-plp-maroon/40 pointer-events-none"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              placeholder="name@example.com"
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
            "Send Reset Link"
          )}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-plp-slate/50 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs tracking-tighter">
        <span className="text-plp-maroon/60">Remembered your password?</span>
        <Link
          href="/login"
          className="font-bold text-plp-maroon hover:underline underline-offset-2 capitalize"
        >
          Return to Login
        </Link>
      </div>
    </>
  );
}