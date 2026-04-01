import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/api";

export const useSiteContent = () => {
  return useQuery({
    queryKey: ["site_content"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/content`);
      return res.ok ? res.json() : {};
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
