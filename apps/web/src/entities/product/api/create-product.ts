import { api } from "@shared/api";
import type { Product } from "../model/product";
import type { AxiosResponse } from "axios";
import { PATH } from "./path";

export interface CreateProductPayload {
  kindId: string;
  name: string;
  calories: number;
}

export type CreateProductResponse = Product;

export const createProduct = async (payload: CreateProductPayload) =>
  api.post<
    CreateProductResponse,
    AxiosResponse<CreateProductResponse>,
    CreateProductPayload
  >(PATH, payload);
