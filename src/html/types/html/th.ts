import { MintReactiveProps } from "../shared";
import { MintHTMLElementProps } from "./shared";

export type HTMLTableHeaderCellElementAttributes = {
  align?: "left" | "center" | "right" | "justify" | "char" | undefined;
  colSpan?: number | undefined;
  headers?: string | undefined;
  rowSpan?: number | undefined;
  scope?: string | undefined;
  abbr?: string | undefined;
};

export type HTMLTableHeaderCellElementProps =
  MintHTMLElementProps<HTMLTableCellElement> &
    MintReactiveProps<HTMLTableHeaderCellElementAttributes>;
