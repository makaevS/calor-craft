/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import type { ComponentProps, JSX, JSXElementConstructor } from "react";

export type TextProps<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> = "span",
> = ComponentProps<T> & {
  variant?: "primary" | "secondary" | "placeholder";
  as?: T;
};

export const Text = <
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> = "span",
>({
  className,
  variant = "primary",
  as = "span",
  ...props
}: TextProps<T>) => {
  const El = as;
  return (
    <El
      className={clsx(
        "text",
        variant === "primary" && "text-primary",
        variant === "secondary" && "text-secondary",
        variant === "placeholder" && "text-placeholder",
        className,
      )}
      {...props}
    />
  );
};
