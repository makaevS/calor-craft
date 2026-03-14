import { Link } from "@tanstack/react-router";

export const HomePage = () => (
  <div className="flex flex-col gap-6">
    <Link to="/product-kinds">Виды продуктов</Link>
    <Link to="/products">Продукты</Link>
  </div>
);
