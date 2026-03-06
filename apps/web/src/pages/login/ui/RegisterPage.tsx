import { Form } from "radix-ui";
import { FormControl, FormField, FormMessage } from "./components";
import { useState, type SubmitEvent } from "react";
import { useRegister } from "../api/useRegister";
import { Loader } from "@shared/components/loader";
import clsx from "clsx";

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
            autoComplete="new-password"
            placeholder="Пароль"
            disabled={isPending}
          />
          <FormMessage match="valueMissing">Укажите пароль</FormMessage>
        </FormField>
        <FormField name="confirmPassword">
          <FormControl
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
          className={clsx(
            "rounded-md bg-(--primary-color) p-2 font-bold text-(--text-color) focus-visible:outline-2 focus-visible:outline-(--text-color)",
            !isPending && "cursor-pointer",
          )}
          disabled={isPending}
        >
          {isPending ? (
            <Loader.Root className="h-6">
              <Loader.Indicator className="h-4 w-4" />
            </Loader.Root>
          ) : (
            "Зарегистрироваться"
          )}
        </Form.Submit>
      </Form.Root>
    </div>
  );
};
