/* eslint-disable @typescript-eslint/no-explicit-any */
export type ClasslessProps<T extends (...args: any) => any> = Omit<
  Parameters<T>[0],
  "className"
>;
