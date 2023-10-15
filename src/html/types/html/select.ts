import { MintReactiveProps } from "../shared";
import { MintHTMLElementProps } from "./shared";

export type HTMLSelectElementAttributes = {
  autoComplete?: string | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  multiple?: boolean | undefined;
  name?: string | undefined;
  required?: boolean | undefined;
  size?: number | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type HTMLSelectElementProps = MintHTMLElementProps<HTMLSelectElement> &
  MintReactiveProps<HTMLSelectElementAttributes>;
