"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  api,
  onAuthExpired,
  clearTokenExpiry,
  setTokenExpiry,
  markSession,
  clearSession,
  hadSession,
} from "@/lib/api";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
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

  useEffect(() => {
    const cleanup = onAuthExpired(() => {
      clearTokenExpiry();
      clearSession();
      queryClient.setQueryData(["session"], null);
      queryClient.removeQueries({ queryKey: ["maps"] });
    });

    return cleanup;
  }, [queryClient]);

  const { data: user = null, isLoading } = useQuery<User | null>({
    queryKey: ["session"],
    queryFn: async ({ signal }) => {
      try {
        // Guests (no prior session) skip the refresh-on-401 round trip; returning
        // users with an expired access token still get a refresh attempt.
        const data = await api.get<User>("/users/me", {
          signal,
          skipRefresh: !hadSession(),
        });
        setTokenExpiry(30 * 60);
        markSession();
        return data;
      } catch {
        clearTokenExpiry();
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const checkSession = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ["session"] });
  }, [queryClient]);

  const logout = useCallback(async () => {
    setAuthBusy(true);
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      clearTokenExpiry();
      clearSession();
      queryClient.setQueryData(["session"], null);
      queryClient.removeQueries({ queryKey: ["maps"] });
      queryClient.removeQueries({ queryKey: ["locations"] });
      router.replace("/");
      setAuthBusy(false);
    }
  }, [queryClient, router]);

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
