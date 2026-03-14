import { ProductKindsPage } from "@pages/product-kinds";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/product-kinds")({
  component: ProductKindsPage,
});
