import { MintCommonProps, MintPropify } from "../shared";

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

export type HTMLFormElementProps = MintCommonProps<HTMLFormElement> &
  MintPropify<HTMLFormElementAttributes>;
