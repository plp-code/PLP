"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/context/AuthContext";
import { api } from "@/lib/api";

export function useAuthActions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { checkSession } = useAuthUser();

  const login = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const email = formData.get("email");
      const password = formData.get("password");

     
      await api.post("/api/auth/login", {
        email: email,
        password: password,
      });

      await checkSession();
      router.push("/maps");
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = Object.fromEntries(formData.entries());

      await api.post("/api/auth/register", payload);

      await checkSession();
      router.push("/maps");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please check your inputs.");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, register, isLoading, error };
}
