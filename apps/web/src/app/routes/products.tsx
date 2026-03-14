import { ProductsPage } from "@pages/products";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
});
