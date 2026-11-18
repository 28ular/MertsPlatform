import { useQuery } from "@tanstack/react-query";
import { getAchievements } from "../../api/getAchievements";

export const useAchievements = () => {
  return useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievements,
    select: (data) =>
      Array.isArray(data) ? data : data?.achievements || data?.items || [],
    staleTime: 1000 * 60 * 15,
    retry: 1,
  });
};
