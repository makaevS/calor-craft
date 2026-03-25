import { api } from "@shared/api";
import type { Meal } from "../model/meal";
import type { AxiosResponse } from "axios";
import { PATH } from "./path";

export interface CreateMealPayload {
  date: string;
  name: string;
  isPlanned: boolean;
  mealItems: CreateMealItemPayload[];
}

export interface CreateMealItemPayload {
  productId?: string;
  dish?: CreateDishPayload;
  quantity: number;
  measure: string;
}

export interface CreateDishPayload {
  name: string;
  items: CreateDishItemPayload[];
}

export interface CreateDishItemPayload {
  productId: string;
  quantity: number;
  measure: string;
}

export type CreateMealResponse = Meal;

export const createMeal = async (payload: CreateMealPayload) =>
  api.post<
    CreateMealResponse,
    AxiosResponse<CreateMealResponse>,
    CreateMealPayload
  >(PATH, payload);
