import { Cell } from "./types";

export const numberCell = (value: number): Cell => ({
  type: "number",
  value,
});

export const textCell = (value: string): Cell => ({
  type: "text",
  value,
});

export const imageCell = (src: string): Cell => ({
  type: "image",
  src,
});
