import { MintHTMLElementProps } from "./shared";

export type HTMLProgressElementAttributes = {
  max?: number | string | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type HTMLProgressElementProps = MintHTMLElementProps<HTMLProgressElement> &
  HTMLProgressElementAttributes;
