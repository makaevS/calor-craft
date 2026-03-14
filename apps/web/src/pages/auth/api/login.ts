import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "@shared/api";
import { setAccessToken, setRefreshToken } from "@shared/auth";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export const login = async (
  payload: LoginPayload,
  config?: AxiosRequestConfig,
) => {
  const response = await api.post<
    LoginResponse,
    AxiosResponse<LoginResponse>,
    LoginPayload
  >("/auth/login", payload, config);
  setAccessToken(response.data.access_token);
  setRefreshToken(response.data.refresh_token);
  return response;
};
