import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await client.api.user.$get();
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
