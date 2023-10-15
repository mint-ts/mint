import { MintReactiveProps } from "../shared";
import { HTMLAttributeReferrerPolicy, MintHTMLElementProps } from "./shared";

export type HTMLAttributeAnchorTarget =
  | "_self"
  | "_blank"
  | "_parent"
  | "_top"
  | (string & {});

export type HTMLAnchorElementAtributes = {
  download?: any;
  href?: string | undefined;
  hrefLang?: string | undefined;
  media?: string | undefined;
  ping?: string | undefined;
  target?: HTMLAttributeAnchorTarget | undefined;
  type?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
};

export type HTMLAnchorElementProps = MintHTMLElementProps<HTMLAnchorElement> &
  MintReactiveProps<HTMLAnchorElementAtributes>;
