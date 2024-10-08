import { useQueryClient, useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";

import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.user.$post>["json"];
type ResponseType = InferResponseType<typeof client.api.user.$post>;

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    //@ts-ignore
    mutationFn: async (json) => {
      const response = await client.api.user.$post({ json });
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }

      const { data } = await response.json();

      return data;
    },
    onSuccess: () => {
      toast.success("Successfully Created user");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });
  return mutation;
};
