"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { api, setTokenExpiry, markSession } from "@/lib/api";

const POLL_INTERVAL_MS = 1200;
const MAX_POLLS = 15;

interface CheckoutStatusResponse {
  status: string;
  map_slug?: string | null;
  requires_login?: boolean;
  logged_in?: boolean;
}

export type CheckoutCompleteState =
  | "polling"
  | "success"
  | "requires_login"
  | "already_owned"
  | "error"
  | "timeout"
  | "missing";

export function useCheckoutComplete() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const sessionId = searchParams.get("session_id");

  const [mapSlug, setMapSlug] = useState<string | null>(null);
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

        if (data.status === "pending") {
        } else if (data.status === "complete") {
          if (!data.map_slug) {
            setViewState("error");
            return;
          }
          setMapSlug(data.map_slug);

          if (data.requires_login) {
            setViewState("requires_login");
            return;
          }
          setTokenExpiry(30 * 60);
          markSession();
          await queryClient.invalidateQueries({ queryKey: ["session"] });
          if (cancelled) return;
          setViewState("success");
          router.replace(`/maps/${data.map_slug}`);
          return;
        } else if (data.status === "already_owned") {
          if (data.logged_in && data.map_slug) {
            setViewState("success");
            router.replace(`/maps/${data.map_slug}`);
            return;
          }
          setMapSlug(data.map_slug ?? null);
          setViewState("already_owned");
          return;
        } else {
          setViewState("error");
          return;
        }
      } catch {}

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

  return { viewState, mapSlug };
}
