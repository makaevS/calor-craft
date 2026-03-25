import { Form } from "radix-ui";
import { FormField, FormMessage } from "./components";
import { useState, type SubmitEvent } from "react";
import { useRegister } from "../api/useRegister";
import { Link } from "@tanstack/react-router";
import { Button } from "@shared/ui";

const SERVER_ERROR_MESSAGE = "Не удалось зарегистрироваться, попробуйте позже";

export const RegisterPage = () => {
  const [error, setError] = useState<string>("");
  const { mutate, isPending } = useRegister();
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
            autoComplete="new-password"
            placeholder="Пароль"
            disabled={isPending}
          />
          <FormMessage match="valueMissing">Укажите пароль</FormMessage>
        </FormField>
        <FormField name="confirmPassword">
          <Form.Control
            className="input"
            required
            type="password"
            autoComplete="new-password"
            placeholder="Подтверждение пароля"
            disabled={isPending}
          />
          <FormMessage match="valueMissing">Укажите пароль еще раз</FormMessage>
          <FormMessage
            match={(value, formData) => value !== formData.get("password")}
          >
            Пароли не совпадают
          </FormMessage>
          {error && <FormMessage>{error}</FormMessage>}
        </FormField>
        <Form.Submit asChild>
          <Button variant="primary" pending={isPending}>
            Зарегистрироваться
          </Button>
        </Form.Submit>
        <Link to="/login">
          <Button variant="secondary" className="w-full">
            Уже есть аккаунт? Войти
          </Button>
        </Link>
      </Form.Root>
    </div>
  );
};
