import { api } from "@shared/api";
import type { AxiosResponse } from "axios";
import { PATH } from "./path";

export type DeleteProductResponse = { ok: boolean };

export const deleteProduct = async (id: string) =>
  api.delete<DeleteProductResponse, AxiosResponse<DeleteProductResponse>>(
    `${PATH}/${id}`,
  );
