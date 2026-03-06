import axios from "axios";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  setAccessToken,
  setRefreshToken,
} from "../auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

api.interceptors.request.use(undefined, async (error) => {
  if (error.response.status === 401) {
    await refreshToken();
    return api.request(error.config);
  }
  throw error;
});

const refreshToken = async () => {
  const response = await api.post("/auth/refresh", {
    refresh_token: REFRESH_TOKEN,
  });
  setAccessToken(response.data.access_token);
  setRefreshToken(response.data.refresh_token);
};
