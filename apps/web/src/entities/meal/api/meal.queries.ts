import { queryOptions } from "@tanstack/react-query";
import { PATH } from "./path";
import { getMeal, getMeals } from "./get-meal";

export const mealQueries = {
  all: () => [PATH] as const,
  list: (name?: string) =>
    queryOptions({
      queryKey: [PATH, name] as const,
      queryFn: ({ signal }) => getMeals(name, signal),
    }),
  exact: (id: string) =>
    queryOptions({
      queryKey: [PATH, id] as const,
      queryFn: ({ signal }) => getMeal(id, signal),
    }),
};
