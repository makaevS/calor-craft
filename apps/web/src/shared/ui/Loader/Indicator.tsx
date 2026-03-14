import clsx from "clsx";
import type { ComponentProps } from "react";

export type LoaderIndicatorProps = Omit<ComponentProps<"div">, "children">;

export const Indicator = ({ className, ...props }: LoaderIndicatorProps) => (
  <div
    className={clsx(
      "animate-spin rounded-full border-t-2 border-b-2 border-inherit",
      className,
    )}
    {...props}
  />
);
Indicator.displayName = "LoaderIndicator";
