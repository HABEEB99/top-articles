import { useQuery } from "@tanstack/react-query";
import { fetchPopularArticles } from "../api/fetch-articles";
import { IArticles } from "../interfaces/articles-interface";

export const usePopularArticles = () => {
  return useQuery<IArticles>({
    queryKey: ["popular-articles"],
    queryFn: async () => {
      const res = await fetchPopularArticles();
      return res;
    },
  });
};
