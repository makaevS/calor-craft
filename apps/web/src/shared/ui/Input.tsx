import clsx from "clsx";
import type { ComponentProps } from "react";

export type InputProps = ComponentProps<"input">;

export const Input = ({ className, ...props }: InputProps) => (
  <input className={clsx("input", className)} {...props} />
);
