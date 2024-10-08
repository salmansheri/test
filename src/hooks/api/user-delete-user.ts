import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<
  (typeof client.api.user)[":id"]["$delete"]
>["param"];
type ResponseType = InferResponseType<
  (typeof client.api.user)[":id"]["$delete"]
>;

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (param) => {
      const response = await client.api.user[":id"].$delete({
        param,
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
      toast.success("Deleted Successfully");
    },
  });
  return mutation;
};
