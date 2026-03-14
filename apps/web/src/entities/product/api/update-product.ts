import type { AxiosResponse } from "axios";
import { api } from "@shared/api";
import type { CreateProductPayload } from "./create-product";
import type { Product } from "../model/product";
import { PATH } from "./path";

export type UpdateProductPayload = Partial<CreateProductPayload>;

export type UpdateProductResponse = Product;

export const updateProduct = async (
  id: string,
  payload: UpdateProductPayload,
) =>
  api.patch<
    UpdateProductResponse,
    AxiosResponse<UpdateProductResponse>,
    UpdateProductPayload
  >(`${PATH}/${id}`, payload);
