import type { CellContext } from "@tanstack/react-table";
import { ProductKindDialog } from "@widgets/product-kind-dialog/ui/ProductKindDialog";
import type { ProductKind } from "@entities/product-kind";
import { Pencil2Icon } from "@radix-ui/react-icons";

export const CellDialog = ({ row }: CellContext<ProductKind, unknown>) => (
  <ProductKindDialog productKind={row.original}>
    <button className="button-secondary group">
      <Pencil2Icon width={16} height={16} />
    </button>
  </ProductKindDialog>
);
