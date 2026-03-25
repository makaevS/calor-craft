import { createMeal, mealQueries } from "@entities/meal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateMeal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMeal,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: mealQueries.all() }),
  });
};
