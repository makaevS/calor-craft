import { Content } from "./Content";
import { Cross } from "./Cross";
import { molecule } from "./molecule";
import { Root } from "./Root";
import { Title } from "./Title";

export type { DialogRootProps } from "./Root";
export type { DialogCrossProps } from "./Cross";
export type { DialogContentProps } from "./Content";
export type { DialogState } from "./molecule";

export const Dialog = {
  Root,
  Title,
  Cross,
  Content,
  molecule,
};
