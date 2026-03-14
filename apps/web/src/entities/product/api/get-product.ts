import { api } from "@shared/api";
import type { Product } from "../model/product";
import { PATH } from "./path";
import qs from "qs";

export type GetProductResponse = Product;

export const getProduct = async (id: string, signal?: AbortSignal) =>
  api.get<GetProductResponse>(`${PATH}/${id}`, { signal });

export type GetProductsResponse = Product[];

export const getProducts = async (name?: string, signal?: AbortSignal) =>
  api.get<GetProductsResponse>(
    `${PATH}${name ? `?${qs.stringify({ name })}` : ""}`,
    { signal },
  );
