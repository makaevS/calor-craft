import { productKindQueries } from "@entities/product-kind";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Loader } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import { Select } from "radix-ui";
import { useLayoutEffect, useState } from "react";
import { $kind, kindIdChanged, kindInit } from "../model/kind";
import { useUnit } from "effector-react";
import clsx from "clsx";

interface KindSelectProps {
  initialValue: string | undefined;
}

export const KindSelect = ({ initialValue }: KindSelectProps) => {
  const [kind, onKindIdChanged, onKindInit] = useUnit([
    $kind,
    kindIdChanged,
    kindInit,
  ]);
  const [open, setOpen] = useState(false);
  const { data, isPending } = useQuery(productKindQueries.list());
  useLayoutEffect(() => {
    if (!data) return;
    const initialKind = data.data.find((item) => item.id === initialValue);
    onKindInit(initialKind);
  }, [data, initialValue, onKindInit]);
  console.log("kind", kind);
  return (
    <Select.Root
      value={kind.id}
      onValueChange={(id) =>
        onKindIdChanged(data?.data.find((item) => item.id === id))
      }
      open={open && !isPending}
      onOpenChange={setOpen}
    >
      <Select.Trigger
        className={clsx(
          "flex w-full items-center justify-between rounded-md bg-(--bg-primary) p-2 font-bold text-(--text-primary-color) focus-visible:outline-3 focus-visible:outline-(--primary-color) disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-(--text-placeholder-color)",
          kind.error && "outline-2 outline-(--error-color)",
        )}
      >
        <Select.Value placeholder="Вид продукта" aria-label={kind.name}>
          {kind.name}
        </Select.Value>
        <Select.Icon>
          {isPending && (
            <Loader.Root className="h-6">
              <Loader.Indicator className="h-4 w-4" />
            </Loader.Root>
          )}
          {!isPending && open && <ChevronUpIcon width={24} height={24} />}
          {!isPending && !open && <ChevronDownIcon width={24} height={24} />}
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="max-h-(--radix-select-content-available-height) w-(--radix-select-trigger-width) overflow-hidden rounded-md bg-(--bg-dialog)"
          position="popper"
        >
          <Select.ScrollUpButton>
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-2">
            {data?.data.map((item) => (
              <Select.Item
                key={item.id}
                value={item.id}
                className="cursor-pointer rounded-md p-2 font-semibold text-(--text-primary-color) hover:bg-indigo-300 focus:bg-indigo-300 focus:outline-none data-[state=checked]:bg-(--primary-color) data-[state=checked]:text-(--text-secondary-color)"
              >
                {item.name}
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton>
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
