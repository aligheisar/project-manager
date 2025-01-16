import clsx, { ClassArray } from "clsx";
import { twMerge } from "tailwind-merge";

export let cn = (...inputs: ClassArray[]): string => {
  return twMerge(clsx(...inputs));
};
