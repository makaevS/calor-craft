import { useMolecule } from "bunshi/react";
import clsx from "clsx";
import {
  useId,
  useLayoutEffect,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { molecule } from "./molecule";
import { Text } from "../Text";

export type AccordionTitleProps = ComponentProps<"div"> & {
  itemId?: string;
  toggleOpen?: (itemId: string) => void;
};

export const Title = ({
  className,
  onClick,
  onKeyDown,
  toggleOpen,
  itemId,
  children,
  tabIndex = 0,
  ...props
}: AccordionTitleProps) => {
  const defaultItemId = useId();
  const [itemIdToUse] = useState(() => itemId ?? defaultItemId);
  const { __regTitle, toggleOpen: defaultToggleOpen } = useMolecule(molecule);
  useLayoutEffect(() => __regTitle(itemIdToUse), [__regTitle, itemIdToUse]);
  const handleOpenChange = toggleOpen || defaultToggleOpen;
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    handleOpenChange(itemIdToUse);
    onClick?.(event);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      handleOpenChange(itemIdToUse);
    }
    onKeyDown?.(event);
  };
  const content =
    typeof children === "string" ? <Text>{children}</Text> : children;
  return (
    <div
      className={clsx("accordion-title", className)}
      tabIndex={tabIndex}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {content}
    </div>
  );
};
