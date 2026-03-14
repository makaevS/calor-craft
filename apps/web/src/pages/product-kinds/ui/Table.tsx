import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTableQuery } from "../model/useTableQuery";
import { useMemo } from "react";
import { columns } from "./columns";
import { TableLoader } from "@shared/ui/TableLoader";
import { calcTableHeaderWidth } from "@shared/ui/calcTableHeaderWidth";

export const Table = () => {
  const { data: response, isPending } = useTableQuery();
  const data = useMemo(
    () =>
      response?.data ??
      [
        // {
        //   id: "1",
        //   name: "test",
        //   calories: 100,
        //   createdAt: new Date().toISOString(),
        //   userId: "1",
        // },
        // {
        //   id: "2",
        //   name: "test2",
        //   calories: 200,
        //   createdAt: new Date().toISOString(),
        //   userId: "1",
        // },
        // {
        //   id: "3",
        //   name: "test3",
        //   calories: 300,
        //   createdAt: new Date().toISOString(),
        //   userId: "1",
        // },
        // {
        //   id: "4",
        //   name: "test4",
        //   calories: 400,
        //   createdAt: new Date().toISOString(),
        //   userId: "1",
        // },
        // {
        //   id: "5",
        //   name: "test5",
        //   calories: 500,
        //   createdAt: new Date().toISOString(),
        //   userId: "1",
        // },
        // {
        //   id: "6",
        //   name: "test6",
        //   calories: 600,
        //   createdAt: new Date().toISOString(),
        //   userId: "1",
        // },
        // {
        //   id: "7",
        //   name: "test7",
        //   calories: 700,
        //   createdAt: new Date().toISOString(),
        //   userId: "1",
        // },
        // {
        //   id: "8",
        //   name: "test8",
        //   calories: 800,
        //   createdAt: new Date().toISOString(),
        //   userId: "1",
        // },
        // {
        //   id: "9",
        //   name: "test9",
        //   calories: 900,
        //   createdAt: new Date().toISOString(),
        //   userId: "1",
        // },
        // {
        //   id: "10",
        //   name: "test10",
        //   calories: 1000,
        //   createdAt: new Date().toISOString(),
        //   userId: "1",
        // },
      ],
    [response],
  );
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table className="w-full rounded-xl bg-(--bg-primary) text-(--text-primary-color)">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="border-b border-gray-500 p-2 text-left font-semibold"
                style={{ width: calcTableHeaderWidth(header, headerGroup) }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {isPending ? (
          <tr>
            <td colSpan={table.getVisibleFlatColumns().length} className="p-40">
              <TableLoader />
            </td>
          </tr>
        ) : (
          table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border-b border-gray-500 p-2 font-semibold"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        )}
        {!isPending && !table.getRowModel().rows.length && (
          <tr>
            <td colSpan={table.getVisibleFlatColumns().length} className="p-40">
              <p className="flex h-12 items-center justify-center text-center text-2xl font-semibold text-(--text-primary-color)">
                Данные не найдены
              </p>
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};
