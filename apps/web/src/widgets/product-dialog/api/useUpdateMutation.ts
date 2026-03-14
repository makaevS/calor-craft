import {
  productQueries,
  updateProduct,
  type UpdateProductPayload,
} from "@entities/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateMutation = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProductPayload) => {
      if (!id) throw new Error("ID is required");
      return updateProduct(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueries.all() });
    },
  });
};
