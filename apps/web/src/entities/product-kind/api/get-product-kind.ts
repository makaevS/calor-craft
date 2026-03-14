import { api } from "@shared/api";
import type { ProductKind } from "../model/product-kind";
import { PATH } from "./path";
import qs from "qs";

export type GetProductKindResponse = ProductKind;

export const getProductKind = async (id: string, signal?: AbortSignal) =>
  api.get<GetProductKindResponse>(`${PATH}/${id}`, { signal });

export type GetProductKindsResponse = ProductKind[];

export const getProductKinds = async (name?: string, signal?: AbortSignal) =>
  api.get<GetProductKindsResponse>(
    `${PATH}${name ? `?${qs.stringify({ name })}` : ""}`,
    {
      signal,
    },
  );
