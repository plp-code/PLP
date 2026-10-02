"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { api, ApiError } from "@/lib/api";
import { useSnackbar } from "@/context/SnackbarContext";
import { buildLoginRedirect, getSafeReturnPath } from "@/lib/returnTo";

type VerifyState = "checking" | "success" | "invalid" | "mismatch" | "error";

export function useVerifyEmail(token: string | null) {
  const [state, setState] = useState<VerifyState>(
    token ? "checking" : "invalid",
  );
  const [attempt, setAttempt] = useState(0);
  const firedAttempt = useRef<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  useEffect(() => {
    if (!token || firedAttempt.current === attempt) return;
    firedAttempt.current = attempt;

    (async () => {
      try {
        // No skipRefresh: an expired access token refreshes and retries.
        await api.post("/auth/verify-email", { token });
        await queryClient.invalidateQueries({ queryKey: ["session"] });
        setState("success");
        snackbar.success("Email verified");
        router.replace(getSafeReturnPath(searchParams.get("returnTo")));
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          router.replace(
            buildLoginRedirect(
              `/verify-email?token=${encodeURIComponent(token)}`,
            ),
          );
        } else if (err instanceof ApiError && err.status === 403) {
          setState("mismatch");
        } else if (err instanceof ApiError && err.status === 400) {
          setState("invalid");
        } else {
          setState("error");
        }
      }
    })();
  }, [token, attempt, router, queryClient, snackbar, searchParams]);

  const retry = useCallback(() => {
    setState("checking");
    setAttempt((a) => a + 1);
  }, []);

  return { state, retry };
}
