"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Mail, Lock, User, AlertTriangle } from "lucide-react";
import { useAuthActions } from "@/hooks/useAuth";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const { login, register, isLoading, error } = useAuthActions(returnTo);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (isLogin) {
      await login(formData);
    } else {
      await register(formData);
    }
  };

  return (
    <div className="plp-window p-1">
      <div className="plp-titlebar h-9 md:h-8 flex items-center justify-between px-3 md:px-2">
        <h2 className="font-bold text-[13px] md:text-sm capitalize tracking-tight">
          {isLogin ? "Login" : "Create Account"}
        </h2>
      </div>

      <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-5 sm:pb-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="flex items-center gap-2 bg-plp-maroon/10 border border-plp-maroon/40 text-plp-maroon text-[11px] sm:text-xs font-bold normal-case p-2.5">
              <AlertTriangle size={14} className="shrink-0" />
              <span>{error}</span>
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                disabled={isLoading}
                className="plp-input h-10 md:h-9 w-full pl-8 pr-2 text-sm md:text-base"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-plp-maroon font-bold text-[11px] sm:text-xs capitalize tracking-tighter">
              Password
            </label>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-plp-maroon/40 pointer-events-none"
              />
              <input
                type="password"
                name="password"
                required
                disabled={isLoading}
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
            ) : isLogin ? (
              "Login"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-plp-slate/50 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs tracking-tighter">
          <span className="text-plp-maroon/60">
            {isLogin ? "Don't have access?" : "Already have access?"}
          </span>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            disabled={isLoading}
            className="cursor-pointer font-bold text-plp-maroon hover:underline underline-offset-2 capitalize disabled:opacity-50"
          >
            {isLogin ? "Create Account" : "Return to Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
