import {
  createProductKind,
  productKindQueries,
  type CreateProductKindPayload,
} from "@entities/product-kind";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProductKindPayload) => {
      return createProductKind(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKindQueries.all() });
    },
  });
};
