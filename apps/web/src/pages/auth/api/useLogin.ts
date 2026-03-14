import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { login, type LoginPayload } from "./login";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await login(payload);
      return response.data;
    },
    onSuccess: () => navigate({ to: "/" }),
  });
};
