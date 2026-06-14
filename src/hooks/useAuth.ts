import { useState } from "react";
import { api } from "@/lib/api";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authenticate = async (isLogin: boolean, formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = Object.fromEntries(formData.entries());

    try {
      if (isLogin) {
        const params = new URLSearchParams();
        params.append("username", formData.get("username") as string);
        params.append("password", formData.get("password") as string);

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.detail || "Authentication failed.");
        }
      } else {
        const payload = Object.fromEntries(formData.entries());
        await api.post(endpoint, payload);
      }

      window.location.href = "/maps";
    } catch (err: any) {
      console.error("Auth Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { authenticate, isLoading, error };
}
