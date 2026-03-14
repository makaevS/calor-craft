import type { Product } from "@entities/product";
import { productKindQueries } from "@entities/product-kind";
import { Loader } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import type { CellContext } from "@tanstack/react-table";

export const CellKind = ({ getValue }: CellContext<Product, unknown>) => {
  const { data, isPending } = useQuery(productKindQueries.list());
  const kindId = getValue();
  const kind = data?.data.find((kind) => kind.id === kindId);
  return (
    <div>
      {isPending ? (
        <Loader.Root>
          <Loader.Indicator />
        </Loader.Root>
      ) : (
        kind?.name
      )}
    </div>
  );
};
