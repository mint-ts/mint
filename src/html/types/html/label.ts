import { MintReactiveProps } from "../../../core";
import { MintHTMLElementProps } from "./shared";

export type HTMLLabelElementAttributes = {
  form?: string | undefined;
  htmlFor?: string | undefined;
};

export type HTMLLabelElementProps = MintHTMLElementProps<HTMLLabelElement> &
  MintReactiveProps<HTMLLabelElementAttributes>;
