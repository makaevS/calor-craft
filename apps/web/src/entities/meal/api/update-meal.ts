import type { AxiosResponse } from "axios";
import { api } from "@shared/api";
import type { CreateMealPayload } from "./create-meal";
import type { Meal } from "../model/meal";
import { PATH } from "./path";

export type UpdateMealPayload = Partial<CreateMealPayload>;

export type UpdateMealResponse = Meal;

export const updateMeal = async (id: string, payload: UpdateMealPayload) =>
  api.patch<
    UpdateMealResponse,
    AxiosResponse<UpdateMealResponse>,
    UpdateMealPayload
  >(`${PATH}/${id}`, payload);
