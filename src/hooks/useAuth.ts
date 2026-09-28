"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/context/AuthContext";
import { api, setTokenExpiry, markSession } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types/models";

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
  const queryClient = useQueryClient();
  const { checkSession, setAuthBusy } = useAuthUser();
  const targetPath = getSafeReturnPath(returnTo);

  const login = async (formData: FormData) => {
    if (isLoading) return;

    setIsLoading(true);
    setAuthBusy(true);
    setError(null);

    try {
      const email = formData.get("email");
      const password = formData.get("password");

      const user = await api.post<User>(
        "/auth/login",
        { email, password },
        { skipRefresh: true },
      );
      setTokenExpiry(30 * 60);
      markSession();
      queryClient.setQueryData(["session"], user);
      router.replace(targetPath);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid email or password.",
      );
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
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please check your inputs.",
      );
    } finally {
      setIsLoading(false);
      setAuthBusy(false);
    }
  };
  return { login, register, isLoading, error };
}
