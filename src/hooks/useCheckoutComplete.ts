"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { api, setTokenExpiry, markSession } from "@/lib/api";
import { friendlyError } from "@/lib/errors";

const POLL_INTERVAL_MS = 1500;
const POLL_TIMEOUT_MS = 60_000;
const RESEND_COOLDOWN_SECONDS = 60;

type CheckoutStatus =
  | "pending"
  | "complete"
  | "already_owned"
  | "refunded"
  | "duplicate"
  | "expired"
  | "failed";

interface CheckoutStatusResponse {
  status: CheckoutStatus | string;
  map_slug?: string | null;
  requires_login?: boolean;
  email_hint?: string | null;
  logged_in?: boolean;
}

export type CheckoutCompleteState =
  | "polling"
  | "success"
  | "requires_login"
  | "already_owned"
  | "refunded"
  | "error"
  | "timeout"
  | "missing";

export function useCheckoutComplete() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const sessionId = searchParams.get("session_id");

  const [mapSlug, setMapSlug] = useState<string | null>(null);
  const [emailHint, setEmailHint] = useState<string | null>(null);
  const [viewState, setViewState] = useState<CheckoutCompleteState>(
    sessionId ? "polling" : "missing",
  );

  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    const deadline = Date.now() + POLL_TIMEOUT_MS;

    const poll = async () => {
      if (cancelled) return;

      try {
        const data = await api.get<CheckoutStatusResponse>(
          `/checkout/status/${encodeURIComponent(sessionId)}`,
        );
        if (cancelled) return;

        switch (data.status) {
          case "pending":
            break;

          case "complete": {
            if (!data.map_slug) {
              setViewState("error");
              return;
            }
            setMapSlug(data.map_slug);

            if (data.requires_login) {
              setEmailHint(data.email_hint ?? null);
              setViewState("requires_login");
              return;
            }

            setTokenExpiry(30 * 60);
            markSession();
            await queryClient.invalidateQueries({ queryKey: ["session"] });
            if (cancelled) return;

            if (!queryClient.getQueryData(["session"])) {
              setViewState("requires_login");
              return;
            }
            setViewState("success");
            router.replace(`/maps/${data.map_slug}`);
            return;
          }

          case "already_owned":
            if (data.logged_in && data.map_slug) {
              setViewState("success");
              router.replace(`/maps/${data.map_slug}`);
              return;
            }
            setMapSlug(data.map_slug ?? null);
            setViewState("already_owned");
            return;

          case "refunded":
          case "duplicate":
            setViewState("refunded");
            return;

          default:
            setViewState("error");
            return;
        }
      } catch {}

      if (Date.now() >= deadline) {
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

  return { viewState, mapSlug, emailHint, sessionId };
}

export function useResendClaim(sessionId: string | null) {
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  const resend = useCallback(async () => {
    if (!sessionId || isSending || cooldown > 0) return;
    setIsSending(true);
    setError(null);
    try {
      await api.post("/checkout/resend-claim", { session_id: sessionId });
      setSent(true);
    } catch (err) {
      setError(
        friendlyError(err, "Couldn't send a new link. Please try again."),
      );
    } finally {
      setIsSending(false);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    }
  }, [sessionId, isSending, cooldown]);

  return { resend, isSending, sent, error, cooldown };
}
