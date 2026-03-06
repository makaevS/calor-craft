import type { ClasslessProps } from "@shared/components";
import { Form } from "radix-ui";

export const FormField = ({ ...args }: ClasslessProps<typeof Form.Field>) => (
  <Form.Field className="flex flex-col gap-2" {...args} />
);

export const FormControl = ({
  ...args
}: ClasslessProps<typeof Form.Control>) => (
  <Form.Control
    className="rounded-md bg-(--bg-transparent) p-2 font-bold text-(--text-color) placeholder-shown:text-(--text-color) focus-visible:outline-2 focus-visible:outline-(--primary-color) data-[invalid=true]:outline-2 data-[invalid=true]:outline-(--error-color)"
    {...args}
  />
);

export const FormMessage = ({
  ...args
}: ClasslessProps<typeof Form.Message>) => (
  <Form.Message className="text-sm font-bold text-(--text-color)" {...args} />
);
