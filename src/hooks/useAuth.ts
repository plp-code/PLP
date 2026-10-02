"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/context/AuthContext";
import { useSnackbar } from "@/context/SnackbarContext";
import { api, setTokenExpiry, markSession } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { getSafeReturnPath } from "@/lib/returnTo";
import type { User } from "@/types/models";

export function useAuthActions(returnTo?: string | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { checkSession, setAuthBusy } = useAuthUser();
  const snackbar = useSnackbar();
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
      snackbar.success("Welcome back");
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
      const res = await api.post<{ status?: string }>("/auth/register", payload, {
        skipRefresh: true,
      });
      if (res?.status === "check_email") {
        setCheckEmail(true);
        return;
      }
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
  const resetCheckEmail = () => setCheckEmail(false);

  return { login, register, isLoading, error, checkEmail, resetCheckEmail };
}
