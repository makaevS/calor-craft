import { createColumnHelper } from "@tanstack/react-table";
import type { ProductKind } from "@entities/product-kind";
import { CellDialog } from "./CellDialog";

const helper = createColumnHelper<ProductKind>();

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
  helper.accessor("calories", {
    header: "Калории",
    size: 100,
  }),
];
