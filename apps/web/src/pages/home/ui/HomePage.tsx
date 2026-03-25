import { mealQueries, type Meal } from "@entities/meal";
import { Dialog, Loader } from "@shared/ui";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { DayMeals } from "./DayMeals";
import { AddButton } from "./AddButton";

export const HomePage = () => {
  const { data, isPending } = useQuery(mealQueries.list());
  const meals = [] as Meal[][];
  data?.data.forEach((item) => {
    const date = item.date;
    let list = meals.at(-1);
    if (list?.[0]?.date !== date) {
      list = [];
      meals.push(list);
    }
    list.push(item);
  });
  return (
    <div className="m-auto flex h-screen w-1/2 flex-col gap-6 pt-[10vh] pb-[10vh]">
      <div className="flex gap-4">
        <Link
          to="/product-kinds"
          className="text-lg font-semibold text-(--text-secondary-color) hover:text-(--primary-color)"
        >
          Виды продуктов
        </Link>
        <span className="text-lg font-semibold text-(--text-secondary-color)">
          |
        </span>
        <Link
          to="/products"
          className="text-lg font-semibold text-(--text-secondary-color) hover:text-(--primary-color)"
        >
          Продукты
        </Link>
      </div>
      <Dialog.Root>
        <AddButton />
      </Dialog.Root>
      {isPending && (
        <Loader.Root className="m-auto h-6 w-6">
          <Loader.Indicator />
        </Loader.Root>
      )}
      {meals.map((items) => (
        <DayMeals meals={items} />
      ))}
    </div>
  );
};
