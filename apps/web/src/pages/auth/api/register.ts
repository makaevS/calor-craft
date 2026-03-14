import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "@shared/api";
import { setAccessToken, setRefreshToken } from "@shared/auth";

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

export const register = async (
  payload: RegisterPayload,
  config?: AxiosRequestConfig,
) => {
  const response = await api.post<
    RegisterResponse,
    AxiosResponse<RegisterResponse>,
    RegisterPayload
  >("/auth/register", payload, config);
  setAccessToken(response.data.access_token);
  setRefreshToken(response.data.refresh_token);
  return response;
};
