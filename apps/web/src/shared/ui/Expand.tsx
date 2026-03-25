import clsx from "clsx";
import type { ComponentProps } from "react";

export type ExpandProps = ComponentProps<"div"> & {
  open: boolean;
};

export const Expand = ({ className, open, ...props }: ExpandProps) => (
  <div
    className={clsx(
      "expand",
      open && "expand-open",
      !open && "expand-closed",
      className,
    )}
    {...props}
  />
);
