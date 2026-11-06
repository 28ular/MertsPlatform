import { useQuery } from "@tanstack/react-query";
import { getLes } from "../../api/getLess";

export const useLess = () => {
  return useQuery({
    queryKey: ["less"],
    queryFn: getLes,
    select: (data) => (Array.isArray(data) ? data : data?.lessons || []),
    staleTime: 1000 * 30 * 5,
  });
};
