"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const { authenticate, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await authenticate(isLogin, formData);
  };

  return (
    <div className="bg-[#c0c0c0] p-1 border-2 border-black shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#808080]">
      <div className="bg-plp-maroon h-8 flex items-center px-2 shadow-[inset_1px_1px_#dfdfdf,inset_-1px_-1px_#0a0a0a] mb-6">
        <h2 className="text-white font-bold text-sm uppercase tracking-tight">
          {isLogin ? "Authentication.exe" : "NewUserSetup.exe"}
        </h2>
      </div>

      <div className="px-6 pb-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-700 text-xs font-bold uppercase p-2 text-center">
              {error}
            </div>
          )}

          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-black font-bold text-xs uppercase tracking-tighter">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  required
                  disabled={isLoading}
                  className="h-9 px-2 bg-white text-black text-sm outline-none shadow-[inset_2px_2px_#808080,inset_-1px_-1px_#fff] focus:bg-plp-parchment disabled:opacity-70"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-black font-bold text-xs uppercase tracking-tighter">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  required
                  disabled={isLoading}
                  className="h-9 px-2 bg-white text-black text-sm outline-none shadow-[inset_2px_2px_#808080,inset_-1px_-1px_#fff] focus:bg-plp-parchment disabled:opacity-70"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-black font-bold text-xs uppercase tracking-tighter">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              disabled={isLoading}
              className="h-9 px-2 bg-white text-black text-sm outline-none shadow-[inset_2px_2px_#808080,inset_-1px_-1px_#fff] focus:bg-plp-parchment disabled:opacity-70"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-black font-bold text-xs uppercase tracking-tighter">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              disabled={isLoading}
              className="h-9 px-2 bg-white text-black text-sm outline-none shadow-[inset_2px_2px_#808080,inset_-1px_-1px_#fff] focus:bg-plp-parchment disabled:opacity-70"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex items-center justify-center h-10 px-4 bg-[#c0c0c0] text-black font-bold text-sm uppercase tracking-tighter shadow-[inset_2px_2px_#fff,inset_-2px_-2px_#808080] hover:brightness-105 active:shadow-[inset_-2px_-2px_#fff,inset_2px_2px_#808080] disabled:opacity-70 disabled:cursor-wait"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : isLogin ? (
              "Login"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#808080] flex flex-col items-center gap-2 shadow-[0_1px_0_#fff]">
          <p className="text-xs text-black uppercase tracking-tighter">
            {isLogin
              ? "Don't have access?"
              : "Already have access?"}
          </p>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
            }}
            disabled={isLoading}
            className="text-xs font-bold text-plp-maroon hover:underline uppercase tracking-tighter disabled:opacity-50"
          >
            {isLogin ? "Create Account" : "Return to Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
