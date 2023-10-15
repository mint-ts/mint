import { CrossOrigin } from "../shared";
import { HTMLAttributeReferrerPolicy, MintHTMLElementProps } from "./shared";

export type HTMLLinkElementAttributes = {
  as?: string | undefined;
  crossOrigin?: CrossOrigin;
  fetchPriority?: "high" | "low" | "auto";
  href?: string | undefined;
  hrefLang?: string | undefined;
  integrity?: string | undefined;
  media?: string | undefined;
  imageSrcSet?: string | undefined;
  imageSizes?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  sizes?: string | undefined;
  type?: string | undefined;
  charSet?: string | undefined;
};

export type HTMLLinkElementProps = MintHTMLElementProps<HTMLLinkElement> &
  HTMLLinkElementAttributes;
