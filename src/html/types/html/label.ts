import { MintHTMLAttributes } from "./shared";

export type HTMLLabelElementAttributes = {
  form?: string | undefined;
  htmlFor?: string | undefined;
};

export type HTMLLabelElementProps = MintHTMLAttributes<HTMLLabelElement> &
  HTMLLabelElementAttributes;
