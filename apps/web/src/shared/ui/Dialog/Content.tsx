import type { ComponentProps } from "react";
import { useMolecule } from "bunshi/react";
import { molecule } from "./molecule";
import { useSnapshot } from "valtio";
import clsx from "clsx";
import { useRef, useEffect } from "react";

export type DialogContentProps = Omit<ComponentProps<"dialog">, "open">;

export const Content = ({ className, ...props }: DialogContentProps) => {
  const { store, close } = useMolecule(molecule);
  const { open } = useSnapshot(store);
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const dialog = ref.current;
    if (open) {
      dialog.showModal();
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          dialog.close();
          close();
        }
      };
      const handleClickOutside = (event: MouseEvent) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (!isInDialog) {
          dialog.close();
          close();
        }
      };
      document.addEventListener("keydown", handleEsc);
      dialog.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("keydown", handleEsc);
        dialog.removeEventListener("click", handleClickOutside);
      };
    } else {
      dialog.close();
    }
  }, [open, close]);
  return (
    <dialog
      ref={ref}
      className={clsx("dialog-content", !open && "hidden", className)}
      {...props}
    />
  );
};
