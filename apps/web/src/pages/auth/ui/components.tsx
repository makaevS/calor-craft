import type { ClasslessProps } from "@shared/ui";
import { Form } from "radix-ui";

export const FormField = ({ ...args }: ClasslessProps<typeof Form.Field>) => (
  <Form.Field className="flex flex-col gap-2" {...args} />
);

export const FormMessage = ({
  ...args
}: ClasslessProps<typeof Form.Message>) => (
  <Form.Message
    className="text-sm font-semibold text-(--text-secondary-color)"
    {...args}
  />
);
