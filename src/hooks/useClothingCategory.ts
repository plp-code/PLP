import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { ClothingCategory } from "@/types";

export function useGetClothingCategories() {
  return useQuery({
    queryKey: ["clothing-categories"] as const,
    queryFn: async () => {
      const response = await api.get<ClothingCategory[]>(`/clothing-categories/`);
      return response;
    },
    select: (data) => data ?? [],
  });
}