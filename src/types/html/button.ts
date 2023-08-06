import { MintCommonProps, MintPropify } from "../shared";

export type HTMLButtonElementAttributes = {
  disabled?: boolean | undefined;
  form?: string | undefined;
  formAction?: string | undefined;
  formEncType?: string | undefined;
  formMethod?: string | undefined;
  formNoValidate?: boolean | undefined;
  formTarget?: string | undefined;
  name?: string | undefined;
  type?: "submit" | "reset" | "button" | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type HTMLButtonElementProps = MintCommonProps<HTMLButtonElement> &
  MintPropify<HTMLButtonElementAttributes>;
