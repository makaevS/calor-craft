import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { $table } from "./table";
import { productKindQueries } from "@entities/product-kind";

export const useTableQuery = () => {
  const { search } = useUnit($table);
  return useQuery(productKindQueries.list(search));
};
