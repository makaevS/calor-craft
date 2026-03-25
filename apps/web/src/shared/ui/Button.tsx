import clsx from "clsx";
import type { ComponentProps } from "react";
import { Loader } from "./Loader";

export type ButtonProps = ComponentProps<"button"> & {
  variant: "primary" | "secondary" | "danger" | "ghost";
  pending?: boolean;
};

export const Button = ({
  className,
  variant,
  pending,
  disabled,
  children,
  ...props
}: ButtonProps) => (
  <button
    className={clsx(
      "button-base",
      variant === "primary" && "button-primary",
      variant === "secondary" && "button-secondary",
      variant === "danger" && "button-danger",
      variant === "ghost" && "button-ghost",
      pending && "cursor-progress",
      className,
    )}
    disabled={disabled || pending}
    {...props}
  >
    {children}
    {pending && (
      <Loader.Root className="absolute h-full w-full rounded-[inherit] bg-inherit">
        <Loader.Indicator className="h-4 w-4" />
      </Loader.Root>
    )}
  </button>
);
