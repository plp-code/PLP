"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { getSafeReturnPath } from "@/lib/returnTo";
import { api, setTokenExpiry, markSession } from "@/lib/api";

type VerifyState = "verifying" | "success" | "error";

export function useMagicLoginVerify(token: string | null) {
  const [state, setState] = useState<VerifyState>(
    token ? "verifying" : "error",
  );
  const firedRef = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();


useEffect(() => {
  if (!token || firedRef.current) return;
  firedRef.current = true;

  (async () => {
    try {
      await api.post("/auth/verify-magic-link", { token });
      setTokenExpiry(30 * 60);
      markSession();
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      setState("success");
      router.replace(getSafeReturnPath(searchParams.get("returnTo")));
    } catch {
      setState("error");
    }
  })();
}, [token, router, queryClient, searchParams]);

  return { state };
}
