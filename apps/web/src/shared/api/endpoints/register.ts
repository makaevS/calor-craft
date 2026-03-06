import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "../api";

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: {
    id: string;
    email: string;
    createdAt: Date;
  };
}

export const register = (
  payload: RegisterPayload,
  config?: AxiosRequestConfig,
) =>
  api.post<RegisterResponse, AxiosResponse<RegisterResponse>, RegisterPayload>(
    "/auth/register",
    payload,
    config,
  );
