import { useState } from "react";
import { api } from "@/lib/api"; 

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const triggerLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      await api.post("/api/auth/logout");
      
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    }
  };

  return { triggerLogout, isLoggingOut };
}