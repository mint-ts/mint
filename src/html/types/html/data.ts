import { MintReactiveProps } from "../../../core";
import { MintHTMLElementProps } from "./shared";

export type HTMLDataElementAttributes = {
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type HTMLDataElementProps = MintHTMLElementProps<HTMLDataElement> &
  MintReactiveProps<HTMLDataElementAttributes>;
