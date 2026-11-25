import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, ApiError, isEmailNotVerified } from "@/lib/api";
import type { ReviewItem, CreateReviewPayload } from "@/types";

export const reviewKeys = {
  all: ["reviews"] as const,
  byStore: (storeId: number) => [...reviewKeys.all, storeId] as const,
  mine: (storeId: number) => [...reviewKeys.all, storeId, "me"] as const,
};

/**
 * Maps review API failures to user-facing copy.
 * 401 -> session expired (api.ts already tried a refresh), 403 -> not allowed
 * (email-not-verified is handled globally), 409 -> duplicate review on post,
 * 404 -> nothing to delete.
 */
export function reviewErrorMessage(
  err: unknown,
  action: "post" | "delete" | "load" = "post",
): { title: string; subtitle: string } {
  if (err instanceof ApiError) {
    if (err.status === 401) {
      return {
        title: "Please sign in again",
        subtitle: "Your session expired.",
      };
    }
    if (err.status === 403) {
      return isEmailNotVerified(err)
        ? {
            title: "Verify your email first",
            subtitle: "Confirm your email to share reviews.",
          }
        : {
            title: "Not allowed",
            subtitle: "You don't have permission to do that.",
          };
    }
    if (err.status === 409) {
      return {
        title: "Already reviewed",
        subtitle: "You've already shared a review for this store.",
      };
    }
    if (err.status === 404 && action === "delete") {
      return {
        title: "No review to delete",
        subtitle: "You haven't reviewed this location.",
      };
    }
  }
  return {
    title:
      action === "delete"
        ? "Couldn't delete your review"
        : action === "load"
          ? "Couldn't load reviews"
          : "Couldn't post your review",
    subtitle: "Please try again.",
  };
}

export function useGetReviews(
  storeId: number,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: reviewKeys.byStore(storeId!),
    queryFn: async () => {
      const response = await api.get<{ reviews: ReviewItem[]; total: number }>(
        `/reviews/${storeId}`,
      );
      return response;
    },
    enabled: Boolean(storeId) && (options?.enabled ?? true),
    // 401/403 won't fix themselves on retry.
    retry: (count, err) =>
      !(err instanceof ApiError && [401, 403].includes(err.status)) &&
      count < 2,
    select: (data) => data?.reviews ?? [],
  });
}

function invalidateStoreReviews(
  queryClient: ReturnType<typeof useQueryClient>,
  storeId: number,
) {
  queryClient.invalidateQueries({ queryKey: reviewKeys.byStore(storeId) });
  queryClient.invalidateQueries({ queryKey: reviewKeys.mine(storeId) });
}

/** The caller's own review for a location, or null if they haven't posted one. */
export function useMyReview(storeId: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: reviewKeys.mine(storeId),
    queryFn: async (): Promise<ReviewItem | null> => {
      try {
        const res = await api.get<ReviewItem | null>(`/reviews/${storeId}/me`);
        // Empty body or null both mean "no review yet".
        return res && "id" in res ? res : null;
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) return null;
        throw err;
      }
    },
    enabled: Boolean(storeId) && (options?.enabled ?? true),
    retry: (count, err) =>
      !(err instanceof ApiError && [401, 403].includes(err.status)) &&
      count < 2,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateReviewPayload) => {
      const { location_id, ...body } = payload;
      const response = await api.post<ReviewItem>(
        `/reviews/${location_id}`,
        body,
      );
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: reviewKeys.byStore(variables.location_id),
      });
    },
  });
}

/** Deletes the current user's own review for a location (DELETE /reviews/{location_id}, 204). */
export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ location_id }: { location_id: number }) =>
      api.delete<void>(`/reviews/${location_id}`),
    // Also on 404 (already gone) so the UI matches the server.
    onSettled: (_, __, variables) =>
      invalidateStoreReviews(queryClient, variables.location_id),
  });
}
