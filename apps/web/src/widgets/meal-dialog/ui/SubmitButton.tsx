import { Button } from "@shared/ui";
import { useMolecule } from "bunshi/react";
import { Dialog } from "@shared/ui";

export const SubmitButton = () => {
  const { close } = useMolecule(Dialog.molecule);
  return (
    <Button variant="primary" type="submit" onClick={close}>
      Сохранить
    </Button>
  );
};
