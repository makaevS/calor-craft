import { register, type RegisterPayload } from "@shared/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

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
