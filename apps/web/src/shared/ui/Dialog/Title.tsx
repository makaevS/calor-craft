import clsx from "clsx";
import { Text, type TextProps } from "../Text";
import { Cross } from "./Cross";

export type TitleProps = TextProps;

export const Title = ({ className, children, ...props }: TitleProps) => (
  <Text as="h2" className={clsx("dialog-title", className)} {...props}>
    {children}
    <Cross className="ml-auto" />
  </Text>
);
