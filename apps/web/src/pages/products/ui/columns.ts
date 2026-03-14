import { createColumnHelper } from "@tanstack/react-table";
import type { Product } from "@entities/product";
import { CellDialog } from "./CellDialog";
import { CellKind } from "./CellKind";

const helper = createColumnHelper<Product>();

export const columns = [
  helper.display({
    header: " ",
    cell: CellDialog,
    minSize: 40,
    maxSize: 40,
  }),
  helper.accessor("name", {
    header: "Название",
    size: 500,
  }),
  helper.accessor("kindId", {
    header: "Вид продукта",
    size: 300,
    cell: CellKind,
  }),
  helper.accessor("calories", {
    header: "Калории",
    size: 100,
  }),
];
