import { MintReactiveProps } from "../shared";
import { MintHTMLElementProps } from "./shared";

export type HTMLTableColGroupElementAttributes = {
  span?: number | undefined;
};

export type HTMLTableColGroupElementProps =
  MintHTMLElementProps<HTMLTableColElement> &
    MintReactiveProps<HTMLTableColGroupElementAttributes>;
