"use client";

import { useState } from "react";
import { api, ApiError } from "@/lib/api";

type ResendState = "idle" | "sending" | "sent" | "rate_limited" | "error";

export function useResendVerification() {
  const [state, setState] = useState<ResendState>("idle");

  const resend = async () => {
    if (state === "sending") return;
    setState("sending");

    try {
      await api.post("/auth/resend-verification");
      setState("sent");
    } catch (err) {
      setState(
        err instanceof ApiError && err.status === 429 ? "rate_limited" : "error",
      );
    }
  };

  return { state, resend };
}
