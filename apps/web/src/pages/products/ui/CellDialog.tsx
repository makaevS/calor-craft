import type { CellContext } from "@tanstack/react-table";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { ProductDialog } from "@widgets/product-dialog";
import type { Product } from "@entities/product";

export const CellDialog = ({ row }: CellContext<Product, unknown>) => (
  <ProductDialog product={row.original}>
    <button className="button-secondary group">
      <Pencil2Icon width={16} height={16} />
    </button>
  </ProductDialog>
);
