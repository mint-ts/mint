import { MintReactiveProps } from "../shared";
import { MintHTMLElementProps } from "./shared";

export type TableHTMLAttributes = {
  align?: "left" | "center" | "right" | undefined;
  bgcolor?: string | undefined;
  border?: number | undefined;
  cellPadding?: number | string | undefined;
  cellSpacing?: number | string | undefined;
  frame?: boolean | undefined;
  rules?: "none" | "groups" | "rows" | "columns" | "all" | undefined;
  summary?: string | undefined;
  width?: number | string | undefined;
};

export type HTMLTableElementProps = MintHTMLElementProps<HTMLTableElement> &
  MintReactiveProps<TableHTMLAttributes>;
