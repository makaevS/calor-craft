import { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useUnit } from "effector-react";
import { tableSearchChanged } from "../model/table";

export const Search = () => {
  const [value, setValue] = useState("");
  const onTableSearchChange = useUnit(tableSearchChanged);
  const onSubmit = () => onTableSearchChange(value);
  return (
    <div className="flex items-center gap-2">
      <input
        className="input w-96"
        name="search"
        placeholder="Поиск"
        value={value}
        onBlur={onSubmit}
        onKeyDown={(event) => {
          if (event.key === "Enter") onSubmit();
        }}
        onChange={(event) => setValue(event.target.value)}
      />
      {value && (
        <button
          className="button-secondary p-0.5"
          onClick={() => {
            setValue("");
            onTableSearchChange("");
          }}
        >
          <Cross2Icon
            width={24}
            height={24}
            className="stroke-(--text-primary-color) stroke-[0.5]"
          />
        </button>
      )}
    </div>
  );
};
