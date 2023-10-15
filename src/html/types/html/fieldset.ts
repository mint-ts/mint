import { MintReactiveProps } from "../shared";
import { MintHTMLElementProps } from "./shared";

export type HTMLFieldSetElementAttributes = {
  disabled?: boolean | undefined;
  form?: string | undefined;
  name?: string | undefined;
};

export type HTMLFieldSetElementProps =
  MintHTMLElementProps<HTMLFieldSetElement> &
    MintReactiveProps<HTMLFieldSetElementAttributes>;
