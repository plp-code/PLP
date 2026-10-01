"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { api, setTokenExpiry, markSession } from "@/lib/api";

const POLL_INTERVAL_MS = 1200;
const MAX_POLLS = 15;

type CheckoutStatus = "pending" | "complete" | "expired" | "failed";

interface CheckoutStatusResponse {
  status: CheckoutStatus;
  map_slug?: string; // only guaranteed when status === "complete"
  requires_verification?: boolean; // no session issued; user must verify via email
}

export type CheckoutCompleteState =
  | "polling"
  | "success"
  | "verify_email"
  | "error"
  | "timeout"
  | "missing";

export function useCheckoutComplete() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const sessionId = searchParams.get("session_id");

  const [viewState, setViewState] = useState<CheckoutCompleteState>(
    sessionId ? "polling" : "missing",
  );

  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    let pollCount = 0;

    const poll = async () => {
      if (cancelled) return;

      try {
        const data = await api.get<CheckoutStatusResponse>(
          `/checkout/status/${encodeURIComponent(sessionId)}`,
        );
        if (cancelled) return;

        if (data.status === "complete") {
          // No safe session to hand over: don't mark a session or redirect.
          if (data.requires_verification) {
            setViewState("verify_email");
            return;
          }
          if (!data.map_slug) {
            setViewState("error");
            return;
          }
          setTokenExpiry(30 * 60);
          markSession();
          await queryClient.invalidateQueries({ queryKey: ["session"] });
          if (cancelled) return;
          setViewState("success");
          router.replace(`/maps/${data.map_slug}`);
          return;
        }

        if (data.status === "expired" || data.status === "failed") {
          setViewState("error");
          return;
        }
      } catch {
        // ignored: keep polling until MAX_POLLS
      }

      pollCount += 1;
      if (pollCount >= MAX_POLLS) {
        setViewState("timeout");
        return;
      }
      timeoutId = setTimeout(poll, POLL_INTERVAL_MS);
    };

    poll();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [sessionId, router, queryClient]);

  return { viewState };
}
