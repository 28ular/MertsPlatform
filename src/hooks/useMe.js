import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/getMe";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
};
