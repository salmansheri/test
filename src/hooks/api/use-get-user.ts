import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (id: string) => {
  const query = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const response = await client.api.user[":id"].$get({ param: { id } });
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
