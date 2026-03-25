import type { Meal, MealItem } from "@entities/meal";
import { createScope, molecule as mol, use } from "bunshi";
import { proxy } from "valtio";

export interface MealDialogState {
  id?: string;
  date: string;
  name: string;
  isPlanned: boolean;
  items: MealItem[];
  dateError: string;
  nameError: string;
  diff: boolean;
}

type ScopeValue = {
  meal: Meal | null;
};

export const scope = createScope<ScopeValue>(
  { meal: null },
  { debugLabel: "MealDialogScope" },
);

export const mealDialogMolecule = mol(() => {
  const { meal } = use(scope);
  const {
    id,
    date: initialDate = "",
    name: initialName = "",
    isPlanned: initialIsPlanned = false,
    items: initialItems = [],
  } = meal || {};
  const store = proxy<MealDialogState>({
    id,
    date: initialDate,
    name: initialName,
    isPlanned: initialIsPlanned,
    items: initialItems,
    dateError: "",
    nameError: "",
    diff: false,
  });
  const changeDate = (date: string) => {
    store.date = date;
    store.diff = date !== initialDate;
  };
  const changeName = (name: string) => {
    store.name = name;
    store.diff = name !== initialName;
  };
  const changeIsPlanned = (isPlanned: boolean) => {
    store.isPlanned = isPlanned;
    store.diff = isPlanned !== initialIsPlanned;
  };
  return { store, changeDate, changeName, changeIsPlanned };
});
