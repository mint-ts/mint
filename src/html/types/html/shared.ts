import { MintProps } from "../shared";
import { HTMLAttributes } from "./HTMLAttributes";

export type MintHTMLElementProps<T extends HTMLElement> = MintProps<T> &
  HTMLAttributes;

export type HTMLAttributeReferrerPolicy =
  | ""
  | "no-referrer"
  | "no-referrer-when-downgrade"
  | "origin"
  | "origin-when-cross-origin"
  | "same-origin"
  | "strict-origin"
  | "strict-origin-when-cross-origin"
  | "unsafe-url";
