import { Form } from "radix-ui";
import { FormControl, FormField, FormMessage } from "./components";
import { useState, type SubmitEvent } from "react";
import { Loader } from "@shared/components/loader";
import clsx from "clsx";
import { useLogin } from "../api/useLogin";

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
          <FormControl
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
          <FormControl
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
          className={clsx(
            "rounded-md bg-indigo-700 p-2 font-bold text-amber-100 focus-visible:outline-2 focus-visible:outline-amber-100",
            !isPending && "cursor-pointer",
          )}
          disabled={isPending}
        >
          {isPending ? (
            <Loader.Root className="h-6">
              <Loader.Indicator className="h-4 w-4" />
            </Loader.Root>
          ) : (
            "Войти"
          )}
        </Form.Submit>
      </Form.Root>
    </div>
  );
};
