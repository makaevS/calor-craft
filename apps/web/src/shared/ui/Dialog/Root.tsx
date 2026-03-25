import { ScopeProvider } from "bunshi/react";
import { useMemo, type ReactNode } from "react";
import { scope } from "./molecule";

export interface DialogRootProps {
  defaultOpen?: boolean;
  children: ReactNode;
}

export const Root = ({ defaultOpen, children }: DialogRootProps) => {
  const value = useMemo(() => ({ defaultOpen }), [defaultOpen]);
  return (
    <ScopeProvider scope={scope} value={value}>
      {children}
    </ScopeProvider>
  );
};
