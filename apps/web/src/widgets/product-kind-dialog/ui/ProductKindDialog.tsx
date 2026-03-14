import type {
  CreateProductKindPayload,
  ProductKind,
} from "@entities/product-kind";
import { ButtonLoader } from "@shared/ui/ButtonLoader";
import clsx from "clsx";
import { Dialog, Form } from "radix-ui";
import { useState, type ReactNode, type SubmitEvent } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { useCreateMutation } from "../api/useCreateMutation";
import { useUpdateMutation } from "../api/useUpdateMutation";
import { useDeleteMutation } from "../api/useDeleteMutation";
import { DeleteConfirm } from "./DeleteConfirm";

const SERVER_ERROR_MESSAGE = "Возникла ошибка, попробуйте позже";

export interface ProductKindDialogProps {
  productKind: Pick<ProductKind, "id" | "name" | "calories"> | null;
  children: ReactNode;
}

export const ProductKindDialog = ({
  productKind,
  children,
}: ProductKindDialogProps) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const { mutate: createProductKind, isPending: isCreating } =
    useCreateMutation();
  const { mutate: updateProductKind, isPending: isUpdating } =
    useUpdateMutation(productKind?.id);
  const { mutate: deleteProductKind, isPending: isDeleting } =
    useDeleteMutation();
  const isPending = isCreating || isUpdating || isDeleting;
  const title = productKind ? "Вид продукта" : "Новый вид продукта";
  const submitText = productKind ? "Изменить" : "Добавить";
  const onOpenChange = (value: boolean) => {
    if (isPending) return;
    setOpen(value);
  };
  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const payload: CreateProductKindPayload = {
      name: String(data.name),
      calories: Number(data.calories),
    };
    if (productKind) {
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
            className="flex w-md flex-col gap-4 rounded-md bg-(--bg-dialog) p-6"
            onSubmit={onSubmit}
            onClearServerErrors={() => setError("")}
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
                defaultValue={productKind?.name}
              />
              <Form.Message
                match="valueMissing"
                className="w-full font-semibold text-(--text-primary-color)"
              >
                Укажите название
              </Form.Message>
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
                defaultValue={productKind?.calories}
              />
              <Form.Message
                match="valueMissing"
                className="w-full font-semibold text-(--text-primary-color)"
              >
                Укажите калории
              </Form.Message>
              {error && (
                <Form.Message className="w-full font-semibold text-(--error-color)">
                  {error}
                </Form.Message>
              )}
            </Form.Field>
            <div className="flex">
              {productKind && (
                <DeleteConfirm
                  name={productKind.name}
                  onAccept={() =>
                    deleteProductKind(productKind.id, {
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
