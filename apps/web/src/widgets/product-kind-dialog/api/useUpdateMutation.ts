import {
  productKindQueries,
  updateProductKind,
  type UpdateProductKindPayload,
} from "@entities/product-kind";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateMutation = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProductKindPayload) => {
      if (!id) throw new Error("ID is required");
      return updateProductKind(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKindQueries.all() });
    },
  });
};
