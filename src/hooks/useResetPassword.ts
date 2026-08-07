import { useState } from "react";
import { api } from "@/lib/api";

export function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executePasswordReset = async (token: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await api.post("/auth/reset-password", {
        token,
        new_password: newPassword,
      });
      setIsSuccess(true);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { executePasswordReset, isLoading, isSuccess, error };
}