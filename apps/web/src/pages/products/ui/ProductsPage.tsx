import { Search } from "./Search";
import { Table } from "./Table";
import { AddButton } from "./AddButton";

export const ProductsPage = () => {
  return (
    <div className="m-auto flex h-screen w-1/2 flex-col gap-6 pt-[10vh] pb-[10vh]">
      <h2 className="text-4xl font-bold text-(--text-secondary-color)">
        Список продуктов
      </h2>
      <div className="flex justify-between">
        <Search />
        <AddButton />
      </div>
      <Table />
    </div>
  );
};
