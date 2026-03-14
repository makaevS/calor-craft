import { Form } from "radix-ui";
import { FormField, FormMessage } from "./components";
import { useState, type SubmitEvent } from "react";
import { useRegister } from "../api/useRegister";
import clsx from "clsx";
import { ButtonLoader } from "@shared/ui/ButtonLoader";
import { Link } from "@tanstack/react-router";

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
        <Form.Submit
          className={clsx("button-primary", isPending && "cursor-progress")}
          disabled={isPending}
        >
          {isPending ? <ButtonLoader /> : "Зарегистрироваться"}
        </Form.Submit>
        <Link to="/login">
          <button className="button-secondary w-full">
            Уже есть аккаунт? Войти
          </button>
        </Link>
      </Form.Root>
    </div>
  );
};
