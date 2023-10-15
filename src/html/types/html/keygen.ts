import { MintReactiveProps } from "../shared";
import { MintHTMLElementProps } from "./shared";

export type HTMLKeygenElementAttributes = {
  challenge?: string | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  keyType?: string | undefined;
  keyParams?: string | undefined;
  name?: string | undefined;
};

export type HTMLKeygenElementProps = MintHTMLElementProps<HTMLElement> &
  MintReactiveProps<HTMLKeygenElementAttributes>;
