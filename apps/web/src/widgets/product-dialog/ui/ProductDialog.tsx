import type { CreateProductPayload, Product } from "@entities/product";
import { ButtonLoader } from "@shared/ui/ButtonLoader";
import clsx from "clsx";
import { Dialog, Form } from "radix-ui";
import { useState, type ReactNode, type SubmitEvent } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { useCreateMutation } from "../api/useCreateMutation";
import { useUpdateMutation } from "../api/useUpdateMutation";
import { useDeleteMutation } from "../api/useDeleteMutation";
import { DeleteConfirm } from "./DeleteConfirm";
import { KindSelect } from "./KindSelect";
import { useUnit } from "effector-react";
import { $kind, formSubmitted } from "../model/kind";

const SERVER_ERROR_MESSAGE = "Возникла ошибка, попробуйте позже";

export interface ProductDialogProps {
  product: Pick<Product, "id" | "name" | "kindId" | "calories"> | null;
  children: ReactNode;
}

export const ProductDialog = ({ product, children }: ProductDialogProps) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [kind, onFormSubmitted] = useUnit([$kind, formSubmitted]);
  const { mutate: createProductKind, isPending: isCreating } =
    useCreateMutation();
  const { mutate: updateProductKind, isPending: isUpdating } =
    useUpdateMutation(product?.id);
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteMutation();
  const isPending = isCreating || isUpdating || isDeleting;
  const title = product ? "Продукт" : "Новый продукт";
  const submitText = product ? "Изменить" : "Добавить";
  const onOpenChange = (value: boolean) => {
    if (isPending) return;
    setOpen(value);
  };
  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!kind.id) return;
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const payload: CreateProductPayload = {
      name: String(data.name),
      kindId: kind.id,
      calories: Number(data.calories),
    };
    if (product) {
      updateProductKind(payload, {
        onSuccess: () => setOpen(false),
        onError: () => setError(SERVER_ERROR_MESSAGE),
      });
    } else {
      createProductKind(payload, {
        onSuccess: () => setOpen(false),
        onError: () => setError(SERVER_ERROR_MESSAGE),
      });
    }
  };
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Form.Root
            className="relative flex w-md flex-col gap-4 rounded-md bg-(--bg-dialog) p-6"
            id="productDialog"
            onSubmit={onSubmit}
          >
            <Dialog.Title className="text-xl font-bold text-(--text-primary-color)">
              {title}
            </Dialog.Title>
            <Form.Field
              name="name"
              className="flex flex-wrap items-center gap-2"
            >
              <Form.Label className="min-w-38 text-lg font-semibold text-(--text-primary-color)">
                Название
              </Form.Label>
              <Form.Control
                required
                className="input"
                type="text"
                placeholder="Название"
                disabled={isPending}
                defaultValue={product?.name}
              />
              <Form.Message
                match="valueMissing"
                className="w-full font-semibold text-(--text-primary-color)"
              >
                Укажите название
              </Form.Message>
            </Form.Field>
            <Form.Field
              name="kindId"
              className="flex flex-wrap items-center gap-2"
            >
              <Form.Label
                className="min-w-38 text-lg font-semibold text-(--text-primary-color)"
                htmlFor="kindId"
              >
                Вид продукта
              </Form.Label>
              <KindSelect initialValue={product?.kindId} />
              {kind.error && (
                <span className="w-full font-semibold text-(--text-primary-color)">
                  Выберите вид продукта
                </span>
              )}
            </Form.Field>
            <Form.Field
              name="calories"
              className="flex flex-wrap items-center gap-2"
            >
              <Form.Label className="min-w-38 text-lg font-semibold text-(--text-primary-color)">
                Калории (Ккал)
              </Form.Label>
              <Form.Control
                required
                className="input"
                type="number"
                placeholder="Калории"
                disabled={isPending}
                defaultValue={product?.calories}
              />
              <Form.Message
                match="valueMissing"
                className="w-full font-semibold text-(--text-primary-color)"
              >
                Укажите калории
              </Form.Message>
              {error && (
                <Form.Message className="w-full font-semibold text-(--text-primary-color)">
                  {error}
                </Form.Message>
              )}
            </Form.Field>
            <div className="flex">
              {product && (
                <DeleteConfirm
                  name={product.name}
                  onAccept={() =>
                    deleteProduct(product.id, {
                      onSuccess: () => setOpen(false),
                      onError: () => setError(SERVER_ERROR_MESSAGE),
                    })
                  }
                >
                  <button className="button-secondary hover:bg-(--hover-color-danger) hover:text-(--text-secondary-color)">
                    <TrashIcon width={24} height={24} />
                  </button>
                </DeleteConfirm>
              )}
              <Form.Submit
                className={clsx(
                  "button-primary ml-auto",
                  isPending && "cursor-progress",
                )}
                onClick={onFormSubmitted}
              >
                {isPending ? <ButtonLoader /> : <>{submitText}</>}
              </Form.Submit>
            </div>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
