import { queryOptions } from "@tanstack/react-query";
import { PATH } from "./path";
import { getProduct, getProducts } from "./get-product";

export const productQueries = {
  all: () => [PATH] as const,
  list: (name?: string) =>
    queryOptions({
      queryKey: [PATH, name] as const,
      queryFn: ({ signal }) => getProducts(name, signal),
    }),
  exact: (id: string) =>
    queryOptions({
      queryKey: [PATH, id] as const,
      queryFn: ({ signal }) => getProduct(id, signal),
    }),
};
