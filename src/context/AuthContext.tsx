"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const sessionCheckRef = useRef<Promise<void> | null>(null);

  const checkSession = async () => {
    if (sessionCheckRef.current) {
      return sessionCheckRef.current;
    }

    const sessionCheck = (async () => {
    try {
      setIsLoading(true);

      const userData = await api.get("/user/me", { skipRedirect: true });

      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }

    })();

    sessionCheckRef.current = sessionCheck;

    try {
      await sessionCheck;
    } finally {
      sessionCheckRef.current = null;
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const logout = async () => {
    try {
      setIsLoading(true);
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      setIsLoading(false);
      router.replace("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: !!user, logout, checkSession }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthUser = () => useContext(AuthContext);
