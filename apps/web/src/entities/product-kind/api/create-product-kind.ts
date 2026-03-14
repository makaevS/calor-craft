import { api } from "@shared/api";
import type { AxiosResponse } from "axios";
import { PATH } from "./path";
import type { ProductKind } from "../model/product-kind";

export interface CreateProductKindPayload {
  name: string;
  calories: number;
}

export type CreateProductKindResponse = ProductKind;

export const createProductKind = async (payload: CreateProductKindPayload) =>
  api.post<
    CreateProductKindResponse,
    AxiosResponse<CreateProductKindResponse>,
    CreateProductKindPayload
  >(PATH, payload);
