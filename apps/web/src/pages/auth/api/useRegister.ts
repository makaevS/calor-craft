import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { register, type RegisterPayload } from "./register";

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const response = await register(payload);
      return response.data;
    },
    onSuccess: () => navigate({ to: "/" }),
  });
};
