import { api } from "@shared/api";
import type { ProductKind } from "../model/product-kind";
import type { CreateProductKindPayload } from "./create-product-kind";
import type { AxiosResponse } from "axios";
import { PATH } from "./path";

export type UpdateProductKindPayload = Partial<CreateProductKindPayload>;

export type UpdateProductKindResponse = ProductKind;

export const updateProductKind = async (
  id: string,
  payload: UpdateProductKindPayload,
) =>
  api.patch<
    UpdateProductKindResponse,
    AxiosResponse<UpdateProductKindResponse>,
    UpdateProductKindPayload
  >(`${PATH}/${id}`, payload);
