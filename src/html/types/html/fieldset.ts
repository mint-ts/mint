import { MintHTMLAttributes } from "./shared";

export type HTMLFieldSetElementAttributes = {
  disabled?: boolean | undefined;
  form?: string | undefined;
  name?: string | undefined;
};

export type HTMLFieldSetElementProps = MintHTMLAttributes<HTMLFieldSetElement> &
  HTMLFieldSetElementAttributes;
