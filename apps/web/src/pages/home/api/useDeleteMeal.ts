import { deleteMeal, mealQueries } from "@entities/meal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteMeal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteMeal(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: mealQueries.all() }),
  });
};
