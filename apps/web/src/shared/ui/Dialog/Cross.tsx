import type { MouseEvent } from "react";
import { Button, type ButtonProps } from "../Button";
import { molecule } from "./molecule";
import { useMolecule } from "bunshi/react";
import clsx from "clsx";

export type DialogCrossProps = Omit<ButtonProps, "variant" | "children">;

export const Cross = ({ className, onClick, ...props }: DialogCrossProps) => {
  const { close } = useMolecule(molecule);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    close();
    onClick?.(event);
  };
  return (
    <Button
      variant="ghost"
      className={clsx("dialog-cross", className)}
      onClick={handleClick}
      {...props}
    >
      X
    </Button>
  );
};
