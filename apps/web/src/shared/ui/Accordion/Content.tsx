import { useMolecule } from "bunshi/react";
import clsx from "clsx";
import { useLayoutEffect, useState } from "react";
import { molecule } from "./molecule";
import { useSnapshot } from "valtio";
import { Expand, type ExpandProps } from "../Expand";

export type AccordionContentProps = Omit<ExpandProps, "open"> &
  Partial<Pick<ExpandProps, "open">> & {
    itemId?: string;
    defaultOpen?: boolean;
  };

export const Content = ({
  className,
  itemId,
  open,
  defaultOpen,
  ...props
}: AccordionContentProps) => {
  const { store, __regContent } = useMolecule(molecule);
  const [itemIdToUse, setItemIdToUse] = useState(
    () => itemId ?? __regContent(),
  );
  useLayoutEffect(() => {
    if (itemIdToUse) return;
    setItemIdToUse(itemId ?? __regContent(defaultOpen));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, __regContent, itemIdToUse]);
  const { openAt } = useSnapshot(store);
  const openToUse =
    open ??
    (Array.isArray(openAt)
      ? openAt.includes(itemIdToUse)
      : openAt === itemIdToUse);
  return (
    <Expand
      className={clsx(
        "accordion-content",
        !openToUse && "accordion-content-closed",
        className,
      )}
      open={openToUse}
      {...props}
      data-state={openToUse ? "open" : "closed"}
    />
  );
};
