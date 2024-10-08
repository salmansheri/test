import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<(typeof client.api.user)[":id"]["$patch"]>;
type ResponseType = InferResponseType<
  (typeof client.api.user)[":id"]["$patch"]
>;

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    // @ts-ignore
    mutationFn: async (json) => {
      const response = await client.api.user[":id"].$patch({
        // @ts-ignore
        json,
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const { data } = await response.json();

      return data;
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Updated Successfully");
    },
  });
  return mutation;
};
