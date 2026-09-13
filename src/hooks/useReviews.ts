import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { ReviewItem, CreateReviewPayload } from "@/types";

export const reviewKeys = {
  all: ["reviews"] as const,
  byStore: (storeId: number) => [...reviewKeys.all, storeId] as const,
};

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
    select: (data) => data?.reviews ?? [],
  });
}


export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateReviewPayload) => {
      const { location_id, ...body } = payload;
      const response = await api.post<ReviewItem>(`/reviews/${location_id}`, body);
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: reviewKeys.byStore(variables.location_id),
      });
    },
  });
}
