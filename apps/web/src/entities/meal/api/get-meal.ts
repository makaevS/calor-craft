import { api } from "@shared/api";
import type { Meal } from "../model/meal";
import { PATH } from "./path";
import qs from "qs";

export type GetMealResponse = Meal;

export const getMeal = async (id: string, signal?: AbortSignal) =>
  api.get<GetMealResponse>(`${PATH}/${id}`, { signal });

export type GetMealsResponse = Meal[];

export const getMeals = async (name?: string, signal?: AbortSignal) =>
  api.get<GetMealsResponse>(
    `${PATH}${name ? `?${qs.stringify({ name })}` : ""}`,
    { signal },
  );
