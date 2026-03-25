import {
  mealQueries,
  updateMeal,
  type UpdateMealPayload,
} from "@entities/meal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateMeal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: UpdateMealPayload & { id: string }) =>
      updateMeal(id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: mealQueries.all() }),
  });
};
