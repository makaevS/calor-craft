import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../auth";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const isRefreshRequest = error.config?.url?.includes("/auth/refresh");
      if (!isRefreshRequest && getRefreshToken()) {
        try {
          const response = await api.post("/auth/refresh", {
            refresh_token: getRefreshToken(),
          });
          setAccessToken(response.data.access_token);
          setRefreshToken(response.data.refresh_token);
          error.config.headers.Authorization = `Bearer ${response.data.access_token}`;
          return api.request(error.config);
        } catch {
          // refresh не удался — выходим и редирект на логин
        }
      }
      removeAccessToken();
      removeRefreshToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export { api };
