import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "../api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export const login = (payload: LoginPayload, config?: AxiosRequestConfig) =>
  api.post<LoginResponse, AxiosResponse<LoginResponse>, LoginPayload>(
    "/auth/login",
    payload,
    config,
  );
