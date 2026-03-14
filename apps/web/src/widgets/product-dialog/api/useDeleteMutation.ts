import { deleteProduct, productQueries } from "@entities/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueries.all() });
    },
  });
};
