import { setDefaultOptions } from "date-fns";
import { ru } from "date-fns/locale";
import { QueryProvider } from "./providers/query-provider";
import { RouterProvider } from "./providers/router-provider";

setDefaultOptions({ locale: ru });

export const App = () => (
  <QueryProvider>
    <RouterProvider />
  </QueryProvider>
);
