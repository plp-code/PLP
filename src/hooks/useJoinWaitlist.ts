import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuthUser } from "@/context/AuthContext";

export function useJoinWaitlist() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthUser();
  const queryClient = useQueryClient();
  
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const [showWaitlistSuccess, setShowWaitlistSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const joinWaitlist = async (slug: string) => {
    if (isAuthLoading) return;

    if (!isAuthenticated) {
      router.push(`/login?returnTo=${encodeURIComponent(pathname)}`);
      return;
    }

    setLoadingSlug(slug);
    setError(null);

    try {
      await api.put(`/maps/${slug}/join-waitlist`);
      
      await queryClient.invalidateQueries({ queryKey: ["maps"] });
      
      setShowWaitlistSuccess(true);

      router.refresh(); 
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Failed to process request. Please try again."
      );
    } finally {
      setLoadingSlug(null);
    }
  };

  return { joinWaitlist, loadingSlug, showWaitlistSuccess, setShowWaitlistSuccess, error };
}