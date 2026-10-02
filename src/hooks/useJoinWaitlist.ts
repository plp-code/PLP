import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api, ApiError, isEmailNotVerified } from "@/lib/api";
import { useAuthUser } from "@/context/AuthContext";
import { useSnackbar } from "@/context/SnackbarContext";
import type { MapItem } from "@/types";

/** `message: null` means nothing to show inline (error snackbar or ignored call). */
export type GuestWaitlistResult =
  | { ok: true }
  | { ok: false; message: string | null };

export function useJoinWaitlist() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthUser();
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  // Only one guest form is open at a time.
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  // A ref, not state: a second Enter can fire before a re-render disables the form.
  const inFlight = useRef(new Set<string>());

  const router = useRouter();

  const showJoined = () =>
    snackbar.success(
      "You're on the waitlist!",
      "We'll email you as soon as new maps go live.",
    );
  const showFailure = () =>
    snackbar.error("Couldn't join the waitlist", "Please try again.");

  const joinWaitlist = async (map: Pick<MapItem, "slug" | "name">) => {
    if (isAuthLoading || inFlight.current.has(map.slug)) return;

    if (!isAuthenticated) {
      setExpandedSlug(map.slug);
      return;
    }

    inFlight.current.add(map.slug);
    setLoadingSlug(map.slug);

    try {
      await api.put(`/maps/${map.slug}/join-waitlist`);
      await queryClient.invalidateQueries({ queryKey: ["maps"] });
      showJoined();
      router.refresh();
    } catch (err) {
      const code = err instanceof ApiError ? err.code : undefined;

      if (
        code === "already_on_waitlist" ||
        // Stopgap until the backend sends a code: the only plain-string 400.
        (err instanceof ApiError &&
          err.status === 400 &&
          !code &&
          /already on the waitlist/i.test(err.message))
      ) {
        await queryClient.invalidateQueries({ queryKey: ["maps"] });
      } else if (code === "already_owns_map") {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["session"] }),
          queryClient.invalidateQueries({ queryKey: ["maps"] }),
        ]);
      } else if (!isEmailNotVerified(err)) {
        showFailure();
      }
    } finally {
      inFlight.current.delete(map.slug);
      setLoadingSlug(null);
    }
  };

  const submitGuestEmail = async (
    map: Pick<MapItem, "slug">,
    email: string,
  ): Promise<GuestWaitlistResult> => {
    if (isAuthLoading || inFlight.current.has(map.slug)) {
      return { ok: false, message: null };
    }

    inFlight.current.add(map.slug);

    try {
      await api.put(
        `/maps/${encodeURIComponent(map.slug)}/join-waitlist`,
        { email },
        { skipRefresh: true },
      );
      setExpandedSlug(null);
      showJoined();
      return { ok: true };
    } catch (err) {
      const status = err instanceof ApiError ? err.status : undefined;
      if (status === 422) {
        return { ok: false, message: "Please enter a valid email address." };
      }
      if (status === 429) {
        return {
          ok: false,
          message: "Too many attempts. Try again in a minute.",
        };
      }
      showFailure();
      return { ok: false, message: null };
    } finally {
      inFlight.current.delete(map.slug);
    }
  };

  const collapseForm = () => setExpandedSlug(null);

  return {
    joinWaitlist,
    submitGuestEmail,
    loadingSlug,
    expandedSlug,
    collapseForm,
  };
}
