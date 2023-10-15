import { MintHTMLAttributes } from "./shared";

export type HTMLOListElementAttributes = {
  reversed?: boolean | undefined;
  start?: number | undefined;
  type?: "1" | "a" | "A" | "i" | "I" | undefined;
};

export type HTMLOListElementProps = MintHTMLAttributes<HTMLOListElement> &
  HTMLOListElementAttributes;
