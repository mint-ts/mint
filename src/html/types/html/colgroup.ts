import { MintReactiveProps } from "../../../core";
import { MintHTMLElementProps } from "./shared";

export type HTMLTableColGroupElementAttributes = {
  span?: number | undefined;
};

export type HTMLTableColGroupElementProps =
  MintHTMLElementProps<HTMLTableColElement> &
    MintReactiveProps<HTMLTableColGroupElementAttributes>;
