import { MintReactiveProps } from "../shared";
import { MintHTMLElementProps } from "./shared";

export type HTMLFormElementAttributes = {
  acceptCharset?: string | undefined;
  action?: string | undefined;
  autoComplete?: string | undefined;
  encType?: string | undefined;
  method?: string | undefined;
  name?: string | undefined;
  noValidate?: boolean | undefined;
  target?: string | undefined;
};

export type HTMLFormElementProps = MintHTMLElementProps<HTMLFormElement> &
  MintReactiveProps<HTMLFormElementAttributes>;
