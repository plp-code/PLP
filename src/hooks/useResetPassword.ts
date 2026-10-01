"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { getSafeReturnPath } from "@/lib/returnTo";
import { api, setTokenExpiry, markSession } from "@/lib/api";

type ResetState = "checking" | "valid" | "invalid";

interface ResetCheckResponse {
  valid: boolean;
  has_password?: boolean;
}

export function useResetPassword(token: string | null) {
  const [state, setState] = useState<ResetState>(token ? "checking" : "invalid");
  const [hasPassword, setHasPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    (async () => {
      try {
        const data = await api.get<ResetCheckResponse>(
          `/auth/reset-password/check?token=${encodeURIComponent(token)}`,
          { skipRefresh: true },
        );
        if (cancelled) return;
        setHasPassword(data.has_password ?? true);
        setState(data.valid ? "valid" : "invalid");
      } catch {
        if (!cancelled) setState("invalid");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const executePasswordReset = async (newPassword: string) => {
    if (!token) return;
    setIsLoading(true);

    try {
      await api.post(
        "/auth/reset-password",
        { token, new_password: newPassword },
        { skipRefresh: true },
      );
      setTokenExpiry(30 * 60);
      markSession();
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      router.replace(getSafeReturnPath(searchParams.get("returnTo")));
    } catch {
      setState("invalid");
      setIsLoading(false);
    }
  };

  return { state, hasPassword, isLoading, executePasswordReset };
}
