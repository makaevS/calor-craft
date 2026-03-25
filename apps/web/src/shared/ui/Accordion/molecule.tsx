import { createScope, molecule as mol, use } from "bunshi";
import { proxy } from "valtio";

export interface AccordionState {
  openAt: string | string[] | undefined;
  itemIds: string[];
}

interface ScopeValue {
  multiple?: boolean;
}

export const scope = createScope<ScopeValue>(
  { multiple: false },
  { debugLabel: "AccordionScope" },
);

export const molecule = mol(() => {
  const { multiple } = use(scope);
  const store = proxy<AccordionState>({
    openAt: multiple ? [] : undefined,
    itemIds: [],
  });
  const toReg = [] as string[];
  const __regTitle = (itemId: string) => {
    store.itemIds.push(itemId);
    toReg.push(itemId);
    return () => {
      store.itemIds = store.itemIds.filter((id) => id !== itemId);
    };
  };
  const __regContent = (defaultOpen?: boolean) => {
    const itemId = toReg.shift();
    if (!itemId) return undefined;
    if (defaultOpen) {
      store.openAt = Array.isArray(store.openAt)
        ? [...store.openAt, itemId]
        : itemId;
    }
    return itemId;
  };
  const toggleOpen = (itemId: string) => {
    if (Array.isArray(store.openAt)) {
      if (store.openAt.includes(itemId)) {
        store.openAt = store.openAt.filter((id) => id !== itemId);
      } else {
        store.openAt = [...store.openAt, itemId];
      }
    } else {
      if (store.openAt === itemId) {
        store.openAt = undefined;
      } else {
        store.openAt = itemId;
      }
    }
  };
  return { __regTitle, __regContent, store, toggleOpen };
});
