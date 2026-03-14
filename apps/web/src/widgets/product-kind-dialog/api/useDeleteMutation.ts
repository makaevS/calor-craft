import { deleteProductKind, productKindQueries } from "@entities/product-kind";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return deleteProductKind(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKindQueries.all() });
    },
  });
};
