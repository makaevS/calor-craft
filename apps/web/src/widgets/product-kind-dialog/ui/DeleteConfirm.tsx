import { Dialog } from "radix-ui";
import type { ReactNode } from "react";

export interface DeleteConfirmProps {
  name: string;
  onAccept: VoidFunction;
  children: ReactNode;
}

export const DeleteConfirm = ({
  name,
  onAccept,
  children,
}: DeleteConfirmProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <div className="flex w-md flex-col gap-4 rounded-md bg-(--bg-dialog) p-6">
            <Dialog.Title className="text-xl font-bold text-(--text-primary-color)">
              Удаление вида продукта
            </Dialog.Title>
            <Dialog.Description className="text-lg font-semibold text-(--text-primary-color)">
              {`Вы уверены, что хотите удалить вид продукта "${name}"?`}
            </Dialog.Description>
            <div className="flex justify-end gap-4">
              <Dialog.Close className="button-secondary">Отмена</Dialog.Close>
              <Dialog.Close className="button-danger" onClick={onAccept}>
                Удалить
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
