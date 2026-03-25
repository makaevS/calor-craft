import { Content } from "./Content";
import { Root } from "./Root";
import { molecule } from "./molecule";
import { Title } from "./Title";

export type { AccordionRootProps } from "./Root";
export type { AccordionTitleProps } from "./Title";
export type { AccordionContentProps } from "./Content";
export type { AccordionState } from "./molecule";

export const Accordion = {
  Root,
  Title,
  Content,
  molecule,
};
