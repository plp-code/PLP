import { useState } from "react";
import { api } from "@/lib/api";

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);

    try {
      await api.post("/auth/forgot-password", { email });
    } catch {
    } finally {
      setIsSubmitted(true);
      setIsLoading(false);
    }
  };

  return { requestPasswordReset, isLoading, isSubmitted };
}