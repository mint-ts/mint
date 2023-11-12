import { MintReactiveProps } from "../../../core";
import { MintHTMLElementProps } from "./shared";

export type HTMLTableColElementAttributes = {
  span?: number | undefined;
  width?: number | string | undefined;
};

export type HTMLTableColElementProps =
  MintHTMLElementProps<HTMLTableColElement> &
    MintReactiveProps<HTMLTableColElementAttributes>;
