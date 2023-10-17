import { MintReactiveProps } from "../../../types";
import { MintHTMLElementProps } from "./shared";

export type HTMLQuoteElementAttributes = {
  cite?: string | undefined;
};

export type HTMLQuoteElementProps = MintHTMLElementProps<HTMLQuoteElement> &
  MintReactiveProps<HTMLQuoteElementAttributes>;
