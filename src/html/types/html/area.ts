import { MintReactiveProps } from "../shared";
import { HTMLAttributeReferrerPolicy, MintHTMLElementProps } from "./shared";

export type HTMLAreaElementAttributes = {
  alt?: string | undefined;
  coords?: string | undefined;
  download?: any;
  href?: string | undefined;
  hrefLang?: string | undefined;
  media?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  shape?: string | undefined;
  target?: string | undefined;
};

export type HTMLAreaElementProps = MintHTMLElementProps<HTMLAreaElement> &
  MintReactiveProps<HTMLAreaElementAttributes>;
