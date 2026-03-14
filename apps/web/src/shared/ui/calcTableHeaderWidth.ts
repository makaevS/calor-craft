/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Header, HeaderGroup } from "@tanstack/react-table";

export const calcTableHeaderWidth = (
  header: Header<any, any>,
  group: HeaderGroup<any>,
): string => {
  // const subHeaders = header.getLeafHeaders();
  // Если у колонки заданы минимальная и максимальная ширина, и они равны, то возвращаем минимальную ширину
  const { minSize, maxSize } = header.column.columnDef;
  if (!!minSize && minSize === maxSize) {
    return `${minSize}px`;
  }
  const groupSize = group.headers.reduce(
    (acc, curr) =>
      acc +
      (!!curr.column.columnDef.minSize &&
      curr.column.columnDef.minSize === curr.column.columnDef.maxSize
        ? 0
        : curr.getSize()),
    0,
  );
  const headerSize = header.getSize();
  if (!!maxSize && headerSize > maxSize) {
    return `${maxSize}px`;
  }
  if (!!minSize && headerSize < minSize) {
    return `${minSize}px`;
  }
  const headerPart = Math.floor((headerSize / groupSize) * 100);
  return `${headerPart}%`;
};
