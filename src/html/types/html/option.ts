import { MintReactiveProps } from "../shared";
import { MintHTMLElementProps } from "./shared";

export type HTMLOptionElementAttributes = {
  disabled?: boolean | undefined;
  label?: string | undefined;
  selected?: boolean | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type HTMLOptionElementProps = MintHTMLElementProps<HTMLOptionElement> &
  MintReactiveProps<HTMLOptionElementAttributes>;
