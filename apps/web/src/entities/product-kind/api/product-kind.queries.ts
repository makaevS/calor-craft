import { queryOptions } from "@tanstack/react-query";
import { PATH } from "./path";
import { getProductKind, getProductKinds } from "./get-product-kind";

export const productKindQueries = {
  all: () => [PATH] as const,
  list: (name?: string) =>
    queryOptions({
      queryKey: [PATH, name] as const,
      queryFn: ({ signal }) => getProductKinds(name, signal),
    }),
  exact: (id: string) =>
    queryOptions({
      queryKey: [PATH, id] as const,
      queryFn: ({ signal }) => getProductKind(id, signal),
    }),
};
