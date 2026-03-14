import clsx from "clsx";
import type { ComponentProps } from "react";

export type LoaderRootProps = ComponentProps<"div">;

export const Root = ({ className, ...props }: LoaderRootProps) => (
  <div
    className={clsx("flex items-center justify-center", className)}
    {...props}
  />
);
Root.displayName = "LoaderRoot";
