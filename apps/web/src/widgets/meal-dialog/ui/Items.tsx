import { useMolecule } from "bunshi/react";
import { mealDialogMolecule } from "../model/meal-dialog-molecule";
import { useSnapshot } from "valtio";
import { Text } from "@shared/ui";

export const Items = () => {
  const { store } = useMolecule(mealDialogMolecule);
  const { items } = useSnapshot(store);
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          {item.product && (
            <div>
              <Text>{item.product.name}</Text>
              <Text>{item.product.calories}</Text>
            </div>
          )}
          {item.dish && (
            <div>
              <Text>{item.dish.name}</Text>
              <Text>
                {item.dish.items.reduce(
                  (acc, dishItem) => acc + dishItem.product.calories,
                  0,
                )}
              </Text>
              {item.dish.items.map((dishItem) => (
                <div key={dishItem.id}>
                  <Text>{dishItem.product.name}</Text>
                  <Text>{dishItem.product.calories}</Text>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
