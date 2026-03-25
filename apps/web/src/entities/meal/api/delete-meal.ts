import { api } from "@shared/api";
import type { AxiosResponse } from "axios";
import { PATH } from "./path";

export type DeleteMealResponse = { ok: boolean };

export const deleteMeal = async (id: string) =>
  api.delete<DeleteMealResponse, AxiosResponse<DeleteMealResponse>>(
    `${PATH}/${id}`,
  );
