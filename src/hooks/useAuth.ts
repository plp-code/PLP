"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/context/AuthContext";
import { api, setTokenExpiry, markSession } from "@/lib/api";
import { AuthResponse } from "@/types/api";

const DEFAULT_RETURN_PATH = "/maps";

function getSafeReturnPath(returnTo?: string | null) {
  if (!returnTo) return DEFAULT_RETURN_PATH;

  if (!returnTo.startsWith("/") || returnTo.startsWith("//")) {
    return DEFAULT_RETURN_PATH;
  }

  return returnTo;
}

export function useAuthActions(returnTo?: string | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { checkSession, setAuthBusy } = useAuthUser();
  const targetPath = getSafeReturnPath(returnTo);

  const login = async (formData: FormData) => {
    setIsLoading(true);
    setAuthBusy(true);
    setError(null);

    try {
      const email = formData.get("email");
      const password = formData.get("password");

      await api.post<AuthResponse>(
        "/auth/login",
        {
          email: email,
          password: password,
        },
        { skipRefresh: true },
      );
      setTokenExpiry(30 * 60);
      markSession();
      await checkSession();
      router.replace(targetPath);
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
      setAuthBusy(false);
    }
  };

  const register = async (formData: FormData) => {
    setIsLoading(true);
    setAuthBusy(true);
    setError(null);

    try {
      const payload = Object.fromEntries(formData.entries());
      await api.post("/auth/register", payload, { skipRefresh: true });
      setTokenExpiry(30 * 60);
      markSession();
      await checkSession();
      router.replace(targetPath);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please check your inputs.");
    } finally {
      setIsLoading(false);
      setAuthBusy(false);
    }
  };
  return { login, register, isLoading, error };
}
