import clsx from "clsx";

interface LoaderIndicatorProps {
  className?: string;
}

export const Indicator = ({ className }: LoaderIndicatorProps) => (
  <div
    className={clsx(
      "animate-spin rounded-full border-t-2 border-b-2 border-inherit",
      className,
    )}
  />
);
Indicator.displayName = "LoaderIndicator";
