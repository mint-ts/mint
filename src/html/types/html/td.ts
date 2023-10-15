import { MintReactiveProps } from "../shared";
import { MintHTMLElementProps } from "./shared";

export type HTMLTableDataCellAttributes = {
  align?: "left" | "center" | "right" | "justify" | "char" | undefined;
  colSpan?: number | undefined;
  headers?: string | undefined;
  rowSpan?: number | undefined;
  scope?: string | undefined;
  abbr?: string | undefined;
};

export type HTMLTableDataCellElementProps =
  MintHTMLElementProps<HTMLTableCellElement> &
    MintReactiveProps<HTMLTableDataCellAttributes>;
