"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export function useMagicLink() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMagicLink = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await api.post("/auth/magic-link", { email });
      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send login link. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMagicLink, isLoading, isSubmitted, error };
}
