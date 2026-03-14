import { ProductKindDialog } from "@widgets/product-kind-dialog";

export const AddButton = () => {
  return (
    <ProductKindDialog productKind={null}>
      <button className="button-primary">Добавить</button>
    </ProductKindDialog>
  );
};
