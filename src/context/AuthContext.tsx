"use client";

import { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  logout: async () => {},
  checkSession: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // React Query dedupes concurrent calls and caches the result, so the manual
  // in-flight ref we used to keep here is no longer needed.
  const { data: user = null, isLoading } = useQuery<User | null>({
    queryKey: ["session"],
    queryFn: async ({ signal }) => {
      try {
        return await api.get<User>("/users/me", {
          skipRedirect: true,
          signal,
        });
      } catch {
        // Not authenticated — a logged-out session is a valid "null" result,
        // not a query error (so it won't retry).
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const checkSession = async () => {
    await queryClient.invalidateQueries({ queryKey: ["session"] });
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      // Clear the session and any user-scoped caches (purchased state, etc.).
      queryClient.setQueryData(["session"], null);
      queryClient.invalidateQueries({ queryKey: ["maps"] });
      queryClient.removeQueries({ queryKey: ["locations"] });
      router.replace("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthUser = () => useContext(AuthContext);
