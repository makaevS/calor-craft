import { getDishCalories, getMealCalories, type Meal } from "@entities/meal";
import { Accordion, Text } from "@shared/ui";
import { format, isToday, isYesterday } from "date-fns";
import { Fragment } from "react/jsx-runtime";
// import { useUpdateMeal } from "../api/useUpdateMeal";
// import { useDeleteMeal } from "../api/useDeleteMeal";

interface DayMealsProps {
  meals: Meal[];
}

export const DayMeals = ({ meals }: DayMealsProps) => {
  // const { mutate: updateMeal, isPending: isUpdatingMeal } = useUpdateMeal();
  // const { mutate: deleteMeal, isPending: isDeletingMeal } = useDeleteMeal();
  if (!meals.length) return <></>;
  let title = "";
  const date = meals[0].date;
  if (isToday(meals[0].date)) {
    title = "Сегодня";
  } else if (isYesterday(date)) {
    title = "Вчера";
  } else {
    title = format(date, "dd.MM.yyyy");
  }
  return (
    <Accordion.Root>
      <Accordion.Title>
        <Text as="h3" className="text-xl font-bold">
          {title}
        </Text>
      </Accordion.Title>
      <Accordion.Content defaultOpen>
        {meals.map((meal) => (
          <Accordion.Root key={meal.id}>
            <Accordion.Title>
              <Text>{meal.name}</Text>
              <Text>{getMealCalories(meal)} ккал</Text>
            </Accordion.Title>
            <Accordion.Content>
              {meal.items.map((item) => (
                <Fragment key={item.id}>
                  {item.product && (
                    <Text>{`${item.product.name} ${item.quantity} ${item.measure} - ${item.product.calories} ккал`}</Text>
                  )}
                  {item.dish && (
                    <Accordion.Root>
                      <Accordion.Title>{`${item.dish.name} - ${getDishCalories(item.dish)} ккал`}</Accordion.Title>
                      <Accordion.Content>
                        {item.dish.items.map((i) => (
                          <Text
                            key={i.id}
                          >{`${i.product.name} ${i.quantity} ${i.measure} - ${i.product.calories} ккал`}</Text>
                        ))}
                      </Accordion.Content>
                    </Accordion.Root>
                  )}
                </Fragment>
              ))}
            </Accordion.Content>
          </Accordion.Root>
        ))}
      </Accordion.Content>
    </Accordion.Root>
  );
};
