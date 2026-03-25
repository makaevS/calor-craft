import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Dialog } from "@shared/ui";
import { MealDialog } from "@widgets/meal-dialog";
import { useMolecule } from "bunshi/react";

export const AddButton = () => {
  const { open } = useMolecule(Dialog.molecule);
  return (
    <>
      <Button variant="secondary" onClick={open}>
        <PlusIcon width={20} height={20} />
        Добавить приём пищи
      </Button>
      <MealDialog meal={null} />
    </>
  );
};
