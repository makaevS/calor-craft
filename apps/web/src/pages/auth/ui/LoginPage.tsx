import { Form } from "radix-ui";
import { FormField, FormMessage } from "./components";
import { useState, type SubmitEvent } from "react";
import clsx from "clsx";
import { useLogin } from "../api/useLogin";
import { ButtonLoader } from "@shared/ui/ButtonLoader";
import { Link } from "@tanstack/react-router";

const SERVER_ERROR_MESSAGE = "Не удалось войти, попробуйте позже";

export const LoginPage = () => {
  const [error, setError] = useState<string>("");
  const { mutate, isPending } = useLogin();
  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    if (password !== confirmPassword) {
      event.currentTarget.reportValidity();
    }
    mutate(
      { email, password },
      { onError: () => setError(SERVER_ERROR_MESSAGE) },
    );
  };
  const onClearServerErrors = () => setError("");
  return (
    <div className="flex h-dvh items-center justify-center">
      <Form.Root
        className="m-auto flex w-lg flex-col gap-6 p-4"
        onSubmit={onSubmit}
        onClearServerErrors={onClearServerErrors}
      >
        <FormField name="email">
          <Form.Control
            className="input"
            required
            type="email"
            autoComplete="email"
            placeholder="Электронная почта"
            disabled={isPending}
          />
          <FormMessage match="valueMissing">
            Укажите электронную почту
          </FormMessage>
          <FormMessage match="typeMismatch">Некорректный email</FormMessage>
        </FormField>
        <FormField name="password">
          <Form.Control
            className="input"
            required
            type="password"
            autoComplete="current-password"
            placeholder="Пароль"
            disabled={isPending}
          />
          <FormMessage match="valueMissing">Укажите пароль</FormMessage>
          {error && <FormMessage>{error}</FormMessage>}
        </FormField>
        <Form.Submit
          className={clsx("button-primary", isPending && "cursor-progress")}
          disabled={isPending}
        >
          {isPending ? <ButtonLoader /> : "Войти"}
        </Form.Submit>
        <Link to="/register">
          <button className="button-secondary w-full">
            Нет аккаунта? Зарегистрироваться
          </button>
        </Link>
      </Form.Root>
    </div>
  );
};
