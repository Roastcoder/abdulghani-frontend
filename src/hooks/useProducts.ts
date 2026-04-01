import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/api";
import { products as localProducts } from "@/data/products";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products`);
        if (!res.ok) throw new Error('Failed to fetch');
        return await res.json();
      } catch {
        console.warn('Using local products data');
        return localProducts;
      }
    },
  });
};
