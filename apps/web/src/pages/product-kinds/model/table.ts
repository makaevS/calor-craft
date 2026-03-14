import { createEvent, createStore } from "effector";
import { produce, type Immutable } from "immer";

type State = Immutable<{
  search: string;
}>;

export const $table = createStore<State>({ search: "" });

export const tableSearchChanged = createEvent<string>();

$table.on(tableSearchChanged, (state, search) =>
  produce(state, (draft) => {
    draft.search = search;
  }),
);
