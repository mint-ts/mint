import { MintHTMLAttributes } from "./shared";

export type HTMLQuoteElementAttributes = {
  cite?: string | undefined;
};

export type HTMLQuoteElementProps = MintHTMLAttributes<HTMLQuoteElement> &
  HTMLQuoteElementAttributes;
