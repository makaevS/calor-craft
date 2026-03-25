import { Input } from "@shared/ui";
import { useMolecule } from "bunshi/react";
import { mealDialogMolecule } from "../model/meal-dialog-molecule";
import { useSnapshot } from "valtio";

export const Name = () => {
  const { store, changeName } = useMolecule(mealDialogMolecule);
  const { name } = useSnapshot(store);
  return (
    <Input
      type="text"
      name="name"
      placeholder="Введите название"
      value={name}
      onChange={(e) => changeName(e.target.value)}
    />
  );
};
