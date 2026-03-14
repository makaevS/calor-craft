import {
  createProduct,
  productQueries,
  type CreateProductPayload,
} from "@entities/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProductPayload) => {
      return createProduct(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueries.all() });
    },
  });
};
