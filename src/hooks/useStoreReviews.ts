import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthUser } from "@/context/AuthContext";
import { buildLoginRedirect } from "@/lib/returnTo";
import { useSnackbar } from "@/context/SnackbarContext";
import { ApiError } from "@/lib/api";
import {
  useGetReviews,
  useMyReview,
  useCreateReview,
  useDeleteReview,
  reviewErrorMessage,
} from "@/hooks/useReviews";
import type { NewReview } from "@/types";

export function useStoreReviews(storeId: number) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const snackbar = useSnackbar();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthUser();

  const { data: reviews = [], isLoading } = useGetReviews(storeId, {
    enabled: isAuthenticated,
  });
  const { data: myReview = null } = useMyReview(storeId, {
    enabled: isAuthenticated,
  });

  const openReview = () => {
    if (!isAuthenticated) {
      router.push(buildLoginRedirect(pathname + window.location.search));
      return;
    }
    setReviewOpen(true);
  };
  const { mutateAsync: createReview, isPending: isSubmitting } =
    useCreateReview();

  const { mutateAsync: removeReview, isPending: isDeleting } =
    useDeleteReview();

  const deleteMyReview = async () => {
    if (!storeId) return;
    try {
      await removeReview({ location_id: storeId });
      snackbar.success("Review deleted");
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        snackbar.success("Review already removed");
        return;
      }
      const { title, subtitle } = reviewErrorMessage(err, "delete");
      snackbar.error(title, subtitle);
    }
  };

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
    myReview,
    isLoading,
    isSubmitting,
    reviewOpen,
    setReviewOpen,
    openReview,
    submitReview,
    deleteMyReview,
    isDeleting,
  };
}
