import { useState } from "react";
import { useSnackbar } from "@/context/SnackbarContext";
import { useGetReviews, useCreateReview } from "@/hooks/useReviews";
import type { NewReview } from "@/types";

export function useStoreReviews(storeId: number) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const snackbar = useSnackbar();

  const { data: reviews = [], isLoading } = useGetReviews(storeId);
  const { mutateAsync: createReview, isPending: isSubmitting } = useCreateReview();

  const submitReview = async (form: NewReview) => {
    if (!storeId) return;

    await createReview({
      location_id: storeId,
      item_purchased: form.item_purchased,
      experience: form.experience,
      price_paid: form.price_paid,
      category_slugs: form.category_slugs,

    });

    setReviewOpen(false);
    snackbar.success("Thanks for sharing!", "Your experience has been added.");
  };

  return {
    reviews,
    isLoading,
    isSubmitting,
    reviewOpen,
    setReviewOpen,
    submitReview,
  };
}