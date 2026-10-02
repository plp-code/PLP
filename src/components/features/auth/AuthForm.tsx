"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Loader2,
  Mail,
  Lock,
  User,
  AlertTriangle,
  CheckCircle2,
  KeyRound,
} from "lucide-react";
import { useAuthActions } from "@/hooks/useAuth";
import { useMagicLink } from "@/hooks/useMagicLink";

type AuthMethod = "password" | "magic-link";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<AuthMethod>("password");
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const { login, register, isLoading, error, checkEmail, resetCheckEmail } =
    useAuthActions(returnTo);
  const {
    sendMagicLink,
    isLoading: isMagicLinkLoading,
    isSubmitted: isMagicLinkSubmitted,
    error: magicLinkError,
  } = useMagicLink();

  const toggleMode = () => {
    resetCheckEmail();
    setIsLogin(!isLogin);
    setAuthMethod("password");
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (isLogin && authMethod === "magic-link") {
      const email = formData.get("email") as string;
      await sendMagicLink(email);
      return;
    }

    if (isLogin) {
      await login(formData);
    } else {
      await register(formData);
    }
  };

  const activeError = authMethod === "magic-link" ? magicLinkError : error;
  const busy = isLoading || isMagicLinkLoading;

  return (
    <div className="plp-window p-1">
      <div className="plp-titlebar h-9 md:h-8 flex items-center justify-between px-3 md:px-2">
        <h2 className="font-bold text-[13px] md:text-sm capitalize tracking-tight">
          {isLogin ? "Login" : "Create Account"}
        </h2>
      </div>

      <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-5 sm:pb-6">
        {!isLogin && checkEmail ? (
          <div className="flex flex-col items-center text-center py-2">
            <CheckCircle2 size={36} className="text-plp-maroon mb-3" />
            <h3 className="text-plp-maroon font-bold text-sm sm:text-base capitalize tracking-tight mb-2">
              Check Your Email
            </h3>
            <p className="text-plp-maroon/80 text-[11px] sm:text-xs leading-relaxed mb-6">
              We&apos;ve sent you a link to finish setting up your account.
              It expires in 15 minutes.
            </p>
            <button
              type="button"
              onClick={() => {
                resetCheckEmail();
                setIsLogin(true);
              }}
              className="plp-btn-primary cursor-pointer flex items-center justify-center h-10 w-full font-bodoni font-bold text-[13px] capitalize tracking-tighter"
            >
              Back to Login
            </button>
          </div>
        ) : isLogin && authMethod === "magic-link" && isMagicLinkSubmitted ? (
          <div className="flex flex-col items-center text-center py-2">
            <CheckCircle2 size={36} className="text-plp-maroon mb-3" />
            <h3 className="text-plp-maroon font-bold text-sm sm:text-base capitalize tracking-tight mb-2">
              Check Your Inbox
            </h3>
            <p className="text-plp-maroon/80 text-[11px] sm:text-xs leading-relaxed mb-6">
              If an account exists for that email, we've sent a login link.
              It expires in 15 minutes.
            </p>
            <button
              type="button"
              onClick={() => setAuthMethod("password")}
              className="plp-btn-primary cursor-pointer flex items-center justify-center h-10 w-full font-bodoni font-bold text-[13px] capitalize tracking-tighter"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {activeError && (
                <div className="flex items-center gap-2 bg-plp-maroon/10 border border-plp-maroon/40 text-plp-maroon text-[11px] sm:text-xs font-bold normal-case p-2.5">
                  <AlertTriangle size={14} className="shrink-0" />
                  <span>{activeError}</span>
                </div>
              )}

              {!isLogin && (
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-plp-maroon font-bold text-[11px] sm:text-xs capitalize tracking-tighter">
                      First Name
                    </label>
                    <div className="relative">
                      <User
                        size={15}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-plp-maroon/40 pointer-events-none"
                      />
                      <input
                        type="text"
                        name="first_name"
                        required
                        disabled={busy}
                        className="plp-input h-10 md:h-9 w-full pl-8 pr-2 text-sm md:text-base"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-plp-maroon font-bold text-[11px] sm:text-xs capitalize tracking-tighter">
                      Last Name
                    </label>
                    <div className="relative">
                      <User
                        size={15}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-plp-maroon/40 pointer-events-none"
                      />
                      <input
                        type="text"
                        name="last_name"
                        required
                        disabled={busy}
                        className="plp-input h-10 md:h-9 w-full pl-8 pr-2 text-sm md:text-base"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-plp-maroon font-bold text-[11px] sm:text-xs capitalize tracking-tighter">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-plp-maroon/40 pointer-events-none"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={busy}
                    className="plp-input h-10 md:h-9 w-full pl-8 pr-2 text-sm md:text-base"
                  />
                </div>
              </div>

              {(!isLogin || authMethod === "password") && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-plp-maroon font-bold text-[11px] sm:text-xs capitalize tracking-tighter">
                      Password
                    </label>
                    {isLogin && (
                      <Link
                        href="/forgot-password"
                        className="text-[10px] sm:text-[11px] font-bold text-plp-maroon/70 hover:text-plp-maroon hover:underline tracking-tighter"
                      >
                        Forgot Password?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <Lock
                      size={15}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-plp-maroon/40 pointer-events-none"
                    />
                    <input
                      type="password"
                      name="password"
                      required
                      disabled={busy}
                      className="plp-input h-10 md:h-9 w-full pl-8 pr-2 text-sm md:text-base"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={busy}
                className="plp-btn-primary cursor-pointer mt-2 flex items-center justify-center h-12 md:h-10 px-4 font-bodoni font-bold text-[13px] md:text-sm capitalize tracking-tighter disabled:opacity-70 disabled:cursor-wait"
              >
                {busy ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : isLogin ? (
                  authMethod === "magic-link" ? (
                    "Email Me a Login Link"
                  ) : (
                    "Login"
                  )
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {isLogin && (
              <button
                type="button"
                onClick={() =>
                  setAuthMethod(
                    authMethod === "password" ? "magic-link" : "password",
                  )
                }
                disabled={busy}
                className="cursor-pointer mt-3 w-full flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-plp-maroon/70 hover:text-plp-maroon hover:underline tracking-tighter disabled:opacity-50"
              >
                <KeyRound size={12} />
                {authMethod === "magic-link"
                  ? "Use password instead"
                  : "Email me a login link"}
              </button>
            )}

            <div className="mt-6 pt-5 border-t border-plp-slate/50 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs tracking-tighter">
              <span className="text-plp-maroon/60">
                {isLogin ? "Don't have access?" : "Already have access?"}
              </span>
              <button
                type="button"
                onClick={toggleMode}
                disabled={busy}
                className="cursor-pointer font-bold text-plp-maroon hover:underline underline-offset-2 capitalize disabled:opacity-50"
              >
                {isLogin ? "Create Account" : "Return to Login"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
