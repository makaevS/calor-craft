import { Loader } from "./Loader";

/** @deprecated */
export const ButtonLoader = () => (
  <Loader.Root className="h-6">
    <Loader.Indicator className="h-4 w-4" />
  </Loader.Root>
);
