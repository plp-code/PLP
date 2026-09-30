"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthUser } from "@/context/AuthContext";
import { getSafeReturnPath } from "@/lib/returnTo";

export function RedirectIfAuthenticated({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthUser();
  const router = useRouter();
  const returnTo = useSearchParams().get("returnTo");

  useEffect(() => {
    if (isAuthenticated) router.replace(getSafeReturnPath(returnTo));
  }, [isAuthenticated, returnTo, router]);

  return isAuthenticated ? null : <>{children}</>;
}
