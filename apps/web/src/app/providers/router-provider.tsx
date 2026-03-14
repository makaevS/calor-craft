import {
  createRouter,
  RouterProvider as LibRouterProvider,
} from "@tanstack/react-router";
import { routeTree } from "../../routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const RouterProvider = () => <LibRouterProvider router={router} />;
