import { useState } from "react";
import { api, ApiError } from "@/lib/api";
import { friendlyError } from "@/lib/errors";

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await api.post("/auth/forgot-password", { email });
      setIsSubmitted(true);
    } catch (err) {
      if (err instanceof ApiError && err.status === 429) {
        setError(friendlyError(err, ""));
      } else {
        setIsSubmitted(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { requestPasswordReset, isLoading, isSubmitted, error };
}
