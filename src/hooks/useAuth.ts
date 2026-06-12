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
      await api.post(endpoint, payload);

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