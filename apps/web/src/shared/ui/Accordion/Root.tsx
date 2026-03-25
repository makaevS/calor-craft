import { ScopeProvider } from "bunshi/react";
import clsx from "clsx";
import { useMemo, type ComponentProps } from "react";
import { scope } from "./molecule";

export type AccordionRootProps = ComponentProps<"div"> & {
  multiple?: boolean;
};

export const Root = ({ className, multiple, ...props }: AccordionRootProps) => {
  const value = useMemo(() => ({ multiple }), [multiple]);
  return (
    <ScopeProvider scope={scope} value={value}>
      <div className={clsx("accordion-root", className)} {...props} />
    </ScopeProvider>
  );
};
