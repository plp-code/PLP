import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthUser } from "@/context/AuthContext";
import type { NewReview } from "@/components/features/maps/AddReviewModal";

export interface BoughtItem extends NewReview {
  buyer: string;
}

/**
 * Owns the "what people bought" review flow for a store: the local review
 * list, the modal/success-toast state, and the auth gate that bounces guests
 * to login before they can add one.
 */
export function useStoreReviews() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuthUser();
  const router = useRouter();
  const pathname = usePathname();

  const [reviews, setReviews] = useState<BoughtItem[]>([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  const openReview = () => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.push(`/login?returnTo=${encodeURIComponent(pathname)}`);
      return;
    }
    setReviewOpen(true);
  };

  const submitReview = (review: NewReview) => {
    const buyer = user
      ? `${user.first_name} ${user.last_name?.charAt(0) ?? ""}.`.trim()
      : "You";
    setReviews((prev) => [{ ...review, buyer }, ...prev]);
    setReviewOpen(false);
    setShowReviewSuccess(true);
  };

  return {
    isAuthenticated,
    authLoading,
    reviews,
    reviewOpen,
    setReviewOpen,
    showReviewSuccess,
    setShowReviewSuccess,
    openReview,
    submitReview,
  };
}
