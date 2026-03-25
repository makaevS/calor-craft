import { createScope, molecule as mol, use } from "bunshi";
import { proxy } from "valtio";

export interface DialogState {
  open: boolean;
  disabled: boolean;
}

type ScopeValue = {
  defaultOpen?: boolean;
};

export const scope = createScope<ScopeValue>({}, { debugLabel: "DialogScope" });

export const molecule = mol(() => {
  const { defaultOpen } = use(scope);
  const store = proxy<DialogState>({
    open: !!defaultOpen,
    disabled: false,
  });
  const open = () => {
    store.open = true;
  };
  const close = () => {
    if (store.disabled) return;
    store.open = false;
  };
  const changeDisabled = (disabled: boolean) => {
    store.disabled = disabled;
  };
  return { store, open, close, changeDisabled };
});
