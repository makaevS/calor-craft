import type { Product } from "@entities/product";
import type { Dish } from "./dish";

export interface Meal {
  id: string;
  date: string;
  name: string;
  isPlanned: boolean;
  createdAt: string;
  items: MealItem[];
}

export interface MealItem {
  id: string;
  product?: Product;
  dish?: Dish;
  quantity: number;
  measure: string;
}

export const getMealCalories = (meal: Meal) => {
  return meal.items.reduce(
    (acc, item) => acc + (getMealItemCalories(item) ?? 0),
    0,
  );
};

export const getMealItemCalories = (item: MealItem) => {
  if (item.product) {
    return item.product.calories * item.quantity;
  } else {
    return item.dish?.items.reduce(
      (acc, item) => acc + item.product.calories * item.quantity,
      0,
    );
  }
};
