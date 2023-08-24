import { MintCommonProps, MintPropify } from "../shared";

export type HTMLLabelElementAttributes = {
  form?: string | undefined;
  htmlFor?: string | undefined;
};

export type HTMLLabelElementProps = MintPropify<HTMLLabelElementAttributes> &
  MintCommonProps<HTMLLabelElement>;
