import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { $table } from "./table";
import { productQueries } from "@entities/product";

export const useTableQuery = () => {
  const { search } = useUnit($table);
  return useQuery(productQueries.list(search));
};
