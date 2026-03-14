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
  const data = useMemo(() => response?.data ?? [], [response]);
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
