import type { Meal } from "@entities/meal";
import { Button, Dialog } from "@shared/ui";
import { ScopeProvider, useMolecule } from "bunshi/react";
import { scope } from "../model/meal-dialog-molecule";
import { useMemo } from "react";
import { Name } from "./Name";
import { Date } from "./Date";
import { SubmitButton } from "./SubmitButton";

export interface MealDialogProps {
  meal: Meal | null;
}

export const MealDialog = ({ meal }: MealDialogProps) => {
  const { close } = useMolecule(Dialog.molecule);
  const value = useMemo(() => ({ meal }), [meal]);
  return (
    <ScopeProvider scope={scope} value={value}>
      <Dialog.Content className="w-lg gap-4">
        <Dialog.Title>Прием пищи</Dialog.Title>
        <Name />
        <Date />
        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={close}>
            Отмена
          </Button>
          <SubmitButton />
        </div>
      </Dialog.Content>
    </ScopeProvider>
  );
};
