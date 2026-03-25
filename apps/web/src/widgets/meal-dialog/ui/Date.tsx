import { Input } from "@shared/ui";
import { mealDialogMolecule } from "../model/meal-dialog-molecule";
import { useMolecule } from "bunshi/react";
import { useSnapshot } from "valtio";

export const Date = () => {
  const { store, changeDate } = useMolecule(mealDialogMolecule);
  const { date = "" } = useSnapshot(store);
  return (
    <Input
      type="date"
      value={date}
      onChange={(e) => changeDate(e.target.value)}
    />
  );
};
