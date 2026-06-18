"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
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
    <div className="bg-[#c0c0c0] p-1 border-2 border-black shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080]">
      <div className="bg-plp-maroon h-9 md:h-8 flex items-center px-3 md:px-2 shadow-[inset_1px_1px_#dfdfdf,inset_-1px_-1px_#0a0a0a] mb-5 md:mb-6">
        <h2 className="text-white font-bold text-[13px] md:text-sm uppercase tracking-tight">
          {isLogin ? "Login in" : "Create Account"}
        </h2>
      </div>

      <div className="px-4 sm:px-6 pb-5 sm:pb-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-700 text-[11px] sm:text-xs font-bold uppercase p-2 text-center">
              {error}
            </div>
          )}

          {!isLogin && (
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 sm:gap-1">
                <label className="text-black font-bold text-[11px] sm:text-xs uppercase tracking-tighter">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  required
                  disabled={isLoading}
                  className="h-10 md:h-9 px-2 bg-white text-black text-sm md:text-base outline-none shadow-[inset_2px_2px_#808080,inset_-1px_-1px_#fff] focus:bg-plp-parchment disabled:opacity-70"
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:gap-1">
                <label className="text-black font-bold text-[11px] sm:text-xs uppercase tracking-tighter">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  required
                  disabled={isLoading}
                  className="h-10 md:h-9 px-2 bg-white text-black text-sm md:text-base outline-none shadow-[inset_2px_2px_#808080,inset_-1px_-1px_#fff] focus:bg-plp-parchment disabled:opacity-70"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5 sm:gap-1">
            <label className="text-black font-bold text-[11px] sm:text-xs uppercase tracking-tighter">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              disabled={isLoading}
              className="h-10 md:h-9 px-2 bg-white text-black text-sm md:text-base outline-none shadow-[inset_2px_2px_#808080,inset_-1px_-1px_#fff] focus:bg-plp-parchment disabled:opacity-70"
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-1">
            <label className="text-black font-bold text-[11px] sm:text-xs uppercase tracking-tighter">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              disabled={isLoading}
              className="h-10 md:h-9 px-2 bg-white text-black text-sm md:text-base outline-none shadow-[inset_2px_2px_#808080,inset_-1px_-1px_#fff] focus:bg-plp-parchment disabled:opacity-70"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer mt-3 sm:mt-2 flex items-center justify-center h-12 md:h-10 px-4 bg-[#c0c0c0] text-black font-bold text-[13px] md:text-sm uppercase tracking-tighter shadow-[inset_2px_2px_#fff,inset_-2px_-2px_#808080] hover:brightness-105 active:shadow-[inset_-2px_-2px_#fff,inset_2px_2px_#808080] disabled:opacity-70 disabled:cursor-wait"
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

        <div className="mt-6 pt-5 border-t border-[#808080] flex flex-col items-center gap-2.5 sm:gap-2 shadow-[0_1px_0_#fff]">
          <p className="text-[11px] sm:text-xs text-black tracking-tighter">
            {isLogin ? "Don't have access?" : "Already have access?"}
          </p>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            disabled={isLoading}
            className="cursor-pointer text-xs sm:text-sm font-bold text-plp-maroon hover:underline uppercase tracking-tighter disabled:opacity-50"
          >
            {isLogin ? "Create Account" : "Return to Login"}
          </button>
        </div>
      </div>
    </div>
  );
}