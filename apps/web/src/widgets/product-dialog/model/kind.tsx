import { createEvent, createStore } from "effector";
import { produce, type Immutable } from "immer";

type State = Immutable<{
  id: string | undefined;
  name: string | undefined;
  error: string;
  locked: boolean;
  init: boolean;
}>;

export const $kind = createStore<State>({
  id: undefined,
  name: undefined,
  error: "",
  locked: false,
  init: false,
});

export const kindInit = createEvent<{ id: string; name: string } | undefined>();
export const kindIdChanged = createEvent<
  { id: string; name: string } | undefined
>();
export const formSubmitted = createEvent();

$kind.on(kindInit, (state, kind) =>
  produce(state, (draft) => {
    draft.id = kind?.id;
    draft.name = kind?.name;
    draft.init = true;
  }),
);
$kind.on(kindIdChanged, (state, kind) =>
  produce(state, (draft) => {
    if (draft.init) {
      draft.init = false;
      return;
    }
    if (draft.locked) {
      draft.locked = false;
      return;
    }
    draft.id = kind?.id;
    draft.name = kind?.name;
    draft.error = "";
    draft.locked = true;
  }),
);
$kind.on(formSubmitted, (state) =>
  produce(state, (draft) => {
    if (!draft.id) {
      draft.error = "Выберите вид продукта";
    }
  }),
);
