import { ProductDialog } from "@widgets/product-dialog";

export const AddButton = () => {
  return (
    <ProductDialog product={null}>
      <button className="button-primary">Добавить</button>
    </ProductDialog>
  );
};
