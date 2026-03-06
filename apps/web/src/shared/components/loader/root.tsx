import clsx from "clsx";

interface LoaderRootProps {
  className?: string;
  children: React.ReactNode;
}

export const Root = ({ className, children }: LoaderRootProps) => (
  <div className={clsx("flex items-center justify-center", className)}>
    {children}
  </div>
);
Root.displayName = "LoaderRoot";
