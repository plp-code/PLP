"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  /** True while a login/register/logout request is in flight. */
  isAuthBusy: boolean;
  setAuthBusy: (busy: boolean) => void;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isAuthBusy: false,
  setAuthBusy: () => {},
  logout: async () => {},
  checkSession: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isAuthBusy, setAuthBusy] = useState(false);

  const { data: user = null, isLoading } = useQuery<User | null>({
    queryKey: ["session"],
    queryFn: async ({ signal }) => {
      try {
        return await api.get<User>("/users/me", {
          skipRedirect: true,
          signal,
        });
      } catch {
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
    setAuthBusy(true);
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      queryClient.setQueryData(["session"], null);
      queryClient.invalidateQueries({ queryKey: ["maps"] });
      queryClient.removeQueries({ queryKey: ["locations"] });
      router.replace("/");
      setAuthBusy(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAuthBusy,
        setAuthBusy,
        logout,
        checkSession,
      }}
    >
      {children}
      {isAuthBusy && (
        <div
          aria-hidden
          className="fixed inset-0 z-[9999] cursor-wait bg-transparent"
        />
      )}
    </AuthContext.Provider>
  );
}

export const useAuthUser = () => useContext(AuthContext);
