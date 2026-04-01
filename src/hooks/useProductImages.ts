import { useQuery } from "@tanstack/react-query";

export const useProductImages = (productId: string | undefined) => {
  return useQuery({
    queryKey: ["product-images", productId],
    queryFn: async () => [],
    enabled: !!productId,
  });
};
