import type { Product } from "@entities/product";

export interface Dish {
  id: string;
  recipeId?: string;
  name: string;
  createdAt: Date;
  items: DishItem[];
}

export interface DishItem {
  id: string;
  product: Product;
  quantity: number;
  measure: string;
}

export const getDishCalories = (dish: Dish) => {
  return dish.items.reduce((acc, item) => acc + getDishItemCalories(item), 0);
};

export const getDishItemCalories = (item: DishItem) => {
  return item.product.calories * item.quantity;
};
