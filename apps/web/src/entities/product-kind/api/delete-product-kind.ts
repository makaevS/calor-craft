import { api } from "@shared/api";
import type { AxiosResponse } from "axios";
import { PATH } from "./path";

export type DeleteProductKindResponse = { ok: boolean };

export const deleteProductKind = async (id: string) =>
  api.delete<
    DeleteProductKindResponse,
    AxiosResponse<DeleteProductKindResponse>
  >(`${PATH}/${id}`);
