import { useState } from "react";
import { api } from "@/lib/api";

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
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Failed to process request. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { requestPasswordReset, isLoading, isSubmitted, error };
}