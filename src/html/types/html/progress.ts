import { MintHTMLAttributes } from "./shared";

export type HTMLProgressElementAttributes = {
  max?: number | string | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type HTMLProgressElementProps = MintHTMLAttributes<HTMLProgressElement> &
  HTMLProgressElementAttributes;
